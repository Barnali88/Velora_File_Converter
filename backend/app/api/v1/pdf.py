import os
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.job import JobResponse
from app.services.storage_service import StorageService
from app.services.validation_service import ValidationService
from app.services.pdf_service import PdfService
from app.services.job_service import JobService

router = APIRouter(prefix="/pdf", tags=["PDF"])


@router.post("/merge", response_model=JobResponse)
async def merge_pdfs(
    files: list[UploadFile] = File(...),
    db: Session = Depends(get_db),
):
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="At least 2 PDF files are required.")

    input_paths = []
    total_size = 0
    job = None
    try:
        original_names = []
        for file in files:
            ValidationService.validate_pdf(file)
            path, size = await StorageService.save_upload(file)
            input_paths.append(path)
            total_size += size
            original_names.append(file.filename or "document.pdf")

        job = JobService.create_job(
            db, 4, ", ".join(original_names), "application/pdf", total_size
        )
        output_path, output_mime, output_size = PdfService.merge_pdfs(input_paths)
        return JobService.complete_job(db, job, os.path.basename(output_path), output_mime, output_size)
    except Exception as e:
        if job:
            JobService.fail_job(db, job, str(e))
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/split", response_model=JobResponse)
async def split_pdf(
    file: UploadFile = File(...),
    start_page: int = Form(...),
    end_page: int = Form(...),
    db: Session = Depends(get_db),
):
    ValidationService.validate_pdf(file)
    job = None
    try:
        input_path, size = await StorageService.save_upload(file)
        job = JobService.create_job(db, 5, file.filename or "document.pdf", "application/pdf", size)
        output_path, output_mime, output_size = PdfService.split_pdf(input_path, start_page, end_page)
        return JobService.complete_job(db, job, os.path.basename(output_path), output_mime, output_size)
    except Exception as e:
        if job:
            JobService.fail_job(db, job, str(e))
        raise HTTPException(status_code=500, detail=str(e))
