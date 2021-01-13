---
title: JS-III
date: 2020-09-24
tags:
 - JavaScript      
categories: 
 - FrontEnd
---

### 21.举例说明一个匿名函数的典型用例

- 匿名函数：就是没有函数名的函数。匿名函数的基本形式为(function(){...})()；前面的括号包含函数体，后面的括号就是给匿名函数传递参数并立即执行之。
- 匿名函数的作用是用于闭包和避免全局变量的污染以及函数名的冲突



#### 函数的定义，大致可分为三种方式：

第一种：函数申明，这也是最常规的一种

```javascript
function double(x){ 
	return 2 * x;
}
```

第二种：这种方法使用了Function构造函数，把参数列表和函数体都作为字符串，很不方便，不建议使用。

```javascript
var double = new Function('x', 'return 2 * x;');
```

第三种：

```javascript
var double = function(x) { return 2* x; }
```

#### 为什么(function（） {// code})();可以被执行, 而function（） {// code}();却会报错?



- 首先, 要清楚两者的区别:(function {// code})是表达式, function {// code}是函数声明.
- 其次, js"预编译"的特点:js在"预编译"阶段, 会解释函数声明, 但却会忽略表式.
- 当js执行到function() {//code}();时, 由于function() {//code}在"预编译"阶段已经被解释过, js会跳过function(){//code}, 试图去执行();, 故会报错;

当js执行到(function {// code})();时, 由于(function {// code})是表达式, js会去对它求解得到返回值, 由于返回值是一 个函数, 故而遇到();时, 便会被执行.

```javascript
function checkClosure(){ 
var str = 'rain-man'; 

setTimeout( 
function(){ alert(str); } //这是一个匿名函数 
, 2000); 
} 

checkClosure();
```



```javascript
//普通函数

function box() {                    //函数名是box       

    return 'Lee';
}

//匿名函数

function () {                       //匿名函数，会报错
    return 'Lee';
}


//通过表达式自我执行

(function () {                      //封装成表达式
   alert('Lee');
})();   

(function (age) {                   //封装成表达式
    alert(age);
})(100);                            //()表示执行函数，并且传参


//第一圆括号放匿名函数，第二个圆括号执行；

//把匿名函数赋值给变量

var box = function () {             //将匿名函数赋给变量
    return 'Lee';
};
alert(box());                      //调用方式和函数调用相似




//函数里的匿名函数
function box () {
    return function () {                        //函数里的匿名函数，产生闭包
        return 'Lee';
    }
}
alert(box()());                             //调用匿名函数


function Foo() {
    var a = 123;
    this.a = 456;
    (function() {
        console.log(a); // 123
        console.log(this.a); // undefined
    })();
};
var f = new Foo();
结果：undefined


匿名函数可以直接访问到外层署名函数（Foo）中的变量（使用关键字var定义的），但不能访问外层署名函数的属性（使用关键字this定义的）；

(function() {
    var a = 123;
    this.a = 456;
    (function() {
        console.log(a); // 123
        console.log(this.a); // 456
    })();
})();

结果：456

（1） 匿名函数既可以直接访问外层匿名函数中的变量，又直接可以访问外层匿名函数中的属性，而匿名函数却不可以直接访问外层已命名函数中的属性；
```



#### 匿名函数与闭包

**匿名函数最大的用途是创建闭包（这是JavaScript语言的特性之一），并且还可以构建命名空间，以减少全局变量的使用。**

闭包的含义：闭包说白了就是函数的嵌套，内层的函数可以使用外层函数的所有变量，即使外层函数已经执行完毕

```javascript
//通过闭包可以 返回局部变量
function box() {
    var user = 'Lee';
    return function () {//通过匿名函数返回box()局部变量
        return user;
	};
}
alert(box()());//通过box()()来直接调用匿名函数返回值

var b = box();
alert(b());//另一种调用匿名函数返回值
```

使用闭包有一个优点，也是它的缺点：就是可以把局部变量驻留在内存中，可以避免使用全局变量。(全局变量污染导致应用程序不可预测性，每个模块都可调用必将引来灾难，所以推荐使用私有的，封装的局部变量)。

```javascript
//通过全局变量来累加
var age = 100;                              //全局变量
function box() {
    age ++;                             //模块级可以调用全局变量，进行累加
}
box();                                  //执行函数，累加了
alert(age);                             //输出全局变量



//通过局部变量无法实现累加
function box() {
    var age = 100;
    age ++;                             //累加
    return age;
}

alert(box());                               //101

alert(box());                               //101，无法实现，因为又被初始化了



//通过闭包可以实现局部变量的累加

function box() {
    var age = 100;
    return function () {
        age ++;
        return age;
    }
}
var b = box();                              //获得函数
alert(b());                                 //调用匿名函数
alert(b());                                 //第二次调用匿名函数，实现累加

    b = null         //解除引用 等待回收内存；
```

由于闭包里作用域返回的局部变量资源不会被立刻销毁回收，所以可能会占用更多的内存。过度使用闭包会导致性能下降，建议在非常有必要的时候才使用闭包



作用域链的机制导致一个问题，**在循环中里的匿名函数取得的任何变量都是最后一个值。**

```javascript
var lists = document.getElementsByTagName('li'); 
for(var i = 0 , len = lists.length ; i < len ; i++){ 
		lists[ i ].onmouseover = function(){ 
			alert(i); 
	}; 
}
```

你会发现当鼠标移过每一个`<li>`元素时，总是弹出4，而不是我们期待的元素下标。这是为什么呢？注意事项里已经讲了（最终值）。显然这种解释过于简单，当mouseover事件调用监听函数时，首先在匿名函数（ function(){ alert(i); }）内部查找是否定义了 i，结果是没有定义；因此它会向上查找，查找结果是已经定义了，并且i的值是4（循环后的i值）；所以，最终每次弹出的都是4。



```javascript
var lists = document.getElementsByTagName('li'); 
for(var i = 0 , len = lists.length ; i < len ; i++){ 
  (function(index){ 
  		lists[ index ].onmouseover = function(){ 
  			alert(index); 
		}; 
	})(i); 
}
```

### 22.指出JS的宿主对象和原生对象的区别，为什么扩展JS内置对象不是好的做法？有哪些内置对象和内置函数？

1、内置（Build-in）对象与原生（Naitve）对象的区别在于：前者总是在引擎初始化阶段就被创建好的对象，是后者的一个子集；而后者包括了一些在运行过程中动态创建的对象。

2、引擎扩展对象是一个并不太大的集合，一般来说比较确定，它们也属于引擎的原生对象（但不属于ECMA规范的原生对象）。

3、宿主对象不是引擎的原生对象，而是由宿主框架通过某种机制注册到JavaScript引擎中的对象。

4、一些宿主会把自己提供的对象／构造器也称为“原生对象”，例如Internet Explorer 7就把它提供的XMLHttpRequest()称为原生的——与此相对的是在它的更早先版本中通过“new ActiveXObject('Microsoft.XMLHTTP')”这样的方法创建的对象。这种情况下，读者应注意到“宿主的原生对象”与“引擎的原生对象”之间的差异。

#### 一、原生对象

ECMA-262 把原生对象（native object）定义为“独立于宿主环境的 ECMAScript 实现提供的对象”。

Object、Function、Array、String、Boolean、Number、Date、RegExp、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError、ActiveXObject(服务器方面)、Enumerator(集合遍历类)、RegExp（正则表达式）

由此可以看出，简单来说，原生对象就是 ECMA-262 定义的类（引用类型）。

#### 二、内置对象

ECMA-262 把内置对象（built-in object）定义为“由 ECMAScript 实现提供的、独立于宿主环境的所有对象，在 ECMAScript 程序开始执行时出现”。这意味着开发者不必明确实例化内置对象，它已被实例化了。

同样是“独立于宿主环境”。根据定义我们似乎很难分清“内置对象”与“原生对象”的区别。而ECMA-262 只定义了两个内置对象，即 Global 和 Math （它们也是原生对象，根据定义，每个内置对象都是原生对象）。

如此就可以理解了。内置对象是原生对象的一种。而其包含的两种对象中，Math对象我们经常用到，可这个Global对象是啥东西呢？

Global对象是ECMAScript中最特别的对象，因为实际上它根本不存在！在ECMAScript中，不存在独立的函数，所有函数都必须是某个对象的方法。

类似于isNaN()、parseInt()和parseFloat()方法等，看起来都是函数，而实际上，它们都是Global对象的方法。而且Global对象的方法还不止这些。

#### 三、宿主对象

何为“宿主对象”？ ECMAScript中的“宿主”当然就是我们网页的运行环境，即“操作系统”和“浏览器”。所有非原生对象都是宿主对象（host object），即由 ECMAScript 实现的宿主环境提供的对象。

所有的 BOM 和 DOM 对象都是宿主对象。因为其对于不同的“宿主”环境所展示的内容不同。其实说白了就是，ECMAScript官方未定义的对象都属于宿主对象，因为其未定义的对象大多数是自己通过ECMAScript程序创建的对象。TML DOM 是 W3C 标准（是 HTML 文档对象模型的英文缩写，Document Object Model for HTML）。

HTML DOM 定义了用于 HTML 的一系列标准的对象，以及访问和处理 HTML 文档的标准方法。

通过 DOM，可以访问所有的 HTML 元素，连同它们所包含的文本和属性。可以对其中的内容进行修改和删除，同时也可以创建新的元素。

### `23`.attribute和property的区别

#### 第一个问题: 什么是 attribute & 什么是 property ?

**attribute** 是我们在 **html** 代码中经常看到的键值对, 例如:

```
<input id="the-input" type="text" value="Name:" />
复制代码
```

上面代码中的 input 节点有三个 attribute:

- id : the-input
- type : text
- value : Name:

**property** 是 attribute 对应的 DOM 节点的 对象属性 (Object field), 例如:

```
HTMLInputElement.id === 'the-input'
HTMLInputElement.type === 'text'
HTMLInputElement.value === 'Name:'
复制代码
```

#### 第二个问题:

从上面的例子来看, 似乎 attribute 和 property 是相同的, 那么他们有什么区别呢?

让我们来看另一段代码:

```
<input id="the-input" type="typo" value="Name:" /> // 在页面加载后,
我们在这个input中输入 "Jack"
复制代码
```

注意这段代码中的 type 属性, 我们给的值是 **typo**, 这并不属于 input 支持的 type 种类.

让我们来看看上面这个 input 节点的 attribute 和 property:

```
// attribute still remains the original value
input.getAttribute('id') // the-input
input.getAttribute('type') // typo
input.getAttribute('value') // Name:

// property is a different story
input.id // the-input
input.type //  text
input.value // Jack
复制代码
```

可以看到, 在 attribute 中, 值仍然是 html 代码中的值. 而在 property 中, type 被自动修正为了 **text**, 而 value 随着用户改变 input 的输入, 也变更为了 **Jack**

这就是 attribute 和 Property 间的区别:

attribute 会始终保持 html 代码中的初始值, 而 Property 是有可能变化的.

其实, 我们从这两个单词的名称也能看出些端倪:

**attribute** 从语义上, 更倾向于不可变更的

而 **property** 从语义上更倾向于在其生命周期中是可变的

#### Attribute or Property 可以自定义吗?

先说结论: **attribute 可以** **property 不行**

我们可以尝试在 html 中自定义 attribute:

```
<input value="customInput" customeAttr="custome attribute value" />
复制代码
```

然后我们尝试获取自定义的属性:

```
input.getAttribute('customAttr') // custome attribute value
input.customAttr // undefined
复制代码
```

可以看到, 我们能够成功的获取自定义的 attribute, 但是无法获取 property.

其实不难理解, DOM 节点在初始化的时候会将**html 规范**中定义的 attribute 赋值到 property 上, 而自定义的 attribute 并不属于这个氛围内, 自然生成的 DOM 节点就没有这个 property.

### 24.document load和document DOMContentLoaded两个事件的区别

#### 区别

- DOMContentLoaded: DOM解析完成即触发此事件，不等待styles, images等资源的加载
- load：依赖的资源也已加载完成
- DOMContentLoaded绑定到document，load绑定到window

```javascript
document.addEventListener('DOMContentLoaded', function(event) {



  console.log("DOM fully loaded and parsed");  // 先打印



});



window.addEventListener('load', function(event) {



  console.log("img loaded");  // 后打印



}); 
```

#### 何时触发这两个事件？

1.当 `onload` 事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。

2.当 `DOMContentLoaded` 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。



#### **为什么要区分？**



我们需要给一些元素的事件绑定处理函数。但问题是，如果那个元素还没有加载到页面上，但是绑定事件已经执行完了，是没有效果的。

这两个事件大致就是用来避免这样一种情况，将绑定的函数放在这两个事件的回调中，保证能在页面的某些元素加载完毕之后再绑定事件的函数。

DOM文档加载的步骤为

1. 解析HTML结构。
2. 加载外部脚本和样式表文件。
3. 解析并执行脚本代码。
4. DOM树构建完成。//DOMContentLoaded
5. 加载图片等外部文件。
6. 页面加载完毕。//load

在第4步，会触发`DOMContentLoaded`事件。在第6步，触发`load`事件。





*用原生js可以这么写*

```javascript
// 不兼容老的浏览器，兼容写法见[jQuery中ready与load事件](http://www.imooc.com/code/3253)，或用jQuery



document.addEventListener("DOMContentLoaded", function() {



   // ...代码...



}, false);



 



window.addEventListener("load", function() {



    // ...代码...



}, false);
```

*用jQuery这么写*

```javascript
// DOMContentLoaded



$(document).ready(function() {



    // ...代码...



});



 



//load



$(document).load(function() {



    // ...代码...



});
```

### 25.typeof能够得到哪些值

typeof运算符用来检测给定变量的数据类型，返回一个用来表示表达式的数据类型的字符串。 

可能的返回值有："number"、"string"、"boolean"、"object"、"function" 和 "undefined"。 

表达式	返回值
typeof undefined	'undefined'    如果值是undefined
typeof null	'object'     如果这个值是对象或者null
typeof true	'boolean'    如果这个值是布尔值
typeof 123	'number'    如果这个值是数字
typeof "abc"	'string'        如果这个字是字符串 
typeof function() {}	'function'    如果这个值是函数
typeof {}	'object'    如果这个值是对象或者null
typeof []	'object'    如果这个值是对象或者null
typeof unknownVariable	'undefined'    如果这个值没有定义
"symbol" —— ES6引入的一种新的原始数据类型Symbol，表示独一无二的值

### 26.什么是“use strict”,好处和坏处

设立"严格模式"的优点：

1. 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;

2. 消除代码运行的一些不安全之处，保证代码运行的安全；

3. 提高编译器效率，增加运行速度；

4. 为未来新版本的Javascript做好铺垫。

注：经过测试 IE6,7,8,9 均不支持严格模式。

缺点：
现在网站的 JS 都会进行压缩，一些文件用了严格模式，而另一些没有。这时这些本来是严格模式的文件，被 merge 后，这个串就到了文件的中间，不仅没有指示严格模式，反而在压缩后浪费了字节。

### 27.函数的作用域是什么？js 的作用域有几种？

#### **函数作用域**

在JavaScript中变量的作用域，并非和C、Java等编程语言似得，在变量声明的代码段之外是不可见的，我们通常称为块级作用域，然而在JavaScript中使用的是函数作用域（变量在声明它们的函数体以及这个函数体嵌套的任意函数体都是有定义的）

JavaScript的函数作用域是指在函数内声明的所有变量在函数体内始终是可见的，可以在整个函数的范围内使用及复用，也就是说在函数体内变量声明之前就已经可用了(事实上在嵌套的作用域中也可以使用)。



#### **js 的作用域**

##### 一.ES5中的作用域

- **全局变量**：声明在函数外部的变量，在代码中任何地方都能访问到的对象拥有全局作用域（所有没有var直接赋值的变量都属于全局变量）

（1）最外层函数和在最外层函数外面定义的变量拥有全局作用域

（2）所有末定义直接赋值的变量自动声明为拥有全局作用域

（3）所有window对象的属性拥有全局作用

	一般情况下，window对象的内置属性都拥有全局作用域，例如window.name、window.location、window.top等等。



- **局部变量**：声明在函数内部的变量，和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部，所有在一些地方也会看到有人把这种作用域称为函数作用域（所有没有var直接赋值的变量都属于全局变量）

##### 二.ES6中的作用域

**1、为什么需要块级作用域**

ES5只有全局作用域和函数作用域，没有块级作用域，会带来以下问题：

1) 变量提升导致内层变量可能会覆盖外层变量

2) 用来计数的循环变量泄露为全局变量 （for 循环 的i）

3）可以解决闭包问题

**2、ES6的块级作用域**

块级作用域是通过新增命令let和const来体现。具体看let&const区别

### 28.JS如何实现重载和多态

#### 重载

##### 定义

重载可认为是静态的多态，静态联编，发生在编译阶段；

重载就是一组具有相同名字、不同参数列表的函数（方法）。

重载，函数特征之一，表现为在一个类中同名不同参的方法分别被调用会产生不同的结果。

##### 实现

- **根据arguments个数实现重载**

js本身不支持重载，所以只能通过其他方式实现，arguments检测传参的个数，然后再执行不同的方式

```javascript
function add() {
        var sum = 0 ;
        for ( var i = 0 ; i < arguments.length; i ++ ) {
            sum += arguments[i];
        }
        return sum;
    }

    alert(add());
    alert(add( 1 , 2 ));
    alert(add( 1 , 2 , 3 ));
```



```javascript
function overLoading() {
　　// 根据arguments.length，对不同的值进行不同的操作
　　switch(arguments.length) {

　　　　case 0:
　　　　　　/*操作1的代码写在这里*/
　　　　　　break;
　　　　case 1:
　　　　　　/*操作2的代码写在这里*/
　　　　　　break;
　　　　case 2:
　　　　　　/*操作3的代码写在这里*/
　　//后面还有很多的case......
}
}
```

- **检测数据类型实现重载**

根据传参的类型，调用不同的方法，用typeof进行检测

```javascript
//检测数据类型实现重载 typeof
    var MyClass=function(){
        var AddNum=function(a,b){
            return a+b;
        }

        var AddString=function(a,b){
            return "I am here"+a+b;
        }

        this.Add=function(a,b){
            if(typeof(a)=="number")
                return AddNum(a,b);
            else
                return AddString(a,b);
        }
    }
    function add(a,b){
        return a+b;
    }
    function add(a,b){
        return "I am here"+a+b;、
    }

    var MyObj = new MyClass();
    var X = MyObj.Add(5,6);
    var Y = MyObj.Add("A","FFFFFF");

    alert(X); //结果：11
    alert(Y); //结果：I am hereAFFFFFF
```

- **jquery中的重载**

如果传递2个参数表示获取值，传递三个参数表示赋值

```javascript
function attr(id, key, value){
        var dom =  $$.$id(id);
        var args = arguments.length;
        if(args ===3 ){
            dom.setAttribute(key, value);
        }else{
            return dom.getAttribute(key);
        }
    }

attr(1,2);
attr(1,2,3);
```



#### 多态

##### 定义

多态是动态的，动态联编，发生在运行阶段；

多态，面向对象特征之一，表现为不同对象调用相同方法会产生不同的结果。可以理解一个方法被不同实现后 展现不同的效果及状态。

静态的比动态的效率高，但动态的最大优点是多态性，提高代码复用性。



##### 实现

- 非多态代码示例

```javascript
var makeSound = function(animal) {
    if(animal instanceof Duck) {
        console.log('嘎嘎嘎');
    } else if (animal instanceof Chicken) {
        console.log('咯咯咯');
    }
}

var Duck = function(){}
var Chiken = function() {};
makeSound(new Chicken());
makeSound(new Duck());
```

- 多态的代码示例

```javascript
var makeSound = function(animal) {
    animal.sound();
}

var Duck = function(){}
Duck.prototype.sound = function() {
    console.log('嘎嘎嘎')
}
var Chiken = function() {};
Chiken.prototype.sound = function() {
    console.log('咯咯咯')
}

makeSound(new Chicken());
makeSound(new Duck());
```

### 29.原生事件绑定（跨浏览器），dom0和dom2的区别？

1. DOM0级事件处理程序（属性绑定，兼容性好）

       通过javascript制定事件处理程序的传统方式，将一个函数赋值给一个事件处理程序属性。特点是简单，跨浏览器。
           var btn = document.getElementById("btn");
       	btn.onclick = function(){
       		alert('cliked');
       	}
       dom0级方法制定的事件处理程序被认为是元素的方法，因此这个时候事件处理程序是在元素的作用域中运行，this指向当前元素。
        btn.onclick = null;  //删除事件处理程序

2. DOM2级事件处理程序（函数绑定，兼容性不好）

 3. 非IE

       DOM2级规范以一种符合逻辑的方式来标准化DOM事件，IE9,Firefox,Opera,Safari,Chrome全部已经实现了"DOM2级事件"模块的核心部分。IE8是最后一个仍然使用其专有事件系统的主要浏览器。

        		addEventListener()	
        		事件绑定
        			参数：
        				要绑定的事件名 
        	  			作为事件处理的函数
        	 		 	布尔值：true在捕获阶段调用事件处理程序；false在冒泡阶段调用
        		removeEventListener()	
        		事件删除
        			参数：
        				要删除的事件名
        	  			作为事件处理的函数
        	 		 	布尔值：true在捕获阶段调用事件处理程序；false在冒泡阶段调用
        		
        	  	例如：
        	  		//事件绑定
        			var btn = document.getElementById("btn");
        			btn.addEventListener("click",function(){
        				alert(this.id); //该函数在其依附的元素的作用域中运行。
        			},false);
        			//事件移除
        			var btn = document.getElementById("btn");
        			var handler = function(){
        				alert(this.id);
        			}
        			btn.addEventListener("click",handler,false);
        			btn.removeEventListener("click",handler,false);//移除
        	
        	可以添加多个事件处理程序，并且按照添加她们的顺序触发。移除事件传入的参数与添加处理程序时使用的参数相同，添加事件时如果使用匿名函数将无法删除

4. IE事件处理程序
   事件处理程序会在全局作用域中运行，因此this指向window对象。为一个对象添加两个相同的事件，事件处理程序的顺序是按照添加相反顺序进行处理
   		attachEvent() 
   		事件绑定
   		  	参数：
   		  		事件处理程序名称
   				事件处理函数
   		detachEvent()
   		事件移除
   			参数：
   		  		事件处理程序名称
   				事件处理函数
   		事件处理程序都被添加到冒泡阶段

5. 跨浏览器的事件处理程序

var outer = document.getElementById("outer");
var center = document.getElementById("center");
var inner = document.getElementById("inner");

function handler(){
    alert(this.id);
}
		
//事件绑定  IE/firefox浏览器
eventUtil.bind(inner,"click",handler);

//事件解绑
eventUtil.unbind(inner,"click",handler);

var eventUtil = {
	/**
		@param src事件源，type事件类型，fn事件处理函数
	*/
	bind:function(src,type,fn){
		if(src.addEventListener){
			src.addEventListener(type,fn,false);
		}else if(src.attachEvent){
			src.attachEvent("on"+type,fn);
		}else{
			src["on"+type] = fn;
		}
	},
	unbind:function(src,type,fn){
		if(src.removeEventListener){
			src.removeEventListener(type,fn,false);
		}else if(src.detachEvent){
			src.detachEvent("on"+type,fn);
		}else {
			src["on"+type] = null;
		}
	}
};
4.区别：

如果定义了两个dom0级事件，dom0级事件会覆盖

dom2不会覆盖，会依次执行

dom0和dom2可以共存，不互相覆盖，但是dom0之间依然会覆盖



### 30.如何实现图片滚动懒加载

#### 懒加载的意义（为什么要使用懒加载）

对页面加载速度影响最大的就是图片，一张普通的图片可以达到几M的大小，而代码也许就只有几十KB。当页面图片很多时，页面的加载速度缓慢，几S钟内页面没有加载完成，也许会失去很多的用户。

所以，对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。这样子对于页面加载性能上会有很大的提升，也提高了用户体验。

#### 原理

将页面中的img标签src指向一张小图片或者src为空，然后定义`data-src`（这个属性可以自定义命名，我才用data-src）属性指向真实的图片。`src`指向一张默认的图片，否则当`src`为空时也会向服务器发送一次请求。可以指向`loading`的地址。

> 注：图片要指定宽高

```
<img src="default.jpg" data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg" />复制代码
```

当载入页面时，先把可视区域内的img标签的`data-src`属性值负给`src`，然后监听滚动事件，把用户即将看到的图片加载。这样便实现了懒加载。

#### 代码

在写代码前，需要了解各种高度。先看这篇文章[scrollTop,offsetTop,scrollLeft,offsetLeft](http://i.jakeyu.top/2016/09/04/scrollTop-offsetTop-scrollLeft-offsetLeft/)

```
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        img {
            display: block;
            margin-bottom: 50px;
            width: 400px;
            height: 400px;
        }
    </style>
</head>

<body>

    <img src="default.jpg" data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg" alt="">
    <img src="default.jpg" data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg" alt="">
    <img src="default.jpg" data-src="http://ww1.sinaimg.cn/large/006y8mN6gw1fa7kaed2hpj30sg0l9q54.jpg" alt="">
    <img src="default.jpg" data-src="http://ww1.sinaimg.cn/large/006y8mN6gw1fa7kaed2hpj30sg0l9q54.jpg" alt="">
    <img src="default.jpg" data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg" alt="">
    <img src="default.jpg" data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg" alt="">
    <img src="default.jpg" data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg" alt="">
    <img src="default.jpg" data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg" alt="">
    <img src="default.jpg" data-src="http://ww1.sinaimg.cn/large/006y8mN6gw1fa7kaed2hpj30sg0l9q54.jpg" alt="">
    <img src="default.jpg" data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg" alt="">
    <img src="default.jpg" data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg" alt="">

</body>复制代码
```

##### JavaScript

```
<script>
    var num = document.getElementsByTagName('img').length;
    var img = document.getElementsByTagName("img");
    var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历

    lazyload(); //页面载入完毕加载可是区域内的图片

    window.onscroll = lazyload;

    function lazyload() { //监听页面滚动事件
        var seeHeight = document.documentElement.clientHeight; //可见区域高度
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
        for (var i = n; i < num; i++) {
            if (img[i].offsetTop < seeHeight + scrollTop) {
                if (img[i].getAttribute("src") == "default.jpg") {
                    img[i].src = img[i].getAttribute("data-src");
                }
                n = i + 1;
            }
        }
    }
</script>复制代码
```

##### jQuery

```
<script>
    var n = 0,
        imgNum = $("img").length,
        img = $('img');

    lazyload();

    $(window).scroll(lazyload);

    function lazyload(event) {
        for (var i = n; i < imgNum; i++) {
            if (img.eq(i).offset().top < parseInt($(window).height()) + parseInt($(window).scrollTop())) {
                if (img.eq(i).attr("src") == "default.jpg") {
                    var src = img.eq(i).attr("data-src");
                    img.eq(i).attr("src", src);

                    n = i + 1;
                }
            }
        }
    }
</script>复制代码
```

#### 使用节流函数进行性能优化

如果直接将函数绑定在`scroll`事件上，当页面滚动时，函数会被高频触发，这非常影响浏览器的性能。

我想实现限制触发频率，来优化性能。

节流函数：只允许一个函数在N秒内执行一次。下面是一个简单的节流函数：

```
// 简单的节流函数
//fun 要执行的函数
//delay 延迟
//time  在time时间内必须执行一次
function throttle(fun, delay, time) {
    var timeout,
        startTime = new Date();

    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();

        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= time) {
            fun.apply(context, args);
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(fun, delay);
        }
    };
};
// 实际想绑定在 scroll 事件上的 handler
function lazyload(event) {
        for (var i = n; i < imgNum; i++) {
            if (img.eq(i).offset().top < parseInt($(window).height()) + parseInt($(window).scrollTop())) {
                if (img.eq(i).attr("src") == "default.jpg") {
                    var src = img.eq(i).attr("data-src");
                    img.eq(i).attr("src", src);

                    n = i + 1;
                }
            }
        }
    }
// 采用了节流函数
window.addEventListener('scroll',throttle(lazyload,500,1000));
```



### 31.js 的字符串类型有哪些方法？

String是基本数据类型，同时也是基本包装类型。从常规上讲基本类型不应该有方法，为了让我们实现更直观的操作，在调用基本包装类型的方法时，后台会自动完成一系列的处理：
 （1）创建String类型的一个实例
 （2）在实例上调用指定的方法
 （3）销毁这个实例

```
var s1 = "abc"
s2 = s1.substring(2)
复制代码
```

相当于执行了以下代码：

```
var s1 = new String('abc')
var s2 = s1.substring(2)
s1 = null
复制代码
```

#### 引用类型和基本包装类型的区别

  主要的区别就是对象的生存期，使用 new 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，只存在于一行代码的执行瞬间，然后被立即销毁，所以我们不能在代码运行的时候给基本类型之添加属性和方法

```
var str1 = '123';
console.log(typeof str1) //string

var str2 = new String('aaa')
console.log(typeof str2) //object

var str3 = new Object('111')
console.log(typeof str3) //object
console.log(str3 instanceof String) //true
console.log(str3 instanceof Object) //true
复制代码
```

#### 字符串常用方法

```js
var str="hello world";

str.charAt(1) //e 返回给定位置的字符
str.charcodeAt(1) //101 返回给定位置字符的字符编码
str[1] //e ie8+

concat() //可以接受任意多个参数拼接成新的字符串，但不会改变原字符串

slice() //截取字符串，接受一或两个参数(开始位置和结束位置)，接受负值时会将负值与字符串长度相加
substring() //截取字符串，接受一或两个参数(开始位置和结束位置，会将较小的参数作为起始位置)，接受负值时会将负的参数转换为零
substr() //截取字符串，接受一或两个参数(开始位置和截取的字符个数)，接受负值时会将第一个负的参数加上字符串长度，将第二个负的参数转换为0
indexOf() //可接受两个参数，要查找的子字符串和查找起点(可选)，找到返回位置，找不到返回-1
lastIndexOf() //从数组的末尾开始查找
trim() //删除前置和后缀的空格 返回的是字符串的副本，原始字符串不变

toLowerCase() //转小写
toUpperCase() //转大写
toLocaleLowerCase() //转小写，针对地区的方法
toLocaleUpperCase() //转大写，针对地区的方法

match() //接收一个参数，正则表达式或者RegExp对象
search() //接受一个正则，返回字符串中第一个匹配项的索引，没有返回-1
replace() //替换字符串。接受两个参数，第一个是一个字符串或者RegExp对象，
            //第二个参数是一个字符串或者函数。如果第一个参数是一个字符串，
            //那么只会替换第一个子字符串，要想替换所有唯一的方法就是提供一个
            //正则表达式，指定全局g标志
            //replace()方法的第二个参数也可以是一个函数
            function(match,...,pos,originalText){
                match //模式的匹配项
                ... //正则表达式定义了多个捕获组的情况下，是第二，三...匹配项
                pos //模式的匹配项在字符串中的位置
                originalText //原始字符串
            }
split() //分割字符串，并返回一个数组。第一个参数接受一个分隔符(可以是字符串或者RegExp对象)，
        //可选的第二个参数用于指定返回数组的大小
localeCompare() //比较两个字符串，如果字符串在字母表中应该排在字符串参数之前，返回一个负数。相等返回0，之后返回正数
String.fromCharcode() //构造函数本身的静态方法，接收一个或多个字符编码，转换成字符串，与charCodeAt相反
```



### 32.编写一个通用的事件监听函数

```js
var EventUtil = {
	// 得到事件
	getEvent:function(event){
		return event ? event : window.event;
	},
	// 得到事件的目标
	getTarget:function(event){
		return event.target || event.srcElement;
	}
	// 添加事件
	addEvent:function(element, type, handler){
		// DOM2级事件处理程序，false表示在冒泡阶段处理事件程序
		if(element.addEventListener){
			element.addEventListener(type, handler, true);
		} else if(element.attachEvent){
		    // IE事件处理程序
			element.attachEvent("on" + type, handler);
		} else{
		    // DOM0级
			element["on" + type]=handler;
		}
	},
	// 移除事件
	removeEvent:function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler);
		} else if(element.detachEvent){
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	// 阻止事件默认行为
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault;
		} else {
			event.returnValue = false;
		}
	},
	// 阻止事件冒泡和捕获
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
}

// 使用方法
var btn = document.getElementById("myBtn"),
    handler = function () {
        console.log("Clicked");
    };

EventUtil.addHandler(btn,"click",handler);
EventUtil.removeHandler(btn,"click",handler);

```



### 33.web端cookie的设置和获取

JavaScript 通过 document.cookie 来获取 cookie 。

遗憾的是，document.cookie 只能获取所有 cookie 的集合，不能获取单个 cookie 。

例如，获取当前cookie集合：

```html
<input id="demo1" type="button" value="获取cookie" />

<script type="text/javascript">
document.getElementById("demo1").οnclick=function(){
    alert(document.cookie);
}
</script>
```

实例演示：


我们可以自定义一个函数来获取单个 cookie 的值。

我们知道，cookie 集合的格式是这样的：
name1=value1 ; name2=value2 ; name3=value3 ; ...
将 cookie 以分号（;）分组，再以等号（=）分组，就能得到每个 cookie 的名称和值。

```js
/**
  *  func  getCookie()  获取单个cookie的值
  *  pram  cookieName  cookie的名称
**/

function getCookie(cookieName){
    var cookieObj={},
          cookieSplit=[],
          // 以分号（;）分组
          cookieArr=document.cookie.split(";");
    for(var i=0,len=cookieArr.length;i<len;i++)

        if(cookieArr[i]) {

            // 以等号（=）分组
            cookieSplit=cookieArr[i].split("=");
            // Trim() 是自定义的函数，用来删除字符串两边的空格
            cookieObj[cookieSplit[0].Trim()]=cookieSplit[1].Trim();
        }
    return cookieObj[cookieName];
}
```

例如，获取 name 的值：

```html
getCookie["name"];
```

对上面的代码稍作修改，就可将 cookie 的值保存为对象的属性，使用时非常方便。代码如下：

```js
/**
  *  func  getCookieObj()  获取所有cookie的值并将其保存为对象的属性
**/

function getCookieObj(){
    var cookieObj={},
          cookieSplit=[],
          // 以分号（;）分组
          cookieArr=document.cookie.split(";");
    for(var i=0,len=cookieArr.length;i<len;i++)
        if(cookieArr[i]) {
            // 以等号（=）分组
            cookieSplit=cookieArr[i].split("=");
            // Trim() 是自定义的函数，用来删除字符串两边的空格
            cookieObj[cookieSplit[0].Trim()]=cookieSplit[1].Trim();

        }
    return cookieObj;
}
```

例如，获取 name 的值：

```js
var cookieObj=getCookieObj();
cookieObj.name;
```

举例，设置并获取cookie的值：

```html
<table>
    <tr>
        <td>用户名：</td>
        <td><input id="demo_input1" type="text" /></td>
        <td>密码：</td>
        <td><input id="demo_input2" type="text" /></td>
    </tr>

    <tr>
        <td colspan="2" align="center"><input id="demo_button1" type="button" value="设置Cookie" /></td>
        <td colspan="2" align="center"><input id="demo_button2" type="button" value="获取Cookie" /></td>
    </tr>
</table>

<script type="text/javascript">
    document.getElementById("demo_button1").οnclick=function(){
    var cookie_username = "username=" + escape(document.getElementById("demo_input1").value) + ";"+ "expire="+((new Date()).getTime()+600*1000);
     var cookie_password = "password=" + escape(document.getElementById("demo_input2").value)+";"+"expire="+((new Date()).getTime()+600*1000);
        document.cookie=cookie_username;
        document.cookie=cookie_password;
    }
    document.getElementById("demo_button2").οnclick=function(){

        var cookieObj=getCookieObj();
        alert(
            "用户名："+unescape(cookieObj.username)+"\n"+
            "密码："+unescape(cookieObj.password)
        );
    }
</script>
```



### `34`.JavaScript 的事件流模型都有什么？（注意提问方式）

JavaScript 中的事件流模型 `事件冒泡` 和 `事件捕获`，以及 `事件委托`（也叫事件代理），是前端面试中经常出现的知识点，作为一名前端工程师，梳理基础知识点对你一定有所帮助。

**文章中所有的代码都有 codepen 实例，链接在对应的章节内，请同学们尝试自己修改运行代码，以便加深理解。**

#### 一、名词解释

在开始讲解之前，我们先熟悉几个概念

- 事件

事件是可以被 JavaScript 侦测到的行为。
如 `onclick` `onload` `onchange` 等事件。

- 事件流

事件在页面中的响应顺序

- 事件流模型

为了更好的理解事件流模型，我们把 DOM 树想象成一个靶子，父节点在外，子节点在内。如下图所示：

![事件流模型 - 靶子](https://segmentfault.com/img/bVbd5Ry?w=240&h=240)

- `事件冒泡(event bubbling)` 由内向外，即从 DOM 树的子到父，`div -> body -> html -> document`
- `事件捕获(event capturing)` 由外向内，即从 DOM 树的父到子，`document -> html -> body -> div`

接下来我们先通过代码实例详细讲解事件冒泡和事件捕获，然后讲解事件委托，并实现一个事件委托的实例。

#### 二、事件冒泡 vs. 事件捕获

> 代码地址: [https://codepen.io/cecillia/p...](https://codepen.io/cecillia/pen/qyqJNX)点击预览

`事件冒泡` 和 `事件捕获` 分别由 `微软` 和 `网景` 公司提出，后来 `W3C` 将两者结合，平息了战火，制定了统一的标准 —— **先捕获再冒泡**。

##### addEventListener

在 JavaScript 中，`addEventListener` 方法用于向指定元素添加事件句柄。
语法：`element.addEventListener(event, function, useCapture)`

| element    | 目标元素                                                     |      |
| ---------- | ------------------------------------------------------------ | ---- |
| event      | 事件名，如 click                                             |      |
| function   | 事件触发时执行的函数                                         |      |
| useCapture | Bool值，true - 事件句柄在 `捕获` 阶段执行，false- false- 默认。事件句柄在 `冒泡` 阶段执行 |      |

##### 事件冒泡

来看一段代码实例，思考运行后会弹出什么。

```
/**.html**/
<div class="t3">document
  <div class="t2">html
    <div class="t1">body
      <div class="t0">div</div>
    </div>
  </div>
</div>

/**.js**/
var $t0 = document.getElementsByClassName('t0')[0];
var $t1 = document.getElementsByClassName('t1')[0];
var $t2 = document.getElementsByClassName('t2')[0];
var $t3 = document.getElementsByClassName('t3')[0];

$t0.addEventListener("click", function(){
  alert("click div")
}, false);

$t1.addEventListener("click", function(){
  alert("click body")
}, false);

$t2.addEventListener("click", function(){
  alert("click html")
}, false);

$t3.addEventListener("click", function(){
  alert("click document")
}, false);
```

根据冒泡事件流模型由内向外的规则，会依次弹出：`click div -> click body -> click html -> click docuement`

##### 事件捕获

将上一段代码中的 `false` 都改为 `ture`，则变为捕获方式：

```
/**.html**/
<div class="t3">document
  <div class="t2">html
    <div class="t1">body
      <div class="t0">div</div>
    </div>
  </div>
</div>

/**.js**/
var $t0 = document.getElementsByClassName('t0')[0];
var $t1 = document.getElementsByClassName('t1')[0];
var $t2 = document.getElementsByClassName('t2')[0];
var $t3 = document.getElementsByClassName('t3')[0];

$t0.addEventListener("click", function(){
  alert("click div")
}, true);

$t1.addEventListener("click", function(){
  alert("click body")
}, true);

$t2.addEventListener("click", function(){
  alert("click html")
}, true);

$t3.addEventListener("click", function(){
  alert("click document")
}, true);
```

根据捕获事件流模型由外向内的规则，会依次弹出：`click document -> click html -> click body -> click div`

##### 事件冒泡&事件捕获同时存在

如果两种事件流模型同时存在会怎样展示呢？

```
/**.html**/
<div class="t3">document
  <div class="t2">html
    <div class="t1">body
      <div class="t0">div</div>
    </div>
  </div>
</div>

/**.js**/
var $t0 = document.getElementsByClassName('t0')[0];
var $t1 = document.getElementsByClassName('t1')[0];
var $t2 = document.getElementsByClassName('t2')[0];
var $t3 = document.getElementsByClassName('t3')[0];

$t0.addEventListener("click", function(){
  alert("click div")
}, false);

$t1.addEventListener("click", function(){
  alert("click body")
}, false);

$t2.addEventListener("click", function(){
  alert("click html")
}, true);

$t3.addEventListener("click", function(){
  alert("click document")
}, true);
```

**原则：**

- 从外向内，捕获前进，遇到捕获事件立即执行
- 非 target 节点，先捕获再冒泡
- target 节点，按代码书写顺序执行（无论冒泡还是捕获）

因此会依次弹出：`click document -> click html -> click div -> click body`

#### 三、事件流模型的应用：事件委托

> 代码地址：[https://codepen.io/cecillia/p...](https://codepen.io/cecillia/pen/KBaRzR)点击预览

`事件委托` 又叫 `事件代理`，指的是利用事件冒泡原理，只需给外层父容器添加事件，若内层子元素有点击事件，则会冒泡到父容器上，这就是事件委托，简单说就是：子元素委托它们的父级代为执行事件。

事件流模型在业务开发中有哪些应用场景呢？

例如，一个播放列表有成千上万首歌曲，如果遍历播放列表，给每个 item 添加点击事件，而这样无疑会多次访问 DOM，每次 DOM 操作都会引起浏览器的重绘与重排，非常不利于性能优化。

这时候我们可以利用事件委托，只给最外层的容器添加响应事件，这样只需一次 DOM 操作，就能达到目的。

```
/**.html**/
<ul id="music">
  <li>青花瓷</li>
  <li>东风破</li>
  <li>双节棍</li>
</ul>

/**.js**/
var $music = document.getElementById('music');

$music.addEventListener('click', function(e) {
  if(e.target.nodeName.toLowerCase() === 'li') { // 判断目标元素target是否为li元素
    var content = e.target.innerHTML;
    console.log(content);
  }
}, false)
```

怎么样，事件委托也不过如此吧？只要掌握了事件冒泡、事件捕获的原理，并将其运用到实际业务开发中，就能够真正 get 事件委托这个知识点啦~

### 35.navigator对象，location和history



#### Window 对象

Window 对象表示浏览器中打开的窗口。

如果文档包含框架（frame 或 iframe 标签），浏览器会为 HTML 文档创建一个 window 对象，并为每个框架创建一个额外的 window 对象。

- Window 对象集合

| 集合     | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| frames[] | 返回窗口中所有命名的框架。该集合是 Window 对象的数组，每个 Window 对象在窗口中含有一个框架或 `<iframe>`。属性 frames.length 存放数组 frames[] 中含有的元素个数。注意，frames[] 数组中引用的框架可能还包括框架，它们自己也具有 frames[] 数组。 |

- Window 对象属性

| 属性                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [closed](http://www.w3school.com.cn/jsref/prop_win_closed.asp) | 返回窗口是否已被关闭。                                       |
| [defaultStatus](http://www.w3school.com.cn/jsref/prop_win_defaultstatus.asp) | 设置或返回窗口状态栏中的默认文本。                           |
| [document](http://www.w3school.com.cn/jsref/dom_obj_document.asp) | 对 Document 对象的只读引用。请参阅 [Document 对象](http://www.w3school.com.cn/jsref/dom_obj_document.asp)。 |
| [history](http://www.w3school.com.cn/jsref/dom_obj_history.asp) | 对 History 对象的只读引用。请参数 [History 对象](http://www.w3school.com.cn/jsref/dom_obj_history.asp)。 |
| [innerheight](http://www.w3school.com.cn/jsref/prop_win_innerheight_innerwidth.asp) | 返回窗口的文档显示区的高度。                                 |
| [innerwidth](http://www.w3school.com.cn/jsref/prop_win_innerheight_innerwidth.asp) | 返回窗口的文档显示区的宽度。                                 |
| length                                                       | 设置或返回窗口中的框架数量。                                 |
| [location](http://www.w3school.com.cn/jsref/dom_obj_location.asp) | 用于窗口或框架的 Location 对象。请参阅 [Location 对象](http://www.w3school.com.cn/jsref/dom_obj_location.asp)。 |
| [name](http://www.w3school.com.cn/jsref/prop_win_name.asp)   | 设置或返回窗口的名称。                                       |
| [Navigator](http://www.w3school.com.cn/jsref/dom_obj_navigator.asp) | 对 Navigator 对象的只读引用。请参数 [Navigator 对象](http://www.w3school.com.cn/jsref/dom_obj_navigator.asp)。 |
| [opener](http://www.w3school.com.cn/jsref/prop_win_opener.asp) | 返回对创建此窗口的窗口的引用。                               |
| [outerheight](http://www.w3school.com.cn/jsref/prop_win_outerheight.asp) | 返回窗口的外部高度。                                         |
| [outerwidth](http://www.w3school.com.cn/jsref/prop_win_outerwidth.asp) | 返回窗口的外部宽度。                                         |
| pageXOffset                                                  | 设置或返回当前页面相对于窗口显示区左上角的 X 位置。          |
| pageYOffset                                                  | 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。          |
| parent                                                       | 返回父窗口。                                                 |
| [Screen](http://www.w3school.com.cn/jsref/dom_obj_screen.asp) | 对 Screen 对象的只读引用。请参数 [Screen 对象](http://www.w3school.com.cn/jsref/dom_obj_screen.asp)。 |
| [self](http://www.w3school.com.cn/jsref/prop_win_self.asp)   | 返回对当前窗口的引用。等价于 Window 属性。                   |
| [status](http://www.w3school.com.cn/jsref/prop_win_status.asp) | 设置窗口状态栏的文本。                                       |
| [top](http://www.w3school.com.cn/jsref/prop_win_top.asp)     | 返回最顶层的先辈窗口。                                       |
| window                                                       | window 属性等价于 self 属性，它包含了对窗口自身的引用。      |
| screenLeftscreenTopscreenXscreenY                            | 只读整数。声明了窗口的左上角在屏幕上的的 x 坐标和 y 坐标。IE、Safari 和 Opera 支持 screenLeft 和 screenTop，而 Firefox 和 Safari 支持 screenX 和 screenY。 |

- Window 对象方法

| 方法                                                         | 描述                                               |
| :----------------------------------------------------------- | :------------------------------------------------- |
| [alert()](http://www.w3school.com.cn/jsref/met_win_alert.asp) | 显示带有一段消息和一个确认按钮的警告框。           |
| [blur()](http://www.w3school.com.cn/jsref/met_win_blur.asp)  | 把键盘焦点从顶层窗口移开。                         |
| [clearInterval()](http://www.w3school.com.cn/jsref/met_win_clearinterval.asp) | 取消由 setInterval() 设置的 timeout。              |
| [clearTimeout()](http://www.w3school.com.cn/jsref/met_win_cleartimeout.asp) | 取消由 setTimeout() 方法设置的 timeout。           |
| [close()](http://www.w3school.com.cn/jsref/met_win_close.asp) | 关闭浏览器窗口。                                   |
| [confirm()](http://www.w3school.com.cn/jsref/met_win_confirm.asp) | 显示带有一段消息以及确认按钮和取消按钮的对话框。   |
| [createPopup()](http://www.w3school.com.cn/jsref/met_win_createpopup.asp) | 创建一个 pop-up 窗口。                             |
| [focus()](http://www.w3school.com.cn/jsref/met_win_focus.asp) | 把键盘焦点给予一个窗口。                           |
| [moveBy()](http://www.w3school.com.cn/jsref/met_win_moveby.asp) | 可相对窗口的当前坐标把它移动指定的像素。           |
| [moveTo()](http://www.w3school.com.cn/jsref/met_win_moveto.asp) | 把窗口的左上角移动到一个指定的坐标。               |
| [open()](http://www.w3school.com.cn/jsref/met_win_open.asp)  | 打开一个新的浏览器窗口或查找一个已命名的窗口。     |
| [print()](http://www.w3school.com.cn/jsref/met_win_print.asp) | 打印当前窗口的内容。                               |
| [prompt()](http://www.w3school.com.cn/jsref/met_win_prompt.asp) | 显示可提示用户输入的对话框。                       |
| [resizeBy()](http://www.w3school.com.cn/jsref/met_win_resizeby.asp) | 按照指定的像素调整窗口的大小。                     |
| [resizeTo()](http://www.w3school.com.cn/jsref/met_win_resizeto.asp) | 把窗口的大小调整到指定的宽度和高度。               |
| [scrollBy()](http://www.w3school.com.cn/jsref/met_win_scrollby.asp) | 按照指定的像素值来滚动内容。                       |
| [scrollTo()](http://www.w3school.com.cn/jsref/met_win_scrollto.asp) | 把内容滚动到指定的坐标。                           |
| [setInterval()](http://www.w3school.com.cn/jsref/met_win_setinterval.asp) | 按照指定的周期（以毫秒计）来调用函数或计算表达式。 |
| [setTimeout()](http://www.w3school.com.cn/jsref/met_win_settimeout.asp) | 在指定的毫秒数后调用函数或计算表达式。             |







- Window 对象描述



Window 对象表示一个浏览器窗口或一个框架。在客户端 JavaScript 中，Window 对象是全局对象，所有的表达式都在当前的环境中计算。也就是说，要引用当前窗口根本不需要特殊的语法，可以把那个窗口的属性作为全局变量来使用。例如，可以只写 [document](http://www.w3school.com.cn/jsref/dom_obj_document.asp)，而不必写 window.document。

同样，可以把当前窗口对象的方法当作函数来使用，如只写 alert()，而不必写 Window.alert()。

除了上面列出的属性和方法，Window 对象还实现了核心 JavaScript 所定义的所有全局属性和方法。

Window 对象的 window 属性和 [self 属性](http://www.w3school.com.cn/jsref/prop_win_self.asp)引用的都是它自己。当你想明确地引用当前窗口，而不仅仅是隐式地引用它时，可以使用这两个属性。除了这两个属性之外，parent 属性、top 属性以及 frame[] 数组都引用了与当前 Window 对象相关的其他 Window 对象。





#### Document 对象

每个载入浏览器的 HTML 文档都会成为 Document 对象。

Document 对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。

**提示：**Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问。

- Document 对象集合

| 集合                                                         | 描述                                     |
| :----------------------------------------------------------- | :--------------------------------------- |
| [all[\]](http://www.w3school.com.cn/jsref/coll_doc_all.asp)  | 提供对文档中所有 HTML 元素的访问。       |
| [anchors[\]](http://www.w3school.com.cn/jsref/coll_doc_anchors.asp) | 返回对文档中所有 Anchor 对象的引用。     |
| applets                                                      | 返回对文档中所有 Applet 对象的引用。     |
| [forms[\]](http://www.w3school.com.cn/jsref/coll_doc_forms.asp) | 返回对文档中所有 Form 对象引用。         |
| [images[\]](http://www.w3school.com.cn/jsref/coll_doc_images.asp) | 返回对文档中所有 Image 对象引用。        |
| [links[\]](http://www.w3school.com.cn/jsref/coll_doc_links.asp) | 返回对文档中所有 Area 和 Link 对象引用。 |

- Document 对象属性

| 属性                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| body                                                         | 提供对 `<body>` 元素的直接访问。对于定义了框架集的文档，该属性引用最外层的` <frameset>`。 |
| [cookie](http://www.w3school.com.cn/jsref/prop_doc_cookie.asp) | 设置或返回与当前文档有关的所有 cookie。                      |
| [domain](http://www.w3school.com.cn/jsref/prop_doc_domain.asp) | 返回当前文档的域名。                                         |
| [lastModified](http://www.w3school.com.cn/jsref/prop_doc_lastmodified.asp) | 返回文档被最后修改的日期和时间。                             |
| [referrer](http://www.w3school.com.cn/jsref/prop_doc_referrer.asp) | 返回载入当前文档的文档的 URL。                               |
| [title](http://www.w3school.com.cn/jsref/prop_doc_title.asp) | 返回当前文档的标题。                                         |
| [URL](http://www.w3school.com.cn/jsref/prop_doc_url.asp)     | 返回当前文档的 URL。                                         |

- Document 对象方法

| 方法                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [close()](http://www.w3school.com.cn/jsref/met_doc_close.asp) | 关闭用 document.open() 方法打开的输出流，并显示选定的数据。  |
| [getElementById()](http://www.w3school.com.cn/jsref/met_doc_getelementbyid.asp) | 返回对拥有指定 id 的第一个对象的引用。                       |
| [getElementsByName()](http://www.w3school.com.cn/jsref/met_doc_getelementsbyname.asp) | 返回带有指定名称的对象集合。                                 |
| [getElementsByTagName()](http://www.w3school.com.cn/jsref/met_doc_getelementsbytagname.asp) | 返回带有指定标签名的对象集合。                               |
| [open()](http://www.w3school.com.cn/jsref/met_doc_open.asp)  | 打开一个流，以收集来自任何 document.write() 或 document.writeln() 方法的输出。 |
| [write()](http://www.w3school.com.cn/jsref/met_doc_write.asp) | 向文档写 HTML 表达式 或 JavaScript 代码。                    |
| [writeln()](http://www.w3school.com.cn/jsref/met_doc_writeln.asp) | 等同于 write() 方法，不同的是在每个表达式之后写一个换行符。  |



#### History 对象

History 对象包含用户（在浏览器窗口中）访问过的 URL。

History 对象是 window 对象的一部分，可通过 window.history 属性对其进行访问。







- History 对象属性

| 属性                                                         | 描述                              |
| :----------------------------------------------------------- | :-------------------------------- |
| [length](http://www.w3school.com.cn/jsref/prop_his_length.asp) | 返回浏览器历史列表中的 URL 数量。 |

- History 对象方法

| 方法                                                         | 描述                                |
| :----------------------------------------------------------- | :---------------------------------- |
| [back()](http://www.w3school.com.cn/jsref/met_his_back.asp)  | 加载 history 列表中的前一个 URL。   |
| [forward()](http://www.w3school.com.cn/jsref/met_his_forward.asp) | 加载 history 列表中的下一个 URL。   |
| [go()](http://www.w3school.com.cn/jsref/met_his_go.asp)      | 加载 history 列表中的某个具体页面。 |

- History 对象描述

History 对象最初设计来表示窗口的浏览历史。但出于隐私方面的原因，History 对象不再允许脚本访问已经访问过的实际 URL。唯一保持使用的功能只有 [back()](http://www.w3school.com.cn/jsref/met_his_back.asp)、[forward()](http://www.w3school.com.cn/jsref/met_his_forward.asp) 和 [go()](http://www.w3school.com.cn/jsref/met_his_go.asp) 方法。





#### Location 对象

Location 对象包含有关当前 URL 的信息。

Location 对象是 Window 对象的一个部分，可通过 window.location 属性来访问。



- Location 对象属性

| 属性                                                         | 描述                                          |
| :----------------------------------------------------------- | :-------------------------------------------- |
| [hash](http://www.w3school.com.cn/jsref/prop_loc_hash.asp)   | 设置或返回从井号 (#) 开始的 URL（锚）。       |
| [host](http://www.w3school.com.cn/jsref/prop_loc_host.asp)   | 设置或返回主机名和当前 URL 的端口号。         |
| [hostname](http://www.w3school.com.cn/jsref/prop_loc_hostname.asp) | 设置或返回当前 URL 的主机名。                 |
| [href](http://www.w3school.com.cn/jsref/prop_loc_href.asp)   | 设置或返回完整的 URL。                        |
| [pathname](http://www.w3school.com.cn/jsref/prop_loc_pathname.asp) | 设置或返回当前 URL 的路径部分。               |
| [port](http://www.w3school.com.cn/jsref/prop_loc_port.asp)   | 设置或返回当前 URL 的端口号。                 |
| [protocol](http://www.w3school.com.cn/jsref/prop_loc_protocol.asp) | 设置或返回当前 URL 的协议。                   |
| [search](http://www.w3school.com.cn/jsref/prop_loc_search.asp) | 设置或返回从问号 (?) 开始的 URL（查询部分）。 |

- Location 对象方法

| 属性                                                         | 描述                     |
| :----------------------------------------------------------- | :----------------------- |
| [assign()](http://www.w3school.com.cn/jsref/met_loc_assign.asp) | 加载新的文档。           |
| [reload()](http://www.w3school.com.cn/jsref/met_loc_reload.asp) | 重新加载当前文档。       |
| [replace()](http://www.w3school.com.cn/jsref/met_loc_replace.asp) | 用新的文档替换当前文档。 |

- Location 对象描述

Location 对象存储在 Window 对象的 Location 属性中，表示那个窗口中当前显示的文档的 Web 地址。它的 [href 属性](http://www.w3school.com.cn/jsref/prop_loc_href.asp)存放的是文档的完整 URL，其他属性则分别描述了 URL 的各个部分。这些属性与 Anchor 对象（或 Area 对象）的 URL 属性非常相似。当一个 Location 对象被转换成字符串，href 属性的值被返回。这意味着你可以使用表达式 location 来替代 location.href。

不过 Anchor 对象表示的是文档中的超链接，Location 对象表示的却是浏览器当前显示的文档的 URL（或位置）。但是 Location 对象所能做的远远不止这些，它还能控制浏览器显示的文档的位置。如果把一个含有 URL 的字符串赋予 Location 对象或它的 href 属性，浏览器就会把新的 URL 所指的文档装载进来，并显示出来。

除了设置 location 或 location.href 用完整的 URL 替换当前的 URL 之外，还可以修改部分 URL，只需要给 Location 对象的其他属性赋值即可。这样做就会创建新的 URL，其中的一部分与原来的 URL 不同，浏览器会将它装载并显示出来。例如，假设设置了Location对象的 [hash 属性](http://www.w3school.com.cn/jsref/prop_loc_hash.asp)，那么浏览器就会转移到当前文档中的一个指定的位置。同样，如果设置了 [search 属性](http://www.w3school.com.cn/jsref/prop_loc_search.asp)，那么浏览器就会重新装载附加了新的查询字符串的 URL。

除了 URL 属性外，Location 对象的 [reload() 方法](http://www.w3school.com.cn/jsref/met_loc_reload.asp)可以重新装载当前文档，[replace()](http://www.w3school.com.cn/jsref/met_loc_replace.asp) 可以装载一个新文档而无须为它创建一个新的历史记录，也就是说，在浏览器的历史列表中，新文档将替换当前文档。

#### Navigator 对象

Navigator 对象包含有关浏览器的信息。

- Navigator 对象集合

| 集合      | 描述                                                         |
| :-------- | :----------------------------------------------------------- |
| plugins[] | 返回对文档中所有嵌入式对象的引用。该集合是一个 Plugin 对象的数组，其中的元素代表浏览器已经安装的插件。Plug-in 对象提供的是有关插件的信息，其中包括它所支持的 MIME 类型的列表。虽然 plugins[] 数组是由 IE 4 定义的，但是在 IE 4 中它却总是空的，因为 IE 4 不支持插件和 Plugin 对象。 |

- Navigator 对象属性

| 属性                                                         | 描述                                           |
| :----------------------------------------------------------- | :--------------------------------------------- |
| [appCodeName](http://www.w3school.com.cn/jsref/prop_nav_appcodename.asp) | 返回浏览器的代码名。                           |
| [appMinorVersion](http://www.w3school.com.cn/jsref/prop_nav_appminorversion.asp) | 返回浏览器的次级版本。                         |
| [appName](http://www.w3school.com.cn/jsref/prop_nav_appname.asp) | 返回浏览器的名称。                             |
| [appVersion](http://www.w3school.com.cn/jsref/prop_nav_appversion.asp) | 返回浏览器的平台和版本信息。                   |
| [browserLanguage](http://www.w3school.com.cn/jsref/prop_nav_browserlanguage.asp) | 返回当前浏览器的语言。                         |
| [cookieEnabled](http://www.w3school.com.cn/jsref/prop_nav_cookieenabled.asp) | 返回指明浏览器中是否启用 cookie 的布尔值。     |
| [cpuClass](http://www.w3school.com.cn/jsref/prop_nav_cpuclass.asp) | 返回浏览器系统的 CPU 等级。                    |
| [onLine](http://www.w3school.com.cn/jsref/prop_nav_online.asp) | 返回指明系统是否处于脱机模式的布尔值。         |
| [platform](http://www.w3school.com.cn/jsref/prop_nav_platform.asp) | 返回运行浏览器的操作系统平台。                 |
| [systemLanguage](http://www.w3school.com.cn/jsref/prop_nav_systemlanguage.asp) | 返回 OS 使用的默认语言。                       |
| [userAgent](http://www.w3school.com.cn/jsref/prop_nav_useragent.asp) | 返回由客户机发送服务器的 user-agent 头部的值。 |
| [userLanguage](http://www.w3school.com.cn/jsref/prop_nav_userlanguage.asp) | 返回 OS 的自然语言设置。                       |

- Navigator 对象方法

| 方法                                                         | 描述                                         |
| :----------------------------------------------------------- | :------------------------------------------- |
| [javaEnabled()](http://www.w3school.com.cn/jsref/met_nav_javaenabled.asp) | 规定浏览器是否启用 Java。                    |
| [taintEnabled()](http://www.w3school.com.cn/jsref/met_nav_taintenabled.asp) | 规定浏览器是否启用数据污点 (data tainting)。 |



- Navigator 对象描述



Navigator 对象包含的属性描述了正在使用的浏览器。可以使用这些属性进行平台专用的配置。

虽然这个对象的名称显而易见的是 Netscape 的 Navigator 浏览器，但其他实现了 JavaScript 的浏览器也支持这个对象。

Navigator 对象的实例是唯一的，可以用 Window 对象的 navigator 属性来引用它。

#### Screen 对象

Screen 对象包含有关客户端显示屏幕的信息。

- Screen 对象属性

| 属性                                                         | 描述                                         |
| :----------------------------------------------------------- | :------------------------------------------- |
| [availHeight](http://www.w3school.com.cn/jsref/prop_screen_availheight.asp) | 返回显示屏幕的高度 (除 Windows 任务栏之外)。 |
| [availWidth](http://www.w3school.com.cn/jsref/prop_screen_availwidth.asp) | 返回显示屏幕的宽度 (除 Windows 任务栏之外)。 |
| [bufferDepth](http://www.w3school.com.cn/jsref/prop_screen_bufferdepth.asp) | 设置或返回调色板的比特深度。                 |
| [colorDepth](http://www.w3school.com.cn/jsref/prop_screen_colordepth.asp) | 返回目标设备或缓冲器上的调色板的比特深度。   |
| [deviceXDPI](http://www.w3school.com.cn/jsref/prop_screen_devicexdpi.asp) | 返回显示屏幕的每英寸水平点数。               |
| [deviceYDPI](http://www.w3school.com.cn/jsref/prop_screen_deviceydpi.asp) | 返回显示屏幕的每英寸垂直点数。               |
| [fontSmoothingEnabled](http://www.w3school.com.cn/jsref/prop_screen_fontsmoothingenabled.asp) | 返回用户是否在显示控制面板中启用了字体平滑。 |
| [height](http://www.w3school.com.cn/jsref/prop_screen_height.asp) | 返回显示屏幕的高度。                         |
| [logicalXDPI](http://www.w3school.com.cn/jsref/prop_screen_logicalxdpi.asp) | 返回显示屏幕每英寸的水平方向的常规点数。     |
| [logicalYDPI](http://www.w3school.com.cn/jsref/prop_screen_logicalydpi.asp) | 返回显示屏幕每英寸的垂直方向的常规点数。     |
| [pixelDepth](http://www.w3school.com.cn/jsref/prop_screen_pixeldepth.asp) | 返回显示屏幕的颜色分辨率（比特每像素）。     |
| [updateInterval](http://www.w3school.com.cn/jsref/prop_screen_updateinterval.asp) | 设置或返回屏幕的刷新率。                     |
| [width](http://www.w3school.com.cn/jsref/prop_screen_width.asp) | 返回显示器屏幕的宽度。                       |

- Screen 对象描述

每个 Window 对象的 screen 属性都引用一个 Screen 对象。Screen 对象中存放着有关显示浏览器屏幕的信息。JavaScript 程序将利用这些信息来优化它们的输出，以达到用户的显示要求。例如，一个程序可以根据显示器的尺寸选择使用大图像还是使用小图像，它还可以根据显示器的颜色深度选择使用 16 位色还是使用 8 位色的图形。另外，JavaScript 程序还能根据有关屏幕尺寸的信息将新的浏览器窗口定位在屏幕中间。

### 36.js的垃圾回收机制

JavaScript 中的内存管理是自动执行的，而且是不可见的。我们创建基本类型、对象、函数……所有这些都需要内存。

当不再需要某样东西时会发生什么? JavaScript 引擎是如何发现并清理它?

#### 可达性

JavaScript 中内存管理的主要概念是可达性。

简单地说，“可达性” 值就是那些以某种方式可访问或可用的值，它们被保证存储在内存中。

**1. 有一组基本的固有可达值，由于显而易见的原因无法删除。例如:**

- 本地函数的局部变量和参数
- 当前嵌套调用链上的其他函数的变量和参数
- 全局变量
- 还有一些其他的，内部的

**这些值称为根。**

**2. 如果引用或引用链可以从根访问任何其他值，则认为该值是可访问的。**

例如，如果局部变量中有对象，并且该对象具有引用另一个对象的属性，则该对象被视为**可达性**， 它引用的那些也是可以访问的，详细的例子如下。

JavaScript 引擎中有一个后台进程称为[垃圾回收器](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science))，它监视所有对象，并删除那些不可访问的对象。

#### 一个简单的例子

下面是最简单的例子:

```
// user 具有对象的引用
let user = {
  name: "John"
};
```

![图片描述](https://segmentfault.com/img/bVbqbGS)

这里箭头表示一个对象引用。全局变量`“user”`引用对象 `{name:“John”}` (为了简洁起见，我们将其命名为**John**)。John 的 `“name”` 属性存储一个基本类型，因此它被绘制在对象中。

如果 `user` 的值被覆盖，则引用丢失:

```
user = null;
```

![图片描述](https://segmentfault.com/img/bVbqcUf)

现在 **John** 变成不可达的状态，没有办法访问它，没有对它的引用。垃圾回收器将丢弃 **John** 数据并释放内存。

#### 两个引用

现在让我们假设我们将引用从 `user` 复制到 `admin`:

```
// user具有对象的引用
let user = {
  name: "John"
};

let admin = user;
```

![图片描述](https://segmentfault.com/img/bVbqcVf)

现在如果我们做同样的事情:

```
user = null;
```

该对象仍然可以通过 `admin` 全局变量访问，所以它在内存中。如果我们也覆盖`admin`，那么它可以被释放。

#### 相互关联的对象

现在来看一个更复杂的例子， family 对象：

```
function marry (man, woman) {
  woman.husban = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
})
```

函数 `marry` 通过给两个对象彼此提供引用来“联姻”它们，并返回一个包含两个对象的新对象。

产生的内存结构:

![图片描述](https://segmentfault.com/img/bVbqcXI)

到目前为止，所有对象都是可访问的。

现在让我们删除两个引用:

```
delete family.father;
delete family.mother.husband;
```

![图片描述](https://segmentfault.com/img/bVbqcZj)

仅仅删除这两个引用中的一个是不够的，因为所有对象仍然是可访问的。

但是如果我们把这两个都删除，那么我们可以看到 **John** 不再有传入的引用:

![图片描述](https://segmentfault.com/img/bVbqcZ4)

输出引用无关紧要。只有传入的对象才能使对象可访问，因此，**John** 现在是不可访问的，并将从内存中删除所有不可访问的数据。

垃圾回收之后：

![图片描述](https://segmentfault.com/img/bVbqc0I)

#### 无法访问的数据块

有可能整个相互连接的对象变得不可访问并从内存中删除。

源对象与上面的相同。然后:

```
family = null;
```

内存中的图片变成:

![图片描述](https://segmentfault.com/img/bVbqc2u)

这个例子说明了可达性的概念是多么重要。

很明显，John和Ann仍然链接在一起，都有传入的引用。但这还不够。

“family”对象已经从根上断开了链接，不再有对它的引用，因此下面的整个块变得不可到达，并将被删除。

#### 内部算法

基本的垃圾回收算法称为**“标记-清除”**，定期执行以下“垃圾回收”步骤:

- 垃圾回收器获取根并**“标记”**(记住)它们。
- 然后它访问并“标记”所有来自它们的引用。
- 然后它访问标记的对象并标记它们的引用。所有被访问的对象都被记住，以便以后不再访问同一个对象两次。
- 以此类推，直到有未访问的引用(可以从根访问)为止。
- 除标记的对象外，所有对象都被删除。

例如，对象结构如下:

![图片描述](https://segmentfault.com/img/bVbqd7y)

我们可以清楚地看到右边有一个“不可到达的块”。现在让我们看看**“标记并清除”**垃圾回收器如何处理它。

**第一步标记根**

![图片描述](https://segmentfault.com/img/bVbqd7V)

**然后标记他们的引用**

![图片描述](https://segmentfault.com/img/bVbqd71)

以及子孙代的引用:

![图片描述](https://segmentfault.com/img/bVbqd8a)

现在进程中不能访问的对象被认为是不可访问的，将被删除:

![图片描述](https://segmentfault.com/img/bVbqd8A)

这就是垃圾收集的工作原理。JavaScript引擎应用了许多优化，使其运行得更快，并且不影响执行。

一些优化:

- **分代回收**——对象分为两组:“新对象”和“旧对象”。许多对象出现，完成它们的工作并迅速结 ，它们很快就会被清理干净。那些活得足够久的对象，会变“老”，并且很少接受检查。
- **增量回收**——如果有很多对象，并且我们试图一次遍历并标记整个对象集，那么可能会花费一些时间，并在执行中会有一定的延迟。因此，引擎试图将垃圾回收分解为多个部分。然后，各个部分分别执行。这需要额外的标记来跟踪变化，这样有很多微小的延迟，而不是很大的延迟。
- **空闲时间收集**——垃圾回收器只在 CPU 空闲时运行，以减少对执行的可能影响。

#### 面试怎么回答

**1）问什么是垃圾**

一般来说没有被引用的对象就是垃圾，就是要被清除， 有个例外如果几个对象引用形成一个环，互相引用，但根访问不到它们，这几个对象也是垃圾，也要被清除。

**2）如何检垃圾**

一种算法是标记 **标记-清除** 算法，还想说出不同的算法可以参考[这里](https://www.jianshu.com/p/a8a04fd00c3c)。

更深入一些的讲解 [http://newhtml.net/v8-garbage...](http://newhtml.net/v8-garbage-collection/)

还有一种牛逼的答法就是说看我的博客，当然是要自己总结的博客。

**代码部署后可能存在的BUG没法实时知道，事后为了解决这些BUG，花了大量的时间进行log 调试，这边顺便给大家推荐一个好用的BUG监控工具 [Fundebug](https://www.fundebug.com/?utm_source=xiaozhi)。**



### 37.DOM事件的绑定的几种方式

1：DOM元素中直接绑定

![img](https://user-gold-cdn.xitu.io/2019/1/10/1683706020d40d0d?imageslim)

2：在JS代码中绑定

![img](https://user-gold-cdn.xitu.io/2019/1/10/16837082d72b585f?imageslim)

3：绑定事件监听函数 

![img](https://user-gold-cdn.xitu.io/2019/1/10/168370af91673df4?imageslim)



不同点：

1：

用 "addeventlistener" 可以绑定多次同一个事件，且都会执行，而在DOM结构如果绑定两个 "onclick" 事件，只会执行第一个；在脚本通过匿名函数的方式绑定的只会执行最后一个事件。

![img](https://user-gold-cdn.xitu.io/2019/1/10/168370ea16fdde2a?imageslim)

![img](https://user-gold-cdn.xitu.io/2019/1/10/1683710a1945d077?imageslim)

![img](https://user-gold-cdn.xitu.io/2019/1/10/168371366147fa56?imageslim)

2：

addEventListener()是标准的绑定事件监听函数的方法，是W3C所支持的，Chrome、FireFox、Opera、Safari、IE9.0及其以上版本都支持该函数；但是，IE8.0及其以下版本不支持该方法，它使用attachEvent()来绑定事件监听函数。所以，这种绑定事件的方法必须要处理浏览器兼容问题。



写一个在各个浏览器都兼容的事件绑定方法

![img](https://user-gold-cdn.xitu.io/2019/1/10/168372bb12ff117f?imageslim)



### 38.DOM事件中target和currentTarget的区别

在DOM事件对象中有两个属性总是时不时的困扰我，就是`target`和`currentTarget`，有时候很迷惑分不清两者的区别，因此有必要把这两个属性好好梳理一下，加深理解，以便日后的查询。
 MDN中对`target`的解释为，一个触发事件的对象的引用， 当事件处理程序在事件的冒泡或捕获阶段被调用时。
 而对于currentTarget，它指的是当事件遍历DOM时，标识事件的当前目标。它总是引用事件处理程序附加到的元素，而不是`event.target`，它标识事件发生的元素。
 举个例子来说明。

#### 事件冒泡阶段



```xml
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body>
  <ul>
    <li>hello 1</li>
    <li>hello 2</li>
    <li>hello 3</li>
    <li>hello 4</li>
  </ul>
  <script>
    let ul = document.querySelectorAll('ul')[0]
    let aLi = document.querySelectorAll('li')
    ul.addEventListener('click',function(e){
       let oLi1 = e.target  
       let oLi2 = e.currentTarget
        console.log(oLi1)   //  被点击的li
        console.log(oLi2)   // ul
        console.og(oLi1===oLi2)  // false
    })
  </script>
</body>
</html>
```

我们知道，`e.target`可以用来实现[事件委托](https://www.jianshu.com/p/ac47521806d2)，该原理是通过事件冒泡（或者事件捕获）给父元素添加事件监听，e.target指向引发触发事件的元素，如上述的例子中，`e.target`指向用户点击的`li`，由于事件冒泡，`li`的点击事件冒泡到了`ul`上，通过给`ul`添加监听事件而达到了给每一个`li`添加监听事件的效果，而`e.currentTarget`指向的是给绑定事件监听的那个对象，即`ul`，从这里可以发现，`e.currentTarget===this`返回`true`，而`e.target===this`返回`false`。`e.currenttarget`和`e.target`是不相等的。

**注意**，在jQuery提供的on方法中，e.currentTarget与该方法接收的第二个参数有关，根据jQuery的文档描述

> 如果省略selector或者是null，那么事件处理程序被称为直接事件 或者 直接绑定事件 。每次选中的元素触发事件时，就会执行处理程序，不管它直接绑定在元素上，还是从后代（内部）元素冒泡到该元素的
> 当提供selector参数时，事件处理程序是指为委派事件（事件委托或事件代理）。事件不会在直接绑定的元素上触发，但当selector参数选择器匹配到后代（内部元素）的时候，事件处理函数才会被触发。jQuery 会从 event target 开始向上层元素(例如，由最内层元素到最外层元素)开始冒泡，并且在传播路径上所有绑定了相同事件的元素若满足匹配的选择器，那么这些元素上的事件也会被触发。



```xml
<!DOCTYPE html>
<html>
<head>
  <script src="//code.jquery.com/jquery-1.9.1.min.js"></script>
  <meta charset="utf-8">
  <title>JS Bin</title>
  <style>
    li{
      padding: 5px;
      border: 1px solid red;
    }
    span{
      border: 1px solid #000;
    }
  </style>
</head>
<body>
  <ul>
    <li><span>hello 1</span></li>
    <li><span>hello 1</span></li>
    <li><span>hello 1</span></li>
    <li><span>hello 1</span></li>
  </ul>
  <script>
    let ul = document.querySelectorAll('ul')[0]
    let aLi = document.querySelectorAll('li')
    $('ul').on('click','li',function(e){
 
        console.log(e.target)   //  被点击的元素
        console.log(e.currentTarget)   //  li   
        console.log(e.currentTarget === this)  // true
    })
  </script>
</body>
</html>
```

当li中含有子元素的时候，e.target指的是触发事件的元素，可能是span也可能是li，此时的e.currentTarget指的是selector那个参数，也就是本例中的li。如果省略selector参数，那么它和addEventListener中e.target和e.currentTarget是一致的。

#### 事件目标阶段

我们知道，在DOM事件流中分为几个不同的阶段，如图

![img](https:////upload-images.jianshu.io/upload_images/1620777-dafb1778461af7d9.png?imageMogr2/auto-orient/strip|imageView2/2/w/698/format/webp)


 上述例子是事件冒泡阶段，`e.currenttarget`和`e.target`是不相等的，但是在事件的目标阶段，`e.currenttarget`和`e.target`是相等的。





```xml
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body>
  <ul>
    <li>hello 1</li>
    <li>hello 2</li>
    <li>hello 3</li>
    <li>hello 4</li>
  </ul>
  <script>
    let ul = document.querySelectorAll('ul')[0]
    let aLi = document.querySelectorAll('li')
    for(let i=0;i<aLi.length;i++){  
      aLi[i].addEventListener('click',function(e){
        let oLi1 = e.target  
        let oLi2 = e.currentTarget
        console.log(oLi1)  // li
        console.log(oLi2)  // li
        console.og(oLi1===oLi2)  // true
      })
    }
  </script>
</body>
</html>
```

在本例中，事件的目标阶段即`li`，由于`e.currentTarget`始终指向添加监听事件的那个对象，即`aLi[i]`，也就是HTML中的`li`，而`e.target`指向触发事件监听的那个对象，也是`li`，因此`e.target`和`e.currentTarget`相等，同时也和`this`相等。

#### 总结

因此不必记什么时候`e.currentTarget`和`e.target`相等，什么时候不等，理解两者的究竟指向的是谁即可。

- `e.target`             指向触发事件监听的对象。
- `e.currentTarget` 指向添加监听事件的对象。



### 39.typeof 和 instanceof 区别，instanceof原理

#### typeof 实现原理

`typeof` 一般被用于判断一个变量的类型，我们可以利用 `typeof` 来判断`number`,  `string`,  `object`,  `boolean`,  `function`, `undefined`,  `symbol` 这七种类型，这种判断能帮助我们搞定一些问题，比如在判断不是 object 类型的数据的时候，`typeof`能比较清楚的告诉我们具体是哪一类的类型。但是，很遗憾的一点是，`typeof` 在判断一个 object的数据的时候只能告诉我们这个数据是 object, 而不能细致的具体到是哪一种 object, 比如👉

```
let s = new String('abc');
typeof s === 'object'// true
s instanceof String // true
复制代码
```

要想判断一个数据具体是哪一种 object 的时候，我们需要利用 `instanceof` 这个操作符来判断，这个我们后面会说到。

来谈谈关于 `typeof` 的原理吧，我们可以先想一个很有意思的问题，js 在底层是怎么存储数据的类型信息呢？或者说，一个 js 的变量，在它的底层实现中，它的类型信息是怎么实现的呢？

其实，js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息👉

- 000：对象
- 010：浮点数
- 100：字符串
- 110：布尔
- 1：整数

but, 对于 `undefined` 和 `null` 来说，这两个值的信息存储是有点特殊的。

`null`：所有机器码均为0

`undefined`：用 −2^30 整数来表示

所以，`typeof` 在判断 `null` 的时候就出现问题了，由于 `null` 的所有机器码均为0，因此直接被当做了对象来看待。

然而用 `instanceof` 来判断的话👉

```
null instanceof null // TypeError: Right-hand side of 'instanceof' is not an object
复制代码
```

`null` 直接被判断为不是 object，这也是 JavaScript 的历史遗留bug，可以参考[typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)。

因此在用 `typeof` 来判断变量类型的时候，我们需要注意，最好是用 `typeof` 来判断基本数据类型（包括`symbol`），避免对 null 的判断。

还有一个不错的判断类型的方法，就是Object.prototype.toString，我们可以利用这个方法来对一个变量的类型来进行比较准确的判断

```
Object.prototype.toString.call(1) // "[object Number]"

Object.prototype.toString.call('hi') // "[object String]"

Object.prototype.toString.call({a:'hi'}) // "[object Object]"

Object.prototype.toString.call([1,'a']) // "[object Array]"

Object.prototype.toString.call(true) // "[object Boolean]"

Object.prototype.toString.call(() => {}) // "[object Function]"

Object.prototype.toString.call(null) // "[object Null]"

Object.prototype.toString.call(undefined) // "[object Undefined]"

Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
复制代码
```

#### instanceof 操作符的实现原理

之前我们提到了 `instanceof` 来判断对象的具体类型，其实 `instanceof` 主要的作用就是判断一个实例是否属于某种类型

```
let person = function () {
}
let nicole = new person()
nicole instanceof person // true
复制代码
```

当然，`instanceof` 也可以判断一个实例是否是其父类型或者祖先类型的实例。

```
let person = function () {
}
let programmer = function () {
}
programmer.prototype = new person()
let nicole = new programmer()
nicole instanceof person // true
nicole instanceof programmer // true
复制代码
```

这是 `instanceof` 的用法，但是 `instanceof` 的原理是什么呢？根据 ECMAScript 语言规范，我梳理了一下大概的思路，然后整理了一段代码如下

```
function new_instance_of(leftVaule, rightVaule) { 
    let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
    leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
    while (true) {
    	if (leftVaule === null) {
            return false;	
        }
        if (leftVaule === rightProto) {
            return true;	
        } 
        leftVaule = leftVaule.__proto__ 
    }
}
复制代码
```

其实 `instanceof` 主要的实现原理就是只要右边变量的 `prototype` 在左边变量的原型链上即可。因此，`instanceof` 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 `prototype`，如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。

看几个很有趣的例子

```
function Foo() {
}

Object instanceof Object // true
Function instanceof Function // true
Function instanceof Object // true
Foo instanceof Foo // false
Foo instanceof Object // true
Foo instanceof Function // true
复制代码
```

要想全部理解 `instanceof` 的原理，除了我们刚刚提到的实现原理，我们还需要知道 JavaScript 的原型继承原理。

关于原型继承的原理，我简单用一张图来表示

![img](https://user-gold-cdn.xitu.io/2018/5/28/163a55d5d35b866d?imageslim)

我们知道每个 JavaScript 对象均有一个隐式的 `__proto__` 原型属性，而显式的原型属性是 `prototype`，只有 `Object.prototype.__proto__` 属性在未修改的情况下为 null 值。根据图上的原理，我们来梳理上面提到的几个有趣的 `instanceof` 使用的例子。

- `Object instanceof Object`

  由图可知，Object 的 `prototype` 属性是 `Object.prototype`, 而由于 Object 本身是一个函数，由 Function 所创建，所以 `Object.__proto__` 的值是 `Function.prototype`，而 `Function.prototype` 的 `__proto__` 属性是 `Object.prototype`，所以我们可以判断出，`Object instanceof Object` 的结果是 true 。用代码简单的表示一下

  ```
  leftValue = Object.__proto__ = Function.prototype;
  rightValue = Object.prototype;
  // 第一次判断
  leftValue != rightValue
  leftValue = Function.prototype.__proto__ = Object.prototype
  // 第二次判断
  leftValue === rightValue
  // 返回 true
  复制代码
  ```

  `Function instanceof Function` 和 `Function instanceof Object` 的运行过程与 `Object instanceof Object` 类似，故不再详说。

- `Foo instanceof Foo`

  Foo 函数的 `prototype` 属性是 `Foo.prototype`，而 Foo 的 `__proto__` 属性是 `Function.prototype`，由图可知，Foo 的原型链上并没有 `Foo.prototype` ，因此 `Foo instanceof Foo` 也就返回 false 。

  我们用代码简单的表示一下

  ```
  leftValue = Foo, rightValue = Foo
  leftValue = Foo.__proto = Function.prototype
  rightValue = Foo.prototype
  // 第一次判断
  leftValue != rightValue
  leftValue = Function.prototype.__proto__ = Object.prototype
  // 第二次判断
  leftValue != rightValue
  leftValue = Object.prototype = null
  // 第三次判断
  leftValue === null
  // 返回 false
  复制代码
  ```

- `Foo instanceof Object`

  ```
  leftValue = Foo, rightValue = Object
  leftValue = Foo.__proto__ = Function.prototype
  rightValue = Object.prototype
  // 第一次判断
  leftValue != rightValue
  leftValue = Function.prototype.__proto__ = Object.prototype
  // 第二次判断
  leftValue === rightValue
  // 返回 true 
  复制代码
  ```

- `Foo instanceof Function`

  ```
  leftValue = Foo, rightValue = Function
  leftValue = Foo.__proto__ = Function.prototype
  rightValue = Function.prototype
  // 第一次判断
  leftValue === rightValue
  // 返回 true 
  复制代码
  ```

#### 总结

简单来说，我们使用 `typeof` 来判断基本数据类型是 ok 的，不过需要注意当用 `typeof` 来判断 `null` 类型时的问题，如果想要判断一个对象的具体类型可以考虑用 `instanceof`，但是 `instanceof` 也可能判断不准确，比如一个数组，他可以被 `instanceof` 判断为 Object。所以我们要想比较准确的判断对象实例的类型时，可以采取 `Object.prototype.toString.call` 方法。

### 40.js动画和css3动画比较

css实现动画：animation transition transform
 js实现动画: setInterval setTimeout requestAnimationFrame

css动画：
 优点：
 1.集中所有DOM，一次重绘重排，刷新频率和浏览器刷新频率相同。
 2.代码简单，方便调优
 3.不可见元素不参与重排，节约cpu
 4.可以使用硬件加速GPU(translateZ(0))
 缺点：
 1.对过程无法把控。无进度报告，无回调函数。
 2.代码冗长。

JS动画：
 优点：
 1.效果炫酷。
 2.过程控制。
 缺点：
 1.无法保证执行时间。timeout interval存在同步任务优先执行的问题。
 2.最小粒度无法保证在16ms.

requestAnimationFrame的优点在于：
 1.是浏览器针对动画提出的API。自动优化，页面不激活状态自动停止。
 2.集中所有dom，一次重绘就完成，重绘事件跟随浏览器刷新频率。
 3.隐藏或不可见元素，不进行重绘回流

### 41.其他

- JavaScript 倒计时（setTimeout）

https://www.runoob.com/w3cnote/javascript-settimeout-usage.html

- 原生JS实现轮播图

https://juejin.im/post/5b8d4171f265da436e74e5c1#heading-5

https://www.cnblogs.com/zhuzhenwei918/p/6416880.html

- 给定一个元素获取它相对于视图窗口的坐标

https://blog.csdn.net/qq_36367494/article/details/79367082

- 正则表达式的函数怎么使用？

https://blog.csdn.net/gjb724332682/article/details/48633725

- **什么是内存泄漏，哪些操作会造成内存泄漏**
  > 内存泄漏：是指一块被分配的内存既不能使用，又不能回收，直到浏览器进程结束
  - 可能造成内存泄漏的操作：
    - 意外的全局变量
    - 闭包
    - 循环引用
    - 被遗忘的定时器或者回调函数

- **同步和异步的区别，怎么异步加载 JavaScript**

  > 同步模式

  同步模式，又称阻塞模式。`javascript` 在默认情况下是会阻塞加载的。当前面的 `javascript` 请求没有处理和执行完时，会阻止浏览器的后续处理

  > 异步模式

  异步加载又叫非阻塞，浏览器在下载执行 `js` 同时，还会继续进行后续页面的处理

  > 异步加载 JavaScript

  - 动态添加 `script` 标签
  - `defer`
  - `async`

  > `defer`属性和`async`都是属于 `script` 标签上面的属性，两者都能实现 `JavaScript` 的异步加载。不同之处在于：`async` 在异步加载完成的时候就马上开始执行了，`defer` 会等到 `html` 加载完毕之后再执行