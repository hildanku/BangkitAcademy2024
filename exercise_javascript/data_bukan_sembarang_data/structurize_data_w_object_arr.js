const user = {};
// object structuring
const products = {
    name: 'Sepatu',
    price: 230000,
    'description': 'sepatu kerennn' 

};
console.log(products.name)
console.log(products['description'])


// object destructuring

const { name, price, description} = products;
console.log(description)

delete products.description;
console.log(products)

// Array form
const arr = Array.from('badutttt');
console.log(arr);
//Array.from juga dapat dimanfaatkan untuk menyalin array lainnya seperti berikut ini
const prod = new Array('ingin', 'menjadi', 'programmer',
                         'handal', 'namun', 'enggan', 'mengoding');
const judulGrup = Array.from(prod);
console.log(prod);
// array literal
const fruits = ['apple', 'gedang'];
console.log(fruits)
// akses elemen array
console.log(fruits[1])
// manipulasi array
fruits[1] = "janz";
console.log(fruits)

// menambahkan nilai ke array menggunakan push
fruits.push('tahu')
console.log(fruits)
// delete nilai pada array
delete fruits[2];
console.log(fruits) // [ 'apple', 'janz', <1 empty item> ]
// Method splice membutuhkan dua parameter yaitu indeks dari 
// element yang ingin dihapus dan jumlah element yang ingin dihapus.
// fruits.splice(1,2)
console.log(fruits) // [ 'apple' ]

// kita juga bisa menggunakan push dan pop
// Kekurangan dari kedua method ini adalah tidak sefleksibel delete dan splice 
// karena shift hanya menghapus element pertama dan pop menghapus element terakhir.

// reverse
fruits.reverse()
console.log(fruits) // [ <1 empty item>, 'janz', 'apple' ]
// reverse akan melakukan pembalikan nilai array

//Secara default, method sort akan mengurutkan berdasarkan abjadnya. 
fruits.sort();
console.log(fruits)

