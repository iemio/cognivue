

from fastapi import APIRouter
from app.schemas.vuespace_schema import WorkflowSaveRequest
from app.config.pusher import pusher_client

router = APIRouter(prefix="/workflow", tags=["Workflow"])

# In-memory store (optional: replace with DB)
flow_store = {}
docs_store = {}

@router.post("/save")
async def save_workflow(payload: WorkflowSaveRequest):
    flow_store[payload.room_id] = payload.flow.dict()
    print(payload)
    pusher_client.trigger(
        f"workflow_{payload.room_id}",
        "graph-updated",
        {"flow": payload.flow.dict()}
    )

    return {"status": "ok"}

@router.get("/load/{room_id}")
async def load_workflow(room_id: str):
    data = flow_store.get(room_id, {"nodes": [], "edges": [], "viewport": {}})
    #print(data)
    return {"flow":data}