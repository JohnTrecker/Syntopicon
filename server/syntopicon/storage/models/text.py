from sqlalchemy import Column, String, Integer, text, ForeignKey
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.types import TIMESTAMP
from . import BaseModel


class Text(BaseModel):
    __tablename__ = 'text'

    id = Column(Integer(), ForeignKey('reference.id'), primary_key=True)
    summary = Column(String())
    text = Column(String())
    modified = Column(TIMESTAMP(), server_default=text('NOW()'))
    created = Column(TIMESTAMP(), server_default=text('NOW()'))

    def json(self):
        return {
            'id': self.id,
            'summary': self.summary,
            'text': self.text,
            'modified': self.modified,
            'created': self.created,
        }
