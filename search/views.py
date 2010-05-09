import urllib
import redis
from django.shortcuts import render_to_response

r = redis.Redis()

def index(request):
    query = request.GET.get('q')
    if not query:
        return render_to_response('index.html')

    type = request.GET.get('v', '')

    r.incr("total_searches")
    r.incr("q:%s:views" % urllib.quote(query))
    return render_to_response('lmddgtfy.html', {'query': query,
                                                'type': type})
