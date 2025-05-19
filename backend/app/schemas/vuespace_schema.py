# models.py
from pydantic import BaseModel
from typing import List, Optional

class ReactFlowPayload(BaseModel):
    nodes: list
    edges: list
    viewport: Optional[dict] = None

class WorkflowSaveRequest(BaseModel):
    room_id: str
    flow: ReactFlowPayload
