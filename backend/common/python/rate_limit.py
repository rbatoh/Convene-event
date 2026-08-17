import time
from datetime import datetime, timezone

from db_client import registrations_table

RATE_LIMIT_THRESHOLD = 10

def check_rate_limit(source_ip):
    # Bucket by IP and current minute
    current_minute = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M")
    rate_key = f"RATE#{source_ip}#{current_minute}"
    
    # TTL for 5 minutes from now
    ttl_value = int(time.time()) + 300
    
    try:
        response = registrations_table.update_item(
            Key={'registrationId': rate_key},
            UpdateExpression="ADD #count :one SET itemType = :type, #ttl = :ttl",
            ExpressionAttributeNames={
                "#count": "requestCount",
                "#ttl": "ttl"
            },
            ExpressionAttributeValues={
                ":one": 1,
                ":type": "RATE_LIMIT",
                ":ttl": ttl_value
            },
            ReturnValues="UPDATED_NEW"
        )
        current_count = response['Attributes']['requestCount']
        return current_count <= RATE_LIMIT_THRESHOLD
    except Exception as e:  # noqa: BLE001
        # Fail open for simplicity
        print(f"Rate limit error: {e}")
        return True
