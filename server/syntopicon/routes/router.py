from syntopicon.routes.version import version_route
from syntopicon.routes.topic import topic_route
from syntopicon.routes.subtopic import subtopic_route
from syntopicon.routes.reference import reference_route


routes = list(set(
    version_route +
    topic_route +
    subtopic_route +
    reference_route
))
