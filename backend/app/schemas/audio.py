from pydantic import BaseModel


class AudioPlaceholder(BaseModel):
    note: str = "Audio tools can be added next with FFmpeg."
