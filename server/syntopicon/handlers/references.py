from sqlalchemy import exc
from tornado.gen import coroutine

from syntopicon.handlers.base import BaseHandler
from syntopicon.storage.models.reference import Reference

class ManyReferencesHandler(BaseHandler):
    def get(self):
      try:
        data = []
        subtopic_id = self.request.uri.split('/')[3]
        records = self.db_session.query(Reference)\
          .filter(Reference.subtopic_id == subtopic_id)\
          .all()

        for record in records:
          data.append({
            'id': record.id,
            'author': record.author,
            'author_id': record.author_id,
            'work_id': record.work_id,
            'page_start': record.page_start,
            'page_end': record.page_end,
            'notes': record.notes
          })
        self.write_response(data)
      except exc.SQLAlchemyError as err:
        self.db_session.rollback()
        raise self.write_error(500, reason='Database Error', error=list(err.args))

    @coroutine
    def post(self):
      if not self.current_consumer:
        raise self.write_error(401, reason='User not authenticated')
