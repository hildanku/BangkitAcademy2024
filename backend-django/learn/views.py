from django.shortcuts import render

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def movies(request):
    if request.method == 'GET':
        response = "Agak Laen, Warkop DKI Reborn Part 1, Pengabdi Setan 2, Dilan, Sewu Dino"
        return HttpResponse(response)
    elif request.method == 'POST':
        response = "Data movie berhasil ditambahkan."
        return HttpResponse(response)
    # else
    response = f"Halaman tidak dapat diakses menggunakan {request.method} request"
    return HttpResponse(response)
