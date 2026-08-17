import os
import boto3
from logging_utils import get_logger

logger = get_logger("NotificationFunction")
ses = boto3.client('ses')

SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'no-reply@convene-ticketing.com')

def handler(event, context):
    logger.info("Processing DynamoDB stream for notifications.")
    
    for record in event.get('Records', []):
        if record['eventName'] in ['INSERT', 'MODIFY']:
            new_image = record['dynamodb'].get('NewImage', {})
            
            item_type = new_image.get('itemType', {}).get('S')
            if item_type != 'REGISTRATION':
                continue
                
            email = new_image.get('email', {}).get('S')
            event_name = new_image.get('eventName', {}).get('S')
            status = new_image.get('status', {}).get('S')
            registration_id = new_image.get('registrationId', {}).get('S')
            
            if not email:
                continue
                
            subject = f"Registration {status.title()} - {event_name}"
            body = f"Hello,\n\nYour registration for {event_name} is now {status}.\n\nRegistration ID: {registration_id}\n\nThank you for using Convene."
            
            try:
                # Need SES domain verification to actually send emails.
                logger.info(f"Attempting to send email to {email}")
                ses.send_email(
                    Source=SENDER_EMAIL,
                    Destination={'ToAddresses': [email]},
                    Message={
                        'Subject': {'Data': subject},
                        'Body': {'Text': {'Data': body}}
                    }
                )
                logger.info("Email sent successfully.")
            except Exception as e:
                logger.error(f"Failed to send email to {email}: {e}")
                raise e
