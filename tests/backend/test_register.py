import json
from register.lambda_function import handler

def test_register_success(setup_tables, dynamodb):
    dynamodb.put_item(
        TableName='events',
        Item={
            'eventId': {'S': 'EVT-1'},
            'eventName': {'S': 'Registration Test'},
            'capacity': {'N': '2'},
            'registeredCount': {'N': '0'},
            'status': {'S': 'Available'}
        }
    )
    
    event = {
        'body': json.dumps({
            'eventId': 'EVT-1',
            'name': 'Test User',
            'email': 'test@example.com'
        })
    }
    
    response = handler(event, None)
    assert response['statusCode'] == 201
    
    regs = dynamodb.scan(TableName='registrations')['Items']
    assert len(regs) == 3

def test_register_overbooking(setup_tables, dynamodb):
    dynamodb.put_item(
        TableName='events',
        Item={
            'eventId': {'S': 'EVT-1'},
            'eventName': {'S': 'Overbook Test'},
            'capacity': {'N': '1'},
            'registeredCount': {'N': '1'}
        }
    )
    
    event = {
        'body': json.dumps({
            'eventId': 'EVT-1',
            'name': 'Test User',
            'email': 'test@example.com'
        })
    }
    
    response = handler(event, None)
    assert response['statusCode'] == 409
    body = json.loads(response['body'])
    assert body['error']['code'] == 'EVENT_FULL'

def test_register_duplicate(setup_tables, dynamodb):
    dynamodb.put_item(
        TableName='events',
        Item={
            'eventId': {'S': 'EVT-1'},
            'eventName': {'S': 'Duplicate Test'},
            'capacity': {'N': '5'},
            'registeredCount': {'N': '1'}
        }
    )
    
    dynamodb.put_item(
        TableName='registrations',
        Item={
            'registrationId': {'S': 'LOCK#EVT-1#test@example.com'},
            'itemType': {'S': 'LOCK'}
        }
    )
    
    event = {
        'body': json.dumps({
            'eventId': 'EVT-1',
            'name': 'Test User',
            'email': 'test@example.com'
        })
    }
    
    response = handler(event, None)
    assert response['statusCode'] == 409
    body = json.loads(response['body'])
    assert body['error']['code'] == 'DUPLICATE_REGISTRATION'
