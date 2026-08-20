from fastapi import APIRouter

from app.api.v1.audio import router as audio_router
from app.api.v1.contact import router as contact_router
from app.api.v1.health import router as health_router
from app.api.v1.image import router as image_router
from app.api.v1.jobs import router as jobs_router
from app.api.v1.pdf import router as pdf_router
from app.api.v1.video import router as video_router

api_router = APIRouter()
api_router.include_router(health_router)
api_router.include_router(image_router)
api_router.include_router(pdf_router)
api_router.include_router(jobs_router)
api_router.include_router(video_router)
api_router.include_router(audio_router)
api_router.include_router(contact_router)