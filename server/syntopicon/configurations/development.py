from pathlib import Path
from dotenv import load_dotenv

load_dotenv(dotenv_path=Path('.') / 'default.env')

env = "development"

server = {
    'port': 8888,
    'compress_response': True
}

endpoints = {}

public_routes = ["/version"]

storage = {
    'psql': 'postgresql+psycopg2://%s:%s@%s/%s' % (
        'syntopicon', 'syntopicon_dev', 'localhost', 'syntopicon_dev'),
}
