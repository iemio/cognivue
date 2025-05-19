from fastapi import APIRouter, Depends
from app.database.config import get_db
from app.schemas.auth_schema import LoginRequest, TokenResponse, RegisterRequest, UserResponse
from app.controllers.auth_controller import authenticate_user, register_user
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login", response_model=TokenResponse)
async def login(user: LoginRequest,db: AsyncSession = Depends(get_db)):
    token = await authenticate_user(user.username, user.password,db)
    return {"access_token": token, "token_type": "bearer"}

@router.post("/register", response_model=UserResponse)
async def register(user: RegisterRequest, db: AsyncSession = Depends(get_db)):
    return await register_user(user,db)