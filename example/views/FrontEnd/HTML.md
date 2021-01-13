---
title: HTML
date: 2019-12-15
tags:
 - HTML
categories:
 - FrontEnd
---

### `1`. 必考：你是如何理解 html语义化的？

我的理解：

1. 以前的页面，一打开就是一堆div+css，为了改变这种这种状况，开发者们和官方提出了让HTML结构语义化的概念，并且官方w3c，也在HTML5给出了几个新的语义化的标签。如，  header nav aside footer section article 。

2. 定义：语义化是用相对应的有一定语义的英文字母（标签）表示的，像刚刚说的 article、header、footer等这种，不仅对自己来说，容易阅读，书写。别人看你的代码和结构也容易理解。

3. 语义化后的效果：在去掉CSS样式表之后， 代码结构也很清晰。也就是说，脱掉css的外衣，依然头是头，脚是脚。

4. 除了代码结构上的优点，语义化还有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；（此处一定小心问SEO的问题）

5. 便于团队开发和维护，语义化更具可读性，遵循W3C标准的团队都遵循这个标准，可以减少差异化。

### `2`. meta 标签，以及viewport

***< meta > 元素***

< meta> 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。

```html
<meta>元素可以定义文档的各种元数据，提供各种文档信息，通俗点说就是可以理解为提供了关于网站的各种信息。html文档中可以包含多个<meta>元素，每个<meta>元素只能用于一种用途，如果想定义多个文档信息，则需要在head标签中添加多个meta元素
```

| 元素          | meta                                                         |
| ------------- | ------------------------------------------------------------ |
| 父元素        | head                                                         |
| 属性          | http-equiv、name、content、charset                           |
| HTML5中的变化 | 1. charset为HTML5中新增的，用来声明字符编码;2. http-equiv属性在HTML4中有很多值，在HTML5中只有refresh、default-style、content-type可用 |

**< meta >具体用途**

```html
<meta>元素除去charset属性外，都是http-equiv属性或name属性结合content来使用
1.指定名/值对定义元数据
```


name属性与content属性结合使用, name用来表示元数据的类型，表示当前<meta>标签的具体作用；content属性用来提供值。

```html
<meta name="参数" content="具体描述信息">
```

例如:

```html
<!DOCTYPE HTML>
<html>
    <head>
        <title>demo</title>
        <meta name="keywords" content="电商,物流">
        <meta name="author" content="张三">
        <meta name="description" content="网站描述...">
    </head>
    <body>
        <div>welcome</div>
    </body>
</html>
```

| 元数据名称(name的值) | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| application name     | 当前页所属Web应用系统的名称                                  |
| keywords             | 描述网站内容的关键词,以逗号隔开，用于SEO搜索                 |
| description          | 当前页的说明                                                 |
| author               | 当前页的作者名                                               |
| copyright            | 版权信息                                                     |
| renderer             | renderer是为双核浏览器准备的，用于指定双核浏览器默认以何种方式渲染页面 |
| viewreport           | 它提供有关视口初始大小的提示，仅供移动设备使用               |

**viewreport**

``````html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
``````

meta viewport是专门为移动设备下的显示所设计的，为了在移动设备下，网页不需要缩放和滚动条就能查看网页中的所有内容，文字、图片大小合适等，只有检测都在移动设备上使用包含了meta的文档时，这个标签才会起作用，一般使用会设置如下5个属性：
width：表示移动设备下，定义视口的宽度为设备宽度(device-width)
user-scalable：表示用户缩放能力, no表示不允许用户缩放网页，默认为yes
initial-scale：表示设备与视口的缩放比率
maximum和minimum：分别表示缩放的最大最小值, 要注意的是, maximum必须大于或等于minimum

上面的meta标签就是告诉浏览器, 不要在移动端显示的时候缩放

<img src="https://gitee.com/hongkongsun/pic-bed/raw/master/static/viewport.png" style="zoom:50%;" />

主要介绍一个当meta标签的name属性值为viewreport时的视口的大小

**1.mate标签name属性不设置viewreport**

如果不设置name的值为viewreport，默认视口宽度为980

**2.mate标签name属性设置viewreport**

- 1.content内容为空时，默认视口宽度为980
- 2.content设置width，不设置initail-scale时，视口宽度为设置的width值
- 3.content不设置width，只设置initail-scale时，是可以根据initail-scale的值计算出视口的宽度

```
initail-scale = 屏幕宽度 / 视口宽度
```

- 4.content同时设置width和initail-scale时，视口宽度为width的值，页面显示按照initail-scale比率进行缩放
- 5.一般都是进行如下设置，来实现视口宽等于设备宽，布局完成后屏幕显示也不进行缩放

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**renderer**

```html
<meta name="renderer" content="webkit"> //默认webkit内核 
<meta name="renderer" content="ie-comp"> //默认IE兼容模式 
<meta name="renderer" content="ie-stand"> //默认IE标准模式

<meta name="renderer" content="webkit|ie-comp|ie-stand">
```

 **2. 声明字符编码**

charset属性为HTML5新增的属性，用于声明字符编码,以下两种写法效果一样

```html
<meta charset="utf-8"> //HTML5
```

```html
<meta http-equiv="content-Type" content="text/html;charset=utf-8"> //旧的HTML
```

**3. 模拟http标头字段**

**http-equiv**属性与**content**属性结合使用, **http-equiv**属性为指定所要模拟的标头字段的名称，**content**属性用来提供值。

```html
<meta http-equiv="参数" content="具体的描述">
```

**content-Type** 声明网页字符编码:

```html
<meta http-equiv="content-Type" content="text/html charset=UTF-8">
```

**refresh** 指定一个时间间隔(以秒为单位),在此时间过去之后从服务器重新载入当前页面,也可以另外指定一个页面.

```html
<meta http-equiv="refresh" content="2;URL=http://www.baidu.com">//2秒后在当前页跳转到百度
```

**X-UA-Compatible** 浏览器采取何种版本渲染当前页面

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> //指定IE和Chrome使用最新版本渲染当前页面
```

**expires** 用于设定网页的到期时间，过期后网页必须到服务器上重新传输

```html
<meta http-equiv="expires" content="Sunday 22 July 2016 16:30 GMT">
```

**catch-control** 用于指定所有缓存机制在整个请求/响应链中必须服从的指令

```html
<meta http-equiv="cache-control" content="no-cache">//
```

content有以下值(百度百科):

| content的值                          | 说明                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| public                               | 所有内容都将被缓存(客户端和代理服务器都可缓存)               |
| private                              | 内容只缓存到私有缓存中(仅客户端可以缓存，代理服务器不可缓存) |
| no-cache                             | 必须先与服务器确认返回的响应是否被更改，然后才能使用该响应来满足后续对同一个网址的请求。因此，如果存在合适的验证令牌 (ETag)，no-cache 会发起往返通信来验证缓存的响应，如果资源未被更改，可以避免下载。 |
| no-store                             | 所有内容都不会被缓存到缓存或 Internet 临时文件中             |
| must-revalidation/proxy-revalidation | 如果缓存的内容失效，请求必须发送到服务器/代理以进行重新验证  |
| max-age=xxx (xxx is numeric)         | 缓存的内容将在 xxx 秒后失效, 这个选项只在HTTP 1.1可用, 并如果和Last-Modified一起使用时, 优先级较高 |

### 3. H5 是什么

所谓的 H5 开发，通常指代在微信中，点开后会在微信内部展开的精美的移动端的 Web 页面。H5 并不是一门技术，或者一个规范，而是一套技术的集合。开发一个 H5 页面，需要用到哪些技术。

- 页面素材预加载技术：可以选择 **createJS** 之中的 **preloadJS** 实现
- 音乐加载播放技术：可以选择 **createJS** 的 **soundJS** 实现
- 可以滑动的页面：可以选择 **swiper.js** 实现
- 可以涂抹擦除：可以选择 HTML5 中的 **canvas** 实现
- 有动态的文字和图片：可以选择使用 **CSS3** 实现，当然直接通过 JS 也可以
- 可以支持分享自定义的文案和图片：这里用到的是微信的 **jssdk**

###  4.使用data-的好处

- 属性用于存储页面或应用程序的私有自定义数据。
- 属性赋予我们在所有 HTML 元素上嵌入自定义 data 属性的能力。
- 存储的（自定义）数据能够被页面的 JavaScript 中利用，以创建更好的用户体验（不进行 Ajax 调用或服务器端数据库查询）。

###  `5`.什么是渐进式渲染

指浏览器不用等待所有页面资源都渲染好之后再呈现给用户看，而是边下载边渲染，所以用户打开一个网页的时候往往不能第一时间看到所有的内容，但是能够看到一个大概的样子，后续的内容浏览器会慢慢补上形成一个完整的页面。

其实就是为了解决js加载时间的问题

渐进式呈现是用于提高网页性能（尤其是提高用户感知的加载速度），以尽快呈现页面的技术。

现在，移动终端的盛行，而移动网络往往相对较快，渐进式渲染在现代前端开发中仍然有用武之地。

一些体现：

- 图片懒加载-页面上的图片不会一次性全部加载。当用户滚动页面到图片部分时，JavaScript将加载并显示图像。
- 确定显示内容的优先级（分层次渲染）-为了尽快将页面呈现给用户，页面只包含基本的最少的CSS，脚本和内容，然后可以使用中断加载脚本或监听DOMContentLoaded/ load事件加载其他资源和内容。
- 初步加载HTML片段-当页面通过后台渲染时，将HTML拆分，通过异步请求，分块发送给浏览器

###  6.css js放置位置和原因

js是阻塞加载，会影响页面加载的速度，如果js文件比较大，算法也比较复杂的话，影响更大。
CSS放在前端是页面渲染时首先是根据DOM结构生成一个DOM树然后加上CSS样式生成一个渲染树，如果CSS放在后面可能页面会出现闪跳的感觉，或者是白屏或者布局混乱样式很丑直到CSS加载完成。

说到这那我们就有必要先了解一下网站加载的整个完整过程了。
1.首先浏览器从服务器接收到html代码，然后开始解析html
2.构建DOM树（根据html代码自上而下进行构建），并且同时构建渲染树。
3.遇到js文件加载执行，将阻塞DOM树的构建；遇到css文件，将阻塞渲染树的构建

> script标签中的defer属性：构建DOM树的过程和js文件的加载异步（并行）进行，但是js文件执行需要在DOM树构建完成之后
> script标签中的async属性：构建DOM树、渲染树的过程和js文件的加载和执行异步（并行）进行）

###  7.移动端项目需要注意的4个问题

#### meta中设置viewport

阻止用户手滑放大或缩小页面，需要在 index.html中添加meta元素,设置viewport。

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
```

#### CSS样式统一问题

我们需要重置页面样式，因为在不同的手机浏览器上，默认的css样式不是统一的。 解决方法：使用reset.css重置所有元素的默认样式

#### 一像素边框问题

有的手机分辨率比较高，是2倍屏或3倍屏，手机上的浏览器就会把CSS中的1像素值展示为2个或3个物理宽度 解决方法： 添加一个border.css库，将利用**scroll缩放的原理**将边框重置。当我们需要使用一像素边框时只需要在标签上添加对应类名，如设置底部一像素边框就在标签上加入"border-bottom"的class名

#### 300毫秒点击延迟问题

在移动端开发中，某些机型上使用click事件会延迟300ms才执行，这样影响了用户体验。 解决方法： 引入[fastclick.js](https://www.jianshu.com/p/05b142d84780)。

###  8.Doctype 作用？标准模式与兼容模式各有什么区别?

DOCTYPE是用来声明文档类型和DTD规范的。
`<!DOCTYPE html>`声明位于HTML文档中的第一行，不是一个HTML标签，处于 html 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。

标准模式的排版 和 JS 运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

在HTML4.01中<!doctype>声明指向一个DTD，由于HTML4.01基于SGML，所以DTD指定了标记规则以保证浏览器正确渲染内容
HTML5不基于SGML，所以不用指定DTD

###  9.canvas和svg的区别

canvas是html5提供的新元素<canvas\>，而svg存在的历史要比canvas久远，已经有十几年了。svg并不是html5专有的标签，最初svg是用xml技术（超文本扩展语言，可以自定义标签或属性）描述二维图形的语言。在H5中看似canvas与svg很像，但是，他们有巨大的差别。

首先，从它们的功能上来讲，canvas可以看做是一个画布。，其绘制出来的图形为**标量图**，因此，可以在canvas中引入jpg或png这类格式的图片，在实际开发中，大型的网络**游戏**都是用canvas画布做出来的，并且canvas的技术现在已经相当的成熟。另外，我们喜欢用canvas来做一些统计用的图表，如柱状图曲线图或饼状图等。
而svg，所绘制的图形为**矢量图**，所以其用法上受到了限制。因为只能绘制矢量图，所以svg中不能引入普通的图片，因为矢量图的不会失真的效果，在项目中我们会用来**做小图标**。但是由于其本质为矢量图，可以被无限放大而不会失真，这很适合被用来做地图，而百度地图就是用svg技术做出来的。

另外从技术方面来讲canvas里面绘制的图形不能被引擎抓取，如我们要让canvas里面的一个图片跟随鼠标事件: canvas.onmouseover=function(){}。而svg里面的图形可以被引擎抓取，支持事件的绑定。另外canvas中我们绘制图形通常是通过javascript来实现，svg更多的是通过标签来来实现，如在svg中绘制正矩形形就要用`<rect>`，这里我们不能用属性style="width:XXX;height:XXX;"来定义。

###  10.页面导入样式时，使用 link 和@import 有什么区别？
```css
<style>
    @import url(style.css);
</style>
```
- link 属于 XHTML 标签，除了加载 CSS 外，还能用于定义 RSS, 定义 rel 连接属性等作用；而@import 是 CSS 提供的，只能用于加载 CSS;
- 页面被加载的时，link 会同时被加载，而@import 引用的 CSS 会等到页面被加载完再加载;
- import 是 CSS2.1 提出的，只在 IE5 以上才能被识别，而 link 是 XHTML 标签，无兼容问题;
- link 支持使用 js 控制 DOM 去改变样式，而@import 不支持;



 **link 与 @import 的区别**

- link 是 HTML 方式， @import 是 CSS 方式
- link 最大限度支持并行下载，@import 过多嵌套导致串行下载，出现 FOUC
- link 可以通过 rel="alternate stylesheet" 指定候选样式
- 浏览器对 link 支持早于@import ，可以使用 @import 对老浏览器隐藏样式
- @import 必须在样式规则之前，可以在 css 文件中引用其他文件
- 总体来说：link 优于@import




link属于XHTML标签，@import完全是CSS提供的一种方式,只能加载CSS


加载顺序的差别，当一个页面被加载的时候，link引用的CSS会同时被加载，而@import引用的CSS 会等到页面全部被下载完再被加载

兼容性的差别。由于@import是CSS2.1提出的所以老的浏览器不支持，而link标签无此问题

当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的

###  `11`.HTML5变化

- HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等。
  功能的增加：

  - 绘画 canvas
  - 用于媒介播放的 video 和 audio 元素
  - 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失
  - sessionStorage 的数据在浏览器关闭后自动删除
  - 语意化更好的内容元素，比如 article、footer、header、nav、section
  - 表单控件，calendar、date、time、email、url、search
  - 新的技术 webworker, websocket, Geolocation

- 移除的元素：

  - 纯表现的元素：basefont，big，center，font, s，strike，tt，u;
  - 对可用性产生负面影响的元素：frame，frameset，noframes；

- 支持 HTML5 新标签：

  - IE8/IE7/IE6 支持通过 document.createElement 方法产生的标签，

  - 可以利用这一特性让这些浏览器支持 HTML5 新标签，

  - 浏览器支持新标签后，还需要添加标签默认的样式。

  - 当然也可以直接使用成熟的框架、比如 html5shim;

    ```html
    <!--[if lt IE 9]>
      <script>
        src = 'http://html5shim.googlecode.com/svn/trunk/html5.js'
      </script>
    <![endif]-->
    ```

- 如何区分 HTML5： DOCTYPE 声明\新增的结构元素\功能元素



### 12.HTML5 的离线储存怎么使用，工作原理能不能解释一下？

在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

原理：HTML5 的离线存储是基于一个新建的.appcache 文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

如何使用：

1. 页面头部像下面一样加入一个 manifest 的属性；
2. 在 cache.manifest 文件的编写离线存储的资源

```html
CACHE MANIFEST
#v1.0

CACHE:
js/app.js
css/style.css

NETWORK:
assets/logo.png

FALLBACK:
/html5/ /404.html
```

### 13.浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢？

- 在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问 app，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过 app 并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。
- 离线的情况下，浏览器就直接使用离线存储的资源。

在离线状态时，操作 window.applicationCache 进行需求实现。

### 14.其他

- **src与href的区别**

  区别：`src` 用于替代这个元素，而 `href` 用于建立这个标签与外部资源之间的关系

  - `<link href="style.css" rel="stylesheet" />`浏览器加载到这里的时候，html 的渲染和解析不会暂停，css的加载是同步进行的。
  - `<script src ="srcipt.js "></script>` 当浏览器解析到这句代码的时候，页面的解析和渲染加载都会暂停，直到浏览器拿到并执行完这个 js 文件。
