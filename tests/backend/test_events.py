import json
from events.lambda_function import handler

def test_events_handler_empty(setup_tables):
    response = handler({}, None)
    assert response['statusCode'] == 200
    body = json.loads(response['body'])
    assert 'events' in body
    assert len(body['events']) == 0

def test_events_handler_with_data(setup_tables, dynamodb):
    dynamodb.put_item(
        TableName='events',
        Item={
            'eventId': {'S': 'EVT-123'},
            'eventName': {'S': 'Test Event'},
            'capacity': {'N': '10'},
            'registeredCount': {'N': '0'},
            'status': {'S': 'Available'}
        }
    )
    
    response = handler({}, None)
    assert response['statusCode'] == 200
    body = json.loads(response['body'])
    assert len(body['events']) == 1
    assert body['events'][0]['eventId'] == 'EVT-123'
