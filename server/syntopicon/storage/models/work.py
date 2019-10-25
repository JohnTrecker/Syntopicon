from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from . import BaseModel


class Work(BaseModel):
    __tablename__ = 'work'

    id = Column(Integer(), autoincrement=False, primary_key=True)
    author_id = Column(Integer(), ForeignKey('author.id'))
    title = Column(String())
    translator = Column(String())

    author = relationship("Author")

    def json(self):
        return {
            'id': self.id,
            'author_id': self.author_id,
            'author': self.author.last_name,
            'title': self.title,
            'translator': self.translator,
        }
