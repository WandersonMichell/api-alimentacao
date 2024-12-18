from pydantic import BaseModel, Field
from datetime import date, datetime
import datetime
from sqlmodel import SQLModel, Field   

class BaseUser(SQLModel):
  nome: str
  email: str
  
  
class User(BaseUser, table=True):
  id: int = Field(default=None, primary_key=True)
  password: str

class SignUpUserRequest(BaseUser):       
  nome: str
  email: str
  password: str

class SignInUserRequest(SQLModel):
  nome: str
  password: str
  
class UserData(BaseUser):
  pass