from fastapi import  HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.models import User
from app.schemas.auth_schema import RegisterRequest
from app.utils.hashing import hash_password, verify_password
from app.utils.jwt import create_access_token

async def authenticate_user(username: str, password: str, db: AsyncSession):
    query = await db.execute(select(User).where(User.username == username))
    user = query.scalars().first()
    if not user or not verify_password(password, user.hashed_password): # type: ignore
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return create_access_token({"sub": user.username})


async def register_user(user: RegisterRequest, db: AsyncSession):
    db_user = User(username=user.username, email=user.email, hashed_password=hash_password(user.password))
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user
