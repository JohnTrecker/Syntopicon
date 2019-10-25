from sqlalchemy import Column, Integer, Sequence, String
from sqlalchemy.dialects.postgresql import UUID
from . import BaseModel


class Referrer(BaseModel):
    __tablename__ = 'referrer'

    id = Column(Integer, Sequence('referrer_seq'), primary_key=True)
    user_id = Column(UUID)
    last_name = Column(String)
    first_name = Column(String)

    def json(self):
        return {
            'id': self.id,
            'user_id': self.cid,
            'last_name': self.last_name,
            'first_name': self.first_name,
        }
