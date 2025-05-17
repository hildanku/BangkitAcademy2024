# Transformation

# change upper lower
x = 'loveyou3000'
print(x.upper())

p = 'HAHAHAHA KU TERTAWA'
print(p.lower())

# remove whitespace
x = '    hahaha    '
print(x.strip())
print(x.rstrip())
print(x.lstrip())
print(x.strip())

# if want to remove specific character
x = 'hahaha kuhahaha'
print(x.strip('haha'))

# startswith method

x = 'sometimes i feel like i am not human'
print(x.startswith('sometimes'))
print(x.startswith('sometimes i feel'))
if (x.startswith('sometimes i feel')):
    print('Yes')
else:
    print('No')

print(' '.join(['Aku', 'Anak', 'Indonesia', '!']))

# split
x = 'aku anak indonesia'
print(x.split(' '))

# replace
x = 'aku peyapping handal'
print(x.replace('peyapping', 'pengoding'))

# isUpper
up = 'HAHAHAHAHA'
if (up.isupper()):
    print('iya')
else:
    print('nggak')

# isalpha
print('haha'.isalpha())

# isspace
print('  xxx'.isspace())

# string literal
hari = "Jum'at"
print(hari)

print("Halo!\nKapan terakhir kali kita bertemu?\nKita bertemu hari Jum\'at yang lalu.")
