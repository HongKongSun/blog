---
title: JS
date: 2020-07-24
tags:
 - JavaScript       
categories: 
 - FrontEnd
---

### 10. js的基本类型有哪些？引用类型有哪些？null和undefined的区别。

- 七种数据类型

  Boolean
  Null
  Undefined
  Number
  String
  Symbol (ECMAScript 6 新定义)
  Object
  (ES6之前)其中5种为基本类型:string,number,boolean,null,undefined,

  ES6出来的Symbol也是原始数据类型 ，表示独一无二的值

- 基础数据类型和引用数据类型有什么区别？

  - 存储上，基础数据类型的值是存在栈中，引用数据类型的值是存在堆中，引用数据类型的指针是存在栈中；
  - 赋值上，基础数据类型是按值传递，引用数据类型是按指针传递。由于两者的存储/赋值的不同，也就引来了数据深拷贝的问题。

- Object 为引用类型(范围挺大),也包括数组、函数,

- null和undefined的异同点
  - > `null`表示"没有对象"，即该处不应该有值
  
    典型用法：
  
    1. 作为函数的参数，表示该函数的参数不是对象
  
    2. 作为对象原型链的终点-
  
       
  
  - > `undefined`表示"缺少值"，就是此处应该有一个值，但是还没有定义
  
    典型用法：
  
    1. 变量被声明了，但没有赋值时，就等于`undefined`
    2. 调用函数时，应该提供的参数没有提供，该参数等于`undefined`
    3. 对象没有赋值的属性，该属性的值为`undefined`
    4. 函数没有返回值时，默认返回`undefined`

### 11.JS常见的dom操作api

#### 节点查找API

> document.getElementById ：根据ID查找元素，大小写敏感，如果有多个结果，只返回第一个；
>
> document.getElementsByClassName ：根据类名查找元素，多个类名用空格分隔，返回一个 HTMLCollection 。注意兼容性为IE9+（含）。另外，不仅仅是document，其它元素也支持 getElementsByClassName 方法；
>
> document.getElementsByTagName ：根据标签查找元素， * 表示查询所有标签，返回一个 HTMLCollection 。
>
> document.getElementsByName ：根据元素的name属性查找，返回一个 NodeList 。
>
> document.querySelector ：返回单个Node，IE8+(含），如果匹配到多个结果，只返回第一个。
>
> document.querySelectorAll ：返回一个 NodeList ，IE8+(含）。
>
> document.forms ：获取当前页面所有form，返回一个 HTMLCollection ；

#### 节点创建API

##### createElement创建元素：

```
var elem = document.createElement("div");  
elem.id = 'haorooms';  
elem.style = 'color: red';  
elem.innerHTML = '我是新创建的haorooms测试节点';  
document.body.appendChild(elem);  
```

通过 createElement 创建的元素并不属于 document 对象，它只是创建出来，并未添加到html文档中，要调用 appendChild 或 insertBefore 等方法将其添加到HTML文档中。

##### createTextNode创建文本节点：

```
var node = document.createTextNode("我是文本节点");  
document.body.appendChild(node);  
```

##### cloneNode 克隆一个节点：

node.cloneNode(true/false) ，它接收一个bool参数，用来表示是否复制子元素。

```
var from = document.getElementById("test");  
var clone = from.cloneNode(true);  
clone.id = "test2";  
document.body.appendChild(clone);  
```

克隆节点并不会克隆事件，除非事件是用

这种方式绑定的，用 addEventListener 和 node.onclick=xxx; 方式绑定的都不会复制。



##### createDocumentFragment

本方法用来创建一个 DocumentFragment ，也就是文档碎片，它表示一种轻量级的文档，主要是用来存储临时节点，大量操作DOM时用它可以大大提升性能。

#### 节点修改API

**1、appendChild**

语法：

```
parent.appendChild(child);
```

**2、insertBefore**

```
parentNode.insertBefore(newNode, refNode);  
```

**3、insertAdjacentHTML**

```
//js谷歌浏览器，火狐浏览器，IE8+
el.insertAdjacentHTML('beforebegin', htmlString);
```

关于insertAdjacentHTML，这个API比较好用，具体可以看：https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML

```
<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
```

**4、Element.insertAdjacentElement()**

用法和上面类似，

```
targetElement.insertAdjacentElement(position, element);
```

**5、removeChild**

removeChild用于删除指定的子节点并返回子节点，语法：

```
var deletedChild = parent.removeChild(node);  
```

deletedChild指向被删除节点的引用，它仍然存在于内存中，可以对其进行下一步操作。另外，如果被删除的节点不是其子节点，则将会报错。一般删除节点都是这么删的：

```
function removeNode(node)  
{  
    if(!node) return;  
    if(node.parentNode) node.parentNode.removeChild(node);  
}  
```

**6、replaceChild**

replaceChild用于将一个节点替换另一个节点，语法：

```
parent.replaceChild(newChild, oldChild);  
```

#### 节点关系API

**1、父关系API**

> parentNode ：每个节点都有一个parentNode属性，它表示元素的父节点。Element的父节点可能是Element，Document或DocumentFragment；
>
> parentElement ：返回元素的父元素节点，与parentNode的区别在于，其父节点必须是一个Element元素，如果不是，则返回null；

**2、子关系API**

> children ：返回一个实时的 HTMLCollection ，子节点都是Element，IE9以下浏览器不支持；
>
> childNodes ：返回一个实时的 NodeList ，表示元素的子节点列表，注意子节点可能包含文本节点、注释节点等；
>
> firstChild ：返回第一个子节点，不存在返回null，与之相对应的还有一个 firstElementChild ；
>
> lastChild ：返回最后一个子节点，不存在返回null，与之相对应的还有一个 lastElementChild ；

**3、兄弟关系型API**

> previousSibling ：节点的前一个节点，如果不存在则返回null。注意有可能拿到的节点是文本节点或注释节点，与预期的不符，要进行处理一下。
>
> nextSibling ：节点的后一个节点，如果不存在则返回null。注意有可能拿到的节点是文本节点，与预期的不符，要进行处理一下。
>
> previousElementSibling ：返回前一个元素节点，前一个节点必须是Element，注意IE9以下浏览器不支持。
>
> nextElementSibling ：返回后一个元素节点，后一个节点必须是Element，注意IE9以下浏览器不支持。

#### 元素属性型API

**1、setAttribute 给元素设置属性：**

```
element.setAttribute(name, value);  
```

其中name是特性名，value是特性值。如果元素不包含该特性，则会创建该特性并赋值。

**2、getAttribute**

getAttribute返回指定的特性名相应的特性值，如果不存在，则返回null：

```
var value = element.getAttribute("id"); 
```

**3、hasAttribute**

```
var result = element.hasAttribute(name);

var foo = document.getElementById("foo"); 
if (foo.hasAttribute("bar")) { 
    // do something
}
```

**4、dataset**

获取html data-开头的属性，用法如下：

```
<div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>John Doe</div>

let el = document.querySelector('#user');

// el.id == 'user'
// el.dataset.id === '1234567890'
// el.dataset.user === 'johndoe'
// el.dataset.dateOfBirth === ''

el.dataset.dateOfBirth = '1960-10-03'; // set the DOB.

// 'someDataAttr' in el.dataset === false
el.dataset.someDataAttr = 'mydata';
// 'someDataAttr' in el.dataset === true
```

#### 样式相关API

**1、直接修改元素的样式**

```
elem.style.color = 'red';  
elem.style.setProperty('font-size', '16px');  
elem.style.removeProperty('color');  
```

**2、动态添加样式规则**

```
var style = document.createElement('style');  
style.innerHTML = 'body{color:red} #top:hover{background-color: red;color: white;}';  
document.head.appendChild(style);  
```

**3、classList获取样式class**

```
// div is an object reference to a <div> element with class="foo bar"
div.classList.remove("foo");
div.classList.add("anotherclass");

// if visible is set remove it, otherwise add it
div.classList.toggle("visible");

// add/remove visible, depending on test conditional, i less than 10
div.classList.toggle("visible", i < 10 );

alert(div.classList.contains("foo"));

// add or remove multiple classes
div.classList.add("foo", "bar", "baz");
div.classList.remove("foo", "bar", "baz");

// add or remove multiple classes using spread syntax
let cls = ["foo", "bar"];
div.classList.add(...cls); 
div.classList.remove(...cls);

// replace class "foo" with class "bar"
div.classList.replace("foo", "bar");
```

**4、window.getComputedStyle**

通过 element.sytle.xxx 只能获取到内联样式，借助 window.getComputedStyle 可以获取应用到元素上的所有样式，IE8或更低版本不支持此方法。

```
var style = window.getComputedStyle(element[, pseudoElt]);  
```

#### 获取相关高度API

关于js的高度，我再慕课网上面也录制了一个视频，[js/jquery各种宽高的理解和应用](http://www.haorooms.com/post/js_jquery_whljyy)。

这里主要讲一下：

##### getBoundingClientRect

getBoundingClientRect 用来返回元素的大小以及相对于浏览器可视窗口的位置，用法如下：

```
var clientRect = element.getBoundingClientRect();  
```

clientRect是一个 DOMRect 对象，包含width、height、left、top、right、bottom，它是相对于窗口顶部而不是文档顶部，滚动页面时它们的值是会发生变化的。








### 12.创建对象的多种方式

#### 1. 工厂模式

```
function createPerson(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;
}

var person1 = createPerson('kevin');
```

缺点：对象无法识别，因为所有的实例都指向一个原型

#### 2. 构造函数模式

```
function Person(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    };
}

var person1 = new Person('kevin');
```

优点：实例可以识别为一个特定的类型

缺点：每次创建实例时，每个方法都要被创建一次

##### 2.1 构造函数模式优化

```
function Person(name) {
    this.name = name;
    this.getName = getName;
}

function getName() {
    console.log(this.name);
}

var person1 = new Person('kevin');
```

优点：解决了每个方法都要被重新创建的问题

缺点：这叫啥封装……

#### 3. 原型模式

```
function Person(name) {

}

Person.prototype.name = 'keivn';
Person.prototype.getName = function () {
    console.log(this.name);
};

var person1 = new Person();
```

优点：方法不会重新创建

缺点：1. 所有的属性和方法都共享 2. 不能初始化参数

##### 3.1 原型模式优化

```
function Person(name) {

}

Person.prototype = {
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```

优点：封装性好了一点

缺点：重写了原型，丢失了constructor属性

##### 3.2 原型模式优化

```
function Person(name) {

}

Person.prototype = {
    constructor: Person,
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```

优点：实例可以通过constructor属性找到所属构造函数

缺点：原型模式该有的缺点还是有

#### 4. 组合模式

构造函数模式与原型模式双剑合璧。

```
function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```

优点：该共享的共享，该私有的私有，使用最广泛的方式

缺点：有的人就是希望全部都写在一起，即更好的封装性

##### 4.1 动态原型模式

```
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype.getName = function () {
            console.log(this.name);
        }
    }
}

var person1 = new Person();
```

注意：使用动态原型模式时，不能用对象字面量重写原型

解释下为什么：

```
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }
    }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');

// 报错 并没有该方法
person1.getName();

// 注释掉上面的代码，这句是可以执行的。
person2.getName();
```

为了解释这个问题，假设开始执行`var person1 = new Person('kevin')`。

如果对 new 和 apply 的底层执行过程不是很熟悉，可以阅读底部相关链接中的文章。

我们回顾下 new 的实现步骤：

1. 首先新建一个对象
2. 然后将对象的原型指向 Person.prototype
3. 然后 Person.apply(obj)
4. 返回这个对象

注意这个时候，回顾下 apply 的实现步骤，会执行 obj.Person 方法，这个时候就会执行 if 语句里的内容，注意构造函数的 prototype 属性指向了实例的原型，使用字面量方式直接覆盖 Person.prototype，并不会更改实例的原型的值，person1 依然是指向了以前的原型，而不是 Person.prototype。而之前的原型是没有 getName 方法的，所以就报错了！

如果你就是想用字面量方式写代码，可以尝试下这种：

```
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }

        return new Person(name);
    }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');

person1.getName(); // kevin
person2.getName();  // daisy
```

##### 5.1 寄生构造函数模式

```
function Person(name) {

    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;

}

var person1 = new Person('kevin');
console.log(person1 instanceof Person) // false
console.log(person1 instanceof Object)  // true
```

寄生构造函数模式，我个人认为应该这样读：

寄生-构造函数-模式，也就是说寄生在构造函数的一种方法。

也就是说打着构造函数的幌子挂羊头卖狗肉，你看创建的实例使用 instanceof 都无法指向构造函数！

这样方法可以在特殊情况下使用。比如我们想创建一个具有额外方法的特殊数组，但是又不想直接修改Array构造函数，我们可以这样写：

```
function SpecialArray() {
    var values = new Array();

    for (var i = 0, len = arguments.length; i < len; i++) {
        values.push(arguments[i]);
    }

    values.toPipedString = function () {
        return this.join("|");
    };
    return values;
}

var colors = new SpecialArray('red', 'blue', 'green');
var colors2 = SpecialArray('red2', 'blue2', 'green2');


console.log(colors);
console.log(colors.toPipedString()); // red|blue|green

console.log(colors2);
console.log(colors2.toPipedString()); // red2|blue2|green2
```

你会发现，其实所谓的寄生构造函数模式就是比工厂模式在创建对象的时候，多使用了一个new，实际上两者的结果是一样的。

但是作者可能是希望能像使用普通 Array 一样使用 SpecialArray，虽然把 SpecialArray 当成函数也一样能用，但是这并不是作者的本意，也变得不优雅。

在可以使用其他模式的情况下，不要使用这种模式。

但是值得一提的是，上面例子中的循环：

```
for (var i = 0, len = arguments.length; i < len; i++) {
    values.push(arguments[i]);
}
```

可以替换成：

```
values.push.apply(values, arguments);
```

##### 5.2 稳妥构造函数模式

```
function person(name){
    var o = new Object();
    o.sayName = function(){
        console.log(name);
    };
    return o;
}

var person1 = person('kevin');

person1.sayName(); // kevin

person1.name = "daisy";

person1.sayName(); // kevin

console.log(person1.name); // daisy
```

所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。

与寄生构造函数模式有两点不同：

1. 新创建的实例方法不引用 this
2. 不使用 new 操作符调用构造函数

稳妥对象最适合在一些安全的环境中。

稳妥构造函数模式也跟工厂模式一样，无法识别对象所属类型。





#### new 一个对象具体做了什么

```jsx
 
//模拟一个new

function New(){
    var obj=new Object();
    //取出第一个参数，就是我们要传入的构造函数；此外因为shift会修改原数组，所以arguments会被去除第一个参数
    Constructor=[].shift.call(arguments);
    //将obj的原型指向构造函数，这样obj就可以访问到构造函数原型中的属性
    obj._proto_=Constructor.prototype;
    //使用apply改变构造函数this的指向到新建的对象，这样obj就可以访问到构造函数中的属性
    var ret=Constructor.apply(obj,arguments);
    //要返回obj
    return typeof ret === 'object' ? ret:obj;
}
```

使用关键字new创建新实例对象经过了以下几步：

1、创建一个新对象，如：var person = {};

2、新对象的*proto*属性指向构造函数的原型对象。

3、将构造函数的作用域赋值给新对象。（也所以this对象指向新对象）

4、执行构造函数内部的代码，将属性添加给person中的this对象。

5、返回新对象person。



```jsx
  var person = {};  
  person._proto_ = Person.prototype;//引用构造函数的原型对象  
  Person.call(person);//将构造函数的作用域给person,即：this值指向person  

  Function.methos("new", function () {  
     //新创建一个对象，它继承了构造器的原型对象。  
     var that = Object.create(this.prototype); //此时，this是指向Function构造器的。  
     //调用构造器，绑定this对象到新对象that上  
     var other = this.apply(that, argument); //此时，this对象指向that对象。  
     //如果它的返回值不是一个对象，就返回新的对象。  
     return (typeof other === "object" && other) || that;  
 });  
```

通过new关键字创建某构造函数的新实例对象，就是将原型链与实例的this联系起来，this指向这个新对象，同时也指向这个构造函数，并且this对象还是这个构造函数的实例。如果没有使用new操作符，直接用构造函数创建新实例对象，那么this对象就指向了window对象，不会指向这个新对象的，不管给这个新对象添加什么属性，都没有用，是直接添加到了window对象上了。

### 13.变量提升

JavaScript中奇怪的一点是你可以在变量和函数声明之前使用它们。就好像是变量声明和函数声明被**提升**了代码的顶部一样。

```
sayHi() // Hi there!

function sayHi() {
    console.log('Hi there!')
}

name = 'John Doe'
console.log(name)   // John Doe
var name
复制代码
```

然而JavaScript并不会移动你的代码，所以JavaScript中“变量提升”并不是真正意义上的“提升”。

JavaScript是单线程语言，所以执行肯定是按顺序执行。但是并不是逐行的分析和执行，而是一段一段地分析执行，会先进行编译阶段然后才是执行阶段。

在编译阶段阶段，代码真正执行前的几毫秒，会检测到所有的变量和函数声明，所有这些函数和变量声明都被添加到名为[Lexical Environment](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)的JavaScript数据结构内的内存中。所以这些变量和函数能在它们真正被声明之前使用。

#### 函数提升

```
sayHi() // Hi there!

function sayHi() {
    console.log('Hi there!')
}
复制代码
```

因为函数声明在编译阶段会被添加到词法环境（Lexical Environment）中，当JavaScript引擎遇到`sayHi()`函数时，它会从词法环境中找到这个函数并执行它。

```
lexicalEnvironment = {
  sayHi: < func >
}
复制代码
```

#### var变量提升

```
console.log(name)   // 'undefined'
var name = 'John Doe'
console.log(name)   // John Doe
```

上面的代码实际上分为两个部分：

- `var name`表示声明变量`name`
- `= 'John Doe'`表示的是为变量`name`赋值为'John Doe'。

```
var name    // 声明变量
name = 'John Doe' // 赋值操作
复制代码
```

只有声明操作`var name`会被提升，而赋值这个操作并不会被提升，但是为什么变量`name`的值会是`undefined`呢?

原因是当JavaScript在编译阶段会找到`var`关键字声明的变量会添加到词法环境中，并初始化一个值`undefined`，在之后执行代码到赋值语句时，会把值赋值到这个变量。

```
// 编译阶段
lexicalEnvironment = {
  name: undefined
}

// 执行阶段
lexicalEnvironment = {
  name: 'John Doe'
}
复制代码
```

所以函数表达式也不会被“提升”。`helloWorld`是一个默认值是`undefined`的变量，而不是一个`function`。

```
helloWorld();  // TypeError: helloWorld is not a function

var helloWorld = function(){
  console.log('Hello World!');
}
复制代码
```

#### Class提升

同`let`和`const`一样，`class`在JavaScript中也是会被“提升”的，在被真正赋值之前都不会被初始化值, 同样受**Temporal Dead Zone**的影响。

```
let peter = new Person('Peter', 25) // ReferenceError: Person is not defined

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

let John = new Person('John', 25); 
console.log(peter) // Person { name: 'John', age: 25 }
```



### 14.有关事件的面试题

####  1.mouseover和mouseenter两个事件有什么区别？

二者的区别是mouseenter不会冒泡（bubble）

**详细解释一下**

当二者绑定的元素都没有子元素时，二者的行为是一致的。但是二者内部都包含子元素时，行为就不一样了。

在mouseover绑定的元素中，鼠标每次进入一个子元素就会触发一次mouseover事件，而mouseenter只会触发一次。

#### 2.移动端的click事件行为与PC端有什么不同？如何屏蔽掉这个不同？

移动端的click事件会延迟300ms触发事件回调（只在部分手机浏览器上出现）。

**为什么会这样？**

因为手机浏览器中需要处理如翻页这样复杂的手势。在用户做翻页或双击放大等操作时，是先将手指触碰到屏幕（此时理应已经触发了click事件），然后再上下移动手指，浏览器开发厂商为了识别这种事件，所以加入了300ms延迟的处理。

**解决方法**

可以引入Fastclick.js来解决这个问题。它的原理是 FastClick 在检测到touchend事件的时候，会通过 DOM 自定义事件立即触发一个模拟click事件，并把浏览器在 300 毫秒之后真正触发的click事件阻止掉。

#### `3`.Event对象中，target和currentTarget的区别？

currentTarget是当事件遍历DOM时，标识事件的当前目标。它总是引用事件处理程序附加到的元素，而不是event.target，event.target标识事件发生的元素。

有个简单的验证方法，你会在下面的例子中看到e.currentTarget一直返回的是body元素，而e.target则随着你点击位置的不同而变化

```html
<body>
    <ul id="test">
        <li>
            <ul class="enter-sensitive">
                <li>item 1-1</li>
                <li>item 1-2</li>
            </ul>
        </li>
        <li>
            <ul class="enter-sensitive">
                <li>item 2-1</li>
                <li>item 2-2</li>
            </ul>
        </li>
    </ul>
    <script>
        document.body.addEventListener('click', function (e) {
            console.log(e.target, e.currentTarget)
        })
    </script>
</body>
```

#### `4`.说一下事件冒泡和事件捕获

https://segmentfault.com/a/1190000005654451

事件冒泡是指 事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接受，然后逐级向上传播到较为不具体的节点（文档）。

**阻止事件冒泡的方法。**

调用当前事件对象的stopPropagation()方法

**阻止默认事件**

调用当前事件对象的preventDefault()方法

#### 5.是否了解移动端的点击穿透，原理及解决方法？

有上面click事件300ms延迟的讲解，这个“点击穿透”就能好理解一些。

**点击穿透**是指在移动端，由于click事件延迟300ms触发，那么如果300ms内，页面显示变化（主要是指DOM的隐藏和显示）的话，会出现实际点击元素触发了touch事件，而300ms后该位置的实际元素又被再次触发了click事件的情况。

下面是我在网上找到的点击穿透的现象详细说明：

> *点击穿透现象有3种：*
> **点击穿透问题**：点击蒙层（mask）上的关闭按钮，蒙层消失后发现触发了按钮下面元素的click事件。
> 蒙层的关闭按钮绑定的是touch事件，而按钮下面元素绑定的是click事件，touch事件触发之后，蒙层消失了，300ms后这个点的click事件fire，event的target自然就是按钮下面的元素，因为按钮跟蒙层一起消失了。
>
> **跨页面点击穿透问题**：如果按钮下面恰好是一个有href属性的a标签，那么页面就会发生跳转。
> 因为 *a标签跳转默认是click事件触发* ，所以原理和上面的完全相同。
>
> **另一种跨页面点击穿透问题**：这次没有mask了，直接点击页内按钮跳转至新页，然后发现新页面中对应位置元素的click事件被触发了。

**避免方法**在上面的问题中已经说过，可以引入fastclick之类的插件来解决。

#### `6`.是否了解事件委托？

https://juejin.im/post/5acb1bcf6fb9a028dc414fc6

*这道题通常情况下会有好几种引出方式，看面试官如何带节奏了~*

*比如，会问你如何给一个超长的商品列表中的每个商品绑定一个点击事件啊？如何解决大量事件绑定造成的内存开销问题啊？*

其实，这些问题都是想确认你是否有事件委托的意识。

事件委托是指利用“事件冒泡”，只通过指定一个事件处理程序，来管理某一类型的所有事件。也就是说，当此事件处理程序被触发时，通过当前事件对象中的target来确认究竟是在哪个元素触发的事件，从而达到一次注册 处理多个元素触发事件的目的。

#### 7.什么是事件循环？

事件循环是一个大概念，想要讲透不是几句话可以说清的。当然如果面试官问到了，他的初衷也绝对不是想让你透彻的讲解一遍，只是想确认面试者对于JS运行机制的了解程度。

好，我试着笼统地概括一下。

JavaScript是单线程的，“主线程”负责执行所有的同步任务，一旦所有同步任务执行完成，则立即从“任务队列”中读取最优先的任务放到“主线程”中执行，如此循环往复。向“任务队列”插入的是一个个事件处理函数（确切的说是函数地址）或定时任务（setTimeout的回调）。

#### 8. css3中有哪些属性可以直接影响JS中的事件？（可以讲一下pointer-events和touch-action属性吗）

**`pointer-events`** CSS 属性指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的 [target](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/API/event.target)。当该属性值设定为`none`时 表示鼠标事件“穿透”该元素并且指定该元素“下面”的任何东西。

需要注意的是，如果当前元素的pointer-events属性指定位none，但是当其后代元素的`pointer-events`属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。

**`touch-action`** 用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作（比如浏览器自带的划动、缩放等）。

最常见的用法是禁用元素（及其不可滚动的后代）上的所有手势，以使用自己提供的拖放和缩放行为（如地图或游戏表面）。

```html
#map {
  touch-action: none;
}
```



------

总结：现在很多框架（如Vue、React）已经将事件绑定和处理都封装了，如果你是框架的强依赖开发者的话，很多问题你可能并不会遇到，如你几乎不需要理解Event对象中的target。

但是话说回来，用人单位和面试官（有水平的那种）其实希望面试者是真正掌握JavaScript这门语言，而并不是掌握某某框架的使用方法，大家应该清楚其中的不同。



### 15.关于数据类型转换的面试总结

#### 1.下面的代码输出是什么？解释其原理。

```js
var a = [1, 2];
var b = [3, 4];
console.log(a + b);    //输出1,23,4
```

原理：

a + b运算操作中，a和b用“+”连接，使得a和b都要先进行隐式强制类型转换，再做“加”运算。

- 当“+”符号两端存在一个或两个不是数字类型的值时，需要把“+”符号两端都先进行“取原始值”操作（ToPrimitive）。
- a和b都是数组类型，要进行取原始值操作的话，解析器会对数组先调用valueOf()方法，如果有该方法并且返回值是原始类型的话就是这个返回值；否则继续调用toString()方法，如果返回的是原始值，则利用这个返回值进行“加”运算；否则会抛出异常
- 那么对于这个例子来说，[1,2]和[3,4]最终会调用toString()方法，分别返回字符串"1,2"和"3,4",再进行“加”运算后，结果就是"1,23,4"

#### 2.代码 []+{} 和 {} + [] 输出的结果又什么不同？解释其原理。

- 结果如下：
  - "[object Object]"
  - 0

- 原理：

  上面的问题涉及到JavaScript语法解析，所以*不要把上面问题中的表达式以参数形式传递到console.log()或alert()方法中进行试验*，那样你得到的结果会不一样。

  - **先说[]+{}**

  这里会与第一题很相似，都会去取原始值，左侧的数组结果为空字符串""，右侧的空Object的结果为字符串"[object Object]"，那么再进行加运算的话，就是字符串拼接，最终结果为"[object Object]"

  - **再说{}+[]**

  这里有些意外，因为涉及到了JavaScript的语法解析规则。在这段代码中，解析器遇到{}后将其解析为了一个空的代码块，而又将"+[]"解析为对于空数组的一元操作“+”，也就是将数组强制转换为数字，而空数组转换为数字的话就是0，那么最后结果自然就是0了。

#### 3.说说什么是 显式强制类型转换 和 隐式强制类型转换？谈谈你对于二者的看法

- 显式强制类型转换是通过显而易见的、目的明确的代码将数据进行强制类型转换，如Number()就是将变量显式的强制转换为数字类型的值。

- 隐式强制类型转换往往是一些操作的附带产物，如if(){}中会将括号内的部分转换为布尔类型。

- 而关于”显式“和”隐式“是很主观的，如果+”123“对你来说，你一眼就能看出这是将字符串”123“转换为数字的操作，那么这对于你来说就是显式的强制类型转换。

#### 4.将一个变量强制转换为字符串，你能说几种方法？

- 使用String() ——String(123)
- 直接调用toString()方法——var a = 123;a.toString();
- 使用JSON.stringify()方法——JSON.stringify()
- 利用字符串拼接——123+”“

其中第一种最为稳妥。

第二种的缺点是，如果对象修改了自身的toString()方法的话，会影响到最终结果

第三种的缺点是，缺点还是很多的……，如果传入的参数本身就是字符串的话，返回的结果是带双引号的，如下面：

```js
JSON.stringify("123");    //""123""
```

如果传入的是Object还要确保没有递归引用，否则会抛出异常，如下面

```js
var a = {},b = {};
a.param = b;
b.param = a;
JSON.string(a);
    //Uncaught TypeError: Converting circular structure to JSON
```

[MDN](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)还给出了下面的注意提醒：

关于序列化，有下面五点注意事项：

- 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
- 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
- `undefined、`任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 `null`（出现在数组中时）。
- 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 `replacer` 参数中强制指定包含了它们。
- 不可枚举的属性会被忽略

第四种的缺点是，表面上看上去应该和第一种String()是一样的，但是其实还是有些差距的，下一题咱们再讨论。

#### 5.通常的两种转字符串的方法： String(a) 和 a+""。他们之间是否存在差异？

两者看上去都是将变量转换为字符串，但是还是有个细微差别的。

看下面的例子：

```js
var a = {
	valueOf: ()=>"123",
	toString: ()=>"456"
}
String(a);    //"456"
a + "";    //"123"
```

通过现象可以看得出来，String()是直接调用了a的toString()方法，而a+""则是先调用了valueOf()方法。原因是加运算是隐式强制类型转换，会对两端操作数进行ToPrimitive操作，前面已经说过，这里不再赘述。

这里有个经典的例子，就是在ES6下对于Symbol类型值进行字符串转换时。

```js
var a = Symbol('first');
String(a);    //"Symbol(first)"
a + "";    //Uncaught TypeError: Cannot convert a Symbol value to a string
```



#### 6.有哪些值强制转换成布尔类型时结果为false？

**此题必考！**

- undefined
- null
- -0
- +0
- NaN
- false
- ""

此外还有一种是假值对象，注意下面的代码（在Chrome中运行）

```js
document.all;    //输出当前文档下的所有标签
Object.prototype.toString.call(document.all);    //[object HTMLAllCollection]
Boolean(document.all);    //false,意外吧？！！！
```



#### 7.宽松相等== 和 严格相等 === 有什么区别？

很多人会说==  检查值是否相等，===检查值和类型是否相等”，

正解应该是== 允许在相等比较中进行强制类型转换，而===不允许”。

#### 8.下面的代码输出是什么？解释其原理。

```js
var a = "666";
var b = true;

console.log(a == b);    //输出false
```

可以看出，==两端是布尔类型和字符串类型的时候，会对两端都进行ToNumber操作，也就是"666"被转换为数字666，而true被传唤为1，所以最终结果自然为false。

说到这里，既然宽松相等的强制类型转换这么晦涩难懂而且不好记忆，那么我们应该怎么办？

给大家几个建议：

- 如果== 两端有true或false，那么千万不要使用==
- 如果== 两端的值中有[]、""、或者0，尽量不要使用==

#### 9.将一个变量强制转换为数字类型时，都进行了哪些操作？

将变量强制转换为数字遵循的是ToNumber操作。

对于基本类型的话：

- true → 1
- false → 0
- undefined → NaN
- null → 0
- 对于字符串，遵循常量的相关规则语法，如果转化失败就返回NaN

对于对象来说：

会先进行去原始值操作ToPrimitive，即先检查该值是否有valueOf()方法，如果有并且返回的基本类型值，就使用该值进行转强制类型转换。如果不是就使用toString()的返回值进行强制类型转换。如果valueOf()和toString()均不返回基本类型值，会产生TypeError错误。



### 16.有关数组的面试题

#### 1.如何判断一个变量是否为数组

*为什么不用typeof？*

```js
var list = [1,2,3];
typeof list  //"object"
```

Array继承与Object，所以typeof 会直接返回object，所以不可以用typeof方法来检测

*为什么不用instanceof?*

```js
var list = [1,2,3];
list instanceof Array    //true
```

instanceof 表面上看确实是返回了true，但其实并不可靠。原因是Array实质是一个引用，用instanceof方法（包括下面的constructor方法）都是利用和引用地址进行比较的方法来确定的，但是在frame嵌套的情况下，每一个Array的引用地址都是不同的，比较起来结果也是不确定的，所以这种方法有其局限性。

*为什么不用constructor方法？*

```js
var list = [1,2,3];
list.constructor === Array;    //true
```

原因已经解释过了，不再赘述。

**可靠的检测数组方式**

1.利用Object的toString方法

```js
var list = [1,2,3];
Object.prototype.toString.call(list);    //[object Array]
```

2.利用ES6的Array.isArray()方法

```js
var list = [1,2,3];
Array.isArray(list);    //true
```

> 

#### 2.数组的原生方法有哪些？

##### 会改变自身的方法

[Array.prototype.copyWithin()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) 在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。

[Array.prototype.fill()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) 将数组中指定区间的所有元素的值，都替换成某个固定的值。

[Array.prototype.pop()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)删除数组的最后一个元素，并返回这个元素。

[Array.prototype.push()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)在数组的末尾增加一个或多个元素，并返回数组的新长度。

[Array.prototype.reverse()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。

[Array.prototype.shift()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)删除数组的第一个元素，并返回这个元素。

[Array.prototype.sort()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)对数组元素进行排序，并返回当前数组。

[Array.prototype.splice()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)在任意的位置给数组添加或删除任意个元素。

[Array.prototype.unshift()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)在数组的开头增加一个或多个元素，并返回数组的新长度。



##### 不会改变自身的方法

[Array.prototype.concat()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。

[Array.prototype.includes()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) 判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。

[Array.prototype.join()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)连接所有数组元素组成一个字符串。

[Array.prototype.slice()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)抽取当前数组中的一段元素组合成一个新数组。

[Array.prototype.toSource()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSource) 返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 [Object.prototype.toSource()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toSource) 方法。

[Array.prototype.toString()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 [Object.prototype.toString()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法。

[Array.prototype.toLocaleString()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 [Object.prototype.toLocaleString()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString) 方法。

[Array.prototype.indexOf()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

[Array.prototype.lastIndexOf()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。



##### 遍历方法

[Array.prototype.forEach()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)为数组中的每个元素执行一次回调函数。

[Array.prototype.entries()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries) 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。

[Array.prototype.every()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。

[Array.prototype.some()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。

[Array.prototype.filter()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。

[Array.prototype.find()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find) 找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。

[Array.prototype.findIndex()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。

[Array.prototype.keys()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys) 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。

[Array.prototype.map()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)返回一个由回调函数的返回值组成的新数组。

[Array.prototype.reduce()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

[Array.prototype.reduceRight()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

[Array.prototype.values()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values) 返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。

[Array.prototype[@@iterator]()](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/%40%40iterator) 和上面的 values() 方法是同一个函数。

> 修改器方法：

- pop(): 删除数组的最后一个元素，并返回这个元素
- push()：在数组的末尾增加一个或多个元素，并返回数组的新长度
- reverse(): 颠倒数组中元素的排列顺序
- shift(): 删除数组的第一个元素，并返回这个元素
- unshift(): 在数组的开头增加一个或多个元素，并返回数组的新长度
- sort(): 对数组元素进行排序，并返回当前数组
- splice(): 在任意的位置给数组添加或删除任意个元素

> 访问方法：

- concat(): 返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组
- join(): 连接所有数组元素组成一个字符串
- slice(): 抽取当前数组中的一段元素组合成一个新数组
- indeOf(): 返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1
- lastIndexOf(): 返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1

> 迭代方法：

- forEach(): 为数组中的每个元素执行一次回调函数,最终返回 `undefined`
- every(): 如果数组中的每个元素都满足测试函数，则返回 `true`，否则返回 false
- some(): 如果数组中至少有一个元素满足测试函数，则返回 `true`，否则返回 false
- filter(): 将所有在过滤函数中返回 `true` 的数组元素放进一个新数组中并返回
- map(): 返回一个由回调函数的返回值组成的新数组

#### 3.如何将一个类数组变量转化为数组？

如果是ES6，可以用Array.from()方法。

如果不确定环境的话，可以用Array.prototype.slice.call()的方法，将类似数组转换为。

Array.from()的详解：

Set类型的转换

```js
let s = new Set(['foo', window]); 
Array.from(s); 
// ["foo", window]
```

Map类型的转换

```js
let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); 
// [[1, 2], [2, 4], [4, 8]]
```

类数组的值

```js
function f() {
  return Array.from(arguments);
}

f(1, 2, 3);

// [1, 2, 3]
```

Array.from()的第二个参数mapFn也很有用处，可以对于传入的类数组值进行定制化修改

```js
// Using an arrow function as the map function to
// manipulate the elements
Array.from([1, 2, 3], x => x + x);      
// [2, 4, 6]


// Generate a sequence of numbers
// Since the array is initialized with `undefined` on each position,
// the value of `v` below will be `undefined`
Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]
```



#### `4`.数组去重，你能说出多少种方法？

1.利用一个空Object来实现（ES 5 可以利用两层for循环嵌套 然后比对两个元素是不是相同，如果相同则用splice 删除掉一个即可）

```js
//用indexof

var array = [1, 2, 1, 1, '1'];

function unique(array) {
    var res = array.filter(function(item, index, array){
        return array.indexOf(item) === index;
    })
    return res;
}

console.log(unique(array));



//排序去重

var array = [1, 2, 1, 1, '1'];

function unique(array) {
    return array.concat().sort().filter(function(item, index, array){
        return !index || item !== array[index - 1]
    })
}

console.log(unique(array));

```

2.利用ES6 的Set数据结构

```js
var array = [1, 2, 1, 1, '1'];

function unique(array) {
   return Array.from(new Set(array));
}

console.log(unique(array)); // [1, 2, "1"]


//更加简化的版本

function unique(array) {
    return [...new Set(array)];
}

//或者
var unique = (a) => [...new Set(a)]

```



#### 5.你知道Array.prototype的类型是什么吗？

其实Array.prototype是一个数组，只不过length为0

#### 6.如何“打平”一个嵌套数组，如[1,[2,[3]],4,[5]] => [1,2,3,4,5]?你能说出多少种方法？

这个方法很多，如果你的答案是用递归的话，那确实有点low，而且代码会比较复杂。

```js
// 方法 1
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]))
        }
        else {
            result.push(arr[i])
        }
    }
    return result;
}


console.log(flatten(arr))

```



我的觉得可以用以下方法来解决这个问题：

1.利用Array.prototype.toString()方法

```js
var list = [1,[2,[3]],4,[5]];
console.log(list.toString());    //1,2,3,4,5
```

原理：toString 方法返回一个字符串，该字符串由数组中的每个元素的 toString() 返回值经调用 join() 方法连接（由逗号隔开）组成。

2.利用Array.prototype.join()方法

```js
var list = [1,[2,[3]],4,[5]];
console.log(list.join());    //1,2,3,4,5
```

原理：join方法会让所有的数组元素转换成字符串，再用一个分隔符将这些字符串连接起来。如果元素是undefined 或者null， 则会转化成空字符串。

PS:如果你觉得上面输出的不是一个数组，可以稍微加工一下

```js
var list = [1,2,3,4,5];
JSON.parse(`[${list.toString()}]`);     //[1,2,3,4,5]
JSON.parse(`[${list.join()}]`);     //[1,2,3,4,5]
```



```js
// 扁平化一维数组
var arr = [1, [2, [3, 4]]];
console.log([].concat(...arr)); // [1, 2, [3, 4]]

// 可以扁平化多维数组
var arr = [1, [2, [3, 4]]];

function flatten(arr) {

    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }

    return arr;
}

console.log(flatten(arr))

```



#### 7.如何克隆一个数组？你能说出多少种？

1.借用concat方法

```js
var arr1 = [1,2,3];
var arr2 = arr1.concat();
```

2.借用slice方法

```js
var arr1 = [1,2,3];
var arr2 = arr1.slice(0);
```

原理：数组本质上也是Object，直接赋值的话，只是将引用赋值给另一个变量，最终会导致被复制的变量也会随着原来的数组变化而变化。



#### 8.说一说Array.prototype.sort()方法的原理？（追问：不传递参数会如何？）

sort方法接受一个“比较函数”作为参数。

**如果调用该方法时没有使用参数**，将按字母顺序对数组中的元素进行排序，说得更精确点，是**按照字符编码的顺序进行排序**。要实现这一点，首先应把数组的元素都转换成字符串（如有必要），以便进行比较。

如果想按照其他标准进行排序，就需要提供比较函数，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b，其返回值如下：
若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
若 a 等于 b，则返回 0。
若 a 大于 b，则返回一个大于 0 的值。

#### 9.找出Array中的最大元素，你能说出几种方法？

1.自己实现一个冒泡算法，实现就不多说了

2.利用Math的max方法

```js
var list = [1,100,23,65,43,2,9];
Math.max.apply(null, list);    //[1, 2, 9, 23, 43, 65, 100]
```

3.利用Array的sort方法先排序再取值

```js
var list = [1,100,23,65,43,2,9];
list.sort((a, b) => {return a-b;})    //[1, 2, 9, 23, 43, 65, 100]
```

#### 10.合并数组

有两个数组a、b，需求是将两个数组合并成一个。方法如下：

　　1、concat

　　　　js的Array对象提供了一个叫concat()方法，连接两个或更多的数组，并返回结果。

```javascript
var c = a.concat(b);//c=[1,2,3,4,5,6]
```

　　　　这里有一个问题，concat方法连接a、b两个数组后，a、b两个数组的数据不变，同时会返回一个新的数组。这样当我们需要进行多次的数组合并时，会造成很大的内存浪费，所以这个方法肯定不是最好的。

　　2、for循环

　　　　大概的思路是：遍历其中一个数组，把该数组中的所有元素依次添加到另外一个数组中。直接上代码：

```javascript
for(var i in b){



    a.push(b[i]);



}
```



　　　　这样的写法可以解决第一种方案中对内存的浪费，但是会有另一个问题：丑！这么说不是没有道理，如果能只用一行代码就搞定，岂不快哉~

　　3、apply

　　　　函数的apply方法有一个特性，那就是func.apply(obj,argv)，argv是一个数组。所以我们可以利用这点，直接上代码：

```javascript
a.push.apply(a,b);
```



　　　　调用a.push这个函数实例的apply方法，同时把，b当作参数传入，这样a.push这个方法就会遍历b数组的所有元素，达到合并的效果。

　　　　这里可能有点绕，我们可以把b看成[4,5,6]，变成这样：

```javascript
a.push.apply(a,[4,5,6]);
```

      然后上面的操作就等同于：

```javascript
a.push(4,5,6);
```

　　　　这样就很清楚了！

　　另外，还要注意两个小问题：

　　1）以上3种合并方法并没有考虑过a、b两个数组谁的长度更小。

　　所以好的做法是预先判断a、b两个数组哪个更大，然后使用大数组合并小数组，这样就减少了数组元素操作的次数！

　　2）有时候我们不希望原数组（a、b）改变，这时就只能使用concat了。

##### ES6

``` js
formatEs6ConcatArr () {
  let arr1 = ['a', 'b']
  let arr2 = ['c', 'c']
  let arr3 = ['d', 'e']
  // ES5 的合并数组
  // arr1.concat(arr2, arr3)
  // [ 'a', 'b', 'c', 'd', 'e' ]
  // ES6 的合并数组
  let arr4 = [...arr1, ...arr2, ...arr3]
  console.log('arr4=', arr4)
  // [ 'a', 'b', 'c', 'd', 'e' ]
  // 不过，这两种方法都是浅拷贝，使用的时候需要注意。
  const a1 = [{foo: 1}]
  const a2 = [{bar: 2}]
  const a3 = a1.concat(a2)
  const a4 = [...a1, ...a2]
  console.log(a3[0] === a1[0])// true
  console.log(a4[0] === a1[0])// true
 
}
上面代码中，a3和a4是用两种不同方法合并而成的新数组，但是它们的成员都是对原数组成员的引用，这就是浅拷贝。如果修改了原数组的成员，会同步反映到新数组。
```



### `17`.常考：如何实现深拷贝？

- **浅拷贝**：浅拷贝就是把属于源对象的值都复制一遍到新的对象,不会开辟两者独立的内存区域;

```js
// 这个 ES5的

function shallowClone(sourceObj) {
  // 先判断传入的是否为对象类型
  if (!sourceObj || typeof sourceObj !== 'object') {
    console.log('您传入的不是对象!!')；
    return;
  }
  // 判断传入的 Obj是类型,然后给予对应的赋值
  var targetObj = sourceObj.constructor === Array ? [] : {};

  // 遍历所有 key
  for (var keys in sourceObj) {
    // 判断所有属于自身原型链上的 key,而非继承(上游 )那些
    if (sourceObj.hasOwnProperty(keys)) {
      // 一一复制过来
      targetObj[keys] = sourceObj[keys];
    }
  }
  return targetObj;
}

 // ES6 可以用 Object.assign(targeObj, source1,source2,source3) 来实现对象浅拷贝
```

- **深度拷贝**：深度拷贝则是完完全全两个独立的内存区域,互不干扰

   ```js
   // 就是把需要赋值的类型转为基本类型(字符串这些)而非引用类型来实现
   // JOSN对象中的stringify可以把一个js对象序列化为一个JSON字符串，parse可以把JSON字符串反序列化为一个js对象
   
   var deepClone = function(sourceObj) {
     if (!sourceObj || typeof sourceObj !== 'object') {
       console.log('您传入的不是对象!!');
       return;
     }
     // 转->解析->返回一步到位
     return window.JSON
       ? JSON.parse(JSON.stringify(sourceObj))
       : console.log('您的浏览器不支持 JSON API');
   }
   
   //缺点：只能拷贝符合JSON数据标准类型的对象。当出现嵌套结构的时候 字符串反序列化容易乱
   ```

   

### 18.常考：如何用正则实现 trim()

```js
// 原生是有 trim()方法的.我们要模拟一个;

String.prototype.emuTrim = function(){
    // 这条正则很好理解,就是把头部尾部多余的空格字符去除
    return this.replace(/(^\s*)|(\s*$)/g,'');
}


'  fsaf fsdaf f safl lllll    '.emuTrim();  //"fsaf fsdaf f safl lllll"
```



### 19.js的运行机制了解吗？js是多线程还是单线程？那浏览器呢？

答：浏览器是多线程的（more：一个tab页包含2个进程，分别是html引擎和js引擎），js是单线程语言。

js异步操作常见的有：DOM事件绑定、Ajax请求、setTimeout定时器。总的来说，涉及回调函数的都可以理解为异步操作。

js执行机制：所有同步任务都在主线程上的栈中执行 => 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。=> 一旦"栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，选择出需要首先执行的任务（由浏览器决定，并不按序）。

讲就讲这么多，这个知识点真的很关键，这个搞不懂的话怎么好意思说自己是js开发，几个重要的知识点：1.堆、栈、队列的认识。

### `20`.JS原型链

定义层面上的理解：任何对象（函数、数组、对象）都有一个原型对象，这个原型对象由对象的内置属性（也叫隐式原型）_proto_指向它的构造函数的prototype（显式原型）指向的对象，即任何对象都是由一个构造函数创建的，但不是每一个对象都有prototype，只有函数（function）才有prototype。

方法/属性调用层面上的理解：当调用某种方法或查找某种属性时，首先会在自身调用和查找，如果自身并没有该方法或属性，则会去它的__proto__属性中调用查找，也就是它构造函数的prototype中调用查找。找都最后遇见null为止。

原型链算是 JS 内一种独有的机制,

所有对象都有一个内置`[[proto]]`指向创建它的原型对象(`prototype`)

原型链的基本用来实现继承用的