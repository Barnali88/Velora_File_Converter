# Velora_File_Converter
Velora is a modern file utility web application for image conversion, image resizing, PDF tools, video compression, audio extraction, and file processing.

# Velora

Velora is a modern web-based file utility platform for everyday file conversion and file processing tasks. It provides tools for image conversion, image resizing, image compression, background removal, PDF merging, PDF splitting, video conversion, video compression, video-to-GIF conversion, audio extraction, and audio conversion.

The project focuses on making common file tools feel simple, polished, and easy to use through a clean React interface and a FastAPI backend.

## Tagline

Soft file magic


## Main Features

* Modern responsive user interface
* Light and dark theme support
* Tool search page
* Image conversion between PNG, JPG, and WEBP
* Image resizing for web, profile, and content use
* Image compression with quality control
* Background remover for images
* PDF merge tool
* PDF split tool
* Video conversion between MP4, AVI, MKV, MOV, and WEBM
* Video compression with light, medium, and strong compression levels
* Video to GIF conversion
* Audio extraction from video
* Audio conversion between MP3, WAV, OGG, AAC, and M4A
* Recent conversion jobs dashboard
* Processed file download system
* Contact form
* PostgreSQL database support
* Local media storage for uploaded and processed files
* Alembic-ready database migration structure
* API documentation through FastAPI Swagger UI

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* TanStack React Query
* Axios
* Framer Motion
* Lucide React

### Backend

* Python
* FastAPI
* PostgreSQL
* SQLAlchemy
* Alembic
* FFmpeg
* Local file storage

## Project Purpose

Many online file utility websites feel cluttered, slow, or overloaded with unnecessary elements. Velora was created to provide a cleaner and more polished experience for common file conversion tasks.

The main purpose of Velora is to let users quickly upload a file, choose a tool, process the file, and download the result from a simple web interface.

Velora is useful for:

* Converting image formats
* Resizing images
* Compressing images
* Removing image backgrounds
* Combining PDF files
* Extracting pages from PDFs
* Compressing videos
* Changing video formats
* Creating GIFs from videos
* Extracting audio from videos
* Converting audio files
* Viewing recent conversion jobs

## How It Works

1. The user opens the Velora web application.
2. The user selects a tool from the Tools page.
3. The user uploads one or more files depending on the selected tool.
4. The React frontend sends the file to the FastAPI backend.
5. The backend validates the file type and file size.
6. The correct service processes the uploaded file.
7. The processed output is saved in local media storage.
8. The conversion job is saved in PostgreSQL.
9. The frontend displays the completed result.
10. The user downloads the processed output file.
11. Recent conversions can be reviewed from the Dashboard page.

## Pages

### Home

The Home page introduces Velora with a clean landing section, animated visual design, and quick links to tools and recent conversions.

### Tools

The Tools page shows all available file tools and includes a search option to quickly find a tool.

### Tool Detail

Each tool has a focused page with upload options, conversion settings, result panel, and short usage guidance.

### Dashboard

The Dashboard page shows recent conversion jobs with file names, job status, and download links.

### About

The About page explains Velora as a calm and polished file conversion platform.

### Contact

The Contact page allows users to send feedback, questions, or support messages.

## Available Tools

### Image Tools

* Image Convert
* Image Resize
* Image Compress
* Background Remover

### PDF Tools

* PDF Merge
* PDF Split

### Video Tools

* Video Convert
* Video Compress
* Video to GIF
* Extract Audio

### Audio Tools

* Audio Convert

## API Features

The FastAPI backend supports:

* Health route
* Image conversion
* Image resizing
* Image compression
* Image background removal
* PDF merging
* PDF splitting
* Video conversion
* Video compression
* Video to GIF conversion
* Audio extraction from video
* Audio conversion
* Recent jobs
* File download route
* Contact message route
* PostgreSQL models
* Local media storage

## Project Structure

```text
velora/
│
├── velora_backend/
│   │
│   ├── alembic/
│   │   ├── versions/
│   │   └── env.py
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── __init__.py
│   │   │       ├── deps.py
│   │   │       └── router.py
│   │   │
│   │   ├── core/
│   │   ├── db/
│   │   ├── media/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── __init__.py
│   │   └── main.py
│   │
│   ├── .env.example
│   ├── alembic.ini
│   ├── README.md
│   └── requirements.txt
│
├── velora_frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── components/
│   │   ├── config/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   │
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── screenshots/
    ├── home.png
    ├── tools.png
    ├── tool-detail.png
    ├── dashboard.png
    └── contact.png
```

## Requirements

* Python 3.12
* PostgreSQL
* Node.js
* npm
* FFmpeg
* PyCharm or VS Code

## Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE velora;
```

## Backend Environment Variables

Create a `.env` file inside the backend root.

```env
APP_NAME=Velora API
APP_ENV=development
APP_DEBUG=true
API_V1_PREFIX=/api/v1

DATABASE_URL=postgresql+psycopg://username:password@localhost:5432/velora
FRONTEND_ORIGIN=http://localhost:5174

MEDIA_ROOT=app/media
UPLOAD_DIR=app/media/uploads
OUTPUT_DIR=app/media/outputs

MAX_IMAGE_UPLOAD_MB=15
MAX_VIDEO_UPLOAD_MB=200
MAX_AUDIO_UPLOAD_MB=50
MAX_DOCUMENT_UPLOAD_MB=25
```

## Backend Installation

Open the backend folder in terminal.

```bash
cd velora_backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

Install backend packages:

```bash
pip install -r requirements.txt
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

## Frontend Installation

Open the frontend folder in terminal.

```bash
cd velora_frontend
```

Install frontend packages:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5174
```

## Build Frontend

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Basic Usage

1. Start the PostgreSQL database.
2. Start the FastAPI backend.
3. Start the React frontend.
4. Open the frontend in the browser.
5. Go to the Tools page.
6. Choose a tool.
7. Upload the required file.
8. Select conversion settings.
9. Run the conversion.
10. Download the processed file.
11. Open the Dashboard page to view recent conversions.

## File Storage

Velora stores uploaded and processed files locally during development.

Uploaded files:

```text
app/media/uploads
```

Processed output files:

```text
app/media/outputs
```

## Common Issues

### Backend does not start

Check that the virtual environment is activated and dependencies are installed.

```bash
pip install -r requirements.txt
```

### Database connection error

Check the database name, username, password, and PostgreSQL server status.

### Frontend cannot connect to backend

The frontend API client uses:

```text
http://127.0.0.1:8000/api/v1
```

The backend environment uses:

```text
FRONTEND_ORIGIN=http://localhost:5174
```

### Video or audio tools fail

Check FFmpeg installation:

```bash
ffmpeg -version
```

## Future Improvements

* User accounts and private file history
* Batch file conversion
* Cloud file storage
* Drag-and-drop folder upload
* More image formats
* Advanced video compression options
* File preview before download
* Progress tracking for large uploads
* Docker deployment
* Production hosting
* Admin dashboard for tool usage

## Project Status

Velora is a working file utility web application built for learning, portfolio use, and real-world file conversion support.

## Author

Barnali Debnath
