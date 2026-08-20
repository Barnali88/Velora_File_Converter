import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.job import JobResponse
from app.services.job_service import JobService
from app.core.config import settings

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.get("/recent", response_model=list[JobResponse])
def recent_jobs(limit: int = 20, db: Session = Depends(get_db)):
    limit = max(1, min(limit, 100))
    return JobService.recent_jobs(db, limit=limit)


@router.get("/{job_id}", response_model=JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = JobService.get_job(db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found.")
    return job


@router.get("/{job_id}/download")
def download_job_output(job_id: int, db: Session = Depends(get_db)):
    job = JobService.get_job(db, job_id)
    if not job or not job.output_filename:
        raise HTTPException(status_code=404, detail="Output file not found.")

    path = os.path.join(settings.output_dir, job.output_filename)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Stored file missing.")

    return FileResponse(path=path, filename=job.output_filename, media_type=job.output_mime_type or "application/octet-stream")
