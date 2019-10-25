from sqlalchemy import Column, String, Integer, text, ForeignKey
from sqlalchemy.dialects.postgresql import JSON
from . import BaseModel


class Excerpt(BaseModel):
    __tablename__ = 'excerpt'

    id = Column(Integer, primary_key=True)
    excerpt = Column(String)

    def json(self):
        return {
            'id': self.id,
            'excerpt': self.excerpt,
        }
