from sqlalchemy import Column, String, Integer, ForeignKey
from . import BaseModel


class Summary(BaseModel):
    __tablename__ = 'summary'

    id = Column(Integer, primary_key=True)
    summary = Column(String)

    def json(self):
        return {
            'id': self.id,
            'summary': self.summary,
        }
