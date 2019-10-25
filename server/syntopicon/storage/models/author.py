from sqlalchemy import Column, String, Integer, text
from . import BaseModel


class Author(BaseModel):
    __tablename__ = 'author'

    id = Column(Integer, primary_key=True)
    last_name = Column(String)
    first_name = Column(String)

    def json(self):
        return {
            'id': self.id,
            'last_name': self.last_name,
            'first_name': self.first_name,
        }
