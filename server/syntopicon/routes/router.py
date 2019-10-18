from syntopicon.routes.version import version_route
from syntopicon.routes.topic import topic_route
from syntopicon.routes.subtopic import subtopic_route


routes = list(set(
    version_route +
    topic_route +
    subtopic_route
))
