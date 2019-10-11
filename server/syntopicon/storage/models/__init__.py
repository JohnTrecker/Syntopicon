import syntopicon.configurations # noqa: F401,E261
from sqlalchemy import create_engine
from sqlalchemy import event as sqlEvent
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import DDL
from tornado.options import options

engine = create_engine(options.storage.get('psql'), pool_size=20, max_overflow=0)
print("Creating Engine in Env {env}".format(env=options.env))
BaseModel = declarative_base()


def initialize_schema():
    from syntopicon.storage.models.volumes import Volumes

    models = [
        Volumes
    ]

    [sqlEvent.listen(
        model.__table__,
        'before_create',
        DDL('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'))
        for model in models]

    BaseModel.metadata.create_all(engine)


if __name__ == '__main__':
    initialize_schema()
