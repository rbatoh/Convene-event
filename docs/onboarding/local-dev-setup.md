# Local Development Setup

## Prerequisites
- Node.js & npm (for frontend)
- Python 3.13 (for backend)
- AWS SAM CLI (for infrastructure)
- Docker (optional, if running SAM locally)

## Running the Frontend
```bash
cd frontend
npm install
npm run dev
```

## Running the Backend Tests
We use `pytest` and `moto` to mock AWS services locally.
```bash
pip install -r requirements-dev.txt
pytest tests/backend/
```
