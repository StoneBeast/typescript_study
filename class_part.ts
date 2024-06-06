/*
* 与 java一样，ts中也有public、private和protected关键字，作用也和java中几乎相同
* public: 可以外部访问
* private: 只能内部访问
* protected: 只能内部或者子类中访问
* */

class Animal {
    public name
    private age
    public constructor(name, age) {
        this.name = name
        this.age = age
    }
}

let ani1 = new Animal('tom', 12)
console.log('name: ', ani1.name)
// console.log('name: ', ani1.name, + 'age: ', ani1.age)    // 编译报错

class Person {
    public name
    private constructor(name) {
        this.name = name
    }
}

// let p1 = new Person('tom')  //  报错，只用private关键字修饰构造函数，该类不允许被继承或实例化

/*
class WorkMan extends Person {
    constructor(name) {
        super(name);
    }
}
报错
*/

class Food {
    public name
    protected constructor(name) {
        this.name = name
    }
}

// let food1 = new Food('apple')    //  报错，被protected关键字修饰构造函数的类只允许被继承

//  修饰符和readonly关键字还可以直接被使用在构造函数中

class Day {
    //  public name: string
    public constructor(public name) {
        // this.name = name
        /*
            修饰符直接写在了构造函数中
         */
    }
}

/*
    readonly是制度属性关键字，只允许出现在属性声明或索引签名或构造函数中
 */

class App {
    // public readonly name
    public constructor(public readonly name) {
        // this.name = name
    }
}

/*
    abstract 抽象类不能被实例化，只能被继承，抽象类中的抽象方法必须由子类中实现
 */

abstract class ABClass {
    protected constructor(public name: string) {
    }

    public abstract sayHi(val: string):void;
}

class EClass extends ABClass {
    public constructor(name: string) {
        super(name);
    }

    public sayHi(args: string) {
        console.log('EClass say hi: ', this.name, 'args: ', args)
    }
}

let ee = new EClass('eName')
ee.sayHi('arg')

/*
*   static修饰静态属性，效果与java中相同
* */

class SClass {
    public constructor(public name: string) {
    }

    static sayHiFromStatic(arg: string): void {
        console.log('say hi from static, arg: ', arg)
    }
}

SClass.sayHiFromStatic('hello!')