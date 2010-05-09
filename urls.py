from django.conf.urls.defaults import *
from django.conf import settings

urlpatterns = patterns('',
    (r'', include('lmddgtfy.search.urls')),
)

if settings.DEBUG:
    urlpatterns += patterns('',
        (r'^static/(?P<path>.*)$', 'django.views.static.serve',
         {'document_root': settings.STATIC_DOC_ROOT}),
    )
