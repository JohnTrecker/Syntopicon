from sqlalchemy import Column, String, Integer, text
from sqlalchemy.types import TIMESTAMP
from . import BaseModel


class Volumes(BaseModel):
    __tablename__ = 'volumes'

    id = Column(Integer(), primary_key=True)
    path = Column(String())
    modified = Column(TIMESTAMP(), server_default=text('NOW()'))
    created = Column(TIMESTAMP(), server_default=text('NOW()'))

    def json(self):
        return {
            'id': self.id,
            'path': self.subscr_id,
            'modified': self.modified,
            'created': self.created,
        }


