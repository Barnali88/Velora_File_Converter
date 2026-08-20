import os
import traceback

from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.job import JobResponse
from app.services.job_service import JobService
from app.services.storage_service import StorageService
from app.services.validation_service import ValidationService
from app.services.video_service import VideoService

router = APIRouter(prefix="/video", tags=["Video"])


@router.post("/convert", response_model=JobResponse)
async def convert_video(
    file: UploadFile = File(...),
    target_format: str = Form(...),
    db: Session = Depends(get_db),
):
    ValidationService.validate_video(file)

    print("LOADED VIDEO ROUTER FROM:", __file__)
    print("DEBUG target_format:", target_format)

    input_path, size = await StorageService.save_upload(file)
    print("DEBUG save_upload ok:", input_path, size)

    job = JobService.create_job(
        db=db,
        tool_id=6,
        original_filename=file.filename or "video",
        input_mime_type=file.content_type or "application/octet-stream",
        file_size_bytes=size,
    )
    print("DEBUG job created:", job.id)

    result = VideoService.convert_video(input_path, target_format)
    print("DEBUG service raw result:", result)

    output_path, output_mime, output_size = result
    output_name = os.path.basename(output_path)

    return JobService.complete_job(
        db=db,
        job=job,
        output_filename=output_name,
        output_mime_type=output_mime,
        output_size_bytes=output_size,
    )


@router.post("/to-gif", response_model=JobResponse)
async def convert_video_to_gif(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    ValidationService.validate_video(file)

    try:
        input_path, size = await StorageService.save_upload(file)

        job = JobService.create_job(
            db=db,
            tool_id=7,
            original_filename=file.filename or "video",
            input_mime_type=file.content_type or "application/octet-stream",
            file_size_bytes=size,
        )

        output_path, output_mime, output_size = VideoService.video_to_gif(input_path)
        output_name = os.path.basename(output_path)

        return JobService.complete_job(
            db=db,
            job=job,
            output_filename=output_name,
            output_mime_type=output_mime,
            output_size_bytes=output_size,
        )
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/extract-audio", response_model=JobResponse)
async def extract_audio(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    ValidationService.validate_video(file)

    try:
        input_path, size = await StorageService.save_upload(file)

        job = JobService.create_job(
            db=db,
            tool_id=8,
            original_filename=file.filename or "video",
            input_mime_type=file.content_type or "application/octet-stream",
            file_size_bytes=size,
        )

        output_path, output_mime, output_size = VideoService.extract_audio_as_mp3(input_path)
        output_name = os.path.basename(output_path)

        return JobService.complete_job(
            db=db,
            job=job,
            output_filename=output_name,
            output_mime_type=output_mime,
            output_size_bytes=output_size,
        )
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/compress", response_model=JobResponse)
async def compress_video(
    file: UploadFile = File(...),
    level: str = Form("medium"),
    db: Session = Depends(get_db),
):
    ValidationService.validate_video(file)

    try:
        input_path, size = await StorageService.save_upload(file)

        job = JobService.create_job(
            db=db,
            tool_id=10,
            original_filename=file.filename or "video",
            input_mime_type=file.content_type or "application/octet-stream",
            file_size_bytes=size,
        )

        output_path, output_mime, output_size = VideoService.compress_video(input_path, level)
        output_name = os.path.basename(output_path)

        return JobService.complete_job(
            db=db,
            job=job,
            output_filename=output_name,
            output_mime_type=output_mime,
            output_size_bytes=output_size,
        )
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))