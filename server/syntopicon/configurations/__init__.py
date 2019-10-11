from os import environ
from tornado.options import define, parse_command_line

from syntopicon.configurations import development

configurations = development

# API SERVER CONFIGURATIONS
define(
    name='server',
    default=configurations.server,
    help='Server configurations',
)

define(
    name='storage',
    default=configurations.storage,
    help='Storage configuration'
)

define(
    name='env',
    default=configurations.env,
    help='Set server environment'
)

define(
    name='debug',
    default=False,
    help='Run in debug mode',
)

parse_command_line()
