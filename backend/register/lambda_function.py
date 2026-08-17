import json
import uuid
import hashlib
from datetime import datetime
from db_client import dynamodb_client, EVENTS_TABLE_NAME, REGISTRATIONS_TABLE_NAME
from api_responses import success_response, error_response
from rate_limit import check_rate_limit
from validation import is_valid_email, normalize_email
from logging_utils import get_logger

logger = get_logger("RegisterFunction")

def handler(event, context):
    source_ip = event.get('requestContext', {}).get('http', {}).get('sourceIp', 'unknown')
    
    if not check_rate_limit(source_ip):
        return error_response("TOO_MANY_REQUESTS", "Rate limit exceeded.", 429)

    try:
        body = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return error_response("INVALID_INPUT", "Invalid JSON body.")

    event_id = body.get('eventId')
    name = body.get('name')
    email = body.get('email')

    if not event_id or not name or not email:
        return error_response("INVALID_INPUT", "eventId, name, and email are required.")
    
    if len(name) < 1 or len(name) > 100:
        return error_response("INVALID_INPUT", "name must be between 1 and 100 characters.")
        
    if not is_valid_email(email):
        return error_response("INVALID_INPUT", "Invalid email format.")

    email = normalize_email(email)
    registration_id = f"REG-{uuid.uuid4()}"
    registration_date = datetime.utcnow().isoformat() + "Z"
    
    lock_key = f"LOCK#{event_id}#{email}"

    try:
        event_response = dynamodb_client.get_item(
            TableName=EVENTS_TABLE_NAME,
            Key={'eventId': {'S': event_id}}
        )
        if 'Item' not in event_response:
            return error_response("EVENT_NOT_FOUND", "Event not found.", 404)
        
        event_name = event_response['Item'].get('eventName', {'S': 'Unknown Event'})['S']
    except Exception as e:
        logger.error(f"Error fetching event: {e}")
        return error_response("INTERNAL_ERROR", "Error fetching event.", 500)

    client_token = uuid.uuid4().hex

    try:
        dynamodb_client.transact_write_items(
            ClientRequestToken=client_token,
            TransactItems=[
                {
                    'Update': {
                        'TableName': EVENTS_TABLE_NAME,
                        'Key': {'eventId': {'S': event_id}},
                        'UpdateExpression': 'SET registeredCount = registeredCount + :one',
                        'ConditionExpression': 'registeredCount < #c',
                        'ExpressionAttributeNames': {
                            '#c': 'capacity'
                        },
                        'ExpressionAttributeValues': {
                            ':one': {'N': '1'}
                        }
                    }
                },
                {
                    'Put': {
                        'TableName': REGISTRATIONS_TABLE_NAME,
                        'Item': {
                            'registrationId': {'S': registration_id},
                            'eventId': {'S': event_id},
                            'eventName': {'S': event_name},
                            'name': {'S': name},
                            'email': {'S': email},
                            'registrationDate': {'S': registration_date},
                            'status': {'S': 'CONFIRMED'},
                            'itemType': {'S': 'REGISTRATION'},
                            'createdAt': {'S': registration_date}
                        },
                        'ConditionExpression': 'attribute_not_exists(registrationId)'
                    }
                },
                {
                    'Put': {
                        'TableName': REGISTRATIONS_TABLE_NAME,
                        'Item': {
                            'registrationId': {'S': lock_key},
                            'itemType': {'S': 'LOCK'}
                        },
                        'ConditionExpression': 'attribute_not_exists(registrationId)'
                    }
                }
            ]
        )
        
        return success_response({
            "registrationId": registration_id,
            "eventId": event_id,
            "status": "CONFIRMED"
        }, 201)

    except dynamodb_client.exceptions.TransactionCanceledException as e:
        reasons = e.response.get('CancellationReasons', [])
        if len(reasons) > 0 and reasons[0].get('Code') == 'ConditionalCheckFailed':
            return error_response("EVENT_FULL", "This event has reached capacity.", 409)
        if len(reasons) > 2 and reasons[2].get('Code') == 'ConditionalCheckFailed':
            return error_response("DUPLICATE_REGISTRATION", "Email already registered for this event.", 409)
        
        logger.error(f"Transaction canceled for unknown reason: {reasons}")
        return error_response("INTERNAL_ERROR", "Transaction failed.", 500)
    except Exception as e:
        logger.error(f"Error during transaction: {e}")
        return error_response("INTERNAL_ERROR", "Internal server error.", 500)
