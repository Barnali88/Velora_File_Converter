import os
from pypdf import PdfReader, PdfWriter

from app.core.config import settings


class PdfService:
    @staticmethod
    def merge_pdfs(input_paths: list[str]) -> tuple[str, str, int]:
        writer = PdfWriter()
        for path in input_paths:
            reader = PdfReader(path)
            for page in reader.pages:
                writer.add_page(page)

        output_name = "merged_output.pdf"
        output_path = os.path.join(settings.output_dir, output_name)
        with open(output_path, "wb") as f:
            writer.write(f)
        return output_path, "application/pdf", os.path.getsize(output_path)

    @staticmethod
    def split_pdf(input_path: str, start_page: int, end_page: int) -> tuple[str, str, int]:
        reader = PdfReader(input_path)
        total = len(reader.pages)
        if start_page > end_page or end_page > total:
            raise ValueError(f"Invalid page range. PDF has {total} pages.")

        writer = PdfWriter()
        for i in range(start_page - 1, end_page):
            writer.add_page(reader.pages[i])

        output_name = f"split_{start_page}_{end_page}.pdf"
        output_path = os.path.join(settings.output_dir, output_name)
        with open(output_path, "wb") as f:
            writer.write(f)
        return output_path, "application/pdf", os.path.getsize(output_path)
