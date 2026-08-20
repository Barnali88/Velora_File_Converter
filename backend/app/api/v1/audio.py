import os

from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.job import JobResponse
from app.services.audio_service import AudioService
from app.services.job_service import JobService
from app.services.storage_service import StorageService
from app.services.validation_service import ValidationService

router = APIRouter(prefix="/audio", tags=["Audio"])


@router.post("/convert", response_model=JobResponse)
async def convert_audio(
    file: UploadFile = File(...),
    target_format: str = Form(...),
    db: Session = Depends(get_db),
):
    ValidationService.validate_audio(file)

    try:
        input_path, size = await StorageService.save_upload(file)

        job = JobService.create_job(
            db=db,
            tool_id=9,
            original_filename=file.filename or "audio",
            input_mime_type=file.content_type or "application/octet-stream",
            file_size_bytes=size,
        )

        output_path, output_mime, output_size = AudioService.convert_audio(input_path, target_format)
        output_name = os.path.basename(output_path)

        return JobService.complete_job(
            db=db,
            job=job,
            output_filename=output_name,
            output_mime_type=output_mime,
            output_size_bytes=output_size,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))