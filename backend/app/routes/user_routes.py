from fastapi import APIRouter, Depends
# from app.database.config import get_db
from app.database.config import get_db

from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/users", tags=["Users"])

# @router.post("/", response_model=UserResponse)
# async def register_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
#     return await create_user(user,db)

