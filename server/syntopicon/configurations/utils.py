from os import environ


def parse_pgql_string_from_env(db):
    user = environ.get(db + '_USER')
    password = environ.get(db + '_PASSWORD')
    host = environ.get(db + '_HOST')
    table = environ.get(db + '_DATABASE')
    return 'postgresql+psycopg2://%s:%s@%s/%s' % (user, password, host, table)
