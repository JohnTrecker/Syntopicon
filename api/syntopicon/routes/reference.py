from tornado.web import URLSpec as Url

from syntopicon.handlers.references import ManyReferencesHandler
from syntopicon.handlers.reference import OneReferenceHandler


reference_route = [
    Url(
        pattern=r'/v1/references/[0-9]+/?$',
        handler=OneReferenceHandler,
        name='Reference Handler'
    ),
    Url(
        pattern=r'/v1/subtopics/[0-9]+/references/?$',
        handler=ManyReferencesHandler,
        name='References Handler'
    )
]
