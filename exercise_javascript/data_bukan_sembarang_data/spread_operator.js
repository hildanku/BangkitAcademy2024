// spread opereator is used to spread a data in object and array
// The spread operator characterized by the three-dot syntax (...) 
// is an interesting feature and helps in the management of objects and arrays.
// By using the spread operator, object and array values can be iterated into multiple elements. 

// use case spread operator
// merge arr, 
// merge arg to function 
// i.e :
const numbers = [5, 10, 15, 20];
console.log(Math.max(...numbers));

// merge object
// i.e : 
const userFromAPIA = { id: 1, name: 'John', email: 'john@example.com' };
const userFromAPIB = { age: 30, address: '123 Main St' };
const fullUserInfo = { ...userFromAPIA, ...userFromAPIB };

console.log(fullUserInfo);
