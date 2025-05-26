# method is divided into 3
# 1. method from object
# 2. static method
# 3. class method

# method from object
#

class Car:
    def __init__(self, warna, kecepatan):
        self.warna = warna
        self.kecepatan = kecepatan

    def activate_turbo(self):
        self.kecepatan += 50


mobil = Car('blue', 10)

print("Sebelum ditambahkan: ")
print(mobil.kecepatan)
mobil.activate_turbo()        # Memanggil metode tambah_kecepatan.
print("Setelah ditambahkan: ")
print(mobil.kecepatan)


# static method is method without self
# static is indpeendt
class Human:
    def __init__(self, name):
        self.name = name

    @staticmethod
    def say_rawr():
        print("RAWRRRR")


Human.say_rawr()

# class method


class Smartphone:
    def __init__(self, brand):
        self.brand = brand

    @classmethod
    def message_from_ceo(cls):
        print("Helloooo")


Smartphone.message_from_ceo()
simsang = Smartphone("simsang")
simsang.message_from_ceo()
