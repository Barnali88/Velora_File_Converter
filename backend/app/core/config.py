from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Velora API"
    app_env: str = "development"
    app_debug: bool = True
    api_v1_prefix: str = "/api/v1"

    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/velora"
    frontend_origin: str = "http://localhost:5173"

    media_root: str = "app/media"
    upload_dir: str = "app/media/uploads"
    output_dir: str = "app/media/outputs"

    max_image_upload_mb: int = 15
    max_video_upload_mb: int = 200
    max_audio_upload_mb: int = 50
    max_document_upload_mb: int = 25

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


settings = Settings()
