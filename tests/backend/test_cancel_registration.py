import json
from cancel_registration.lambda_function import handler

def test_cancel_registration_success(setup_tables, dynamodb):
    dynamodb.put_item(
        TableName='events',
        Item={
            'eventId': {'S': 'EVT-1'},
            'capacity': {'N': '5'},
            'registeredCount': {'N': '1'}
        }
    )
    
    dynamodb.put_item(
        TableName='registrations',
        Item={
            'registrationId': {'S': 'REG-123'},
            'eventId': {'S': 'EVT-1'},
            'email': {'S': 'test@example.com'},
            'status': {'S': 'CONFIRMED'}
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
        'rawPath': '/REG-123'
    }
    
    response = handler(event, None)
    assert response['statusCode'] == 200
    
    evt = dynamodb.get_item(TableName='events', Key={'eventId': {'S': 'EVT-1'}})
    assert evt['Item']['registeredCount']['N'] == '0'
    
    reg = dynamodb.get_item(TableName='registrations', Key={'registrationId': {'S': 'REG-123'}})
    assert reg['Item']['status']['S'] == 'CANCELLED'
