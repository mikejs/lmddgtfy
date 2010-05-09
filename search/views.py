import urllib
import redis
from django.shortcuts import render_to_response

r = redis.Redis()

def index(request):
    query = request.GET.get('q')
    if not query:
        return render_to_response('index.html')

    type = request.GET.get('v', '')
    quoted_query = urllib.quote(query).replace(':', '_')

    r.incr("total_searches")
    r.incr("q:%s:views" % quoted_query)
    r.incr("q:%s:%s:views" % (quoted_query, type))
    r.sadd("queries", quoted_query)
    r.zincr("zqueries", quoted_query)
    return render_to_response('lmddgtfy.html', {'query': query,
                                                'type': type})
