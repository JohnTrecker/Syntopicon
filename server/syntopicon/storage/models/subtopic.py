from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from . import BaseModel


class Subtopic(BaseModel):
    __tablename__ = 'subtopic'

    id = Column(Integer, primary_key=True)
    referrer_id = Column(Integer, ForeignKey('referrer.id'))
    topic_id = Column(Integer, ForeignKey('topic.id'))

    alt_id = Column(String)
    description = Column(String)

    referrer = relationship('Referrer')
    topic = relationship('Topic')

    def json(self):
        return {
            'id': self.id,
            'topic_id': self.topic_id,
            'alt_id': self.alt_id,
            'referrer_id': self.referrer_id,
            'description': self.description,
        }
