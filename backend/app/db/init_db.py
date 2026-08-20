from sqlalchemy.orm import Session
from app.models.tool import Tool


DEFAULT_TOOLS = [
    {
        "id": 1,
        "slug": "image-convert",
        "name": "Image Convert",
        "category": "image",
        "input_formats": "jpg,jpeg,png,webp",
        "output_formats": "jpg,jpeg,png,webp",
    },
    {
        "id": 2,
        "slug": "image-resize",
        "name": "Image Resize",
        "category": "image",
        "input_formats": "jpg,jpeg,png,webp",
        "output_formats": "jpg,jpeg,png,webp",
    },
    {
        "id": 3,
        "slug": "image-compress",
        "name": "Image Compress",
        "category": "image",
        "input_formats": "jpg,jpeg,png,webp",
        "output_formats": "jpg,jpeg,png,webp",
    },
    {
        "id": 4,
        "slug": "pdf-merge",
        "name": "PDF Merge",
        "category": "pdf",
        "input_formats": "pdf",
        "output_formats": "pdf",
    },
    {
        "id": 5,
        "slug": "pdf-split",
        "name": "PDF Split",
        "category": "pdf",
        "input_formats": "pdf",
        "output_formats": "pdf",
    },
    {
        "id": 6,
        "slug": "video-convert",
        "name": "Video Convert",
        "category": "video",
        "input_formats": "mp4,mov,mkv,avi,webm",
        "output_formats": "mp4,avi,mkv,mov,webm",
    },
    {
        "id": 7,
        "slug": "video-to-gif",
        "name": "Video to GIF",
        "category": "video",
        "input_formats": "mp4,mov,mkv,avi,webm",
        "output_formats": "gif",
    },
    {
        "id": 8,
        "slug": "video-extract-audio",
        "name": "Extract Audio",
        "category": "video",
        "input_formats": "mp4,mov,mkv,avi,webm",
        "output_formats": "mp3",
    },
    {
        "id": 9,
        "slug": "audio-convert",
        "name": "Audio Convert",
        "category": "audio",
        "input_formats": "mp3,wav,m4a,aac,ogg",
        "output_formats": "mp3,wav,ogg,aac,m4a",
    },
    {
        "id": 10,
        "slug": "video-compress",
        "name": "Video Compress",
        "category": "video",
        "input_formats": "mp4,mov,mkv,avi,webm",
        "output_formats": "mp4",
    },
    {
        "id": 11,
        "slug": "image-remove-background",
        "name": "Background Remover",
        "category": "image",
        "input_formats": "jpg,jpeg,png,webp",
        "output_formats": "png",
    },
]


def seed_tools(db: Session) -> None:
    for tool_data in DEFAULT_TOOLS:
        existing = db.query(Tool).filter(Tool.id == tool_data["id"]).first()
        if not existing:
            db.add(Tool(**tool_data))

    db.commit()