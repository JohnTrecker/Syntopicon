import syntopicon.configurations # noqa: F401,E261
from tornado.web import Application
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.options import options
from tornado.log import enable_pretty_logging
from sqlalchemy.orm import sessionmaker

# from syntopicon.storage.postgres.models import engine, initialize_schema # PSQL Storage Models
from syntopicon.storage.models import engine, initialize_schema
from syntopicon.handlers.base import BaseHandler
from syntopicon.routes.router import routes
import logging


def make_app(settings={}):
    app = Application(
        handlers=routes,
        compress_response=options.server.get('compress_response'),
        default_handler_class=BaseHandler,
        **settings
    )

    initialize_schema()

    session = sessionmaker(bind=engine, autoflush=True)
    app.db_session = session()

    return app


def main():
    logger = logging.getLogger(__name__)
    enable_pretty_logging()
    try:
        app = make_app(options.as_dict())

        if options.debug:
            logger.info('Running in debug mode')
            app.listen(options.server.get('port'))
        else:
            logger.info('Running in production mode')
            if options.env == 'development':
                logger.info('Enabling SQLAlchemy Logging')
                logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
            server = HTTPServer(app)
            server.bind(options.server.get('port'))
            server.start(0)

        logger.info('Server listening on port {}'.format(options.server.get('port')))
        IOLoop.current().start()
    except Exception as ex:
        logger.exception(ex)
        import time
        time.sleep(4)
        main()


if __name__ == '__main__':
    main()
