from pydantic import BaseModel


class VideoPlaceholder(BaseModel):
    note: str = "Video tools can be added next with FFmpeg."
