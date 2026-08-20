from pydantic import BaseModel, Field


class ImageResizeRequest(BaseModel):
    width: int = Field(gt=0, le=8000)
    height: int = Field(gt=0, le=8000)


class ImageCompressRequest(BaseModel):
    quality: int = Field(ge=20, le=95)
