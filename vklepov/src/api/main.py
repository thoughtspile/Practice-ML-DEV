"""FastAPI router module."""
from fastapi import FastAPI
from fastapi.middleware.wsgi import WSGIMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.cors import CORSMiddleware
from src.ui.app import app as dash_app
from . import router, users

app = FastAPI()

app.add_middleware(GZipMiddleware)
app.add_middleware(CORSMiddleware, allow_origins=["*"])

app.include_router(users.user_router)
app.include_router(router.router, prefix="/api")

app.mount("/", WSGIMiddleware(dash_app.server))
