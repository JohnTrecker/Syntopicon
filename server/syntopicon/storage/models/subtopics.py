from sqlalchemy import Column, String, Integer, text
from sqlalchemy.types import TIMESTAMP
from . import BaseModel


class Subtopics(BaseModel):
    __tablename__ = 'subtopics'

    id = Column(Integer(), primary_key=True)
    topic_id = Column(Integer())
    subtopic_id = Column(String())
    description = Column(String())
    modified = Column(TIMESTAMP(), server_default=text('NOW()'))
    created = Column(TIMESTAMP(), server_default=text('NOW()'))

    def json(self):
        return {
            'id': self.id,
            'topic_id': self.topic_id,
            'subtopic_id': self.subtopic_id,
            'description': self.description,
            'modified': self.modified,
            'created': self.created,
        }
