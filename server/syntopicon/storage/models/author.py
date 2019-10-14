from sqlalchemy import Column, String, Integer, text
from sqlalchemy.types import TIMESTAMP
from . import BaseModel


class Author(BaseModel):
    __tablename__ = 'author'

    id = Column(Integer(), primary_key=True)
    last_name = Column(String())
    first_name = Column(String())
    modified = Column(TIMESTAMP(), server_default=text('NOW()'))
    created = Column(TIMESTAMP(), server_default=text('NOW()'))

    def json(self):
        return {
            'id': self.id,
            'last_name': self.last_name,
            'first_name': self.first_name,
            'modified': self.modified,
            'created': self.created,
        }
