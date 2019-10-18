from syntopicon.routes.version import version_route
from syntopicon.routes.topic import topic_route


routes = list(set(
    version_route +
    topic_route
))
