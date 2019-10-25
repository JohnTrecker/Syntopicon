from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import relationship
from . import BaseModel


class Topic(BaseModel):
    __tablename__ = 'topic'

    id = Column(Integer, primary_key=True)
    referrer_id = Column(Integer, ForeignKey('referrer.id'))
    name = Column(String)
    subtopics = Column(JSON)

    referrer = relationship('Referrer')

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'num_subtopics': self.num_subtopics,
        }
