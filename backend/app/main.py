from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.db.session import SessionLocal, Base, engine
from app.db.base import *
from app.db.init_db import seed_tools

from app.api.router import api_router
from app.core.config import settings
from app.services.storage_service import StorageService


@asynccontextmanager
async def lifespan(app: FastAPI):
    StorageService.ensure_dirs()
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        seed_tools(db)
    finally:
        db.close()

    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan)

allow_origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
    "http://127.0.0.1:5176",
    "http://127.0.0.1:5177",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/media", StaticFiles(directory=settings.media_root), name="media")
app.include_router(api_router, prefix=settings.api_v1_prefix)


@app.get("/")
def root():
    return {"message": "Welcome to Velora API"}