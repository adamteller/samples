/**
 * It's ok to teach yourself things that others just "know or knew a long time ago"
 * In this example, we step through the long-form of "map" and "filter" functions.
 * "Map" is applied to all array elements and "filter" returns what meets critera.
 * These functions are re-inventions of wheel. map & filter functions exist in JS.
 */
function filter (array, test) {
    let passed = [];
    for (let element of array) {
        if (test(element)) {
            passed.push(element);
        }
    }
    return passed;
}

function map (array, transform) {
    let mapped = [];
    for (let element of array) {
        mapped.push(transform(element));
    }
    return mapped;
}
nums = [2,4,5,6,7,8,12];

console.log(filter(nums, n => n % 2 == 0));

cars = ['Hemi Cuda', 'Chevelle', 'Monte Carlo', 'Charger', 'Mustang', 'Camaro', 'Trans Am', 'GTO'];

const upTransform = s => s.toUpperCase();
console.log(map(cars, upTransform));
console.log(filter(cars, s => s.startsWith('G'))); // ["GTO"]

// And now, using the built-in map and filter functions...
console.log(cars.filter(c => c.startsWith('C'))); // ["Chevelle", "Charger", "Camaro"]
console.log(cars.map(upTransform)); 
//["HEMI CUDA", "CHEVELLE", "MONTE CARLO", "CHARGER", "MUSTANG", "CAMARO", "TRANS AM", "GTO"]
