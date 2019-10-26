from sqlalchemy import exc
from tornado.gen import coroutine

from syntopicon.handlers.base import BaseHandler
from syntopicon.storage.models.topic import Topic

class OneTopicHandler(BaseHandler):
    def get(self):
      try:
        path_segments = self.request.uri.split('/')
        topic_id = int(path_segments[3])

        keys = ('id', 'name', 'subtopics')
        record = self.db_session.query(Topic.id, Topic.name, Topic.subtopics)\
                                .filter(Topic.id == topic_id).first()
        data = dict(zip(keys, record))
        self.write_response(data)
      except exc.SQLAlchemyError as err:
        self.db_session.rollback()
        raise self.write_error(500, reason='Database Error', error=list(err.args))

    @coroutine
    def post(self):
      if not self.current_consumer:
        raise self.write_error(401, reason='User not authenticated')
