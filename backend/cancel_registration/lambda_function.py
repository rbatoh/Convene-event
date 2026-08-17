import json
import urllib.parse
from db_client import dynamodb_client, EVENTS_TABLE_NAME, REGISTRATIONS_TABLE_NAME
from api_responses import success_response, error_response
from logging_utils import get_logger

logger = get_logger("CancelRegistrationFunction")

def handler(event, context):
    registration_id = None
    try:
        body = json.loads(event.get('body', '{}') or '{}')
        registration_id = body.get('registrationId')
    except:
        pass
        
    if not registration_id:
        raw_path = event.get('rawPath', '/')
        registration_id = raw_path.strip('/')
        if registration_id:
            registration_id = urllib.parse.unquote(registration_id)
        
    if not registration_id:
        return error_response("INVALID_INPUT", "registrationId is required.", 400)
        
    try:
        reg_response = dynamodb_client.get_item(
            TableName=REGISTRATIONS_TABLE_NAME,
            Key={'registrationId': {'S': registration_id}}
        )
        
        item = reg_response.get('Item')
        if not item:
            return error_response("REGISTRATION_NOT_FOUND", "Registration not found.", 404)
            
        status = item.get('status', {}).get('S')
        if status == 'CANCELLED':
            return success_response({
                "registrationId": registration_id,
                "status": "CANCELLED"
            })
            
        event_id = item.get('eventId', {}).get('S')
        email = item.get('email', {}).get('S')
        lock_key = f"LOCK#{event_id}#{email}"
        
        dynamodb_client.transact_write_items(
            TransactItems=[
                {
                    'Update': {
                        'TableName': REGISTRATIONS_TABLE_NAME,
                        'Key': {'registrationId': {'S': registration_id}},
                        'UpdateExpression': 'SET #s = :cancelled',
                        'ConditionExpression': '#s = :confirmed',
                        'ExpressionAttributeNames': {'#s': 'status'},
                        'ExpressionAttributeValues': {
                            ':cancelled': {'S': 'CANCELLED'},
                            ':confirmed': {'S': 'CONFIRMED'}
                        }
                    }
                },
                {
                    'Update': {
                        'TableName': EVENTS_TABLE_NAME,
                        'Key': {'eventId': {'S': event_id}},
                        'UpdateExpression': 'SET registeredCount = registeredCount - :one',
                        'ConditionExpression': 'registeredCount > :zero',
                        'ExpressionAttributeValues': {
                            ':one': {'N': '1'},
                            ':zero': {'N': '0'}
                        }
                    }
                },
                {
                    'Delete': {
                        'TableName': REGISTRATIONS_TABLE_NAME,
                        'Key': {'registrationId': {'S': lock_key}}
                    }
                }
            ]
        )
        
        return success_response({
            "registrationId": registration_id,
            "status": "CANCELLED"
        })
    except Exception as e:
        logger.error(f"Error cancelling registration: {e}")
        return error_response("INTERNAL_ERROR", "Internal server error.", 500)
