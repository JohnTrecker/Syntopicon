from sqlalchemy import exc
from tornado.gen import coroutine

from syntopicon.handlers.base import BaseHandler
from syntopicon.storage.models.subtopic import Subtopic
from syntopicon.storage.models.topic import Topic
from pprint import pprint


class OneSubtopicHandler(BaseHandler):
    def get(self):
      try:
        path_segments = self.request.uri.split('/')
        subtopic_id = int(path_segments[5])

        keys = ('id', 'topic_id', 'description')
        record = self.db_session\
          .query(Subtopic.id, Subtopic.topic_id, Subtopic.description)\
          .filter(Subtopic.id == subtopic_id).first()
        data = dict(zip(keys, record))

        record2 = self.db_session\
          .query(Topic.name)\
          .filter(Subtopic.id == subtopic_id).first()

        data['topic'] = record2[0]
        self.write_response(data)
      except exc.SQLAlchemyError as err:
        self.db_session.rollback()
        raise self.write_error(500, reason='Database Error', error=list(err.args))

    @coroutine
    def post(self):
      if not self.current_consumer:
        raise self.write_error(401, reason='User not authenticated')
