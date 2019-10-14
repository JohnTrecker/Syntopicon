from sqlalchemy import Column, String, Integer, text
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.types import TIMESTAMP
from . import BaseModel


class Topic(BaseModel):
    __tablename__ = 'topic'

    id = Column(Integer(), primary_key=True)
    name = Column(String())
    num_subtopics = Column(Integer())
    subtopics = Column(JSON())
    modified = Column(TIMESTAMP(), server_default=text('NOW()'))
    created = Column(TIMESTAMP(), server_default=text('NOW()'))

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'num_subtopics': self.num_subtopics,
            'modified': self.modified,
            'created': self.created,
        }
