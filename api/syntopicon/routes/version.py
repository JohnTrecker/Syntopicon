from tornado.web import URLSpec as Url

from syntopicon.handlers.version import VersionHandler


version_route = [
    Url(
        pattern=r'/version',
        handler=VersionHandler,
        name='Version'
    ),
]
