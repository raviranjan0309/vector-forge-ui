# VectorForge Mock Backend

Python mock API for the AI Strategy & Use-Case Intelligence Platform demo flow.

## Setup with uv

```bash
cd backend
uv venv
uv sync
uv run uvicorn main:app --host 127.0.0.1 --port 8000
```

The frontend reads `NEXT_PUBLIC_API_URL` and falls back to `http://localhost:8000`.

## Add packages

Use `pyproject.toml` as the dependency source of truth.

```bash
uv add fastapi "uvicorn[standard]" "psycopg[binary]"
uv sync
```

## Initialize PostgreSQL schema

Set database credentials in your shell, then run the initializer.

```bash
export DB_HOST="vector-forge-db.cfm20ya44cyx.us-west-2.rds.amazonaws.com"
export DB_PORT="5432"
export DB_NAME="postgres"
export DB_USER="postgres"
export DB_PASSWORD="<password>"
export DB_SSLMODE="require"

uv run python db/init_db.py
```

## Key Endpoints

- `GET /health`
- `GET /api/demo-workspace`
- `GET /api/strategy`
- `GET /api/data-sources`
- `POST /api/exa/runs`
- `GET /api/exa/runs/{run_id}`
- `POST /api/datasets/{dataset_id}/confirm`
- `POST /api/training/runs`
- `POST /api/deployments`
- `POST /api/billing/approve`
