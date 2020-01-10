import logging
import re
import traceback
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from uuid import uuid4, UUID

from tornado.escape import json_decode
from tornado.options import options
from tornado.web import RequestHandler


class BaseHandler(RequestHandler):
    _thread_pool = ThreadPoolExecutor(max_workers=8)
    logger = logging.getLogger(__name__)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.uuid = None
        self.body = None

    @property
    def db_session(self):
        return self.application.db_session

    @property
    def current_consumer(self):
        return self.request.headers.get('x-consumer-username')

    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header(
            'Access-Control-Allow-Headers',
            'Content-Type,Accept,Authorization, x-consumer-username')
        self.set_header('Access-Control-Allow-Methods',
                        'GET,PUT,POST,DELETE,OPTIONS')

    def prepare(self):
        """Generate a uuid for the current request"""
        self.uuid = str(uuid4())
        try:
            self.body = json_decode(self.request.body)
        except ValueError:
            # self.logger.error(ValueError)
            self.body = self.request.body
        BaseHandler.logger.info(
            'Received id: {} request: {}'.format(
                self.uuid, self.request))

        is_int_or_prod = True if 'prod' in options.env or 'int' in options.env else False
        if is_int_or_prod:
            self.write_error(401, reason='Unauthorized')
            self.finish()

    def write_response(self, body, status=200, message='OK'):
        response = {
            'id': str(self.uuid),
            'status': status,
            'message': message,
            'data': body
        }
        self.write(response)
        self.finish()

    def write_error(self, status_code=500, reason='', error='', **kwargs):
        if 'exc_info' in kwargs:
            trace_error = traceback.format_exception(*kwargs['exc_info'])
        else:
            trace_error = None

        self.logger.exception(trace_error)

        if not self.settings.get('serve_traceback'):
            trace_error = {}

        self.set_status(status_code)
        self.write({
            'status': status_code,
            'message': reason or self._reason,
            'error': error or trace_error,
        })
        self.finish()

    def data_received(self, chunk):
        pass

    def options(self, *args, **kwargs):
        """Allow OPTIONS method for all endpoints"""
        self.set_status(204)
        self.finish()

    def is_valid_uuid(self, _id):
        try:
            gen_id = UUID(_id)
        except ValueError:
            self.logger.error(ValueError)
            return False
        return str(gen_id) == _id or str(gen_id).replace('-', '') == _id

    @staticmethod
    def is_valid_date(date):
        try:
            return datetime.strptime(date, '%Y-%m-%d')
        except ValueError:
            return False

    @staticmethod
    def strip_date(date_string, fmt):
        try:
            parsed_date = datetime.strptime(date_string, fmt)
        except ValueError as v:
            if len(v.args) > 0 and v.args[0].startswith('unconverted data remains: '):
                date_string = date_string[:-(len(v.args[0]) - 26)]
                parsed_date = datetime.strptime(date_string, fmt)
            else:
                raise
        return parsed_date

    def change_dict_naming_convention(self, our_dict, convention='snake_to_camel'):
        if convention == 'camel_to_snake':
            convention_func = self.camel_to_snake
        else:
            convention_func = self.snake_to_camel

        if our_dict:
            new = {}
            for k in our_dict:
                v = our_dict[k]
                new_v = v
                if isinstance(v, dict):
                    new_v = self.change_dict_naming_convention(v)
                elif isinstance(v, list):
                    new_v = list()
                    for x in v:
                        if type(x) == dict:
                            new_v.append(self.change_dict_naming_convention(x))
                        elif type(x) == str:
                            new_v.append(convention_func(x))
                        else:
                            new_v.append(x)
                new[convention_func(k)] = new_v
            return new
        return our_dict

    @staticmethod
    def snake_to_camel(name):
        under_pat = re.compile(r'_([a-z])')
        return under_pat.sub(lambda x: x.group(1).upper(), name)

    @staticmethod
    def camel_to_snake(name):
        s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
        return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()
