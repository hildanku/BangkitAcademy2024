// Map is data type for assign a datra with key value
// map can use any data type 
const fruitMap = new Map([
    ['1', 'Tahu', 500],
    ['Bakso', 350],
    ['Seblak', 250]
  ]);
  
  console.log(fruitMap); // Map(3) { '1' => 'Tahu', 'Bakso' => 350, 'Seblak' => 250 }

// menyimpan data menggunakan Map
fruitMap.set('Gorengan', 500);
console.log(fruitMap);
//  Map(4) {
//   '1' => 'Tahu',
//   'Bakso' => 350,
//   'Seblak' => 250,
//   'Gorengan' => 500
// }
// akses data pada map
let getValue = fruitMap.get(1); // undefined
console.log(fruitMap.get('1')); // tahu