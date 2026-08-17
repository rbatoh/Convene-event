import json


def success_response(data, status_code=200):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(data)
    }

def error_response(code, message, status_code=400):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "error": {
                "code": code,
                "message": message
            }
        })
    }
