# app/main.py
from app.routes import workflow_routes
from fastapi import FastAPI
from app.routes import auth_routes, user_routes
from app.database.config import engine, Base
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Database connected and tables created!")

    yield  # Continue with application

    # Optional: Cleanup operations can go here
    print("Application shutdown. Cleanup complete.")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your Next.js URL in prod!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_routes.router)
app.include_router(auth_routes.router)
app.include_router(workflow_routes.router)

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the FastAPI Application!"}
