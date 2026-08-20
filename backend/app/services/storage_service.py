import os
import uuid
import aiofiles
from fastapi import UploadFile

from app.core.config import settings


class StorageService:
    @staticmethod
    def ensure_dirs() -> None:
        os.makedirs(settings.media_root, exist_ok=True)
        os.makedirs(settings.upload_dir, exist_ok=True)
        os.makedirs(settings.output_dir, exist_ok=True)

    @staticmethod
    def generate_filename(original_name: str) -> str:
        ext = os.path.splitext(original_name)[1].lower()
        return f"{uuid.uuid4().hex}{ext}"

    @staticmethod
    async def save_upload(file: UploadFile) -> tuple[str, int]:
        StorageService.ensure_dirs()
        stored_name = StorageService.generate_filename(file.filename or "file")
        path = os.path.join(settings.upload_dir, stored_name)

        size = 0
        async with aiofiles.open(path, "wb") as out:
            while chunk := await file.read(1024 * 1024):
                size += len(chunk)
                await out.write(chunk)

        await file.close()
        return path, size