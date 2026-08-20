from datetime import datetime
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.conversion_job import ConversionJob


class JobService:
    @staticmethod
    def create_job(db: Session, tool_id: int, original_filename: str, input_mime_type: str, file_size_bytes: int) -> ConversionJob:
        job = ConversionJob(
            tool_id=tool_id,
            status="processing",
            original_filename=original_filename,
            input_mime_type=input_mime_type,
            file_size_bytes=file_size_bytes,
        )
        db.add(job)
        db.commit()
        db.refresh(job)
        return job

    @staticmethod
    def complete_job(db: Session, job: ConversionJob, output_filename: str, output_mime_type: str, output_size_bytes: int) -> ConversionJob:
        job.status = "completed"
        job.output_filename = output_filename
        job.output_mime_type = output_mime_type
        job.output_size_bytes = output_size_bytes
        job.completed_at = datetime.utcnow()
        db.commit()
        db.refresh(job)
        return job

    @staticmethod
    def fail_job(db: Session, job: ConversionJob, error_message: str) -> ConversionJob:
        job.status = "failed"
        job.error_message = error_message
        db.commit()
        db.refresh(job)
        return job

    @staticmethod
    def get_job(db: Session, job_id: int) -> ConversionJob | None:
        return db.get(ConversionJob, job_id)

    @staticmethod
    def recent_jobs(db: Session, limit: int = 20) -> list[ConversionJob]:
        stmt = select(ConversionJob).order_by(ConversionJob.created_at.desc()).limit(limit)
        return list(db.scalars(stmt).all())
