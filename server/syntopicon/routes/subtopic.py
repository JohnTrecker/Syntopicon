from tornado.web import URLSpec as Url

from syntopicon.handlers.subtopics import ManySubtopicsHandler
from syntopicon.handlers.subtopic import OneSubtopicHandler


subtopic_route = [
    Url(
        pattern=r'/v1/subtopics/[0-9]+/?$',
        handler=OneSubtopicHandler,
        name='Subtopic Handler'
    ),
    Url(
        pattern=r'/v1/subtopics/?$',
        handler=ManySubtopicsHandler,
        name='Subtopics Handler'
    )
]
