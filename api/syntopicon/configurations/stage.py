from pathlib import Path
from dotenv import load_dotenv
from syntopicon.configurations.utils import parse_pgql_string_from_env

load_dotenv(dotenv_path=Path('.') / 'default.env')

env = "stage"

server = {
    'port': 8888,
    'compress_response': True
}

endpoints = {}

public_routes = ["/version", "/topics", "/subtopics", "/references"]

storage = {
    'psql': 'postgresql+psycopg2://%s:%s@%s/%s' % (
        'syntopicon', 'syntopicon_dev', 'syntopicon-dev.cgbuqkjqgvcd.us-west-2.rds.amazonaws.com', 'syntopicon_dev'),
}

# storage = {
#     'psql': parse_pgql_string_from_env('SYNTOPICON')
# }
