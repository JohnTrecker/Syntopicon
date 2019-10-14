from sqlalchemy import Column, String, Integer, text, ForeignKey
from sqlalchemy.types import TIMESTAMP
from . import BaseModel


class Reference(BaseModel):
    __tablename__ = 'reference'

    id = Column(Integer(), autoincrement=False, primary_key=True)
    topic_id = Column(Integer(), ForeignKey('topic.id'))
    subtopic_id = Column(Integer(), ForeignKey('subtopic.id'))
    work_id = Column(Integer(), ForeignKey('work.id'))
    author_id = Column(Integer(), ForeignKey('author.id'))
    author = Column(String())
    volume = Column(Integer(), ForeignKey('volume.id'))
    page_start = Column(String())
    page_end = Column(String())
    notes = Column(String())
    modified = Column(TIMESTAMP(), server_default=text('NOW()'))
    created = Column(TIMESTAMP(), server_default=text('NOW()'))

    def json(self):
        return {
            'id': self.id,
            'topic_id': self.topic_id,
            'subtopic_id': self.subtopic_id,
            'work_id': self.work_id,
            'author_id': self.author_id,
            'author': self.author,
            'volume': self.volume,
            'page_start': self.page_start,
            'page_end': self.page_end,
            'notes': self.notes,
            'modified': self.modified,
            'created': self.created,
        }
