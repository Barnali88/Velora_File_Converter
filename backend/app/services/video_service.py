import os

from app.core.config import settings
from app.utils.ffmpeg import run_ffmpeg


class VideoService:
    @staticmethod
    def convert_video(input_path: str, target_format: str) -> tuple[str, str, int]:
        target_format = target_format.lower()

        allowed_formats = {"mp4", "avi", "mkv", "mov", "webm"}
        if target_format not in allowed_formats:
            raise ValueError("Unsupported target video format.")

        base_name = os.path.splitext(os.path.basename(input_path))[0]
        output_name = f"{base_name}_converted.{target_format}"
        output_path = os.path.join(settings.output_dir, output_name)

        codec_map = {
            "mp4": [
                "-c:v", "libx264",
                "-crf", "18",
                "-preset", "medium",
                "-c:a", "aac",
                "-b:a", "320k",
                "-ar", "48000",
            ],
            "avi": [
                "-c:v", "mpeg4",
                "-q:v", "2",
                "-c:a", "mp3",
                "-b:a", "320k",
                "-ar", "48000",
            ],
            "mkv": [
                "-c:v", "libx264",
                "-crf", "18",
                "-preset", "medium",
                "-c:a", "aac",
                "-b:a", "320k",
                "-ar", "48000",
            ],
            "mov": [
                "-c:v", "libx264",
                "-crf", "18",
                "-preset", "medium",
                "-c:a", "aac",
                "-b:a", "320k",
                "-ar", "48000",
            ],
            "webm": [
                "-c:v", "libvpx-vp9",
                "-crf", "30",
                "-b:v", "0",
                "-c:a", "libopus",
                "-b:a", "192k",
                "-ar", "48000",
            ],
        }

        command = [
            "ffmpeg", "-y",
            "-i", input_path,
            *codec_map[target_format],
            output_path,
        ]
        run_ffmpeg(command)

        mime_map = {
            "mp4": "video/mp4",
            "avi": "video/x-msvideo",
            "mkv": "video/x-matroska",
            "mov": "video/quicktime",
            "webm": "video/webm",
        }

        return output_path, mime_map[target_format], os.path.getsize(output_path)

    @staticmethod
    def video_to_gif(input_path: str) -> tuple[str, str, int]:
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        output_name = f"{base_name}.gif"
        output_path = os.path.join(settings.output_dir, output_name)

        command = [
            "ffmpeg", "-y",
            "-i", input_path,
            "-vf", "fps=12,scale=720:-1:flags=lanczos",
            output_path,
        ]
        run_ffmpeg(command)
        return output_path, "image/gif", os.path.getsize(output_path)

    @staticmethod
    def extract_audio_as_mp3(input_path: str) -> tuple[str, str, int]:
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        output_name = f"{base_name}.mp3"
        output_path = os.path.join(settings.output_dir, output_name)

        command = [
            "ffmpeg", "-y",
            "-i", input_path,
            "-vn",
            "-acodec", "libmp3lame",
            output_path,
        ]
        run_ffmpeg(command)
        return output_path, "audio/mpeg", os.path.getsize(output_path)

    @staticmethod
    def compress_video(input_path: str, level: str = "medium") -> tuple[str, str, int]:
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        output_name = f"{base_name}_compressed.mp4"
        output_path = os.path.join(settings.output_dir, output_name)

        crf_map = {
            "light": "23",
            "medium": "28",
            "strong": "32",
        }
        crf = crf_map.get(level.lower(), "28")

        command = [
            "ffmpeg", "-y",
            "-i", input_path,
            "-vcodec", "libx264",
            "-crf", crf,
            "-preset", "medium",
            "-acodec", "aac",
            "-b:a", "128k",
            output_path,
        ]
        run_ffmpeg(command)
        return output_path, "video/mp4", os.path.getsize(output_path)