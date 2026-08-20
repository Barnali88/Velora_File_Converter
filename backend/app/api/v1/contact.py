from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.contact import (
    ContactMessageCreate,
    ContactMessageResponse,
    ContactSubmitResponse,
)
from app.services.contact_service import ContactService

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post("/send", response_model=ContactSubmitResponse)
def send_contact_message(payload: ContactMessageCreate, db: Session = Depends(get_db)):
    ContactService.create_message(db, payload)
    return {
        "success": True,
        "message": "Your message has been sent successfully.",
    }


@router.get("/recent", response_model=list[ContactMessageResponse])
def recent_contact_messages(limit: int = 20, db: Session = Depends(get_db)):
    limit = max(1, min(limit, 100))
    return ContactService.recent_messages(db, limit=limit)