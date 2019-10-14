from sqlalchemy import Column, String, Integer, text, ForeignKey
from sqlalchemy.types import TIMESTAMP
from . import BaseModel


class Work(BaseModel):
    __tablename__ = 'work'

    id = Column(Integer(), autoincrement=False, primary_key=True)
    volume_id = Column(Integer(), ForeignKey('volume.id'))
    author = Column(String())
    title = Column(String())
    translator = Column(String())
    page_start = Column(Integer())
    modified = Column(TIMESTAMP(), server_default=text('NOW()'))
    created = Column(TIMESTAMP(), server_default=text('NOW()'))

    def json(self):
        return {
            'id': self.id,
            'volume_id': self.volume_id,
            'author': self.author,
            'title': self.title,
            'translator': self.translator,
            'page_start': self.page_start,
            'modified': self.modified,
            'created': self.created,
        }
