import subprocess

from syntopicon.handlers.base import BaseHandler

from syntopicon import __version__


class VersionHandler(BaseHandler):
    @staticmethod
    def get_latest_commit_hash():
        git_path = subprocess.Popen(
            ['git', 'rev-parse', '--show-toplevel'],
            stdout=subprocess.PIPE).communicate()[0].rstrip().decode('UTF-8')

        return subprocess.check_output(
            ['git', 'rev-parse', 'HEAD', git_path]
        ).strip().decode('ascii')[:10]

    def get(self):
        self.write({
            'name': 'Syntopicon',
            'version': __version__,
            'description': 'API of Great Ideas',
            'commit': self.get_latest_commit_hash()
        })
