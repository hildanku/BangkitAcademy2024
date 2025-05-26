
class Mobil:
    def __init__(self, warna, merek, kecepatan):
        self.warna = warna
        self.merek = merek
        self.kecepatan = kecepatan

    def tambah_kecepatan(self):
        self.kecepatan += 10


mobil_1 = Mobil("Merah", "Ferura", 160)
print(mobil_1.kecepatan)


class MobilSport(Mobil):
    def turbo(self):
        self.kecepatan += 50

    # override / menimpa
    def tambah_kecepatan(self):
        self.kecepatan += 20
        # super
        super().tambah_kecepatan()
        print("kecepatan sekarang", self.kecepatan)


mobil_1 = Mobil("Merah", "Ferura", 160)
print(mobil_1.kecepatan)

# Kelas Mobil Sport
mobil_sport_1 = MobilSport("Hitam", "Toyota", 160)
# overriding
mobil_sport_1.tambah_kecepatan()
print(mobil_sport_1.kecepatan)

mobil_sport_1.turbo()
print(mobil_sport_1.kecepatan)

"""
    super concepts is to avoid repetitive code and utilise functions
    that already exist in the parent class (super class).

"""
