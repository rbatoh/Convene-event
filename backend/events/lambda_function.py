from db_client import events_table
from api_responses import success_response, error_response
from logging_utils import get_logger

logger = get_logger("EventsFunction")

def handler(event, context):
    try:
        response = events_table.scan()
        events = response.get('Items', [])
        
        formatted_events = []
        for e in events:
            capacity = int(e.get('capacity', 0))
            registered_count = int(e.get('registeredCount', 0))
            
            status = e.get('status', 'Available')
            if status != 'Cancelled':
                status = 'Available' if registered_count < capacity else 'Full'
                
            formatted_events.append({
                "eventId": e.get('eventId'),
                "eventName": e.get('eventName'),
                "date": e.get('date'),
                "location": e.get('location'),
                "capacity": capacity,
                "registeredCount": registered_count,
                "status": status
            })
            
        return success_response({"events": formatted_events})
    except Exception as e:
        logger.error(f"Error listing events: {e}")
        return error_response("INTERNAL_ERROR", "Internal server error.", 500)
