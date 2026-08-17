# Rotate Admin Credentials Runbook

The admin endpoint uses AWS IAM Auth. To rotate the staff principal credentials:
1. Create a new IAM User or Role for the admin.
2. Ensure they have the necessary `execute-api:Invoke` permissions for the specific Function URL.
3. Distribute the credentials securely.
4. Revoke the old IAM credentials.
