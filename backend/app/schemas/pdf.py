from pydantic import BaseModel, Field


class PdfSplitRequest(BaseModel):
    start_page: int = Field(gt=0)
    end_page: int = Field(gt=0)
