# tuple is list with immutable

x = (1, "Dicoding", 1+3j)
print(type(x))

# set
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

union = set1.union(set2)
print("Union:", union)
intersection = set1.intersection(set2)
print("Intersection:", intersection)


# dictionary
x = {
    'name': 'Hildan',
    'age': 20,
}

print(type(x))
# print(x[0]) will error key error = 0
# because i want to access data by index
print(x['name'])
# add data to dictionary
x['address'] = 'Indonesia'
print(x)
# delete data from dictionary
del x['address']
print(x)
# change data from dictionary
x['name'] = 'E'
print(x)

# Convert data type
# if i want to convert data type, just wrap with <type>(<value>)
# example
x = 1
print(type(x))
x = str(x)
print(type(x))

# we can't convert like this
# print(int("1k")) it will be error
