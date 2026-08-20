import os
from fastapi import HTTPException, UploadFile, status


class ValidationService:
    IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}
    PDF_EXTS = {".pdf"}
    VIDEO_EXTS = {".mp4", ".mov", ".mkv", ".avi", ".webm"}
    AUDIO_EXTS = {".mp3", ".wav", ".m4a", ".aac", ".ogg"}

    @staticmethod
    def _ext(filename: str) -> str:
        return os.path.splitext(filename)[1].lower()

    @classmethod
    def validate_image(cls, file: UploadFile):
        if cls._ext(file.filename or "") not in cls.IMAGE_EXTS:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported image format.")

    @classmethod
    def validate_pdf(cls, file: UploadFile):
        if cls._ext(file.filename or "") not in cls.PDF_EXTS:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only PDF files are allowed.")

    @classmethod
    def validate_video(cls, file: UploadFile):
        if cls._ext(file.filename or "") not in cls.VIDEO_EXTS:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported video format.")

    @classmethod
    def validate_audio(cls, file: UploadFile):
        if cls._ext(file.filename or "") not in cls.AUDIO_EXTS:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported audio format.")
