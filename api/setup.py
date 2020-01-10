from setuptools import setup, find_packages

classifiers = [
    # How mature is this project? Common values are
    #   3 - Alpha
    #   4 - Beta
    #   5 - Production/Stable
    'Development Status :: 3 - Alpha',

    # Indicate who your project is intended for
    'Intended Audience :: Developers',

    # Specify the Python versions you support here. In particular, ensure
    # that you indicate whether you support Python 2, Python 3 or both.
    'Programming Language :: Python :: 3',

]

entry_points = {
    'console_scripts': [
        'syntopicon = syntopicon.server:main'
        # 'seed = syntopicon.utils.seed:seed'
    ]
}

dependencies = [
    'bumpversion>=0.5.3, <1.1.0',
    'coverage>=4.5.1',
    'flake8>=3.5.0',
    'python-dateutil>=2.6.0, <2.7.0',
    'SQLAlchemy>=1.3.10, <2.0.0',
    'psycopg2>=2.7.0, <3.0.0',
    'python-dotenv>=0.10.3',
    'termcolor>=1.1.0, <2.0.0',
    'tornado>=6.0.3, <7.0'
]

setup(
    name='syntopicon',
    version='0.0.1',
    description='Syntopicon API Service',
    author='John Trecker',
    classifiers=classifiers,
    packages=find_packages(),
    install_requires=dependencies,
    python_requires='>=3',
    entry_points=entry_points
)
