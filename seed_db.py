import boto3
import traceback

dynamodb = boto3.client('dynamodb', region_name='us-east-1')
TABLE_NAME = 'event-registration-backend-EventsTable-1J3Y6M0AZCD1Q'

events = [
    {
        'eventId': {'S': 'tech-summit-2026'},
        'eventName': {'S': 'Africa Tech Summit 2026'},
        'date': {'S': 'Oct 15-17'},
        'location': {'S': 'AICC, Accra'},
        'capacity': {'N': '1000'},
        'registeredCount': {'N': '0'},
        'status': {'S': 'Available'}
    },
    {
        'eventId': {'S': 'sunset-music-festival'},
        'eventName': {'S': 'Afrochella Music Festival'},
        'date': {'S': 'Dec 28'},
        'location': {'S': 'Independence Square, Accra'},
        'capacity': {'N': '5000'},
        'registeredCount': {'N': '0'},
        'status': {'S': 'Available'}
    },
    {
        'eventId': {'S': 'contemporary-art-gala'},
        'eventName': {'S': 'Contemporary African Art Gala'},
        'date': {'S': 'Dec 10'},
        'location': {'S': 'National Museum of Ghana, Accra'},
        'capacity': {'N': '300'},
        'registeredCount': {'N': '0'},
        'status': {'S': 'Available'}
    },
    {
        'eventId': {'S': 'design-thinking-workshop'},
        'eventName': {'S': 'Design Thinking Workshop'},
        'date': {'S': 'Oct 20'},
        'location': {'S': 'Kumasi, Ashanti Region'},
        'capacity': {'N': '100'},
        'registeredCount': {'N': '0'},
        'status': {'S': 'Available'}
    },
    {
        'eventId': {'S': 'weekend-makers-market'},
        'eventName': {'S': 'Weekend Artisans Market'},
        'date': {'S': 'Oct 25'},
        'location': {'S': 'Tamale, Northern Region'},
        'capacity': {'N': '2000'},
        'registeredCount': {'N': '0'},
        'status': {'S': 'Available'}
    },
    {
        'eventId': {'S': 'ghanaian-cuisine-masterclass'},
        'eventName': {'S': 'Masterclass: Ghanaian Cuisine'},
        'date': {'S': 'Nov 5'},
        'location': {'S': 'Cape Coast, Central Region'},
        'capacity': {'N': '50'},
        'registeredCount': {'N': '0'},
        'status': {'S': 'Available'}
    }
]

for event in events:
    try:
        dynamodb.put_item(TableName=TABLE_NAME, Item=event)
        print(f"Inserted {event['eventId']['S']}")
    except Exception as e:
        print(f"Error inserting {event['eventId']['S']}: {e}")
        traceback.print_exc()
