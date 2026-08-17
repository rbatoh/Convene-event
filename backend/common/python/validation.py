import re


def is_valid_email(email):
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    return re.match(pattern, email) is not None

def normalize_email(email):
    if not email:
        return ""
    return email.strip().lower()
