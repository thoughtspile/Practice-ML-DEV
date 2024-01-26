"""FastAPI router module."""
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.cors import CORSMiddleware
from . import router, users

app = FastAPI()

app.add_middleware(GZipMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_credentials=True,
)

app.include_router(users.user_router)
app.include_router(router.router, prefix="/api")

app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="static")
