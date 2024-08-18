from pydantic import BaseModel, EmailStr

class ContactCreate(BaseModel):
    username: str
    email: EmailStr
    message: str

class Contact(BaseModel):
    id: int
    username: str
    email: EmailStr
    message: str

    class Config:
        from_attributes = True