from sqlalchemy.ext.asyncio import AsyncSession
from app.database.models import User
from app.utils.hashing import hash_password


# async def create_user(user: UserCreate, db: AsyncSession):
#     db_user = User(username=user.username, email=user.email, hashed_password=hash_password(user.password))
#     db.add(db_user)
#     await db.commit()
#     await db.refresh(db_user)
#     return db_user
