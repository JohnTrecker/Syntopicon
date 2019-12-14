from sqlalchemy import exc
from tornado.gen import coroutine

from syntopicon.handlers.base import BaseHandler
from syntopicon.storage.models.reference import Reference
from syntopicon.storage.models.work import Work

class ManyReferencesHandler(BaseHandler):
    def get(self):
      try:
        data = []
        subtopic_id = self.request.uri.split('/')[3]
        records = self.db_session.query(Reference)\
          .join(Work)\
          .filter(Reference.subtopic_id == subtopic_id)\
          .order_by(Reference.author_id.desc())\
          .all()

        for record in records:
          first_name = record.author.first_name
          last_name = record.author.last_name
          data.append({
            'id': record.id,
            'author': self.get_full_name(last_name, first_name),
            'author_id': record.author_id,
            'work_id': record.work_id,
            'page_start': record.page_start,
            'page_end': record.page_end,
            'title': record.work.title,
            'translator': record.work.translator,
            'summary': record.summary.summary
          })
        self.write_response(data)
      except exc.SQLAlchemyError as err:
        self.db_session.rollback()
        raise self.write_error(500, reason='Database Error', error=list(err.args))

    def get_full_name(self, last, first=None):
      return f'{first} {last}' if first else last

    @coroutine
    def post(self):
      if not self.current_consumer:
        raise self.write_error(401, reason='User not authenticated')
