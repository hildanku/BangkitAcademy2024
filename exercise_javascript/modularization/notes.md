## Modularization
- the function of Modularization is the breakdown a one file or entity to some fraction
- why we should use modularization?
    - i think, if we implement modularization, it will be easier to read the code structure and will easier to maintenance the code
    - Reusable


### i.e import export

> export default function myFunction() {
  console.log('Ini adalah function export default.');
}

> import myFunction from './anotherfile.mjs';

myFunction();

### i.e named imports
> export function myFunction() {
  console.log('Ini adalah contoh named import.');
}

> import { myFunction } from './anotherfile.mjs';
myFunction();

### i.e named imports with more than one func
> const name = 'John';
const email = 'john@gmail.com';
const age = 25;

export { name, email, age };

> import { name, email, age } from './anotherfile.mjs';

console.log(name);
console.log(email);
console.log(age);

### i.e named import with many function

> import * as variable from './anotherfile.mjs';

console.log(variable.name);
console.log(variable.email);
console.log(variable.age);

#### Information
- Named export is suitable when you want to export multiple values from one module. In addition, named export requires us to write specific function/method/variable names when importing them. Writing specific names makes the codebase consistent.

- Default export is suitable to avoid conflicts when importing it because we don't need to write the function/method/variable according to its name. In addition, default export makes the structure clearer because in one module there is only one exported value.
