from sqlalchemy import exc
from tornado.gen import coroutine

from syntopicon.handlers.base import BaseHandler
from syntopicon.storage.models.topic import Topic
from pprint import pprint

class OneTopicHandler(BaseHandler):
    def get(self):
      try:
        path_segments = self.request.uri.split('/')
        topic_id = int(path_segments[3])
        record = self.db_session.query(Topic).filter(Topic.id == topic_id).first()
        data = record.__dict__
        del data['_sa_instance_state']
        self.write_response(data)
      except exc.SQLAlchemyError as err:
        self.db_session.rollback()
        raise self.write_error(500, reason='Database Error', error=list(err.args))

    @coroutine
    def post(self):
      if not self.current_consumer:
        raise self.write_error(401, reason='User not authenticated')
