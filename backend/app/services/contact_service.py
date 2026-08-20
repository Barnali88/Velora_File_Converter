from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.contact_message import ContactMessage
from app.schemas.contact import ContactMessageCreate


class ContactService:
    @staticmethod
    def create_message(db: Session, payload: ContactMessageCreate) -> ContactMessage:
        item = ContactMessage(
            name=payload.name.strip(),
            email=payload.email.strip().lower(),
            message=payload.message.strip(),
        )
        db.add(item)
        db.commit()
        db.refresh(item)
        return item

    @staticmethod
    def get_message(db: Session, message_id: int) -> ContactMessage | None:
        return db.get(ContactMessage, message_id)

    @staticmethod
    def recent_messages(db: Session, limit: int = 50) -> list[ContactMessage]:
        stmt = select(ContactMessage).order_by(ContactMessage.created_at.desc()).limit(limit)
        return list(db.scalars(stmt).all())