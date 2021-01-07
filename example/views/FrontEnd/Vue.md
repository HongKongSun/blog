---
title: Vue
date: 2020-07-24
tags:
 - Vue       
categories: 
 - FrontEnd
---

### `1`.必考：watch 和 computed 和 methods 区别是什么？

**computed：** 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed  的值；

**watch：** 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

**methods**：同一函数定义为一个 method 或者一个计算属性。对于最终的结果，两种方式确实是相同的。但是计算属性，只要值没有发生改变，访问就不会再次执行函数，而method只要访问发生渲染，就会执行该函数；

**运用场景：**

- 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
- 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

### `2`.必考：谈谈你对 Vue 生命周期的理解？

**（1）生命周期是什么？**

	Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 	渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

**（2）各个生命周期的作用（Vue 有哪些生命周期钩子函数？分别有什么用？）**

- **beforeCreate**（创建前）在数据观测和初始化事件还未开始，组件实例被创建之初，组件的属性生效之前
- **created**（创建后）    完成数据观测，属性和方法的运算，初始化事件，但真实 dom 还没有生成，`$el`属性还没有显示出来，`$el`还不可用
- **beforeMount**（载入前）    在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。注意此时还没有挂载html到页面上。
- **mounted**（载入后）    在el 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互。
- **beforeUpdate**（更新前）    在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
- **updated**（更新后）    在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
- **activated**：keep-alive组件激活时调
- **deactivated**：keep-alive组件停用时调用
- **beforeDestroy**（销毁前）    在实例销毁之前调用。实例仍然完全可用。
- **destroyed**（销毁后）    在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。

**（3）生命周期示意图**

<img src="https://user-gold-cdn.xitu.io/2019/8/19/16ca74f183827f46?imageslim" alt="img" style="zoom:200%;" />

### 3.父与子

#### `1`.必考：Vue如何实现组件间通讯

Vue 组件间通信是面试常考的知识点之一，这题有点类似于开放题，你回答出越多方法当然越加分，表明你对 Vue 掌握的越熟练。Vue 组件间通信只要指以下 3 类通信：父子组件通信、隔代组件通信、兄弟组件通信，下面我们分别介绍每种通信方式且会说明此种方法可适用于哪类组件间通信。

**（1）`props / $emit`  适用 父子组件通信**

这种方法是 Vue 组件的基础，相信大部分同学耳闻能详，所以此处就不举例展开介绍。

**（2）`ref` 与 `$parent / $children` 适用 父子组件通信**

- `ref`：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
- `$parent` / `$children`：访问父 / 子实例

**（3）`EventBus （$emit / $on）`  适用于 父子、隔代、兄弟组件通信**

这种方法通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件。

**（4）`$attrs`/`$listeners` 适用于 隔代组件通信**

- `$attrs`：包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 ( class 和 style 除外 )。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 ( class 和 style 除外 )，并且可以通过 `v-bind="$attrs"` 传入内部组件。通常配合 inheritAttrs 选项一起使用。
- `$listeners`：包含了父作用域中的 (不含 .native 修饰器的)  v-on 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件

**（5）`provide / inject` 适用于 隔代组件通信**

祖先组件中通过 provider 来提供变量，然后在子孙组件中通过 inject 来注入变量。 provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。

**（6）Vuex  适用于 父子、隔代、兄弟组件通信**

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。

- Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 改变 store 中的状态的唯一途径就是显式地提交  (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

#### 2、Vue 的父组件和子组件生命周期钩子函数执行顺序？

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

- 加载渲染过程

  父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

- 子组件更新过程

  父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

- 父组件更新过程

  父 beforeUpdate -> 父 updated

- 销毁过程

  父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

#### 3、父组件可以监听到子组件的生命周期吗？

比如有父组件 Parent 和子组件 Child，如果父组件监听到子组件挂载 mounted 就做一些逻辑处理，可以通过以下写法实现：

```
// Parent.vue
<Child @mounted="doSomething"/>
    
// Child.vue
mounted() {
  this.$emit("mounted");
}
```

以上需要手动通过 $emit 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 @hook 来监听即可，如下所示：

```
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
    
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},    
    
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...  
```

当然 @hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated 等都可以监听。

#### 4.Vue组件间的参数传递

1. 父组件与子组件传值 父组件传给子组件：子组件通过props方法接受数据; 子组件传给父组件：`$emit`方法传递参数 

2. 非父子组件间的数据传递，兄弟组件传值 eventBus，就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。项目比较小时，用这个比较合适。（虽然也有不少人推荐直接用VUEX，具体来说看需求咯。技术只是手段，目的达到才是王道。） 

   

### `4`.必考：Vue 数据响应式怎么做到的？

- **如何追踪变化** 

当你把一个普通的 **JavaScript**对象传入 **Vue** 实例作为 **data** 选项，**Vue** 将遍历此对象所有的属性，并使用 `Object.defineProperty` 把这些属性全部转为 **getter/setter**。

当页面使用或修改对应属性时，首先会进行依赖收集 (收集当前组件的watcher) ，如果属性发生变化，则会通知相关依赖进行更新操作(发布订阅)。

- **响应式数据**

受现代 **JavaScript** 的限制，**Vue** 无法检测到对象属性的添加或删除。

由于 **Vue** 会在初始化实例时对属性执行 **getter/setter** 转化，所以属性必须在 **data** 对象上存在才能让 **Vue** 将它转换为响应式的。

- **Vue.set this.$set**

**Vue** 不能检测到对象属性的添加或删除，解决方法是手动调用 **Vue.set** 或者 **this.$set**。

### `5`.必考：vue.set 是做什么用的？（Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？）

受现代 JavaScript 的限制 ，Vue **无法检测到对象属性的添加或删除**。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。但是 Vue 提供了 `Vue.set (object, propertyName, value) / vm.$set (object, propertyName, value)`  来实现为对象添加响应式属性。

阅读过源码可知，vm.$set 的实现原理是：

- 如果目标是数组，直接使用数组的 splice 方法触发响应式；

- 如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用   defineReactive 方法进行响应式处理（ defineReactive 方法就是  Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）

  

> **问题拓展：直接给一个数组项赋值，Vue 能检测到变化吗？**

	由于 JavaScript 的限制，Vue 不能检测到以下数组的变动：

- 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`

- 当你修改数组的长度时，例如：`vm.items.length = newLength`

  为了解决第一个问题，Vue 提供了以下操作方法：

```
  // Vue.set
  Vue.set(vm.items, indexOfItem, newValue)
  // vm.$set，Vue.set的一个别名
  vm.$set(vm.items, indexOfItem, newValue)
  // Array.prototype.splice
  vm.items.splice(indexOfItem, 1, newValue)
```

	为了解决第二个问题，Vue 提供了以下操作方法：

```
  // Array.prototype.splice
  vm.items.splice(newLength)
```



### 6、说说你对 SPA 单页面的理解，它的优缺点分别是什么？

SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

**优点：**

- 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
- 基于上面一点，SPA 相对对服务器压力小；
- 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；

**缺点：**

- 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
- 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
- SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

### `7`、v-show 与 v-if 有什么区别？

**v-if** 是**真正**的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

**v-show** 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。

所以，v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。

### 8、Class 与 Style 如何动态绑定？

Class 可以通过对象语法和数组语法进行动态绑定：

- 对象语法：

```vue
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

data: {
  isActive: true,
  hasError: false
}
```

- 数组语法：

```vue
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

Style 也可以通过对象语法和数组语法进行动态绑定：

- 对象语法：

```vue
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

data: {
  activeColor: 'red',
  fontSize: 30
}
```

- 数组语法：

```vue
<div v-bind:style="[styleColor, styleSize]"></div>

data: {
  styleColor: {
     color: 'red'
   },
  styleSize:{
     fontSize:'23px'
  }
}
```

### `9`、什么是 MVVM？

Model–View–ViewModel （MVVM） 是一个软件架构设计模式，由微软 WPF 和 Silverlight 的架构师 Ken Cooper 和 Ted Peters 开发，是一种简化用户界面的事件驱动编程方式。由 John Gossman（同样也是 WPF 和 Silverlight 的架构师）于2005年在他的博客上发表

MVVM 源自于经典的 Model–View–Controller（MVC）模式  ，MVVM 的出现促进了前端开发与后端业务逻辑的分离，极大地提高了前端开发效率，MVVM 的核心是 ViewModel 层，它就像是一个中转站（value converter），负责转换 Model 中的数据对象来让数据变得更容易管理和使用，该层向上与视图层进行双向数据绑定，向下与 Model 层通过接口请求进行数据交互，起呈上启下作用。如下图所示：

![img](https://user-gold-cdn.xitu.io/2019/8/19/16ca75871ec53fba?imageslim)

- View 层：View 是视图层，也就是用户界面。前端主要由 HTML 和 CSS 来构建 。

- Model 层：Model 是指数据模型，泛指后端进行的各种业务逻辑处理和数据操控，对于前端来说就是后端提供的 api 接口。

- ViewModel 层

  ViewModel 是由前端开发人员组织生成和维护的视图数据层。在这一层，前端开发者对从后端获取的 Model 数据进行转换处理，做二次封装，以生成符合 View 层使用预期的视图数据模型。需要注意的是 ViewModel 所封装出来的数据模型包括视图的状态和行为两部分，而 Model 层的数据模型是只包含状态的，比如页面的这一块展示什么，而页面加载进来时发生什么，点击这一块发生什么，这一块滚动时发生什么这些都属于视图行为（交互），视图状态和行为都封装在了 ViewModel 里。这样的封装使得 ViewModel 可以完整地去描述 View 层。

MVVM 框架实现了双向绑定，这样 ViewModel 的内容会实时展现在 View 层，前端开发者再也不必低效又麻烦地通过操纵 DOM 去更新视图，MVVM 框架已经把最脏最累的一块做好了，我们开发者只需要处理和维护 ViewModel，更新数据视图就会自动得到相应更新。这样 View 层展现的不是 Model 层的数据，而是 ViewModel 的数据，由 ViewModel 负责与 Model 层交互，这就完全解耦了 View 层和 Model 层，这个解耦是至关重要的，它是前后端分离方案实施的重要一环。

我们以下通过一个 Vue 实例来说明 MVVM 的具体实现，有 Vue 开发经验的同学应该一目了然：

（1）View 层

```vue
<div id="app">
    <p>{{message}}</p>
    <button v-on:click="showMessage()">Click me</button>
</div>
```

（2）ViewModel 层

```vue
var app = new Vue({
    el: '#app',
    data: {  // 用于描述视图状态   
        message: 'Hello Vue!', 
    },
    methods: {  // 用于描述视图行为  
        showMessage(){
            let vm = this;
            alert(vm.message);
        }
    },
    created(){
        let vm = this;
        // Ajax 获取 Model 层的数据
        ajax({
            url: '/your/server/data/api',
            success(res){
                vm.message = res;
            }
        });
    }
})
```

（3） Model 层

```vue
{
    "url": "/your/server/data/api",
    "res": {
        "success": true,
        "name": "IoveC",
        "domain": "www.cnblogs.com"
    }
}
```



### `10`.Vue-Router

#### 1.vue-router 路由模式有几种？

vue-router 有 3 种路由模式：hash、history、abstract，对应的源码如下所示：

```js
switch (mode) {
  case 'history':
	this.history = new HTML5History(this, options.base)
	break
  case 'hash':
	this.history = new HashHistory(this, options.base, this.fallback)
	break
  case 'abstract':
	this.history = new AbstractHistory(this, options.base)
	break
  default:
	if (process.env.NODE_ENV !== 'production') {
	  assert(false, `invalid mode: ${mode}`)
	}
}
```

其中，3 种路由模式的说明如下：

- hash:  使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
- history :  依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；
- abstract :  支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

#### 2.能说下 vue-router 中常用的 hash 和 history 路由模式实现原理吗？

**（1）hash 模式的实现原理**

早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：

```
https://www.word.com#search
复制代码
```

hash  路由模式的实现主要是基于下面几个特性：

- URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
- hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
- 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

**（2）history 模式的实现原理**

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

```
window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);
复制代码
```

history 路由模式的实现主要基于存在下面几个特性：

- pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
- 我们可以使用 popstate  事件来监听 url 的变化，从而对页面进行跳转（渲染）；
- history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

#### 3.`$route` 和 `$router`的区别

答：`$route`是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。而`$router`是“路由实例”对象包括了路由的跳转方法，钩子函数等。 

#### 4.VueRouter你怎么用的？

hash主要依赖location.hash来改动 URL,达到不刷新跳转的效果.每次 hash 改变都会触发hashchange事件(来响应路由的变化,比如页面的更换)
history主要利用了 HTML5的 historyAPI 来实现,用pushState和replaceState来操作浏览历史记录栈

### 11.怎样理解 Vue 的单向数据流？

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。

有两种常见的试图改变一个 prop 的情形 :

- **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。** 在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：

```
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
复制代码
```

- **这个 prop 以一种原始的值传入且需要进行转换。** 在这种情况下，最好使用这个 prop 的值来定义一个计算属性

```
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
复制代码
```



### 12.Vuex

#### 1.Vuex是什么？怎么使用？哪种功能场景使用它？与cookie的区别？

只用来读取的状态集中放在store中； 改变状态的方式是提交mutations，这是个同步的事物； 异步逻辑应该封装在action中。  

场景有：单页应用中，组件之间的状态、音乐播放、登录状态、加入购物车.  

**state** ：Vuex 使用单一状态树,即每个应用将仅仅包含一个store 实例，但单一状态树和模块化并不冲突。存放的数据状态，不可以直接修改里面的数据。  

**mutations** ：mutations定义的方法动态修改Vuex 的 store 中的状态或数据。 

**getters** ：类似vue的计算属性，主要用来过滤一些数据。  

**action** ：actions可以理解为通过将mutations里面处里数据的方法变成可异步的处理数据的方法，简单的说就是异步操作数据。view 层通过 store.dispath 来分发 action。

#### 2.你使用过 Vuex 吗？

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。

（1）Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

（2）改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

主要包括以下几个模块：

- State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
- Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
- Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

### 13、组件中 data 为什么是一个函数？

> 为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？

```
// data
data() {
  return {
	message: "子组件",
	childName:this.name
  }
}

// new Vue
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

```

因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

### 14、v-model 的原理？

我们在 vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

以 input  表单元素为例：

```
<input v-model='something'>
    
相当于

<input v-bind:value="something" v-on:input="something = $event.target.value">
```

如果在自定义组件中，v-model 默认会利用名为 value 的 prop 和名为 input 的事件，如下所示：

```
父组件：
<ModelChild v-model="message"></ModelChild>

子组件：
<div>{{value}}</div>

props:{
    value: String
},
methods: {
  test1(){
     this.$emit('input', '小红')
  },
},
```

### 15.使用过 Vue SSR 吗？说说 SSR？(服务端渲染)

> Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。
>
> 即：SSR大致的意思就是vue在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的html 片段直接返回给客户端这个过程就叫做服务端渲染。

**服务端渲染 SSR 的优缺点如下：**

**（1）服务端渲染的优点：**

- 更好的 SEO： 因为 SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容，所以在 SPA 中是抓取不到页面通过 Ajax 获取到的内容；而 SSR 是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），所以搜索引擎爬取工具可以抓取渲染好的页面；
- 更快的内容到达时间（首屏加载更快）： SPA 会等待所有 Vue 编译后的 js 文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；SSR 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间；

**（2) 服务端渲染的缺点：**

- 更多的开发条件限制： 例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；
- 更多的服务器负载：在 Node.js  中渲染完整的应用程序，显然会比仅仅提供静态文件的  server 更加大量占用CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 ( high traffic ) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。

### 16、Vue 是如何实现数据双向绑定的？

Vue 数据双向绑定主要是指：数据变化更新视图，视图变化更新数据，如下图所示：

![img](https://user-gold-cdn.xitu.io/2019/8/19/16ca75871f2e5f80?imageslim)

即：

- 输入框内容变化时，Data 中的数据同步变化。即 View => Data 的变化。
- Data 中的数据变化时，文本节点的内容同步变化。即 Data => View 的变化。

其中，View 变化更新 Data ，可以通过事件监听的方式来实现，所以 Vue 的数据双向绑定的工作主要是如何根据 Data 变化更新 View。

Vue 主要通过以下 4 个步骤来实现数据双向绑定的：

实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。

以上四个步骤的流程图表示如下，如果有同学理解不大清晰的，可以查看作者专门介绍数据双向绑定的文章[《0 到 1 掌握：Vue 核心之数据双向绑定》](https://juejin.im/post/5d421bcf6fb9a06af23853f1)，有进行详细的讲解、以及代码 demo 示例。

![img](https://user-gold-cdn.xitu.io/2019/8/19/16ca75871f729d89?imageslim)



### 17.虚拟DOM

#### 1、比较两棵虚拟 `DOM` 树的差异 — `diff` 算法

`diff` 算法用来比较两棵 `Virtual DOM` 树的差异，如果需要两棵树的完全比较，那么 `diff` 算法的时间复杂度为`O(n^3)`。但是在前端当中，你很少会跨越层级地移动 `DOM` 元素，所以 `Virtual DOM` 只会对同一个层级的元素进行对比，如下图所示， `div` 只会和同一层级的 `div` 对比，第二层级的只会跟第二层级对比，这样算法复杂度就可以达到 `O(n)`。

![img](https://user-gold-cdn.xitu.io/2019/7/23/16c1e26a5ecf086e?imageslim)

**（1）深度优先遍历，记录差异**

在实际的代码中，会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个唯一的标记：

![img](https://user-gold-cdn.xitu.io/2019/7/23/16c1e0e2873e42b1?imageslim)



在深度优先遍历的时候，每遍历到一个节点就把该节点和新的的树进行对比。如果有差异的话就记录到一个对象里面。

```
// diff 函数，对比两棵树
function diff(oldTree, newTree) {
  var index = 0 // 当前节点的标志
  var patches = {} // 用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

// 对两棵树进行深度优先遍历
function dfsWalk(oldNode, newNode, index, patches) {
  var currentPatch = []
  if (typeof (oldNode) === "string" && typeof (newNode) === "string") {
    // 文本内容改变
    if (newNode !== oldNode) {
      currentPatch.push({ type: patch.TEXT, content: newNode })
    }
  } else if (newNode!=null && oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
    // 节点相同，比较属性
    var propsPatches = diffProps(oldNode, newNode)
    if (propsPatches) {
      currentPatch.push({ type: patch.PROPS, props: propsPatches })
    }
    // 比较子节点，如果子节点有'ignore'属性，则不需要比较
    if (!isIgnoreChildren(newNode)) {
      diffChildren(
        oldNode.children,
        newNode.children,
        index,
        patches,
        currentPatch
      )
    }
  } else if(newNode !== null){
    // 新节点和旧节点不同，用 replace 替换
    currentPatch.push({ type: patch.REPLACE, node: newNode })
  }

  if (currentPatch.length) {
    patches[index] = currentPatch
  }
} 
```

从以上可以得出，`patches[1]` 表示 `p` ，`patches[3]` 表示 `ul` ，以此类推。

**（2）差异类型**

`DOM` 操作导致的差异类型包括以下几种：

- 节点替换：节点改变了，例如将上面的 `div` 换成 `h1`;
- 顺序互换：移动、删除、新增子节点，例如上面 `div` 的子节点，把 `p` 和 `ul` 顺序互换；
- 属性更改：修改了节点的属性，例如把上面 `li` 的 `class` 样式类删除；
- 文本改变：改变文本节点的文本内容，例如将上面 `p` 节点的文本内容更改为 “`Real Dom`”；

#### 2.虚拟 DOM 的优缺点？

**优点：**

- **保证性能下限：** 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
- **无需手动操作 DOM：** 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
- **跨平台：** 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。

**缺点:**

- **无法进行极致优化：** 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。

#### 3.虚拟 DOM 实现原理？

虚拟 DOM 的实现原理主要包括以下 3 部分：

- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- diff 算法 — 比较两棵虚拟 DOM 树的差异；
- pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

如果对以上 3 个部分还不是很了解的同学，可以查看本文作者写的另一篇详解虚拟 DOM 的文章《[深入剖析：Vue核心之虚拟DOM](https://juejin.im/post/5d36cc575188257aea108a74#heading-14)》 





### 18、Vue 中的 key 有什么作用？

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。Vue 的 diff 过程可以概括为：oldCh 和 newCh 各有两个头尾的变量 oldStartIndex、oldEndIndex 和 newStartIndex、newEndIndex，它们会新节点和旧节点会进行两两对比，即一共有4种比较方式：newStartIndex 和oldStartIndex 、newEndIndex 和  oldEndIndex 、newStartIndex 和 oldEndIndex 、newEndIndex 和 oldStartIndex，如果以上 4 种比较都没匹配，如果设置了key，就会用 key 再进行比较，在比较的过程中，遍历会往中间靠，一旦 StartIdx > EndIdx 表明 oldCh 和 newCh 至少有一个已经遍历完了，就会结束比较。具体有无 key 的 diff 过程，可以查看作者写的另一篇详解虚拟 DOM 的文章《[深入剖析：Vue核心之虚拟DOM](https://juejin.im/post/5d36cc575188257aea108a74#heading-14)》

所以 Vue 中 key 的作用是：key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速

**更准确**：因为带 key 就不是就地复用了，在 sameNode 函数 `a.key === b.key` 对比中可以避免就地复用的情况。所以会更加准确。

**更快速**：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快，源码如下：

```
function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```



**vue中 key 值的作用？**

 答：当 Vue.js 用 v-for  正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，  而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。key的作用主要是为了高效的更新虚拟DOM。 



### 19、你有对 Vue 项目进行哪些优化？

如果没有对 Vue 项目没有进行过优化总结的同学，可以参考本文作者的另一篇文章[《 Vue 项目性能优化 — 实践指南 》](https://juejin.im/post/5d548b83f265da03ab42471d)，文章主要介绍从 3 个大方面，22 个小方面详细讲解如何进行 Vue 项目的优化。

**（1）代码层面的优化**

- v-if 和 v-show 区分使用场景
- computed 和 watch  区分使用场景
- v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
- 长列表性能优化
- 事件的销毁
- 图片资源懒加载
- 路由懒加载
- 第三方插件的按需引入
- 优化无限列表性能
- 服务端渲染 SSR or 预渲染

**（2）Webpack 层面的优化**

- Webpack 对图片进行压缩
- 减少 ES6 转为 ES5 的冗余代码
- 提取公共代码
- 模板预编译
- 提取组件的 CSS
- 优化 SourceMap
- 构建结果输出分析
- Vue 项目的编译优化

**（3）基础的 Web 技术的优化**

- 开启 gzip 压缩
- 浏览器缓存
- CDN 的使用
- 使用 Chrome Performance 查找性能瓶颈

### 20. Vue 3 新特性

`Vue 3` 的设计目标是更快，更小，并更好的支持 `TypeScript` 。

一些新特性包括:

> 1、Composition API 2、Multiple root elements 3、Suspense 4、Multiple V-models 5、Reactivity 6、Teleport 7、Transition 8、Remove Filter 9、App configuration

#### 1、Composition API

Vue 官方发布了 `Composition API` 的官方插件，使广大用户可以在 `Vue2.x` 中享受 `Function Base` 带来的新体验。

而在 `vue 3` 中无需单独安装插件，开箱即用。

打开 `App.vue`，你会看到 `setup()`方法:

```
<template>
  <img src="./logo.png">
  <h1>Hello Vue 3!</h1>
  <button @click="inc">Clicked {{ count }} times.</button>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const inc = () => {
      count.value++
    }

    return {
      count,
      inc
    }
  }
}
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>

复制代码
```

`Composition API` 主要提供两大好处：

1、清晰的代码结构 2、消除重复逻辑

```
<template>
  <div class="counter">
    <p>count: {{ count }}</p>
    <p>NewVal (count + 2): {{ countDouble }}</p>
    <button @click="inc">Increment</button>
    <button @click="dec">Decrement</button>
    <p> Message: {{ msg }} </p>
    <button @click="changeMessage()">Change Message</button>
  </div>
</template>
<script>
import { ref, computed, watch } from 'vue'
export default {
  setup() {
    /* ---------------------------------------------------- */
    let count = ref(0)
    const countDouble = computed(() => count.value * 2)
    watch(count, newVal => {
      console.log('count changed', newVal)
    })
    const inc = () => {
      count.value += 1
    }
    const dec = () => {
      if (count.value !== 0) {
        count.value -= 1
      }
    }
    /* ---------------------------------------------------- */
    let msg= ref('some text')
    watch(msg, newVal => {
      console.log('msg changed', newVal)
    })
    const changeMessage = () => {
      msg.value = "new Message"
    }
    /* ---------------------------------------------------- */
    return {
      count,
      inc,
      dec,
      countDouble,
      msg,
      changeMessage
    }
  }
}
</script>
复制代码
```

如果你不喜欢使用 `Composition API`, 也可以继续使用 `2.x` 的传统方法：

```
<template>
  <div class="counter">
    <p>count: {{ count }}</p>
    <p>NewVal (count + 2): {{ countDouble }}</p>
    <button @click="inc">Increment</button>
    <button @click="dec">Decrement</button>
    <p> Message: {{ msg }} </p>
    <button @click="changeMessage()">Change Message</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      msg: 'some message'
    }
  },
  computed: {
    countDouble() {
      return this.count*2
    }
  },
  watch: {
    count(newVal) {
      console.log('count changed', newVal)
    },
    msg(newVal) {
      console.log('msg changed', newVal)
    }
  },
  methods: {
     inc() {
      this.count += 1
    },
    dec() {
      if (this.count !== 0) {
        this.count -= 1
      }
    },
    changeMessage() {
      msg = "new Message"
    }
  }

}
</script>
复制代码
```

> 上面两段代码在效果上市完全等价的

使用 `Composition API` 的好处：可以让我们更好地组织代码(`state`, `methods`, `computed properties`, `watcher` 等)。

随着组件规模的增长，如何组织我们的业务代码逐渐变成一个重要的问题，确保新进的开发人员都可以轻松地理解代码，而不需要花太多时间。

以前我们会使用 `mixin` 来复用代码。然而，`mixin` 最大的痛点是，需要我们跟踪不同组件中的状态和方法，这往往会给开发带来一定的心智负担，一不小心，`mixin` 可能会覆盖组件中的现有状态或方法。

**使用 `Composition API` 让代码复用更加容易。**

我们同样可以抽取出重复功能的代码:

```
// message.js
import { ref, watch } from "vue";
export function message() {
  let msg = ref(123);
  watch(msg, (newVal) => {
    console.log("msg changed", newVal);
  });
  const changeMessage = () => {
    msg.value = "new Message";
  };
  return { msg, changeMessage };
}
复制代码
```

在其他组件中使用上面组件:

```
<template>
  <div class="counter">
    <p>count: {{ count }}</p>
    <p>NewVal (count + 2): {{ countDouble }}</p>
    <button @click="inc">Increment</button>
    <button @click="dec">Decrement</button>
    <p>Message: {{ msg }}</p>
    <button @click="changeMessage()">change message</button>
  </div>
</template>
<script>
import { ref, computed, watch } from 'vue'
import { message } from './common/message'
export default {
  setup() {
    let count = ref(0)
    const countDouble = computed(() => count.value * 2)
    watch(count, newVal => {
      console.log('count changed', newVal)
    })
    const inc = () => {
      count.value += 1
    }
    const dec = () => {
      if (count.value !== 0) {
        count.value -= 1
      }
    }
    let { msg, changeMessage } = message()
    return {
      count,
      msg,
      changeMessage,
      inc,
      dec,
      countDouble
    }
  }
}
</script>
复制代码
```

#### 2、Multiple root elements

在 `Vue 2` 中，tempalte 只能取一个根元素。即使我们只有两个 <p> 标记，我们也必须将它们包含在一个 <div> 标记中：

```
<template>
  <div class="counter">
    <p> Count: {{ count }} </p>
    <button @click="increment"> Increment </button>
    <button @click="decrement"> Decrement</button>
  </div>
</template>
复制代码
```

为了能编译通过，我们通常会增加一个根节点。

> 这个设计确实很糟糕，我曾经无数次吐槽过这个设计。因为会带来不必要的代码嵌套和缩进。

幸好在 `Vue 3` 中取消了这一限制：

可以直接在<template></template>中使用任意数量的标签:

```
<template>
  <p> Count: {{ count }} </p>
  <button @click="increment"> Increment </button>
  <button @click="decrement"> Decrement </button>
</template>
复制代码
```

> 用 VScode 打开模板时，看到一些 `lint` 错误，这是因为官方插件 `eslint-plugin-vue` 还没有支持新的模板语法。

#### 3、Suspense

`Suspense` 是一个 `Vue 3` 新特性。

通常前后端交互是一个异步的过程： 默认我们提供一个加载中的动画，当数据返回时配合使用 `v-if` 来控制数据显示。

`Suspense` 的出现大大简化了这个过程：它提供了 `default` 和 `fallback` 两种状态：

```
<template>
  <Suspense>
    <template #default>
      <div v-for="item in articleList" :key="item.id">
        <article>
          <h2>{{ item.title }}</h2>
          <p>{{ item.body }}</p>
        </article>
      </div>
    </template>
    <template #fallback>
      Articles loading...
    </template>
  </Suspense>
</template>
<script>
import axios from 'axios'
export default {
  async setup() {
    let articleList = await axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        console.log(response)
        return response.data
      })
    return {
      articleList
    }
  }
}
</script>
复制代码
```

#### 4、Multiple v-models

我们都知道 `v-models` 用于双向数据绑定。一般用于与表单元素一起使用。有时我们会在自定义组件中使用它。

`Vue 2` 只允许在一个组件上使用一个 `v-models`。在 `Vue 3` 中，我们可以将任意数量的 `v-model` 绑定到我们的定制组件上:

```
<template>
  <survey-form v-model:name="name" v-model:age="age">
    {" "}
  </survey-form>
</template>
复制代码
```

SurveyForm.vue:

```
<template>
    <div>
        <label>Name: </label>
        <input :value="name" @input="updateName($event.target.value)" />
        <label>Age: </label>
        <input :value="age" @input="updateAge($event.target.value)" />
    </div>
</template>
<script>
    export default {
      props: {
        name: String,
        age: Number
      },
      setup(props, { emit }) {
        const updateName = value => {
          emit('update:name', value)
        }
        const updateAge = value => {
          emit('update:age', +value)
        }
        return { updateName, updateAge }
      }
    }
</script>
复制代码
```

#### 5、Reactivity

`Vue 2` 的响应式已经非常棒了，但在少数情况下会存在一些问题：

```
<template>
  <div class="hello" @click="test">test {{list }} {{ myObj }}</div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      list: [1, 2],
      myObj: { name: "Preetish" }
    };
  },
  watch: {
    list: {
      handler: () => {
        console.log("watcher triggered");
      },
      deep: true
    }
  },
  methods: {
    test() {
      this.list[2] = 4;
      this.myObj.last = "HS";
      delete this.myObj.name;
    }
  }
};
</script>
复制代码
```

我们发现通过`this.list`下标来修改元素，并不会触发 `wacher` 监听函数，为了达到目的，我们不得不使用 `vue.set()` 或 `vue.delete()` 这些方法。

而在 `vue 3` 中，我们不需要借助其他 API：

```
export default {
  setup() {
    let list = ref([1, 2]);
    let myObj = ref({ name: "Preetish" });
    function myFun() {
      list.value[3] = 3;
      myObj.value.last = "HS";
      delete myObj.value.name;
    }
    return { myFun, list, myObj };
  },
};
复制代码
```

#### 6、Portals

`Portals` 提供了一种将组件中渲染到页面任意一个 `DOM` 节点中的能力。在 `Vue 2` 中，利用一个 `portal-vue` 的第三方插件来做到这一点。

在 `vue 3` 中直接使用：

```
<Teleport to="#modal-layer">
  <div class="modal">hello</div>
</Teleport>
复制代码
```

<Teleport> 是 vue3 中提供特定的标签用于创建一个 `Portals`。

<Teleport> </Teleport>中间出现的内容会出现在 `to` 指定的节点中：

```
<div id="modal-target"></div>
复制代码
```

> 目前为止，<Teleport>在 Alpha 版本中并不能使用

#### 7、Transition

之前我在使用 `v-enter-active`, `v-enter`, `v-enter-to` 这些个状态时搞的晕头转向。

现在 Vue 3 从命名上更直观了: `v-enter` 变成了 `v-enter-from`，`v-leave` 变成 `v-leave-from`。

#### 8、Remove Filter

`Vue 3` 抛弃了 `Filter` 的用法，更推荐使用计算属性或方法来实现：

```
<!-- vue 2.x -->
{{ date | format }}

<!-- vue 3.0 -->
{{ format(date) }}
复制代码
```

#### 9、App configration

在 `Vue 2` 中，如果想使用 `use()`, `mixin()` , `directive()` 等方法需要配合全局 `Vue` 对象:

```
import Vue from "vue";
import App from "./App";

Vue.use(/* ... */);
Vue.mixin(/* ... */);
Vue.component(/* ... */);
Vue.directive(/* ... */);

new Vue({
  el: "#app",
  template: "<App/>",
  components: {
    App,
  },
});
复制代码
```

在 `Vue 3` 中， 改成了 `createApp` 返回的 `Vue` 实例：

```
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(/* ... */);
app.mixin(/* ... */);
app.component(/* ... */);
app.directive(/* ... */);

app.mount("#app");
复制代码
```

#### 结束语

总之`Vue 3` 通过提供一种简单的方式来组织和共享代码，并提供强大的 `TypeScript` 支持，新的代码组织方式会对未来的应用开发产生重大影响。

同时一些其它的特性，如 `Suspense`，多个 `v-models` 等也会给开发带来巨大的便利。

同时性能更快，体积更小



### 21.路由守卫

#### 1.全局前置守卫

你可以使用 `router.beforeEach` 注册一个全局前置守卫：

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

每个守卫方法接收三个参数：

- **`to: Route`**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#路由对象)
- **`from: Route`**: 当前导航正要离开的路由
- **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
  - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
  - **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。

**确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。**这里有一个在用户未能验证身份时重定向到 `/login` 的示例：

```js
// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})
// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

#### 2.全局解析守卫

> 2.5.0 新增

在 2.5.0+ 你可以用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。

#### 3.全局后置钩子

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

```js
router.afterEach((to, from) => {
  // ...
})
```

#### 4.路由独享的守卫

你可以在路由配置上直接定义 `beforeEnter` 守卫：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

这些守卫与全局前置守卫的方法参数是一样的。

#### 5.组件内的守卫

最后，你可以在路由组件内直接定义以下路由导航守卫：

- `beforeRouteEnter`
- `beforeRouteUpdate` (2.2 新增)
- `beforeRouteLeave`

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以**不支持**传递回调，因为没有必要了。

```js
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```

这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 `next(false)` 来取消。

```js
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

#### 6.完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数

### 22、说说你使用 Vue 框架踩过最大的坑是什么？怎么解决的？

就是之前在写一个VUE组件的时候，当时我是要，我想用代码来说，口述好像说不清楚。就是当时传一个button组件，我当时想的是，用户要想把他变为一个圆角的话，只需要通过props传一个round这个东西就可以了，问题就是 我当时写的时候，props当时传进去的竟是一个空的字符串，当时被困扰了很久。在Stack Overflow找查了想问的问题，但是没有解决，最后经过调试发现就是在写里面的 props装饰器的时候，没有去写他的类型。如果不写他的类型的话，他是不会默认把他当做一个布尔值，而是一个空的字符串给传进去的。

### 23.其他

- v-once是做什么的

- <vue-router>和<router-view>了解一下

- vue自定义过滤器filter

  - 全局过滤

    ```vue
    Vue.filter('globalFilter', function (value) {
    
      return value + "!!!"
    
    })
    ```

  - 组件过滤器

    ```vue
    filters:{
    
        componentFilter:function(value){
             return value + "!!!"
    
        }
      }
    ```

    上面有种写法有个需要注意的问题：全局注册时是filter，没有s的。而组件过滤器是filters，是有s的，这要注意了，虽然你写的时候没有s不报错，但是过滤器是没有效果的；

  - **使用方法**

    - 在双括号插值

      ```vue
      {{ 'abc' | globalFilter }}
      ```

    - 在v-bind 表达式中使用

      ```vue
      <div v-bind:data="'abc' | globalFilter" ></div>
      ```

      - 过滤器的参数写法
        - {{ message | filterA | filterB }}message是作为参数传给filterA 函数，而filterA 函数的返回值作为参数传给filterB函数，最终结果显示是由filterB返回的。
        - {{ message | filterA('arg1', arg2) }}filterA的第一个参数是message，依次是‘arg1’,arg2 
        - {{ 'a','b' | filterB }}表示'a'和'b'分别作为参数传给filterB

- 路由懒加载如何实现

- 图片懒加载原理是什么

- **css只在当前组件起作用** 答：在style标签中写入**scoped**即可  

- **vue.js的两个核心是什么？** 答：数据驱动、组件系统 

- **vue常用的修饰符？**

- .prevent: 提交事件不再重载页面；
  - .stop: 阻止单击事件冒泡；
  - .self: 当事件发生在该元素本身而不是子元素的时候会触发；
  - .capture: 事件侦听，事件发生的时候会调用 
  
- **v-on 可以绑定多个方法吗？** 答：可以 

- **什么是vue的计算属性？** 

- 在模板中放入太多的逻辑会让模板过重且难以维护，在需要对数据进行复杂处理，且可能多次使用的情况下，尽量采取计算属性的方式。
  
- 好处：①使得数据处理结构清晰；②依赖于数据，数据更新，处理结果自动更新；③计算属性内部this指向vm实例；④在template调用时，直接写计算属性名即可；⑤常用的是getter方法，获取数据，也可以使用set方法改变数据；⑥相较于methods，不管依赖的数据变不变，methods都会重新计算，但是依赖数据不变的时候computed从缓存中获取，不会重新计算。 
  
- **在哪个生命周期内调用异步请求？**

  可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。但是本人推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

  - 能更快获取到服务端数据，减少页面 loading 时间；
  - ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

- **在什么阶段才能访问操作DOM？**

  在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM。



- **谈谈你对 keep-alive 的了解？**

  keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

  - 一般结合路由和动态组件一起使用，用于缓存组件；
  - 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
  - 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。



- **Vue 框架怎么实现对象和数组的监听？**

  如果被问到 Vue 怎么实现数据双向绑定，大家肯定都会回答 通过 Object.defineProperty() 对数据进行劫持，但是  **Object.defineProperty() 只能对属性进行数据劫持**，**不能对整个对象进行劫持**，同理无法对数组进行劫持，但是我们在使用 Vue 框架中都知道，Vue 能检测到对象和数组（部分方法的操作）的变化，那它是怎么实现的呢？我们查看相关代码如下：

  ```
    /**
     * Observe a list of Array items.
     */
    observeArray (items: Array<any>) {
      for (let i = 0, l = items.length; i < l; i++) {
        observe(items[i])  // observe 功能为监测数据的变化
      }
    }
  
    /**
     * 对属性进行递归遍历
     */
    let childOb = !shallow && observe(val) // observe 功能为监测数据的变化
  ```

  通过以上 Vue 源码部分查看，我们就能知道 **Vue 框架是通过遍历数组 和递归遍历对象，从而达到利用  Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。**

- **Proxy 与 Object.defineProperty 优劣对比**

  **Proxy 的优势如下:**

  - Proxy 可以直接监听对象而非属性；
  - Proxy 可以直接监听数组的变化；
  - Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
  - Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
  - Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

  **Object.defineProperty 的优势如下:**

  - 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。

   

- v-for 与 v-if 的优先级，以及避免同时使用
  
  - 两者不要一起使用，v-for比v-if 具有更高的优先级。