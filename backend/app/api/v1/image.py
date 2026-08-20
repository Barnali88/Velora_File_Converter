import os
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.job import JobResponse
from app.services.storage_service import StorageService
from app.services.validation_service import ValidationService
from app.services.image_service import ImageService
from app.services.job_service import JobService

router = APIRouter(prefix="/image", tags=["Image"])


@router.post("/convert", response_model=JobResponse)
async def convert_image(
    file: UploadFile = File(...),
    target_format: str = Form(...),
    db: Session = Depends(get_db),
):
    ValidationService.validate_image(file)
    input_path = None
    job = None
    try:
        input_path, size = await StorageService.save_upload(file)
        job = JobService.create_job(
            db=db,
            tool_id=1,
            original_filename=file.filename or "image",
            input_mime_type=file.content_type or "application/octet-stream",
            file_size_bytes=size,
        )
        output_path, output_mime, output_size = ImageService.convert_image(input_path, target_format)
        return JobService.complete_job(db, job, os.path.basename(output_path), output_mime, output_size)
    except Exception as e:
        if job:
            JobService.fail_job(db, job, str(e))
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/resize", response_model=JobResponse)
async def resize_image(
    file: UploadFile = File(...),
    width: int = Form(...),
    height: int = Form(...),
    db: Session = Depends(get_db),
):
    ValidationService.validate_image(file)
    job = None
    try:
        input_path, size = await StorageService.save_upload(file)
        job = JobService.create_job(db, 2, file.filename or "image", file.content_type or "application/octet-stream", size)
        output_path, output_mime, output_size = ImageService.resize_image(input_path, width, height)
        return JobService.complete_job(db, job, os.path.basename(output_path), output_mime, output_size)
    except Exception as e:
        if job:
            JobService.fail_job(db, job, str(e))
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/compress", response_model=JobResponse)
async def compress_image(
    file: UploadFile = File(...),
    quality: int = Form(...),
    db: Session = Depends(get_db),
):
    ValidationService.validate_image(file)
    job = None
    try:
        input_path, size = await StorageService.save_upload(file)
        job = JobService.create_job(db, 3, file.filename or "image", file.content_type or "application/octet-stream", size)
        output_path, output_mime, output_size = ImageService.compress_image(input_path, quality)
        return JobService.complete_job(db, job, os.path.basename(output_path), output_mime, output_size)
    except Exception as e:
        if job:
            JobService.fail_job(db, job, str(e))
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/remove-background", response_model=JobResponse)
async def remove_background(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    ValidationService.validate_image(file)

    try:
        input_path, size = await StorageService.save_upload(file)

        job = JobService.create_job(
            db=db,
            tool_id=11,
            original_filename=file.filename or "image",
            input_mime_type=file.content_type or "application/octet-stream",
            file_size_bytes=size,
        )

        output_path, output_mime, output_size = ImageService.remove_background(input_path)
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
