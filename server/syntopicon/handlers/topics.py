from sqlalchemy import exc
from tornado.gen import coroutine

from syntopicon.handlers.base import BaseHandler
from syntopicon.storage.models.topic import Topic

class ManyTopicsHandler(BaseHandler):
    def get(self):
      try:
        keys = ('id', 'name', 'num_subtopics')
        records = self.db_session.query(Topic.id, Topic.name, Topic.num_subtopics)
        data = [dict(zip(keys, record)) for record in records]
        self.write_response(data)
      except exc.SQLAlchemyError as err:
        self.db_session.rollback()
        raise self.write_error(500, reason='Database Error', error=list(err.args))

    @coroutine
    def post(self):
      if not self.current_consumer:
        raise self.write_error(401, reason='User not authenticated')
