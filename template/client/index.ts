// find the sum of all the numbers in the array
export const sum = (arr: number[]): number => {
  return arr.reduce((acc, curr) => acc + curr, 0);
};
// find the average of all the numbers in the array
export const average = (arr: number[]): number => {
  return sum(arr) / arr.length;
};

// example usage
const numbers: number[] = [10, 20, 30, 40];
console.log(sum(numbers)); // 100

console.log(average(numbers)); // 25
