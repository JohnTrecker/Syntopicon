from sqlalchemy import exc
from tornado.gen import coroutine

from syntopicon.handlers.base import BaseHandler
from syntopicon.storage.models.reference import Reference

class OneReferenceHandler(BaseHandler):
    def get(self):
      try:
        path_segments = self.request.uri.split('/')
        reference_id = int(path_segments[3])
        data = {}

        records = self.db_session\
          .query(Reference)\
          .filter(Reference.id == reference_id)\
          .all()

        for record in records:
          data = {
              'id': record.id,
              'author': record.author.last_name,
              'author_id': record.author_id,
              'work_id': record.work_id,
              'page_start': record.page_start,
              'page_end': record.page_end,
              'title': record.work.title,
              'translator': record.work.translator,
              'summary': record.summary.summary,
              'text': record.excerpt.excerpt,
              'upvotes': record.upvotes,
              'downvotes': record.downvotes,
              'referrer': '{} {}'.format(record.referrer.first_name, record.referrer.last_name)
          }

        self.write_response(data)
      except exc.SQLAlchemyError as err:
        self.db_session.rollback()
        raise self.write_error(500, reason='Database Error', error=list(err.args))

    @coroutine
    def post(self):
      if not self.current_consumer:
        raise self.write_error(401, reason='User not authenticated')
