import os

from app.core.config import settings
from app.utils.ffmpeg import run_ffmpeg


class AudioService:
    @staticmethod
    def convert_audio(input_path: str, target_format: str) -> tuple[str, str, int]:
        target_format = target_format.lower()
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        output_name = f"{base_name}.{target_format}"
        output_path = os.path.join(settings.output_dir, output_name)

        command = [
            "ffmpeg", "-y",
            "-i", input_path,
            output_path,
        ]
        run_ffmpeg(command)

        mime_map = {
            "mp3": "audio/mpeg",
            "wav": "audio/wav",
            "ogg": "audio/ogg",
            "aac": "audio/aac",
            "m4a": "audio/mp4",
        }

        return output_path, mime_map.get(target_format, "application/octet-stream"), os.path.getsize(output_path)