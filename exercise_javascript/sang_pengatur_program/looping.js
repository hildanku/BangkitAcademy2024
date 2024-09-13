// FOR
// Since the arrival of ES6, for has been subdivided into several types.
//  Currently, for consists of for loop, for in, for of.

// i.e for loop
// for (var; condtion; increment) {
//     // do something
//   }

for (let a = 0; a < 6; a++) {
    console.log(a)
}
// i.e for in

const person = { name: 'tankbajahitam', origin: 'Bandung', birthYear: 2025 };

for (const property in person) {
  console.log(`${property} bernilai ${person[property]}`);
}

// i.e for of
const daftarMenu = ['Tahu', 'Seblak', 'Telor Rebus', 'Nasi Rebus'];

for (const itemMenu of daftarMenu) {
  console.log(itemMenu);
}

// i.e while
let i = 0;

while (i < 5) {
  console.log(`Angka ke-${i} adalah ${i}.`);
  i++;
}

// i.e do while
let x = 0;

do {
  console.log(`Angka ke-${i} adalah ${i}.`);
  x++;
} while (x < 5);

// FACT
// Actually, while and do-while are not that different.
//  Their difference is in the order of checking the conditions.
//   While performs condition evaluation at the beginning, while do-while does it at the end.
//    Here is the structure of do-while.
