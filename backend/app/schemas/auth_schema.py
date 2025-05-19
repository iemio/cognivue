from pydantic import UUID4, BaseModel, EmailStr

class LoginRequest(BaseModel):
    username: str
    password: str

class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    id: UUID4
    username: str
    email: EmailStr

    class Config:
        orm_mode = True
