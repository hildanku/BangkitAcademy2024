from django.shortcuts import render

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def movies(request):
    if request.method == 'GET':
        search = request.GET.get('search')
        if search:
            response = f"Mencari movie dengan judul {search}"
            return HttpResponse(response)
        response = "Agak Laen, Warkop DKI Reborn Part 1, Pengabdi Setan 2, Dilan, Sewu Dino"
        return HttpResponse(response)
    elif request.method == 'POST':
        body = request.body
        data_decode = body.decode('UTF-8')
        response = "Data movie {data_decode} berhasil ditambahkan."
        return HttpResponse(response)
    elif request.method == 'PUT':
        content_type = request.headers['content-type']
        return HttpResponse(content_type)
    
    # Mengembalikan respon jika metode HTTP tidak didukung
    response = f"Halaman tidak dapat diakses menggunakan {request.method} request"
    return HttpResponse(response)
 
def detail_movie(request, id):
    response = f"Menampilkan detail movie dengan id {id}"
    return  HttpResponse(response)


