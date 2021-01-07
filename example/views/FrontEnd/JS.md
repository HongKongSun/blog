---
title: JS
date: 2020-07-24
tags:
 - JavaScript      
categories: 
 - FrontEnd
---

### 1. ES 6语法

#### `1`.let&const

- let 会产生块级作用域,存在暂时性死区 不会造成变量提升,无法重复声明已存在变量(但可以重新赋值);
- const是常量，若是基本数据类型,具有不变性(无法重新赋值改动)；引用值可以调整内部值(可能设计的时候没有考虑周全!

```js
console.log(a)  // ReferenceError: a is not defined
let a = 3

/*
	为什么会报一个ReferenceError错误，难道let和const声明的变量没有被“提升”吗？
事实上所有的声明（function, var, let, const, class）都会被“提升”。但是只有使用var关键字声明的变量才会被初始化undefined值，而let和const声明的变量则不会被初始化值。
*/
```



- 只有在执行阶段JavaScript引擎在遇到他们的词法绑定(赋值)时，他们才会被初始化。这意味着在JavaScript引擎在声明变量之前，无法访问该变量。这就是我们所说的**Temporal Dead Zone**，即变量创建和初始化之间的时间跨度，它们无法访问。



```js
/*
如果JavaScript引擎在let和const变量被声明的地方还找不到值的话，就会被赋值为 undefined 或者返回一个错误(const的情况下)。
*/


let a
console.log(a)  // undefined
a = 5
```

- 在编译阶段，JavaScript引擎遇到变量`a`并将它存到词法环境中，但因为使用`let`关键字声明的，JavaScript引擎并不会为它初始化值，所以在编译阶段，此刻的词法环境像这样:

```
lexicalEnvironment = {
  a: <uninitialized>
}
```

- 如果我们要在变量声明之前使用变量，JavaScript引擎会从词法环境中获取变量的值，但是变量此时还是`uninitialized`状态，所以会返回一个错误`ReferenceError`。

- 在执行阶段，当JavaScript引擎执行到变量被声明的时候，如果声明了变量并赋值，会更新词法环境中的值，如果只是声明了变量没有被赋值，那么JavaScript引擎会给变量赋值为`undefined`。

  

```js
//tips： 我们可以在`let`和`const`声明之前使用他们，只要代码不是在变量声明之前执行:

function foo() {
    console.log(name)
}

let name = 'John Doe'

foo()   // 'John Doe'
```

**JavaScript引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。**

**总结**

> `let` 的「创建」过程被提升了，但是初始化没有提升。
> `var` 的「创建」和「初始化」都被提升了。
> `function` 的「创建」「初始化」和「赋值」都被提升了

#### 2.解构赋值（析构赋值）

> 解构赋值语法是一种 Javascript 表达式。通过解构赋值, 可以将属性/值，从对象/数组中取出,赋值给其他变量。

解构赋值在日常工作中使用频率非常高，不过通常仅仅是粗浅的使用而已，实际上，解构赋值的内容其实并不算少。

在 ES6，解构赋值有以下几种情况（按日常使用频率为优先级排序）：

- 数组
- 对象
- 函数参数
- 其他

##### `1`.数组解构赋值

在数组的解构赋值中，按照如下格式：

```javascript
let/const [a, b, c...] = x
```

可以将值从右边的**可迭代对象**中取出，具体可见下面例子：

```javascript
// 完全解构
let [a, b, c] = [1, 2, 3]; // a = 1, b = 2, c = 3
let [a, [[b], c]] = [1, [[2], 3]]; // a = 1, b = 2, c = 3
let [a, b, c, ...o] = [1, 2, 3, 4, 5, 6, 7]; // a = 1, b = 2, c = 3, o = [4, 5, 6, 7]

// 不完全解构
let [a, b] = [1, 2, 3]; // a = 1, b = 2
let [a, [b], d] = [1, [2, 3], 4]; // a = 1, b = 2, d = 4

// 解构失败
let [a] = []; // a = undefined
let [a, b] = [1]; // a = 1, b = undefined

// 不可迭代对象
let [a] = 1; // Uncaught TypeError: 1 is not iterable
let [a] = false; // Uncaught TypeError: false is not iterable
let [a] = {}; // Uncaught TypeError: {} is not iterable
```

事实上，只要等号右边的数据结构具有 `Iterator` 接口，就可以用数组的解构赋值方式解构：

```javascript
let [a, b, c] = new Set([1, 2, 3]); // a = 1, b = 2, c = 3

//（关于 function 后面的 * 和函数里的 yield，在本章后面的生成器中会详细提到。）

function* generator() {
  let a = 0;
  while (true) {
    yield a;
    [a] = [a + 1];
  }
}
let [a, b, c] = generator(); // a = 1, b = 2, c = 3
```

在日常工作中，解构赋值除了方便将等号右边解构出我们想要的值以外，还有以下小技巧：

```javascript
// 数组合并let a = [1, 2, 3];
let b = [4, 5, 6];
let [...c] = [...a, ...b]; // c = [1, 2, 3, 4, 5, 6]

// 类数组转数组
let arr = [...arrLike]

// 交换变量的值
let a = 1;
let b = 2;
[b, a] = [a, b];
```

值得一提的是，解构赋值操作是**浅拷贝**：

```javascript
let org = [1, [2, 3], 4];
let [...tar] = org;
tar[1][1] = 5; // org = [1, [2, 5], 4]
```

##### 2.对象解构赋值

同数组的解构赋值类似，对象的解构赋值也可以按照如下格式从右边的对象中取出对应的值：

```javascript
let { a: a, b: b, c: c, d: d } = { a: 1, b: 2, c: 3 }
// a = 1
// b = 2
// c = 3
// d = undefined
```

从上述代码可以知道关于对象解构赋值的几个基本特征：

- `:` 左边是匹配模式，匹配右边的同名属性名
- `:` 右边是被赋值的变量
- 如果匹配模式在右边无法找到同名属性名，则返回 `undefined`

当然，如果是同名赋值的话，我们可以简写成如下形式：

```javascript
let { a, b, c, d } = { a: 1, b: 2, c: 3 }
// a = 1
// b = 2
// c = 3
// d = undefined
```

与数组的解构赋值类似，对象的解构赋值也可以嵌套使用，见下：

```javascript
let { out: { mid: { in: myValue } } } = { out: { mid: { in: "value" } } } // myValue = "value"
let { out: [a, b, { in: myValue }] } = { out: [1, 2, { in: "value" }] } // a = 1, b = 2, myValue = "value"
```

值得一提的是，在 `JavaScript` 中，数组也是一种特殊的对象，所以对于数组，我们也可以使用对象的解构赋值进行解构：

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7]
let { 0: first, [arr.length - 1]: last } = arr // first = 1, last = 7
```

最后，对于已经定义的变量，想要使用解构赋值的话，需要借助圆括号（因为如果以 `{` 作为开头的话， `JavaScript` 引擎会将这里当做一个代码块）：

```javascript
let a
{ a } = { a: "hello" } // SyntaxError: Unexpected token
({ a } = { a: "hello" }) // a = "hello"
```

##### 3.函数参数的解构赋值

同数组和对象的解构赋值，在参数位置进行结构赋值，可以将参数中对应的值取出：

```javascript
const fn = ([a, b]) => a + b
const fn = ({ a, b }) => [a, b]
```

配合 es6 新增的 `rest` 参数，可以帮助我们方便地将一组参数与变量名对应起来

```javascript
//不是很明白咋回事

const fn = ({ a = 1, b = 2, c = 3 }, ...args) => [a, b, c, ...args].reduce((pre, cur) => pre + cur, 0)
fn({ c: 11, a: 5 }, 8, 5, 3, 3, 4) // 41
```

##### 4.其他

当对非对象进行解构赋值操作的时候，会先将 `=` 右边的值转化成一个对象：

```javascript
// 数值
let { toString: n2s } = 1
n2s === Number.prototype.toString // true

// 布尔值
let { toString: b2s } = true
b2s === Boolean.prototype.toString // true

// 字符串
/* 由于字符串对象是一个类数组，所以可以用以下方式解构赋值 */
let [a, b, c] = "str" // a = 's', b = 't', c = 'r'
let { 0: a, 1: b, 2: c, length: len, toString: s2s } = "str" // a = 's', b = 't', c = 'r', len = 3
s2s === String.prototype.toString // true

// null && undefined
let { a } = null // TypeError: Cannot destructure property `a` of 'undefined' or 'null'
let { a } = undefined // TypeError: Cannot destructure property `a` of 'undefi
```



#### 3.字符串的扩展（字符串模板&新增方法）

##### 1.模板字符串

在日常开发中，我们大多仅仅将模板字符串当成一种拼接字符串的语法糖来用，如下：

```javascript
const flag = 'flag'
const strEs5 = 'this is a ' + flag + ' !'
const strEs6 = `this is a ${flag} !`
```

事实上，模板字符串能做的相当多，在 `${}` 中可以放入任意的 `JavaScript` 表达式：

```javascript
// 比较
const DEBUG = 'ON'
const flag = `${DEBUG === 'ON'}`

// 执行函数
const str = `${(() => 'return a string')()}`

// 生成模板
const map = [
  [null, null, null,],
  [null, null, null,],
  [null, null, null,]
]

const checkerboard = checkerboard => `
<div class="checkerboard">
    ${checkerboard.map(row => `
    <div class="checkerboard-row">
    ${row.map(() => `
      <div class="checkerboard-col">
      </div>
    `).join('')}
    </div>
    `).join('')}
</div>`
```

其实到这里已经可以体现模板字符串的强大了，然而它的功能还不止这些，它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串，这被叫做**标签字符串**，这是什么意思呢？看看下面的代码就明白了：

```javascript
fn`hello world` // fn([ 'hello world' ])

const a = 1
const b = 2
fn`hello world ${a} ${b}` // fn([ 'hello world ', ' ', '' ], 1, 2)
```

通过上面的代码可以知道，标签字符串将模板字符串中那些没有变量替换的部分组合成一个数组作为函数的第一个参数，将剩下的部分作为剩余参数传给进行调用操作的函数，即 fn 可以这样接收参数，详细例子不做了。

##### 2.新增方法

ES6 为字符串新增了很多方法，这里只简单介绍一下日常工作中使用频率比较高的一些。

| 方法名     | 功能                                                         | 参数            | 返回值  | 例子                           |
| ---------- | ------------------------------------------------------------ | --------------- | ------- | ------------------------------ |
| includes   | 判断一个字符串是否是另一个字符串的子串                       | String          | Boolean | 'abcd'.includes('b') // true   |
| startsWith | 判断一个字符串是否以某字符串为开头                           | String          | Boolean | 'abcd'.startsWith('a') // true |
| endsWith   | 判断一个字符串是否以某字符串为结尾                           | String          | Boolean | 'abcd'.endsWith('d') // true   |
| repeat     | 返回一个新字符串，表示将原字符串重复 n 次                    | Number          | String  | 'x'.repeat(3) // xxx           |
| padStart   | 返回一个新字符串，表示将原字符串按照某字符串从**开头**补全到固定位数 | Number,  String | String  | 'x'.padStart(3, 'a') // aax    |
| padEnd     | 返回一个新字符串，表示将原字符串按照某字符串从**尾部**补全到固定位数 | Number, String  | String  | 'x'.padEnd(3, 'a') // xaa      |



#### `4`.箭头函数

##### 1.常规函数的写法

在ES6语法之前，JS中的函数由function关键字、params参数和被花括号包裹的函数体组成。为了与后面说到的箭头函数相区别，我们先把这样的函数叫做常规函数，常规函数既可以用声明式写法也可以用赋值式写法。例子：

```js
function test(name) {  //声明式写法
    console.log(name)
}
test('Jerry')

let test2 = function(name) {  //赋值式写法
    console.log(name)
}
test2('Tom')
复制代码
```

##### 2. 箭头函数的写法

ES6箭头函数的引入，使函数的写法变的更加简洁，但在书写上要遵循一定的规则。

- **规则一：箭头函数只能用赋值式写法，不能用声明式写法**

```js
const test = (name) => {
    console.log(name)
}
test('Jerry')
```

- **规则二：如果参数只有一个，可以不加括号，如果没有参数或者参数多于一个就需要加括号**

```js
const test = name => {
    console.log(name)
}
test('Jerry')

const test2 = (name1, name2) => {
    console.log(name1 + ' and ' + name2)
}
test2('Tom', 'Jerry')
```

- **规则三：如果函数体只有一句话，可以不加花括号**

```js
const test = name => console.log(name) 
```

- **规则四：如果函数体没有括号，可以不写return，箭头函数会帮你return**

```js
const add = (p1, p2) => p1 + p2
add(10, 25)
```

记住：函数体的花括号与return关键字同在。

从以上的例子我们可以看出，箭头函数对常规函数的圆括号和花括号都进行了简化。除了这些简化，箭头函数对于常规函数最大的优化之处在于this。

##### 3.理解常规函数中this

在探讨箭头函数对于this的优化之前，我们先得明白this究竟是什么，以及它是如何使用的。**this是使用call方法调用函数时传递的第一个参数，它可以在函数调用时修改，在函数没有调用的时候，this的值是无法确定。**

如果没有使用过call方法来调用函数的话，上面的对于this的定义可能不太明白。那么我们需要先理解函数调用的两种方法。

###### 1. 纯粹的函数调用

第一种方法最常见，例子如下：

```
function test(name) {
    console.log(name)
    console.log(this)
}
test('Jerry')  //调用函数
```

这种方法我们使用最多，但是这种函数调用方法只是一种简写，它完整的写法是下面这样的：

```
function test(name) {
    console.log(name)
    console.log(this)
}
test.call(undefined, 'Tom')
```

注意到上面调用函数的call方法了吗？**call方法接收的第一个参数就是this，这里我们传了一个undefined**。那么，依据定义，函数执行了之后打出来的this会是undefined吗？也不是。

> 如果你传的 context 就 null 或者 undefined，那么 window 对象就是默认的 context（严格模式下默认 context 是 undefined）。

所以这里我们打出来的this是Window对象。

###### 2. 对象中函数的调用

直接看例子：

```
const obj = {
    name: 'Jerry',
    greet: function() {
        console.log(this.name)
    }
}
obj.greet()  //第一种调用方法
obj.greet.call(obj) //第二种调用方法
```

例子里第一种调用方法只是第二种调用方法的语法糖，第二种才是完整的调用方法，**而且第二种方法厉害的地方在于它可以手动指定this**。

手动指定this的例子：

```
const obj = {
    name: 'Jerry',
    greet: function() {
        console.log(this.name)
    }
}
obj.greet.call({name: 'Spike'})  //打出来的是 Spike
```

从上面的例子我们看到greet函数执行时this，已经被我们改过了。

###### 3. 构造函数中this

构造函数里的this稍微有点特殊，每个构造函数在new之后都会返回一个对象，这个对象就是this，也就是context上下文。

例子：

```
function Test() {
    this.name = 'Tom'
}
let p = new Test()
console.log(typeof p)  //object
console.log(p.name)    // Tom
```

###### 4. window.setTimeout()和window.setInterval()中函数的调用

window.setTimeout()和window.setInterval()的函数中的this有些特殊，里面的this默认是window对象。

**简单总结一下：函数完整的调用方法是使用call方法，包括`test.call(context, name)`和`obj.greet.call(context,name)`，这里的context就是函数调用时的上下文，也就是this，只不过这个this是可以通过call方法来修改的；构造函数稍微特殊一点，它的this直接指向new之后返回的对象；`window.setTimeout()`和`window.setInterval()`默认的是this是window对象。**

##### 4.理解箭头函数中的this

上面关于this讲了很多，this是函数用call方法调用时传递的第一个参数，而且它还可以手动更改，这样要确定this的值就太麻烦了。不过，箭头函数的出现给我们确定this帮了一些忙。

###### 1. 箭头函数的特性一：默认绑定外层this

上面提到：**this的值是可以用call方法修改的，而且只有在调用的时候我们才能确定this的值**。而当我们使用箭头函数的时候，**箭头函数会默认帮我们绑定外层this的值，所以在箭头函数中this的值和外层的this是一样的。**

不使用箭头函数例子：

```
const obj = {
	a: function() { console.log(this) }    
}
obj.a()  //打出的是obj对象
```

使用箭头函数的例子：

```
const obj = {
    a: () => {
        console.log(this)
    }
}
obj.a()  //打出来的是window
```

在使用箭头函数的例子里，**因为箭头函数默认不会使用自己的this，而是会和外层的this保持一致，最外层的this就是window对象。**

###### 2. 箭头函数的特性二：不能用call方法修改里面的this

这个也很好理解，我们之前一直在说，函数的this可以用call方法来手动指定，而为了减少this的复杂性，箭头函数无法用call方法来指定this。

例子：

```
const obj = {
    a: () => {
        console.log(this)
    }
}
obj.a.call('123')  //打出来的结果依然是window对象
```

因为上文我们说到window.setTimeout()中函数里的this默认是window，我们也可以通过箭头函数使它的this和外层的this保持一致：

window.setTimeout()的例子：

```
const obj = {
    a: function() {
        console.log(this)
        window.setTimeout(() => { 
            console.log(this) 
        }, 1000)
    }
}
obj.a.call(obj)  //第一个this是obj对象，第二个this还是obj对象
```

想必大家明白了，函数obj.a没有使用箭头函数，因为它的this还是obj，而setTimeout里的函数使用了箭头函数，所以它会和外层的this保持一致，也是obj；如果setTimeout里的函数没有使用箭头函数，那么它打出来的应该是window对象。

##### 5.多层对象嵌套里函数的this

这里是笔者在学习时遇到的一点疑惑。箭头函数里的this是和外层保持一致的，但是如果这个外层有好多层，那它是和哪层保持一致呢？

```
const obj = {
    a: function() { console.log(this) },
    b: {
    	c: function() {console.log(this)}
	}
}
obj.a()  // 打出的是obj对象, 相当于obj.a.call(obj)
obj.b.c() //打出的是obj.b对象, 相当于obj.b.c.call(obj.b)
```

上面的代码都符合直觉，接下来把obj.b.c对应的函数换成箭头函数，结果如下：

```
const obj = {
    a: function() { console.log(this) },
    b: {
    	c: () => {console.log(this)}
	}
}
obj.a()   //没有使用箭头函数打出的是obj
obj.b.c()  //打出的是window对象！！
```

obj.a调用后打出来的是obj对象，**而obj.b.c调用后打出的是window对象而非obj，这表示多层对象嵌套里箭头函数里this是和最最外层保持一致的。**

#### 5.promise

[promise](#`2`. 必考：promise 话题)

> Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大.所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果 --ES6入门-阮一峰
>
> `Promise` 对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态

特点：

- 对象的状态不受外界影响
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果
- `Promise` 新建后就会立即执行

```
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
})
```

> Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数

```
promise.then(function(value) {
  // success
}, function(error) {
  // failure
})
```

> then方法返回的是一个新的Promise实例
>
> `Promise.prototype.catch` 用于指定发生错误时的回调函数,具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获

```
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```

> `catch` 方法返回的还是一个 `Promise` 对象，因此后面还可以接着调用 `then` 方法

#### 6.async/await



> `async` 函数是什么？一句话，它就是 `Generator` 函数的语法糖

了解Generator函数的小伙伴，这里 [传送门](http://es6.ruanyifeng.com/#docs/generator)

`async` 特点：

`async` 函数返回一个 `Promise` 对象，可以使用 `then `方法添加回调函数。当函数执行的时候，一旦遇到 `await` 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句

`async` 函数内部 `return` 语句返回的值，会成为 `then` 方法回调函数的参数

`async` 函数返回的 `Promise` 对象，必须等到内部所有 `await` 命令后面的 `Promise` 对象执行完，才会发生状态改变，除非遇到 `return` 语句或者抛出错误

`async` 函数内部抛出错误，会导致返回的 `Promise` 对象变为 `reject` 状态。抛出的错误对象会被 `catch` 方法回调函数接收到 

```
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

> `await` 命令: `await` 命令后面是一个 `Promise` 对象，返回该对象的结果。如果不是 `Promise` 对象，就直接返回对应的值

```
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
```

> `await` 命令后面是一个`thenable`对象（即定义then方法的对象），那么`await`会将其等同于 `Promise` 对象.也就是说就算一个对象不是`Promise`对象，但是只要它有`then`这个方法， `await` 也会将它等同于`Promise`对象

使用注意点：

- `await` 命令后面的 `Promise` 对象，运行结果可能是 `rejected`，所以最好把 `await` 命令放在 `try...catch` 代码块中
- 多个 `await` 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发
- `await` 命令只能用在 `async` 函数之中，如果用在普通函数，就会报错







由于 JavaScript 是单线程执行模型，因此必须支持异步编程才能提高运行效率。异步编程的语法目标是让异步过程写起来像同步过程。

**1. 回调函数**

回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。

```js
const fs = require('fs')
fs.readFile('/etc/passwd', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data.toString())
})
```

回调函数最大的问题是容易形成回调地狱，即多个回调函数嵌套，降低代码可读性，增加逻辑的复杂性，容易出错。

```js
fs.readFile(fileA, function (err, data) {
  fs.readFile(fileB, function (err, data) {
    // ...
  })
}
```

**2. Promise**

为解决回调函数的不足，社区创造出 Promise。

```js
const fs = require('fs')

const readFileWithPromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

readFileWithPromise('/etc/passwd')
  .then(data => {
    console.log(data.toString())
    return readFileWithPromise('/etc/profile')
  })
  .then(data => {
    console.log(data.toString())
  })
  .catch(err => {
    console.log(err)
  })
```

Promise 实际上是利用编程技巧（可以学习下 Promise 的简单实现）将回调函数改成链式调用，避免回调地狱。最大问题是代码冗余，原来的任务被 Promise 包装了一下，不管什么操作，一眼看去都是一堆 then，原来的语义变得很不清楚。

**3. async、await**

为了解决 Promise 的问题，async、await 在 ES7 中被提了出来，是目前为止最好的解决方案。

```js
const fs = require('fs')
async function readFile() {
  try {    
    var f1 = await readFileWithPromise('/etc/passwd')
    console.log(f1.toString())
    var f2 = await readFileWithPromise('/etc/profile')
    console.log(f2.toString())
  } catch (err) {
    console.log(err)
  }
}
```

async、await 函数写起来跟同步函数一样，条件是需要接收 Promise 或原始类型的值。异步编程的最终目标是转换成人类最容易理解的形式。

#### 7.类及引入导出和继承( class/import/export/extends)

ES6 中有类 class 的概念，类 class 的继承是通过 extends 来实现的，ES5 中是通过设置构造函数的 prototype 属性，来实现继承的。

#### 8.ES6 的模块化与CommonJS的区别

commonJS 和 es6模块化 区别：
es6 {
　　export : '可以输出多个，输出方式为 {}' ，
　　export default : ' 只能输出一个 ，可以与export 同时输出，但是不建议这么做'，
　　解析阶段确定对外输出的接口，解析阶段生成接口，
　　模块不是对象，加载的不是对象，
　　可以单独加载其中的某个接口（方法），
　　静态分析，动态引用，输出的是值的引用，值改变，引用也改变，即原来模块中的值改变则该加载的值也改变，
　　this 指向undefined
}
commonJS {
　　module.exports = ... : '只能输出一个，且后面的会覆盖上面的' ，
　　exports. ... : ' 可以输出多个'，
　　运行阶段确定接口，运行时才会加载模块，
　　模块就是对象，加载的是该对象，
　　加载的是整个模块，即将所有的接口全部加载进来，
　　输出的是值的拷贝，即原来模块中的值改变不会影响已经加载的该值，
　　this 指向当前模块
}

#### 9.数值的扩展

ES6 对数值的扩展有很多：

- 新增了二进制和八进制的表示方法
- 指数运算符
- `BigInt`
- `Math` 扩展
- 新增方法

在日常前端开发中，我们主要关注其中一部分，下面单独介绍一下。

##### isInteger

`Number.isInteger()` 用于判断一个数是否是整数：

```javascript
Number.isInteger(7) // true
Number.isInteger(3.9) // false
```

需要注意的是，由于在 `JavaScript` 内部，整数和浮点数的存储方式相同，所以 `xxx.0` 会被认为是整数：

```javascript
Number.isInteger(7.0) // true
Number.isInteger(9.0) // true
```



##### isSafeInteger

> JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。

而 `Number.isSafeInteger()` 则用于判断某个整数是否落在这个区间之内：

```javascript
Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false
```



### `2`. 必考：promise 话题

#### 1.什么是promise

所谓的 promise，简单说就是一个容器，里面存在着某个未来才会结束的事件的结果。从语法上说，promise 是一个对象，通过它可以获取异步操作的消息。promise 提供统一的API，各种异步操作都可以用同样的方法进行处理，让开发者不用再关注于时序和底层的结果。promise 的状态具有不受外界影响和不可逆的特点。

#### 2.传统的回调式异步操作有什么缺点？（Promise是如何解决异步操作）

传统的回调有五大信任问题：

- 调用回调过早

  对于Promise来说，即使是立即完成的Promise也无法被同步观察到，也就是说一个Promise调用then()的时候，即使这个Promise已经决议了，提供给then的回调也总会被异步调用。

- 调用回调过晚（或没有被调用）

  对于一个Promise对象注册的每一个观察回调都是相对独立、互不干预的。而Promise对象调用resolve()和reject()时，每个注册的观察回调也都会被自动调度。所以这些观察回调的任意一个都无法影响或延误对其他回调的调用。

  此外，关于回调未调用。正常情况下，没有任何东西可以阻止Promise向你通知它的决议，即使你的JavaScript代码报错了，一会通过异常回调来捕获到。如果Promise永远不被决议的话，Promise本身已提供了竞态的抽象机制来作为解决方案。

- 调用回调次数过少或过多

  Promise的定义方式使得它只能被决议一次。即使代码中出现多次决议，这个Promise也会接受第一次决议，并会忽略掉其他任何后续调用。所以任何通过then()注册的回调只会被调用一次。

- 未能传递所需的环境和参数

  凡是被决议的值都会传递到观察回调中，如果没有显示的决议值也会传递一个undefined给观察回调。需要注意的是，Promise只允许传一个决议值，其他值将会被默默忽略掉。

- 吞掉可能出现的错误和异常

  如果在创建Promise时，存在JavaScript代码错误，会直接导致该Promise的拒绝决议，那么你可以通过reject()来捕获异常，代码中的任何异常都不会吞掉。

  以上的回答十分的啰嗦，但是如果上面的五点你都能记住的话，你会了解很多关于Promise的细节问题，也会应对一些面试官的追问，如Promise的then()会不会被重复调用 等。

#### `3`.Promise中的异步模式有哪些？区别？（等同于**Promise.all()和Promise.race()的区别**）

- all会将传入的数组中的所有promise全部决议以后，将决议值以数组的形式传入到观察回调中，任何一个promise决议为拒绝，那么就会调用拒绝回调。

- race会将传入的数组中的所有promise中第一个决议的决议值传递给观察回调，即使决议结果是拒绝。

#### 4.如果向Promise.all()和Promise.race()传递空数组，运行结果会有什么不同？

- all会立即决议，决议结果是fullfilled，值是undefined

- race会永远都不决议，程序卡死

#### `5`.如何确保一个变量是可信任的Promise（Promise.resolve方法传入不同值的不同处理有哪些）

可以通过Promise.resolve()方法对不确定的值进行Promise化，返回一个Promise对象。

如果是一个立即值，如一个普通变量，那么该Promise会立即决议为成功。

如果是一个Promise值，那么会将该Promise直接返回赋值给这个Promise，不会有额外开销。

如果是一个类Promise值， 比如其中含有名称为then的成员变量，那么会将then展开形成一个新的Promise对象。

#### 6.Promise是如何捕获异常的？与传统的try/catch相比有什么优势？

传统的try/catch捕获异常方式是无法捕获异步的异常的，代码如下：

```js
try {
	setTimeout(function(){
		undefined();		//undefined不是一个方法，会抛出异常
	}, 500)
} catch(err){
	//这里并不能捕获异常
	console.log(err);
}
```

而对于Promise对象来说，构造Promise实例时的代码如果出错，则会被认为是一个拒绝的决议，并会向观察回调中传递异常信息。所以即使是一个异步的请求，Promise也是可以捕获异常的。此外，Promise还可以通过catch回调来捕获回调中的异常。



### `3`.必考：函数防抖和函数节流

#### 函数防抖(debounce)

> 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

看一个🌰（栗子）：

```js
//模拟一段ajax请求
function ajax(content) {
  console.log('ajax request ' + content)
}

let inputa = document.getElementById('unDebounce')

inputa.addEventListener('keyup', function (e) {
    ajax(e.target.value)
})

```

看一下运行结果：



![2018-09-04 09 23 46](https://user-gold-cdn.xitu.io/2018/9/4/165a252be5c94d6b?imageslim)



可以看到，我们只要按下键盘，就会触发这次ajax请求。不仅从资源上来说是很浪费的行为，而且实际应用中，用户也是输出完整的字符后，才会请求。下面我们优化一下：

```js
//模拟一段ajax请求
function ajax(content) {
  console.log('ajax request ' + content)
}

function debounce(fun, delay) {
    return function (args) {
        let that = this
        let _args = args
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun.call(that, _args)
        }, delay)
    }
}
    
let inputb = document.getElementById('debounce')

let debounceAjax = debounce(ajax, 500)

inputb.addEventListener('keyup', function (e) {
        debounceAjax(e.target.value)
    })





//另一个例子
function debounce(fn, wait) {
    var timeout = null;
    return function() {
        if(timeout !== null) 
        {
                clearTimeout(timeout);
        }
        timeout = setTimeout(fn, wait);
    }
}
// 处理函数
function handle() {
    console.log(Math.random()); 
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000));
```

看一下运行结果：



![2018-09-04 09 29 50](https://user-gold-cdn.xitu.io/2018/9/4/165a252b4b429b56?imageslim)



可以看到，我们加入了防抖以后，当你在频繁的输入时，并不会发送请求，只有当你在指定间隔内没有输入时，才会执行函数。如果停止输入但是在指定间隔内又输入，会重新触发计时。



#### 函数节流(throttle)

> 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

看一个🌰：

```js
  function throttle(fun, delay) {
        let last, deferTimer
        return function (args) {
            let that = this
            let _args = arguments
            let now = +new Date()
            if (last && now < last + delay) {
                clearTimeout(deferTimer)
                deferTimer = setTimeout(function () {
                    last = now
                    fun.apply(that, _args)
                }, delay)
            }else {
                last = now
                fun.apply(that,_args)
            }
        }
    }

    let throttleAjax = throttle(ajax, 1000)

    let inputc = document.getElementById('throttle')
    inputc.addEventListener('keyup', function(e) {
        throttleAjax(e.target.value)
    })



//另一个例子

   var throttle = function(func, delay) {
            var timer = null;
            return function() {
                var context = this;
                var args = arguments;
                if (!timer) {
                    timer = setTimeout(function() {
                        func.apply(context, args);
                        timer = null;
                    }, delay);
                }
            }
        }
        function handle() {
            console.log(Math.random());
        }
        window.addEventListener('scroll', throttle(handle, 1000));

```

看一下运行结果：



![2018-09-04 09 36 49](https://user-gold-cdn.xitu.io/2018/9/4/165a252b4c1a9686?imageslim)



不管我们设定的执行时间间隔多小，总是1s内只执行一次。

>  个人理解 函数节流就是fps游戏的射速，就算一直按着鼠标射击，也只会在规定射速内射出子弹。

#### 总结

- 函数防抖和函数节流都是防止某一时间频繁触发，但是这两兄弟之间的原理却不一样。
- 函数防抖是某一段时间内只执行一次，而函数节流是间隔时间执行。

**结合应用场景**

- debounce
  - search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
  - window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
- throttle
  - 鼠标不断点击触发，mousedown(单位时间内只触发一次)
  - 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断




###  4.必考：闭包/立即执行函数是什么？

	当面试官问闭包问题的时候他想知道什么？

http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html

> 简单来说，闭包就是能够读取其他函数内部变量的函数

```js
function Person() {
    var name = 'hello'
    function say () {
        console.log(name)
    }
    return say()
}
Person() // hello
```

> 由于 JavaScript 特殊的作用域，函数外部无法直接读取内部的变量，内部可以直接读取外部的变量，从而就产生了闭包的概念

用途：

> 最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中

注意点：

> 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露



####  ①闭包是什么：

- **闭包**是有权限访问其他函数作用域内的变量的一个函数，如果想用这一句话就把面试官搞定是不可能的。因为这句话还存在下面几个深入的问题：

  - 为什么其他非闭包的函数没有权限访问另一个函数的内部作用域

  - 为什么闭包有这个权限

  - 什么是函数作用域

  面试官更想知道你对以上只是是否了解，所以一个更周全的解释方法应运而生

  **由于在JS中，变量的作用域属于函数作用域，在函数执行后作用域就会被清理、内存也随之回收，但是由于闭包是建立在一个函数内部的子函数，由于其可访问上级作用域的原因，即使上级函数执行完，作用域也不会随之销毁，这时的子函数——也就是闭包，便拥有了访问上级作用域中的变量的权限，即使上级函数执行完后作用域内的值也不会被销毁。**

#### ②追问：闭包解决了什么问题？

- 在本质上，闭包就是将函数内部和函数外部连接起来的一座**桥梁。**

- **由于闭包可以缓存上级作用域，那么就使得函数外部打破了“函数作用域”的束缚，可以访问函数内部的变量。以平时使用的Ajax成功回调为例，这里其实就是个闭包，由于上述的特性，回调就拥有了整个上级作用域的访问和操作能力，提高了极大的便利。开发者不用去写钩子函数来操作上级函数作用域内部的变量了。**

- 闭包有哪些应用场景

  闭包随处可见，一个Ajax请求的成功回调，一个事件绑定的回调方法，一个setTimeout的延时回调，或者一个函数内部返回另一个匿名函数，这些都是闭包。简而言之，无论使用何种方式对函数类型的值进行传递，当函数在别处被调用时都有闭包的身影。

### 5.JS设计模式

[设计模式](./js的设计模式)

### 6.this那些事？

首先必须要说的是，**this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁**，**实际上this的最终指向的是那个调用它的对象（**这句话有些问题，后面会解释为什么会有问题，虽然网上大部分的文章都是这样说的，虽然在很多情况下那样去理解不会出什么问题，但是实际上那样理解是不准确的，所以在你理解this的时候会有种琢磨不透的感觉**）**，那么接下来我会深入的探讨这个问题。

　　为什么要学习this？如果你学过面向对象编程，那你肯定知道干什么用的，如果你没有学过，那么暂时可以不用看这篇文章，当然如果你有兴趣也可以看看，毕竟这是js中必须要掌握的东西。

 

**例子1：**

```
function a(){
    var user = "追梦子";
    console.log(this.user); //undefined
    console.log(this); //Window
}
a();
```

按照我们上面说的this最终指向的是调用它的对象，这里的函数a实际是被Window对象所点出来的，下面的代码就可以证明。

```
function a(){
    var user = "追梦子";
    console.log(this.user); //undefined
    console.log(this);　　//Window
}
window.a();
```

和上面代码一样吧，其实alert也是window的一个属性，也是window点出来的。

**例子2：**

```
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);  //追梦子
    }
}
o.fn();
```

　　这里的this指向的是对象o，因为你调用这个fn是通过o.fn()执行的，那自然指向就是对象o，这里再次强调一点，this的指向在函数创建的时候是决定不了的，在调用的时候才能决定，谁调用的就指向谁，一定要搞清楚这个。

 

其实例子1和例子2说的并不够准确，下面这个例子就可以推翻上面的理论。



**例子3：**

```
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user); //追梦子
    }
}
window.o.fn();
```

　　这段代码和上面的那段代码几乎是一样的，但是这里的this为什么不是指向window，如果按照上面的理论，最终this指向的是调用它的对象，这里先说个而外话，window是js中的全局对象，我们创建的变量实际上是给window添加属性，所以这里可以用window点o对象。

　　这里先不解释为什么上面的那段代码this为什么没有指向window，我们再来看一段代码。

```
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //12
        }
    }
}
o.b.fn();
```

　　这里同样也是对象o点出来的，但是同样this并没有执行它，那你肯定会说我一开始说的那些不就都是错误的吗？其实也不是，只是一开始说的不准确，接下来我将补充一句话，我相信你就可以彻底的理解this的指向的问题。

　　情况1：如果一个函数中有this，但是它没有被上一级的对象所调用，那么this指向的就是window，这里需要说明的是在js的严格版中this指向的不是window，但是我们这里不探讨严格版的问题，你想了解可以自行上网查找。

　　情况2：如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象。

　　情况3：如果一个函数中有this，**这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象，**例子3可以证明，如果不相信，那么接下来我们继续看几个例子。

```
var o = {
    a:10,
    b:{
        // a:12,
        fn:function(){
            console.log(this.a); //undefined
        }
    }
}
o.b.fn();
```

尽管对象b中没有属性a，这个this指向的也是对象b，因为this只会指向它的上一级对象，不管这个对象中有没有this要的东西。

**还有一种比较特殊的情况，例子4：**

```
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //undefined
            console.log(this); //window
        }
    }
}
var j = o.b.fn;
j();
```

这里this指向的是window，是不是有些蒙了？其实是因为你没有理解一句话，这句话同样至关重要。

　　this永远指向的是最后调用它的对象，也就是看它执行的时候是谁调用的，例子4中虽然函数fn是被对象b所引用，但是在将fn赋值给变量j的时候并没有执行所以最终指向的是window，这和例子3是不一样的，例子3是直接执行了fn。

　　this讲来讲去其实就是那么一回事，只不过在不同的情况下指向的会有些不同，上面的总结每个地方都有些小错误，也不能说是错误，而是在不同环境下情况就会有不同，所以我也没有办法一次解释清楚，只能你慢慢地的去体会。

 

**构造函数版this：**

```
function Fn(){
    this.user = "追梦子";
}
var a = new Fn();
console.log(a.user); //追梦子
```

　　这里之所以对象a可以点出函数Fn里面的user是因为new关键字可以改变this的指向，将这个this指向对象a，为什么我说a是对象，因为用了new关键字就是创建一个对象实例，理解这句话可以想想我们的例子3，我们这里用变量a创建了一个Fn的实例（相当于复制了一份Fn到对象a里面），此时仅仅只是创建，并没有执行，而调用这个函数Fn的是对象a，那么this指向的自然是对象a，那么为什么对象a中会有user，因为你已经复制了一份Fn函数到对象a中，用了new关键字就等同于复制了一份。

　　除了上面的这些以外，我们还可以自行改变this的指向，关于自行改变this的指向请看[JavaScript中call,apply,bind方法的总结](http://www.cnblogs.com/pssp/p/5215621.html)这篇文章，详细的说明了我们如何手动更改this的指向。

 

**更新一个小问题当this碰到return时**

```
function fn()  
{  
    this.user = '追梦子';  
    return {};  
}
var a = new fn;  
console.log(a.user); //undefined
```

再看一个

```
function fn()  
{  
    this.user = '追梦子';  
    return function(){};
}
var a = new fn;  
console.log(a.user); //undefined
```

再来

```
function fn()  
{  
    this.user = '追梦子';  
    return 1;
}
var a = new fn;  
console.log(a.user); //追梦子
function fn()  
{  
    this.user = '追梦子';  
    return undefined;
}
var a = new fn;  
console.log(a.user); //追梦子
```

什么意思呢？

　　**如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例。**

```
function fn()  
{  
    this.user = '追梦子';  
    return undefined;
}
var a = new fn;  
console.log(a); //fn {user: "追梦子"}
```

　　还有一点就是虽然null也是对象，但是在这里this还是指向那个函数的实例，因为null比较特殊。

```
function fn()  
{  
    this.user = '追梦子';  
    return null;
}
var a = new fn;  
console.log(a.user); //追梦子
```

**知识点补充：**

　　1.在严格版中的默认的this不再是window，而是undefined。

　　2.new操作符会改变函数this的指向问题，虽然我们上面讲解过了，但是并没有深入的讨论这个问题，网上也很少说，所以在这里有必要说一下。**
**

```
function fn(){
    this.num = 1;
}
var a = new fn();
console.log(a.num); //1
```

　　为什么this会指向a？首先new关键字会创建一个空的对象，然后会自动调用一个函数apply方法，将this指向这个空对象，这样的话函数内部的this就会被这个空的对象替代。

### 7.call，apply，bind

call,apply,bind干什么的？一般用来指定this的环境，在没有学之前，通常会有这个问题。

```
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);
    }
}
var b = a.fn;
b(); //undefined
```

我们是想打印对象a里面的user却打印出来undefined是怎么回事呢？如果我们直接执行a.fn()是可以的。

```
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);
    }
}
a.fn(); //追梦子
```

这里能够打印是因为，这里的this指向的是函数a，那为什么上面的不指向a？我们如果需要了解this的指向问题，请看[彻底理解js中this的指向，不必硬背](http://www.cnblogs.com/pssp/p/5216085.html)这篇文章。

虽然这种方法可以达到我们的目的，但是有时候我们不得不将这个对象保存到另外的一个变量中，那么就可以通过以下方法。

**1、call()**

　　

```
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this.user); //追梦子
    }
}
var b = a.fn;
b.call(a);
```

通过在call方法，给第一个参数添加要把b添加到哪个环境中，简单来说，this就会指向那个对象。

call方法除了第一个参数以外还可以添加多个参数，如下：

```
var a = {
    user:"追梦子",
    fn:function(e,ee){
        console.log(this.user); //追梦子
        console.log(e+ee); //3
    }
}
var b = a.fn;
b.call(a,1,2);
```

**2、apply()**

apply方法和call方法有些相似，它也可以改变this的指向

```
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this.user); //追梦子
    }
}
var b = a.fn;
b.apply(a);
```

同样apply也可以有多个参数，但是不同的是，第二个参数必须是一个数组，如下：

```
var a = {
    user:"追梦子",
    fn:function(e,ee){
        console.log(this.user); //追梦子
        console.log(e+ee); //11
    }
}
var b = a.fn;
b.apply(a,[10,1]);
```

或者

```
var a = {
    user:"追梦子",
    fn:function(e,ee){
        console.log(this.user); //追梦子
        console.log(e+ee); //520
    }
}
var b = a.fn;
var arr = [500,20];
b.apply(a,arr);
```

//注意如果call和apply的第一个参数写的是null，那么this指向的是window对象

```
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this); //Window {external: Object, chrome: Object, document: document, a: Object, speechSynthesis: SpeechSynthesis…}
    }
}
var b = a.fn;
b.apply(null);
```

**3、bind()**

bind方法和call、apply方法有些不同，但是不管怎么说它们都可以用来改变this的指向。

先来说说它们的不同吧。

```
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);
    }
}
var b = a.fn;
b.bind(a);
```

我们发现代码没有被打印，对，这就是bind和call、apply方法的不同，实际上bind方法返回的是一个修改过后的函数。

```
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);
    }
}
var b = a.fn;
var c = b.bind(a);
console.log(c); //function() { [native code] }
```

那么我们现在执行一下函数c看看，能不能打印出对象a里面的user

```
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this.user); //追梦子
    }
}
var b = a.fn;
var c = b.bind(a);
c();
```

ok，同样bind也可以有多个参数，并且参数可以执行的时候再次添加，但是要注意的是，参数是按照形参的顺序进行的。

```
var a = {
    user:"追梦子",
    fn:function(e,d,f){
        console.log(this.user); //追梦子
        console.log(e,d,f); //10 1 2
    }
}
var b = a.fn;
var c = b.bind(a,10);
c(1,2);
```

 

总结：call和apply都是改变上下文中的this并立即执行这个函数，bind方法可以让对应的函数想什么时候调就什么时候调用，并且可以将参数在执行的时候添加，这是它们的区别，根据自己的实际情况来选择使用。

### 8.显式原型和隐式原型，手绘原型链，原型链是什么？为什么要有原型链

#### prototype和contructor

**prototype指向函数的原型对象，这是一个显式原型属性，只有函数才拥有该属性**。**contructor**指向原型对象的构造函数。

```
// 可以思考一下的打印结果，它们分别指向谁
function Foo() {}

console.log(Foo.prototype)
console.log(Foo.prototype.constructor)
console.log(Foo.__proto__)
console.log(Foo.prototype.__proto__)
```

下面来看看各个构造函数与它自己原型对象之间的关系：

![img](https://user-gold-cdn.xitu.io/2019/9/6/16d04cd034743d31?imageslim)	

#### proto

每个对象都有`_proto_`，它是隐式原型属性，指向了创建该对象的构造函数原型。由于js中是没有类的概念，而为了实现继承，通过 `_proto_` 将对象和原型联系起来组成原型链，就可以让对象访问到不属于自己的属性。

##### 函数和对象之间的关系

![img](https://user-gold-cdn.xitu.io/2019/9/6/16d025974e61505e?imageslim)

Foo、Function和Object都是函数，它们的`_proto_`都指向`Function.prototype`。

##### 原型对象之间的关系

![img](https://user-gold-cdn.xitu.io/2019/9/6/16d025afb49e4db1?imageslim)

它们的`_proto_`都指向了`Object.prototype`。js原型链最终指向的是Object原型对象

#### _proto_原型链图

![img](https://user-gold-cdn.xitu.io/2019/9/6/16d025974e4de114?imageslim)

相信只要你看懂了上面的图表，那么你应该就已经理解了js的原型链了。

#### 总结

- Function 和 Object 是两个函数。
- **proto** 将对象和原型连接起来组成了原型链。
- 所有的函数的 **proto** 都指向Function原型对象。
- **js的原型链最终指向的是Object原型对象(Object.prototype)**（在这里我将null排除在外了）。


![img](https://user-gold-cdn.xitu.io/2019/9/6/16d04ccc5d03fbc7?imageslim)

### 9.实现继承的多种方式和优缺点

#### 1.原型链继承

```
function Parent () {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.getName()) // kevin
```

问题：

1.引用类型的属性被所有实例共享，举个例子：

```
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy", "yayu"]
```

2.在创建 Child 的实例时，不能向Parent传参

#### 2.借用构造函数(经典继承)

```
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {
    Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]
```

优点：

1.避免了引用类型的属性被所有实例共享

2.可以在 Child 中向 Parent 传参

举个例子：

```
function Parent (name) {
    this.name = name;
}

function Child (name) {
    Parent.call(this, name);
}

var child1 = new Child('kevin');

console.log(child1.name); // kevin

var child2 = new Child('daisy');

console.log(child2.name); // daisy
```

缺点：

方法都在构造函数中定义，每次创建实例都会创建一遍方法。

#### 3.组合继承

原型链继承和经典继承双剑合璧。

```
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {

    Parent.call(this, name);
    
    this.age = age;

}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]
```

优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。

#### 4.原型式继承

```
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```

就是 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。

缺点：

包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。

```
var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
}

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1';
console.log(person2.name); // kevin

person1.firends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]
```

注意：修改`person1.name`的值，`person2.name`的值并未发生改变，并不是因为`person1`和`person2`有独立的 name 值，而是因为`person1.name = 'person1'`，给`person1`添加了 name 值，并非修改了原型上的 name 值。

#### 5. 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

```
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```

缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

#### 6. 寄生组合式继承

为了方便大家阅读，在这里重复一下组合继承的代码：

```
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = new Parent();

var child1 = new Child('kevin', '18');

console.log(child1)
```

组合继承最大的缺点是会调用两次父构造函数。

一次是设置子类型实例的原型的时候：

```
Child.prototype = new Parent();
```

一次在创建子类型实例的时候：

```
var child1 = new Child('kevin', '18');
```

回想下 new 的模拟实现，其实在这句中，我们会执行：

```
Parent.call(this, name);
```

在这里，我们又会调用了一次 Parent 构造函数。

所以，在这个例子中，如果我们打印 child1 对象，我们会发现 Child.prototype 和 child1 都有一个属性为`colors`，属性值为`['red', 'blue', 'green']`。

那么我们该如何精益求精，避免这一次重复调用呢？

如果我们不使用 Child.prototype = new Parent() ，而是间接的让 Child.prototype 访问到 Parent.prototype 呢？

看看如何实现：

```
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();


var child1 = new Child('kevin', '18');

console.log(child1);
```

最后我们封装一下这个继承方法：

```
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
```

引用《JavaScript高级程序设计》中对寄生组合式继承的夸赞就是：

这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。



ES6

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```