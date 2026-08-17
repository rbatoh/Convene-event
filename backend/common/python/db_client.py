import os

import boto3
from botocore.config import Config

boto3_config = Config(
    retries={
        'max_attempts': 3,
        'mode': 'standard'
    }
)

# Use resource to easily interact with Tables
dynamodb_resource = boto3.resource('dynamodb', config=boto3_config)
# Use client for TransactWriteItems
dynamodb_client = boto3.client('dynamodb', config=boto3_config)

EVENTS_TABLE_NAME = os.environ.get('EVENTS_TABLE', 'events')
REGISTRATIONS_TABLE_NAME = os.environ.get('REGISTRATIONS_TABLE', 'registrations')

events_table = dynamodb_resource.Table(EVENTS_TABLE_NAME)
registrations_table = dynamodb_resource.Table(REGISTRATIONS_TABLE_NAME)
