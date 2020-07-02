begin;
select * from no_plan();

select * from check_test(
    views_are('api', array[
        'authors',
        'excerpts',
        'references',
        'referrers',
        'subtopics',
        'summaries',
        'topics',
        'translators',
        'works',
        'clients',
        'comments',
        'project_comments',
        'projects',
        'task_comments',
        'tasks',
        'todos'
    ], 'tables present' ),
    true,
    'all views are present in api schema',
    'tables present',
    ''
);

select * from check_test(
    functions_are('api', array[
        'login',
        'logout',
        'signup',
        'refresh_token',
        'me',
        'search_topics',
        'search_subtopics',
        'search_works'
    ], 'functions present' ),
    true,
    'all functions are present in api schema',
    'functions present',
    ''
);

select * from finish();
rollback;
