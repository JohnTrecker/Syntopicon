![Logo of the project](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._gs9vEceLvwcZX0UbLzgIgHaI3%26pid%3DApi&f=1)

# Syntopicon
> An open source index of great ideas

"Read the best books first or you may not have a chance to read them at all." -- Henry David Thoreau

Syntopicon is an open API of ideas. Inspired by the 1952 edition of Encyclopedia Britannica's Great Books of the Western World, the name was coined by Mortimer J. Adler to describe the crowning achievment of his life's work: a catalogued index of 102 fundamental "great ideas" around which competing schools of thought have developed over the past 28 centuries. With over 500,000 references to the works of eminent thinkers from Homer to Shakespeare, Euclid to Einstein, Aristotle to Descartes, the Syntopicon is a monument of academic labor that has fallen into obscurity. This project aims to revive its use for anyone looking for a more liberal education.

<!--
# TODOS:

# [x] replace subtopic_id
# [x] add author_id
# [x] revert last_name in auths.csv
	# [x] T.S. Eliot
	# [x] George Eliot
	# [x] William James
	# [x] Henry James
# [x] remove passage column
	# [x] move bible passages to page_start
	# [x] delete passage column
# [x] add id
# [x] add work_id column
# [] add summary column

# [x] clean data
	# [x] alpha: esp 123, refs.sort_values('alpha', ascending=False)[71:95]
	# [x] alpha: null
	# [x] e.g. 2 Samuel, II Samuel
# [x] enforce data types
	# [x] refs.passage[str | NaN]
	# [x] refs.page_start[int | str]
	# [x] works.page_start[int | str]
	# [x] refs.page_start.contains(['i', 'v', 'x'])[int](show roman numerals)
	# [x] refs.page_start Bible passages[int](show bible passages)
# [x] add refs.work column
# [x] save Bible passages to file system
# [x] add texts.summary table/column
# [x] fix duplicate ref.id values e.g. 29823
# [x] normalize Bible refs
# [x] update refs with 'esp' in refs.notes ...focus_refs_csv
#	[x] update texts table
	# [x] include bible summaries
		# [x] normalize deuterocanonical books in python-scriptures module
# [] prepare tables for deployment
	[] clean tables
		[] include subtopic_id in each subtopic in topic.subtopics
		[] make tables text and summary many-to-one
		[] refs
			[] drop passages longer than 100 pgs
				[] add refs.referencer column
				[] add refs.summary_id column
				[] add refs.text_id column
				[] sequentialize refs.id
			[] standardize author name references
		[] compress tables
	[x] initial routes
		[x] topics
		[x] subtopics
		[x] references
	[] routes MVP

## API Schema

| exposed |      URL                  | HTTP Verb | Request Body |                        Result                                           |
|:-------:|:--------------------------|:---------:|:------------:|:------------------------------------------------------------------------|
|    x    | /topics                   |    GET    |    empty     |                                                Return JSON of all Topics|
|         | /topics                   |    POST   |     JSON     |                        Create new Topic and return JSON of created Topic|
|    x    | /topics/:id               |    GET    |    empty     |                           Return JSON of single Topic with matching `id`|
|         | /topics/:id               |    PUT    |     JSON     |         Update Topic with matching `id` and return JSON of updated Topic|
|         | /topics/:id               |   DELETE  |    empty     |         Delete Topic with matching `id` and return JSON of deleted Topic|
|    x    | /suptopics                |    GET    |    empty     |                                             Return JSON of all Subtopics|
|         | /suptopics                |    POST   |     JSON     |                  Create new Subtopic and return JSON of created Subtopic|
|         | /suptopics                |    PUT    |     JSON     |                      Update Subtopic and return JSON of updated Subtopic|
|    x    | /suptopics/:id            |    GET    |    empty     |                        Return JSON of single Subtopic with matching `id`|
|         | /suptopics/:id            |    PUT    |     JSON     |   Update Subtopic with matching `id` and return JSON of updated Subtopic|
|         | /suptopics/:id            |   DELETE  |    empty     |   Delete Subtopic with matching `id` and return JSON of deleted Subtopic|
|    x    | /suptopics/:id/references |    GET    |    empty     |                            Return JSON of all References related to `id`|
|         | /suptopics/:id/references |    PUT    |     JSON     |             Add Reference to Subtopic with matching `id` and return JSON|
|         | /references               |    POST   |     JSON     |                Create new Reference and return JSON of created Reference|
|    x    | /references/:id           |    GET    |    empty     |                       Return JSON of single Reference with matching `id`|
|         | /references/:id           |    PUT    |     JSON     | Update Reference with matching `id` and return JSON of updated Reference|
|         | /references/:id           |   DELETE  |    empty     | Delete Reference with matching `id` and return JSON of deleted Reference|





## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
commands here
```

Here you should say what actually happens when you execute the code above.

## Developing

### Built With
List main libraries, frameworks used including versions (React, Angular etc...)

### Prerequisites
What is needed to set up the dev environment. For instance, global dependencies or any other tools. include download links.


### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/your/your-project.git
cd your-project/
packagemanager install
```

And state what happens step-by-step. If there is any virtual environment, local server or database feeder needed, explain here.

### Building

If your project needs some additional steps for the developer to build the
project after some code changes, state them here. for example:

```shell
./configure
make
make install
```

Here again you should state what actually happens when the code above gets
executed.

### Deploying / Publishing
give instructions on how to build and release a new version
In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy your-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

## Versioning

We can maybe use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).


## Configuration

Here you should write what are all of the configurations a user can enter when
using the project.

## Tests

Describe and show how to run the tests with code examples.
Explain what these tests test and why.

```shell
Give an example
```

## Style guide

Explain your code style and show how to check it.

## Api Reference

If the api is external, link to api documentation. If not describe your api including authentication methods as well as explaining all the endpoints with their required parameters.


## Database

Explaining what database (and version) has been used. Provide download links.
Documents your database design and schemas, relations etc...

## Licensing

State what the license is and how to find the text version of the license.

-->
