from __future__ import annotations

from datetime import datetime, timezone
from typing import Any
from uuid import uuid4

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


app = FastAPI(
    title="VectorForge Mock API",
    version="0.1.0",
    description="Mock backend for the AI Strategy & Use-Case Intelligence Platform.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProblemIntakeRequest(BaseModel):
    problem_statement: str = Field(..., min_length=10)
    kpis: list[str] = Field(default_factory=list)
    domain: str | None = None
    timeline: str | None = None


class ExaRunRequest(BaseModel):
    query: str = Field(..., min_length=10)
    effort: str = "medium"
    input_data: list[dict[str, Any]] = Field(default_factory=list)
    output_schema: dict[str, Any] | None = None
    previous_run_id: str | None = None


class DatasetConfirmRequest(BaseModel):
    target_column: str = "churned"
    apply_quality_fixes: bool = False


class BillingApprovalRequest(BaseModel):
    approval_id: str = "billing_demo"
    approved_by: str = "demo-user"


EFFORTS = [
    {"value": "low", "label": "Quick Draft", "cost": "~$0.025", "description": "Prototype, small datasets"},
    {"value": "medium", "label": "Standard", "cost": "~$0.10", "description": "Most production use cases"},
    {"value": "high", "label": "Deep Research", "cost": "~$0.50", "description": "Large, richly enriched"},
    {"value": "xhigh", "label": "Exhaustive", "cost": "~$1.00", "description": "Enterprise-grade research"},
]

DATA_SOURCE_PATHS = [
    {
        "id": "upload",
        "title": "Upload my data",
        "bestFor": "You already have labelled data",
        "input": "CSV, Excel, PDF, DOCX, or DB connection",
        "time": "~30 sec validation",
        "cost": "No credits used",
        "output": "Validated typed schema",
    },
    {
        "id": "exa",
        "title": "Build dataset from web",
        "bestFor": "You have no training data",
        "input": "Natural language query",
        "time": "1-6 min build",
        "cost": "From $0.025 / run",
        "output": "Schema-validated JSON with provenance",
    },
    {
        "id": "hybrid",
        "title": "Enrich my data",
        "bestFor": "You have seed rows and need web-sourced columns",
        "input": "Seed CSV plus web enrichment",
        "time": "2-8 min build",
        "cost": "From $0.10 / run",
        "output": "Merged enriched dataset",
    },
]

SCHEMA_COLUMNS = [
    {"name": "company", "type": "string", "nullPct": 0, "sample": "Northwind SaaS", "source": "exa"},
    {"name": "arr_usd", "type": "number", "nullPct": 2, "sample": "4,200,000", "source": "exa"},
    {"name": "employee_count", "type": "integer", "nullPct": 0, "sample": "180", "source": "exa"},
    {"name": "nps_score", "type": "number", "nullPct": 8, "sample": "41", "source": "enriched"},
    {"name": "support_tickets", "type": "integer", "nullPct": 4, "sample": "312", "source": "enriched"},
    {"name": "churned", "type": "boolean", "nullPct": 0, "sample": "false", "source": "exa"},
]

PREVIEW_ROWS = [
    {"company": "Northwind SaaS", "arr": "4.2M", "emp": 180, "nps": 41, "tickets": 312, "churned": False},
    {"company": "Lumen Analytics", "arr": "1.1M", "emp": 64, "nps": 28, "tickets": 540, "churned": True},
    {"company": "Cedar Cloud", "arr": "8.9M", "emp": 420, "nps": 53, "tickets": 211, "churned": False},
    {"company": "Pivot Metrics", "arr": "2.4M", "emp": 96, "nps": 19, "tickets": 690, "churned": True},
    {"company": "Atlas Stack", "arr": "6.0M", "emp": 250, "nps": 47, "tickets": 180, "churned": False},
]

DEMO_WORKSPACE: dict[str, Any] = {
    "workspace": {"id": "ws_demo", "name": "Acme Corp", "plan": "Enterprise plan"},
    "problem": {
        "statement": "We're losing enterprise customers and can't predict who's about to churn.",
        "kpis": ["Reduce logo churn by 15% over two quarters", "Flag at-risk accounts 90 days before renewal"],
        "intent": "classification",
        "taskType": "Classification",
    },
    "strategy": {
        "summary": "I recommend a churn prediction model as the primary use case, supported by expansion propensity and support deflection RAG.",
        "metrics": [
            {"label": "Use cases mapped", "value": "3", "tone": "primary"},
            {"label": "Projected 12-mo ROI", "value": "$1.4M", "tone": "success", "hint": "Blended estimate"},
            {"label": "Feasibility", "value": "High", "tone": "success", "hint": "Data available"},
        ],
        "useCases": [
            {"name": "Churn Prediction", "type": "Classification", "confidence": "High", "roi": "+$1.2M ARR retained"},
            {"name": "Expansion Propensity", "type": "Regression", "confidence": "Medium", "roi": "+18% upsell rate"},
            {"name": "Support Deflection RAG", "type": "Retrieval", "confidence": "High", "roi": "-32% ticket volume"},
        ],
    },
    "dataSources": DATA_SOURCE_PATHS,
    "exaRun": {
        "id": "exa_run_demo",
        "datasetId": "saas_churn_v2",
        "query": "Build a labelled churn dataset for B2B SaaS companies, 50-500 employees, with ARR, NPS, support ticket volume, and churn label.",
        "efforts": EFFORTS,
        "selectedEffort": "medium",
        "status": "complete",
        "stages": ["Queued", "Running", "Enriching rows", "Validating schema", "Complete"],
        "activeStage": 4,
        "stats": {"rows": "180", "features": "12", "qualityScore": "92", "runCost": "$0.10"},
        "previewRows": PREVIEW_ROWS,
        "provenance": [
            {"field": "arr_usd", "src": "crunchbase.com/northwind-saas"},
            {"field": "nps_score", "src": "g2.com/products/northwind/reviews"},
            {"field": "support_tickets", "src": "trustpilot.com/review/northwind"},
        ],
    },
    "dataset": {
        "id": "saas_churn_v2",
        "name": "saas_churn_v2",
        "rowCount": 180,
        "columnCount": 6,
        "taskType": "Classification",
        "qualityScore": 92,
        "targetColumn": "churned",
        "columns": SCHEMA_COLUMNS,
        "issues": [
            {"field": "nps_score", "message": "8% nulls. The agent can impute with the median or drop affected rows."}
        ],
    },
    "training": {
        "id": "train_demo",
        "status": "complete",
        "metrics": {"bestRocAuc": "0.921", "modelsTrained": "11", "trainTime": "6m 24s", "computeCost": "$0.64"},
        "leaderboard": [
            {"rank": 1, "model": "WeightedEnsemble_L2", "metric": 0.921, "inferTime": "12ms", "best": True},
            {"rank": 2, "model": "LightGBM_BAG_L1", "metric": 0.908, "inferTime": "4ms"},
            {"rank": 3, "model": "CatBoost_BAG_L1", "metric": 0.903, "inferTime": "6ms"},
            {"rank": 4, "model": "XGBoost_BAG_L1", "metric": 0.897, "inferTime": "5ms"},
            {"rank": 5, "model": "RandomForest_BAG_L1", "metric": 0.882, "inferTime": "9ms"},
        ],
        "featureImportance": [
            {"f": "nps_score", "w": 0.34},
            {"f": "support_tickets", "w": 0.27},
            {"f": "arr_usd", "w": 0.19},
            {"f": "employee_count", "w": 0.12},
        ],
    },
    "rag": {
        "id": "rag_demo",
        "status": "complete",
        "metrics": {"faithfulness": "0.94", "contextRecall": "0.89", "trialsRun": "24", "p95Latency": "640ms"},
        "pipeline": [
            {"stage": "Parse", "detail": "PDF + web corpus", "value": "1,204 docs"},
            {"stage": "Chunk", "detail": "Semantic, 512 tokens", "value": "8,930 chunks"},
            {"stage": "QA Gen", "detail": "Synthetic eval set", "value": "320 pairs"},
            {"stage": "Optimize", "detail": "Trial sweep", "value": "24 configs"},
        ],
        "bestConfig": [
            {"k": "Retriever", "v": "hybrid (BM25 + dense)"},
            {"k": "Embedding", "v": "text-embedding-3-large"},
            {"k": "Reranker", "v": "cohere-rerank-v3"},
            {"k": "Top-k", "v": "6"},
            {"k": "Chunk size", "v": "512 / 64 overlap"},
        ],
    },
    "activity": [
        {"id": "a7", "agent": "Billing Agent", "message": "Awaiting Stripe charge approval - $1.94", "time": "now", "status": "waiting-approval", "tool": "Stripe API", "cost": "$1.94", "detail": "Pay-per-use overage on Pro plan."},
        {"id": "a6", "agent": "RAG Agent", "message": "Completed 24 pipeline trials", "time": "2m ago", "status": "complete", "tool": "AutoRAG", "detail": "Best config: hybrid retriever + cohere rerank."},
        {"id": "a5", "agent": "Training Agent", "message": "AutoGluon job finished - ROC-AUC 0.921", "time": "8m ago", "status": "complete", "tool": "SageMaker", "cost": "$0.64"},
        {"id": "a4", "agent": "Data Agent", "message": "Dataset schema confirmed by approver", "time": "12m ago", "status": "complete", "tool": "S3"},
        {"id": "a3", "agent": "Data Agent", "message": "Exa run completed - 180 rows validated", "time": "15m ago", "status": "complete", "tool": "Exa Agent API", "cost": "$0.10", "detail": "Grounding citations stored for 6 fields."},
    ],
}


def make_exa_run(payload: dict[str, Any]) -> dict[str, Any]:
    run = dict(DEMO_WORKSPACE["exaRun"])
    run["id"] = f"exa_run_{uuid4().hex[:8]}"
    run["query"] = payload.get("query") or run["query"]
    run["selectedEffort"] = payload.get("effort") or run["selectedEffort"]
    run["status"] = "complete"
    return run


@app.get("/health")
def health() -> dict[str, Any]:
    return {"status": "ok", "service": "vector-forge-mock-api", "time": datetime.now(timezone.utc).isoformat()}


@app.get("/api/demo-workspace")
def demo_workspace() -> dict[str, Any]:
    return DEMO_WORKSPACE


@app.post("/api/problem-intake")
def problem_intake(payload: ProblemIntakeRequest) -> dict[str, Any]:
    return {
        "intent": "classification",
        "clarifyingQuestions": [
            "Which customer segment should the model prioritize?",
            "How far before renewal should the churn signal fire?",
            "Which intervention KPI should define success?",
        ],
        "next": "strategy",
        "received": payload.model_dump(),
    }


@app.get("/api/strategy")
def strategy() -> dict[str, Any]:
    return DEMO_WORKSPACE["strategy"]


@app.get("/api/data-sources")
def data_sources() -> list[dict[str, Any]]:
    return DATA_SOURCE_PATHS


@app.post("/api/exa/runs", status_code=201)
def create_exa_run(payload: ExaRunRequest) -> dict[str, Any]:
    return make_exa_run(payload.model_dump())


@app.get("/api/exa/runs/{run_id}")
def exa_run(run_id: str) -> dict[str, Any]:
    return {**DEMO_WORKSPACE["exaRun"], "id": run_id}


@app.get("/api/datasets/{dataset_id}/schema")
def dataset_schema(dataset_id: str) -> dict[str, Any]:
    return {**DEMO_WORKSPACE["dataset"], "id": dataset_id}


@app.post("/api/datasets/{dataset_id}/confirm")
def confirm_dataset(dataset_id: str, payload: DatasetConfirmRequest) -> dict[str, Any]:
    return {
        "datasetId": dataset_id,
        "targetColumn": payload.target_column,
        "applyQualityFixes": payload.apply_quality_fixes,
        "status": "confirmed",
        "next": "training",
    }


@app.post("/api/training/runs", status_code=201)
def create_training_run() -> dict[str, Any]:
    return DEMO_WORKSPACE["training"]


@app.get("/api/training/runs/{run_id}")
def training_run(run_id: str) -> dict[str, Any]:
    return {**DEMO_WORKSPACE["training"], "id": run_id}


@app.get("/api/rag/runs/{run_id}")
def rag_run(run_id: str) -> dict[str, Any]:
    return {**DEMO_WORKSPACE["rag"], "id": run_id}


@app.post("/api/deployments", status_code=201)
def create_deployment() -> dict[str, Any]:
    return {
        "id": f"dep_{uuid4().hex[:8]}",
        "status": "deployed",
        "modelApiUrl": "https://api.vectorforge.demo/acme/churn/v1",
        "ragApiUrl": "https://api.vectorforge.demo/acme/rag/v1",
    }


@app.post("/api/billing/approve")
def approve_billing(payload: BillingApprovalRequest) -> dict[str, Any]:
    return {
        "approvalId": payload.approval_id,
        "approvedBy": payload.approved_by,
        "status": "approved",
        "amount": "$1.94",
    }


@app.get("/api/activity")
def activity() -> list[dict[str, Any]]:
    return DEMO_WORKSPACE["activity"]
