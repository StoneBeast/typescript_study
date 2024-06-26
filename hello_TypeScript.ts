let val = 'hello TypeScript'

hello(val)

function hello(text: string):void {
    console.log(text)
}

interface Person {
    readonly  id: string,   //  只读属性，只有在创建时才能被赋值
    name: string,
    age: number,
    sex?: string,   //  可选属性
    [propName: string]: any //  任意类别和数量的其他属性，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是任意属性的子集
}

let tim: Person = {
    id: '11223',
    name: 'tim',
    age: 12
}

// 数组有两种声明方式
let numArr1: number[] = [1, 2, 3]
let numArr2: Array<number> = [1, 2, 3, 4]

//  甚至还可以使用接口来声明数组，但是这种方式并不常用：
interface numArr {
    [propName: number]: number
}

let numArr3: numArr = [1, 2, 3, 4]

//  ts 中定义函数的方式
// ts中也像js一样支持可选参数、默认值等
function func1(arg1: number, arg2: number): number {
    return arg1 + arg2
}

let func2 : (arg1: number, arg2: number) => number

func2 = function (arg1: number, arg2: number): number {
    return arg1 + arg2
}

//  也可以使用接口定义函数
interface func {
    (arg1: number, arg2: number): number
}

let funcInt: func
funcInt = function (arg1, arg2):number {
    return arg1+arg2
}


//  类型断言
/*
* 类型断言是指将某个类型的变量断言为另一个类型，常用在将联合类型的变量断言为其中某一个类型的场景
* 类型断言有两种写法，但是第二种写法在某些场景不兼容，所以推荐第一种写法
* VAL as TYPE
* <TYPE>VAL
* */



interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}

/*
* 断言的限制
    联合类型可以被断言为其中一个类型
    父类可以被断言为子类
    任何类型都可以被断言为 any
    any 可以被断言为任何类型
    要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可；因为子类含有所有父类的属性和方法，所以子类是兼容父类的
* */
/*
*   由上可知，任何类型都可以被断言为any，而any也可以被断言为任何类型，
*   那么任何类型经过双重断言之后，也可以变成任何类型，但是非常不推荐这种用法
* */


//  类型别名，常用于联合类型

type myStr = string
type myUnion = string | number
let myStrVal: myStr
myStrVal = '123'

let u1: myUnion
u1 = 123
let u2: myUnion = 'hello'

console.log(`u1: ${u1}, u2: ${u2}`)

//  元组可以理解为固定每个元素的类型的有限长度的数组，当元素溢出后，元组的元素类型将被限定为
//  元组中之前所有元素的类型的联合类型

let eg: [string, number] = ['str', 123]

eg.push('123') //   合法
// eg.push(true) // 非法

console.log(`eg[0]: ${eg[0]}`)

//  枚举
enum Days {
    Sun,
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    sat
}

console.log(Days.Sun, typeof (Days[1])) // 0 string
console.log(Days.Sun, Days[1]) // 0 Mon

/*
    ts中的枚举类型同样可以手动赋值，没有被赋值的元素则会自主递增，但是如果递增的值和
    前面手动赋值的元素重复了，则会出现覆盖的现象

    枚举中也可以使用计算所得的值进行赋值
 */
enum Color {Red, Green, Blue = "blue".length}   //通过编译
// enum Color {Red = "red".length, Green, Blue} //编译报错，因为无法获得初始值，同时又没有被手动赋值

/*
* 泛型部分
* */
//  应用场景1：当要创建一个函数，函数的返回内容是返回一个带有设定值的数组，那么在ts的类型环境下，要么要将
//  返回数组的元素的类型设置为any，要么就需要一种类型的数组写一个函数，这时就需要用到泛型了

//  一般情况
function getAnyArry(length: number, defVal: any): Array<any> {
    let arr: any[] = []

    for (let i = 0; i < length; i++) {
        arr[i] = defVal
    }

    return arr
}

let res = getAnyArry(5, 'hello')
console.log('get any array: ', res)

//  使用泛型
function getTypeArry<T>(length: number, defVal: T): Array<T> {
    let arr: Array<T> = []

    for (let i = 0; i < length; i++) {
        arr[i] = defVal
    }

    return arr
}

//  这里手动指定了泛型的类型，也可以不指定，让编译器自行推断
let tArry = getTypeArry<number> (5, 3)
// let tArry = getTypeArry (5, 3)
console.log('get typed array: ', tArry)

//  同时泛型也支持一次指定多个类型

/*
*   泛型约束，函数内使用泛型时，不能确定参数具体的类型，所以就无法对参数进行一些操作
* */

// function testF<T> (arg: T): T {
//     console.log(arg.length) //  编译器会在这里报错，因为无法判断arg中是否有length成员
//
//     return arg
// }

//  这时可以使用泛型约束
interface lengthWish {
    length: number
}

function testF<T extends lengthWish> (arg: T): T {
    console.log('arg length: ', arg.length)

    return arg
}

let arg = 'hello!'
arg = testF(arg)

// testF(1) //  编译器报错，因为数字类型中没有length成员

//  类型之间也可以互相约束

function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });

console.log('x: ', x)

//  可以使用含有泛型的接口定义函数的形状
interface CreateArrayFunc {
    <T> (length: number, defVal: T): Array<T>
}

let Tfunc1: CreateArrayFunc
Tfunc1 = function <T>(length, defVal): Array<T> {
    let arr: T[] = []

    for (let i = 0; i < length; i++) {
        arr[i] = defVal
    }

    return arr
}

console.log('Tfunc1: ', Tfunc1(5, 2))

//  将上面写法中接口的泛型提到上面
interface CreateArratFunc2<T> {
    (length: number, defVal: T): T[]
}

let TFunc2: CreateArratFunc2<number>
TFunc2 = function<T> (length, defVal): T[] {
    let arr: T[] = []

    for (let i = 0; i < length; i++) {
        arr[i] = defVal
    }

    return arr
}

console.log('Tfunc2: ', TFunc2(5, 22))

//  泛型类
class GenericNumber<T> {
    zeroVal: T
    add: (a: T, b: T) => T
}

let gI = new GenericNumber<number>()
gI.zeroVal = 0
gI.add = function (a, b) {
    return a+b
}

/*
*   泛型默认值
* */
function createArray<T = string>(length: number = 4, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
console.log('createArray: ', createArray(2, 12))