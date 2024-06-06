`let val: number|string` 这里类似 `number|string` 的组合被称为联合类型，联合类型在被赋值的时候会被自动推断
为一个类型，例如 `val = 5` 这里val被推断为number类型，因此通过它可以访问number类的属性，而访问不了string类的属性，
而在被直接访问时，则只能访问 number 和 string 的共有属性
```ts 
function func(arg: string|number): void {
    console.log(arg.length) // length 是string类型的私有属性，而不是公共属性，因此，这里编译时会直接报错 
}