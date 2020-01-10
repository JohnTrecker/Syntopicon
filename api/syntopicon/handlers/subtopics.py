from sqlalchemy import exc
from tornado.gen import coroutine

from syntopicon.handlers.base import BaseHandler
from syntopicon.storage.models.subtopic import Subtopic

class ManySubtopicsHandler(BaseHandler):
    def get(self):
      try:
        keys = ('id', 'alt_id', 'description')
        records = self.db_session.query(Subtopic.id, Subtopic.alt_id, Subtopic.description)
        data = [dict(zip(keys, record)) for record in records]
        self.write_response(data)
      except exc.SQLAlchemyError as err:
        self.db_session.rollback()
        raise self.write_error(500, reason='Database Error', error=list(err.args))

    @coroutine
    def post(self):
      if not self.current_consumer:
        raise self.write_error(401, reason='User not authenticated')
