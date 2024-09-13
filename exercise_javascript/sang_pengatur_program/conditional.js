// The ternary operator requires three operands in the following order:
// The condition to be checked is written before the question mark (?)
// Expression that is executed if the condition is true.
// The expression that is executed if the condition is false.

const gajiBulanIni = 4500000;
const tagihanSpp = true;
const jajanGak = tagihanSpp ? 1800000 : gajiBulanIni;
console.log("Gaji bersihmu:", jajanGak);

const number = 2;

switch (number) {
case 1:
  console.log('Ini 1');
  break;
case 2:
  console.log('Ini 2');
case 3:
  console.log('Ini 3');
  break;
default:
  console.log('Ini default');
}
