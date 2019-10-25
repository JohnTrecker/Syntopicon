from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from . import BaseModel


class Reference(BaseModel):
    """Data model for references"""
    __tablename__ = 'reference'

    id = Column(Integer, autoincrement=False, primary_key=True)
    author_id = Column(Integer, ForeignKey('author.id'))
    excerpt_id = Column(Integer, ForeignKey('excerpt.id'))
    referrer_id = Column(Integer, ForeignKey('referrer.id'))
    subtopic_id = Column(Integer, ForeignKey('subtopic.id'))
    summary_id = Column(String, ForeignKey('summary.id'))
    topic_id = Column(Integer, ForeignKey('topic.id'))
    work_id = Column(Integer, ForeignKey('work.id'))

    author = Column(String)
    page_start = Column(String)
    page_end = Column(String)
    upvotes = Column(Integer)
    downvotes = Column(Integer)
    notes = Column(String())

    author = relationship('Author')
    excerpt = relationship('Excerpt')
    referrer = relationship('Referrer')
    subtopic = relationship('Subtopic')
    summary = relationship('Summary')
    topic = relationship('Topic')
    work = relationship('Work')

    def json(self):
        return {
            'id': self.id,
            'topic_id': self.topic_id,
            'subtopic_id': self.subtopic_id,
            'work_id': self.work_id,
            'author_id': self.author_id,
            'author': self.author.last_name,
            'page_start': self.page_start,
            'page_end': self.page_end,
            'summary_id': self.summary_id,
            'excerpt_id': self.excerpt_id,
            'referrer_id': self.referrer_id,
            'upvotes': self.upvotes,
            'downvotes': self.downvotes,
            'notes': self.notes,
        }
