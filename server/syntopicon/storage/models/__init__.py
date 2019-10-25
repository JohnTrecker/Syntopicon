import syntopicon.configurations # noqa: F401,E261
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import DDL
from tornado.options import options

engine = create_engine(options.storage.get('psql'), pool_size=20, max_overflow=0)
print("Creating Engine in Env {env}".format(env=options.env))
BaseModel = declarative_base()


def initialize_schema():
    from syntopicon.storage.models.author import Author
    from syntopicon.storage.models.excerpt import Excerpt
    from syntopicon.storage.models.reference import Reference
    from syntopicon.storage.models.referrer import Referrer
    from syntopicon.storage.models.subtopic import Subtopic
    from syntopicon.storage.models.summary import Summary
    from syntopicon.storage.models.topic import Topic
    from syntopicon.storage.models.work import Work

    models = [
        Author,
        Excerpt,
        Referrer,
        Subtopic,
        Summary,
        Topic,
        Reference,
        Work,
    ]

    BaseModel.metadata.create_all(engine)


if __name__ == '__main__':
    initialize_schema()
