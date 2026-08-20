from datetime import datetime
from pydantic import BaseModel


class JobResponse(BaseModel):
    id: int
    tool_id: int
    status: str
    original_filename: str
    output_filename: str | None = None
    input_mime_type: str
    output_mime_type: str | None = None
    file_size_bytes: int
    output_size_bytes: int | None = None
    error_message: str | None = None
    created_at: datetime
    updated_at: datetime
    completed_at: datetime | None = None

    model_config = {"from_attributes": True}
