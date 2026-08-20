import os
from PIL import Image
import io
from rembg import remove


from app.core.config import settings


class ImageService:
    @staticmethod
    def _base_output_name(input_path: str, suffix: str, extension: str) -> str:
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        return f"{base_name}_{suffix}.{extension}"

    @staticmethod
    def convert_image(input_path: str, target_format: str) -> tuple[str, str, int]:
        target_format = target_format.lower().replace("jpeg", "jpg")
        output_name = ImageService._base_output_name(input_path, "converted", target_format)
        output_path = os.path.join(settings.output_dir, output_name)

        image = Image.open(input_path)
        if target_format in {"jpg", "jpeg"}:
            if image.mode in ("RGBA", "P"):
                image = image.convert("RGB")
            image.save(output_path, "JPEG", quality=92)
            mime = "image/jpeg"
        elif target_format == "png":
            image.save(output_path, "PNG")
            mime = "image/png"
        elif target_format == "webp":
            image.save(output_path, "WEBP", quality=92)
            mime = "image/webp"
        else:
            raise ValueError("Unsupported target image format.")

        size = os.path.getsize(output_path)
        return output_path, mime, size

    @staticmethod
    def resize_image(input_path: str, width: int, height: int) -> tuple[str, str, int]:
        ext = os.path.splitext(input_path)[1].lower().replace(".", "") or "png"
        ext = "jpg" if ext == "jpeg" else ext
        output_name = ImageService._base_output_name(input_path, f"{width}x{height}", ext)
        output_path = os.path.join(settings.output_dir, output_name)

        image = Image.open(input_path)
        resized = image.resize((width, height))
        save_format = "JPEG" if ext == "jpg" else ext.upper()
        if save_format == "JPEG" and resized.mode in ("RGBA", "P"):
            resized = resized.convert("RGB")
        resized.save(output_path, save_format)
        mime = f"image/{'jpeg' if ext == 'jpg' else ext}"
        return output_path, mime, os.path.getsize(output_path)

    @staticmethod
    def compress_image(input_path: str, quality: int) -> tuple[str, str, int]:
        ext = os.path.splitext(input_path)[1].lower().replace(".", "") or "jpg"
        ext = "jpg" if ext == "jpeg" else ext
        output_name = ImageService._base_output_name(input_path, f"q{quality}", ext)
        output_path = os.path.join(settings.output_dir, output_name)

        image = Image.open(input_path)
        save_format = "JPEG" if ext == "jpg" else ext.upper()
        if save_format == "JPEG" and image.mode in ("RGBA", "P"):
            image = image.convert("RGB")

        kwargs = {"optimize": True}
        if save_format in {"JPEG", "WEBP"}:
            kwargs["quality"] = quality
        image.save(output_path, save_format, **kwargs)
        mime = f"image/{'jpeg' if ext == 'jpg' else ext}"
        return output_path, mime, os.path.getsize(output_path)

    @staticmethod
    def remove_background(input_path: str) -> tuple[str, str, int]:
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        output_name = f"{base_name}_no_bg.png"
        output_path = os.path.join(settings.output_dir, output_name)

        with open(input_path, "rb") as f:
            input_bytes = f.read()

        output_bytes = remove(input_bytes)

        with open(output_path, "wb") as f:
            f.write(output_bytes)

        size = os.path.getsize(output_path)
        return output_path, "image/png", size
