import syntopicon.configurations  # noqa: F401,E261
from tornado.options import options
from logging import getLogger
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from importlib import import_module

def dynamic_import(abs_module_path, class_name):
    module_object = import_module(abs_module_path)
    target_class = getattr(module_object, class_name)
    return target_class

def seed():
    logger = getLogger(__name__)
    logger.info('Seeding data into {}'.format(options.storage.get('psql')))

    from syntopicon.storage.models.topic import Topic
    from syntopicon.storage.models.subtopic import Subtopic
    from syntopicon.storage.models.volume import Volume
    from syntopicon.storage.models.author import Author
    from syntopicon.storage.models.translator import Translator
    from syntopicon.storage.models.work import Work
    from syntopicon.storage.models.reference import Reference
    from syntopicon.storage.models.text import Text

    tables = [Topic, Subtopic, Volume, Author, Translator, Work, Reference, Text]
    engine = create_engine(options.storage.get('psql'))
    Session = sessionmaker(bind=engine)
    session = Session()

    for table in tables:
      try:
        module = import_module('syntopicon.mock_data.tables')
        mock_table = getattr(module, table.__tablename__)

        for data in mock_table:
          table_instance = table(**data)
          if session.query(table).get(table_instance.id) is None:
            session.add(table_instance)
        session.commit()
      except Exception as e:
        logger.exception(e)
        session.rollback()



if __name__ == '__main__':
    from os import environ
    if environ.get('env') and environ.get('syntopicon_ENV') != 'prod':
      seed()
    else:
      print("Your ENV file is either not set or it is set to prod. This will delete all production data.")
