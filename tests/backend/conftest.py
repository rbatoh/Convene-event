import os
import sys
import pytest
import boto3
from moto import mock_aws

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend/common/python')))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend')))

@pytest.fixture(autouse=True)
def set_env_vars():
    os.environ['AWS_DEFAULT_REGION'] = 'us-east-1'
    os.environ['EVENTS_TABLE'] = 'events'
    os.environ['REGISTRATIONS_TABLE'] = 'registrations'
    yield
    os.environ.pop('AWS_DEFAULT_REGION', None)

@pytest.fixture
def aws_credentials():
    os.environ['AWS_ACCESS_KEY_ID'] = 'testing'
    os.environ['AWS_SECRET_ACCESS_KEY'] = 'testing'
    os.environ['AWS_SECURITY_TOKEN'] = 'testing'
    os.environ['AWS_SESSION_TOKEN'] = 'testing'

@pytest.fixture
def dynamodb(aws_credentials):
    with mock_aws():
        yield boto3.client('dynamodb', region_name='us-east-1')

@pytest.fixture
def setup_tables(dynamodb):
    dynamodb.create_table(
        TableName='events',
        KeySchema=[{'AttributeName': 'eventId', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'eventId', 'AttributeType': 'S'}],
        BillingMode='PROVISIONED',
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )
    
    dynamodb.create_table(
        TableName='registrations',
        KeySchema=[{'AttributeName': 'registrationId', 'KeyType': 'HASH'}],
        AttributeDefinitions=[
            {'AttributeName': 'registrationId', 'AttributeType': 'S'},
            {'AttributeName': 'email', 'AttributeType': 'S'},
            {'AttributeName': 'registrationDate', 'AttributeType': 'S'},
            {'AttributeName': 'eventId', 'AttributeType': 'S'}
        ],
        BillingMode='PROVISIONED',
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5},
        GlobalSecondaryIndexes=[
            {
                'IndexName': 'EmailIndex',
                'KeySchema': [
                    {'AttributeName': 'email', 'KeyType': 'HASH'},
                    {'AttributeName': 'registrationDate', 'KeyType': 'RANGE'}
                ],
                'Projection': {'ProjectionType': 'ALL'},
                'ProvisionedThroughput': {'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
            },
            {
                'IndexName': 'EventIndex',
                'KeySchema': [
                    {'AttributeName': 'eventId', 'KeyType': 'HASH'},
                    {'AttributeName': 'registrationId', 'KeyType': 'RANGE'}
                ],
                'Projection': {'ProjectionType': 'ALL'},
                'ProvisionedThroughput': {'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
            }
        ]
    )
    yield dynamodb
