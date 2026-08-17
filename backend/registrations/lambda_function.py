import urllib.parse
from db_client import dynamodb_client, REGISTRATIONS_TABLE_NAME
from api_responses import success_response, error_response
from validation import normalize_email
from logging_utils import get_logger

logger = get_logger("RegistrationsFunction")

def handler(event, context):
    email = event.get('queryStringParameters', {}).get('email')
    if not email:
        raw_path = event.get('rawPath', '/')
        email = raw_path.strip('/')
        
    if email:
        email = urllib.parse.unquote(email)
    
    email = normalize_email(email)
    if not email:
        return error_response("INVALID_INPUT", "Email is required.", 400)
        
    try:
        response = dynamodb_client.query(
            TableName=REGISTRATIONS_TABLE_NAME,
            IndexName='EmailIndex',
            KeyConditionExpression='email = :email',
            ExpressionAttributeValues={
                ':email': {'S': email}
            },
            ScanIndexForward=False
        )
        
        items = response.get('Items', [])
        registrations = []
        for item in items:
            registrations.append({
                "registrationId": item.get('registrationId', {}).get('S'),
                "eventId": item.get('eventId', {}).get('S'),
                "eventName": item.get('eventName', {}).get('S'),
                "registrationDate": item.get('registrationDate', {}).get('S'),
                "status": item.get('status', {}).get('S')
            })
            
        return success_response({"registrations": registrations})
    except Exception as e:
        logger.error(f"Error looking up registrations: {e}")
        return error_response("INTERNAL_ERROR", "Internal server error.", 500)
