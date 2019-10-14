from sqlalchemy import Column, String, Integer, text
from sqlalchemy.types import TIMESTAMP
from . import BaseModel


class Translator(BaseModel):
    __tablename__ = 'translator'

    id = Column(Integer(), primary_key=True)
    primary_trans = Column(String())
    secondary_trans = Column(String())
    modified = Column(TIMESTAMP(), server_default=text('NOW()'))
    created = Column(TIMESTAMP(), server_default=text('NOW()'))

    def json(self):
        return {
            'id': self.id,
            'primary_trans': self.primary_trans,
            'secondary_trans': self.secondary_trans,
            'modified': self.modified,
            'created': self.created,
        }
