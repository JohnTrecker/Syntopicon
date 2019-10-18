from tornado.web import URLSpec as Url

from syntopicon.handlers.topics import ManyTopicsHandler
from syntopicon.handlers.topic import OneTopicHandler


topic_route = [
    Url(
        pattern=r'/v1/topics/[0-9]+/?$',
        handler=OneTopicHandler,
        name='Topic Handler'
    ),
    Url(
        pattern=r'/v1/topics/?$',
        handler=ManyTopicsHandler,
        name='Topic Handler'
    )
]
