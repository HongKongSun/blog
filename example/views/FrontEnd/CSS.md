---
title: CSS
date: 
tags:
 - CSS
categories:
 - FrontEnd
---

### `1`.必考：两种盒模型分别说一下

css盒模型本质上是一个盒子，封装周围的HTML元素，它包括：外边距（margin）、边框（border）、内边距（padding）、实际内容（content）四个属性。他在不同浏览器上的表现也有所不同，主要分为两种：W3C盒子模型(标准盒模型)和IE盒子模型(怪异盒模型)。

box-sizing 属性允许您以特定的方式定义匹配某个区域的特定元素。

Box-sizing: content-box;//宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框。这个是默认属性，如果用属性描述：width=content

box-sizing: border-box;// 为元素设定的宽度和高度决定了元素的边框盒。就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。width=border + padding + content + margin

box-sizing: inherit;// 规定应从父元素继承 box-sizing 属性的值。

即box-sizing属性可以指定盒子模型种类，content-box指定盒子模型为W3C（标准盒模型），border-box为IE盒子模型（怪异盒模型）。

### `2`.垂直居中

#### 1.被居中元素宽高固定

1. 绝对定位，top和left 为 50%， margin的left和top为自身宽高一半

```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -9rem;
  margin-top: -5rem;
}
```

2. 绝对定位，top和lefe为父元素一半剪自身一半

```css
.center {
  position: absolute;
  top: calc(50% - 5em);
  left: calc(50% - 9em);
}
```

#### 2.被居中元素宽高不定

3. 使用CSS3 的 `transform`将位置在中心点平移自身宽高一半

```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

4. 使用flex布局居中

```css
.wrapper {
  display: flex;
}
.center {
  margin: auto;
}
```

5. flex布局，父元素指定子元素居中。

```css
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

#### 3.在浏览器窗口中居中

基于视口的垂直居中。不要求原生有固定的宽高，但是这种居中是在整个页面窗口内居中，不是基于父元素

```css
.center{
  margin: 50vh auto;
  transform: translateY(-50%);
}
```

### `3`.必考：flex布局怎么用，常用属性有哪些？

1. 定义：Flex 能简单、完整、响应式的实现各种页面布局。能为盒模型提供最大的灵活性。任何一个元素都可以使用弹性布局，行内元素也可以 `display: inline-flex`  。注意：子元素设为 Flex 后，子元素的 float、clear、vertical-align 属性将失效。

2. 基本概念：采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

   项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

3. 容器的属性：

   - flex-direction ：决定主轴的方向，也就是items的方向
     - row（默认值）：主轴为水平方向，起点在左端。
     - row-reverse：主轴为水平方向，起点在右端。
     - column：主轴为垂直方向，起点在上沿。
     - column-reverse：主轴为垂直方向，起点在下沿。
   - flex-wrap：默认 items 都排在一条线（又称"轴线"）上。此属性定义如果一条轴线排不下，如何换行。 
     - nowrap（默认）：不换行。
     - wrap：换行，第一行在上方。
     - wrap-reverse：换行，第一行在下方。
   - flex-flow：flex-direction 和 flex-wrap的简写，默认值是 row nowrap
   - justify-content：定义了项目在主轴上的对齐方式。具体的对齐方式与轴的方向有关，假设从左到右
     - flex-start（默认值）：左对齐
     - flex-end：右对齐
     - center： 居中
     - space-between：两端对齐，项目之间的间隔都相等。
     - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
   - align-items：定义项目在交叉轴上如何对齐。具体的对齐方式与交叉轴的方向有关，假设轴从上到下。
     - flex-start：交叉轴的起点对齐。
     - flex-end：交叉轴的终点对齐。
     - center：交叉轴的中点对齐。
     - baseline: 项目的第一行文字的基线对齐。
     - stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
   - align-content：定义了多根轴线的对齐方式。如果项目只有一条，该属性不生效。
     - flex-start：与交叉轴的起点对齐。
     - flex-end：与交叉轴的终点对齐。
     - center：与交叉轴的中点对齐。
     - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
     - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
     - stretch（默认值）：轴线占满整个交叉轴。

4. 项目的属性：

   - order：定义项目的排列顺序。数值越小，排列越靠前，默认为0。

   - flex-grow：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

     - 如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有）。
     - 如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

   - flex-shrink：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

     - 如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。
     - 如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小
     - 负值对该属性无效。

   - flex-basis：定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

   - flex：是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

     - 该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。
     - 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值

   - align-self：允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

     ```css
     .item {
       align-self: auto | flex-start | flex-end | center | baseline | stretch;
     }
     ```

     该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

5. 特性与应用场景：
   - 可以在垂直或者水平方向以任意一种对齐方式进行样式布局
   - 可以在单一轴线上布局也可以在多行内布局
   - 随可用空间的变化进行响应式布局（能够调整其子元素的宽度或者高度以使其能在不同分辨率的屏幕下能用最好的方式去填充可用空间）
   - Flexbox适用于包含有多个元素的盒子的样式
   - Flexbox适用于在子元素的尺寸未知或者动态的情况下，对子元素的对齐方式、排列方式以及排序顺序进行控制展示
   - [应用实例](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

### `4`.必考：BFC是什么

1. 定义：块格式化上下文（Block Formatting Context，BFC） 是 Web 页面的可视化 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。事实上，BFC 的目的是**形成一个相对于外界完全独立的空间，让内部的子元素不会影响到外部的元素。**

2. 那么为什么会出现 BFC 呢？

   相信做过前端开发的同学都遇到过进行页面布局的时候，应该都有遇到过以下情况：

   - 这个元素高度怎么没了？
   - 这两栏布局怎么没法自适应？
   - 这两个元素的间距怎么有点奇怪的样子？

   为什么会出现上面的情况呢？

   究其原因就是因为元素之间相互的影响，导致了预料之外的情况。

   那么结合 BFC 的特性，答案就很明了了：BFC 是为了解决元素之间相互影响的问题的。所以 BFC 的功能是形成一个相对于外界独立的空间，让内部的子元素不会影响到外部元素。

3. 那么怎么创建一个 BFC 呢？

   当然，可以参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)，但这实在是太难记了，通常我们只需要记住下面六种情况即可：

   - float 不为 none
   - position 为 absolute 或 fixed
   - overflow 不为 visible
   - display 为 inline-block 或 table-cell
   - display 为 flex/inline-flex 的直接子元素
   - display 为 grid/inline-grid 的直接子元素

4. 应用场景

   - 父元素高度坍塌

     我们知道，如果一个父元素里的子元素一旦设置了浮动，那么父元素就无法检测到子元素的高度，那么如果父元素里的所有子元素都浮动起来的话，父元素的高度就无法被子元素撑开，会塌陷下去，这个现象称为父元素高度塌陷。

     显然，这并不是我们希望见到的情况，而通过 BFC 则能很好的解决这个问题：

     我们给父元素添加 `overflow: hidden`，

     事实上，既然我们已经知道了父元素为什么塌陷，对于这个问题自然会有其他的解决方案：清除浮动的方法

   - 自适应布局

     在日常的开发中，两栏自适应布局是非常常见的，通常一边固定宽度，而另一边则随窗口自适应：

     

     ![gif-01](https://user-gold-cdn.xitu.io/2020/4/10/17163601c7ff64ab?imageslim)

     

     对于上图，我们的实现通常是让左侧浮动起来，利用块会自动占满整个宽度的特性，实现右侧自适应。不过如果右侧高度大于了左侧，则会出现如下的尴尬情况：左下方出现蓝色

     这个时候，利用 BFC，也能很好的解决问题：

     同上一个场景，我们知道了出现问题地原因，那么通过别的方案，自然也能解决问题，比如设定一个安全的 margin-left：

     ```css
     :root {
       --safe-margin: 100px;
     }
     .left {
       width: var(--safe-margin);
       height: 50vh;
       background-color: deeppink;
       float: left;
     }
     .right {
       margin-left: var(--safe-margin);
       height: 100vh;
       background-color: deepskyblue;
     }
     复制代码
     ```

   - 外边距重叠（边界折叠）

     还记得[上上集](https://juejin.im/editor/posts/5e8c3db06fb9a03c8c040d51)提到的边界折叠吗？

     那里主要讲了父元素和子元素的重叠，这里讲一下兄弟之间的重叠。

     ```css
     .one {
       height: 100px;
       margin-bottom: 100px;
       background-color: deepskyblue;
     }
     .two {
       height: 100px;
       margin-top: 100px;
       background-color: deeppink;
     }
     复制代码
     ```

     知道边界折叠现象的我们应该清楚，这里两个元素之间的 margin 并不是 `(100 + 100 = 200)px`，而是取其中的大者（两者一样大）的 `100px`：

     对于这个问题，我们同样可以通过 BFC 来解决：

     ```html
     <style>
     * {
       margin: 0;
       padding: 0;
     }
     .one {
       height: 100px;
       margin-bottom: 100px;
       background-color: deepskyblue;
     }
     
     .twp-wrap {
       overflow: hidden;
     }
     .two {
       height: 100px;
       margin-top: 100px;
       background-color: deeppink;
     }
     </style>
     <body>
     <div class="one"></div>
     <div class="twp-wrap">
       <div class="two"></div>
     </div>
     </body>
     复制代码
     ```

     

### `5`.CSS选择器的优先级

#### 什么是选择器优先级（Specificity）

> 浏览器通过**优先级**来判断哪一些属性值与一个元素最为相关，从而在该元素上应用这些属性值。优先级是基于不同种类[选择器](https://developer.mozilla.org/en/CSS/CSS_Reference#Selectors)组成的匹配规则。



#### 优先级的计算规则

相信每位写过CSS的朋友都知道，CSS选择器的优先级关系是:

> 内联 > ID选择器 > 类选择器 > 标签选择器。

优先级是由 `A` 、`B`、`C`、`D` 的值来决定的，其中它们的值计算规则如下：

1. 如果存在内联样式，那么 `A = 1`, 否则 `A = 0`;
2. `B` 的值等于 `ID选择器` 出现的次数;
3. `C` 的值等于 `类选择器` 和 `属性选择器` 和 `伪类` 出现的总次数;
4. `D` 的值等于 `标签选择器` 和 `伪元素` 出现的总次数 。

这样子直接看好像也还是很明白 ，那先上个例子：

```
#nav-global > ul > li > a.nav-link
```

套用上面的算法，依次求出 `A` `B` `C` `D` 的值：

1. 因为没有内联样式 ，所以 `A = 0`;
2. ID选择器总共出现了1次， `B = 1`;
3. 类选择器出现了1次， 属性选择器出现了0次，伪类选择器出现0次，所以 `C = (1 + 0 + 0) = 1`；
4. 标签选择器出现了3次， 伪元素出现了0次，所以 `D = (3 + 0) = 3`;

上面算出的`A` 、 `B`、`C`、`D` 可以简记作：`(0, 1, 1, 3)`。



**比较规则是: 从左往右依次进行比较 ，较大者胜出，如果相等，则继续往右移动一位进行比较 。如果4位全部相等，则后面的会覆盖前面的**



#### 优先级的特殊情况

经过上面的优先级计算规则，我们可以知道内联样式的优先级是最高的，但是外部样式有没有什么办法覆盖内联样式呢？有的，那就要 `!important` 出马了。因为一般情况下，很少会使用内联样式 ，所以 `!important` 也很少会用到！如果不是为了要覆盖内联样式，建议尽量不要使用 `!important` 。、

那可能有人会想，那如果我内联样式用了 `!important`，是不是外部样式就没有办法了呢？比如下面的代码：

- HTML:

```html
.app {
	color: 0f0!important;
}


<div class="app" style="color:#f00!important">666</div>
```

是的，你赢了，这时候内联样式已经强大到不管你外部样式怎么写都无法覆盖它了。这种情况在实际代码中是要杜绝的！记住，千万不要在内联样式中使用 `!important`

最后 ， `!important` 真的是的无法超越的王者吗？其实不是的，一些情况，我们可以超越 `!important`, 请看下面的例子：

```html
.box {
	max-width: 100px;
}

<div class="box" style="background: #f00; width: 300px!important;">我的宽度是多少呢？？<div>
```

这时候 `.box` 的宽度只有 `100px` , 而不是 `300px`, 可见，`max-width` 可以超越 `width!important`!但是，这实际上不是优先级的问题，因为优先级是比较相同属性的，而 `max-width` 和 `width` 是两个不同的属性。之所以举这个例子，是要告诉大家，有时候不管怎么设置容器的 `width` 都不生效，检查一下是不是有人写了 `max-width` 坑了你哈。

### 6.清除浮动说一下

- 浮动元素引起的问题和解决办法？
  - 1.由于浮动元素已脱离文档流，所以父元素无法被撑开，影响与父级元素同级的元素。（父亲）
  - 2.与浮动元素同级的非浮动元素（内联元素）会跟随其后，也是由于浮动元素脱离文档流，不占据文档流中额位置。（同级在后）
  - 3.如果该浮动元素不是同级第一个浮动的元素，则它之前的元素也应该浮动，否则容易影响页面的结构显示。（同级在前）

常用清除浮动方法的一般为三种`.clearfix`, `clear:both`,`overflow:hidden`;

比较好是 `.clearfix`,伪元素万金油版本

```css    
  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }


<!--
为毛没有 zoom ,_height 这些,IE6,7这类需要 csshack 不再我们考虑之内了
.clearfix 还有另外一种写法,
-->

.clearfix:before, .clearfix:after {
	content:"";
	display:table;
}
.clearfix:after{
	clear:both;
	overflow:hidden;
}
.clearfix{
    zoom:1;
}

<!--
用display:table 是为了避免外边距margin重叠导致的margin塌陷,
内部元素默认会成为 table-cell 单元格的形式
-->

```

`clear:both`:若是用在同一个容器内相邻元素上,那是贼好的,有时候在容器外就有些问题了,比如相邻容器的包裹层元素塌陷

`overflow:hidden`:这种若是用在同个容器内,可以形成 `BFC`避免浮动造成的元素塌陷

###  7.CSS3新特性

https://juejin.im/entry/595f1e3c5188250d914dd53c

#### 1.伪类、伪元素

- CSS伪类：用于向某些选择器添加特殊的效果。（**l**o**v**e **ha** ）
  - :hover	将样式添加到鼠标悬浮的元素
  
  - :active	将样式添加到被激活的元素
  
  - :focus	将样式添加到获得焦点的元素
  
  - :link	将样式添加到未被访问过的链接
  
  - :visited	将样式添加到被访问过的链接
  
  - :first-child	将样式添加到元素的第一个子元素
  
  - :lang	定义指定的元素中使用的语言
  
  - `插曲：`**a 标签上四个伪类的使用顺序是怎么样的？**
  
    link > visited > hover > active
    简称 lvha(love-ha)
  
    伪类的特殊性（应用优先级）是同样的，所以后出现的伪类会覆盖先出现的伪类（同时激活） 
  
    在这里，比如把hover放在active后面，那么实际你在激活（active）链接的时候就触发了hover伪类，hover在后面覆盖了active的颜色，所以始终无法看到active的颜色 
- CSS伪元素：用于将特殊的效果添加到某些选择器。伪元素代表了某个元素的子元素，这个子元素虽然在逻辑上存在，但却并不实际存在于文档树中。
  - ::first-letter  将样式添加到文本的首字母
  - ::first-line	将样式添加到文本的首行
  - ::before	在某元素之前插入某些内容
  - ::after	在某元素之后插入某些内容
- 伪类的效果可以通过添加一个实际的类来达到，而伪元素的效果则需要通过添加一个实际的元素才能达到，这也是为什么他们一个称为伪类，一个称为伪元素的原因。CSS3为了区分伪类和伪元素，已经明确规定了伪类用一个冒号来表示，而伪元素则用两个冒号来表示。但因为兼容性的问题，所以现在大部分还是统一的单冒号，但是抛开兼容性的问题，我们在书写时应该尽可能养成好习惯，区分两者。单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。伪元素由双冒号和伪元素名称组成。不过浏览器需要同时支持旧的已经存在的伪元素写法，比如:first-line、:first-letter、:before、:after等，而新的在CSS3中引入的伪元素则不允许再支持旧的单冒号的写法。
- 新增的伪类：p:nth-child(n)等一类

#### 2.flex方面可谈

- [Flex布局](#`3`.必考：flex布局怎么用，常用属性有哪些？)

#### 3.媒体查询可谈

- 媒体查询 @media (max-width: 480px) {.box: {column-count: 1;}}

  

#### 4.动画方面可谈

- 颜色透明度 color: rgba(255, 0, 0, 0.75);

- 圆角 border-radius: 5px;

- 渐变 background:linear-gradient(red, green, blue);

- 阴影 box-shadow:3px 3px 3px rgba(0, 64, 128, 0.3);

- 倒影 box-reflect: below 2px;

- 文字装饰 text-stroke-color: red;

- 文字溢出 text-overflow:ellipsis;

- 背景效果 background-size: 100px 100px;

- 边框效果 border-image:url(bt_blue.png) 0 10;

- 平滑过渡 transition: all .3s ease-in .1s;

- 动画 @keyframes anim-1 {50% {border-radius: 50%;}} animation: anim-1 1s;

- 变形 transform
  - 旋转 transform: rotate(20deg);
  - 倾斜 transform: skew(150deg, -10deg);
  - 位移 transform: translate(20px, 20px);
  - 缩放 transform: scale(.5);
  
- `插曲：`**CSS 3 如何实现旋转图片（transform: rotate）**

  - **2D 转换**
    CSS3 转换可以可以对元素进行移动、缩放、转动、拉长或拉伸。
    transform属性，适用于2D或3D转换的元素
    transform-origin属性，设置转化元素位置

  1.translate()方法，根据左(X轴)和顶部(Y轴)位置给定的参数，从当前元素位置移动。　

  ```
  div {
  　　transform: translate(50px,100px);
  　　-webkit-transform: translate(50px,100px); /* Safari and Chrome */
  }
  ```

  2.rotate()方法，在一个给定度数顺时针旋转的元素。负值是允许的，这样是元素逆时针旋转。

  ```
  div {
  　　transform: rotate(30deg);
  　　-webkit-transform: rotate(30deg); /* Safari and Chrome */
  }
  ```

  3.scale()方法，该元素增加或减少的大小，取决于宽度（X轴）和高度（Y轴）的参数

  ```
  div {
      -webkit-transform: scale(2,3); /* Safari /
      transform: scale(2,3); / 标准语法 */
  }
  ```

  4.skew( [,])包含两个参数值，分别表示X轴和Y轴倾斜的角度，如果第二个参数为空，则默认为0，参数为负表示向相反方向倾斜。

  ```
  div {
      transform: skew(30deg,20deg);
      -ms-transform: skew(30deg,20deg); /* IE 9 /
      -webkit-transform: skew(30deg,20deg); / Safari and Chrome */
  }
  ```

   

  - **3D 转换**

   

  ```
  translate3d(x,y,z)    定义 3D 转化。
  translateX(x)    定义 3D 转化，仅使用用于 X 轴的值。
  translateY(y)    定义 3D 转化，仅使用用于 Y 轴的值。
  translateZ(z)    定义 3D 转化，仅使用用于 Z 轴的值。
  
  scale3d(x,y,z)    定义 3D 缩放转换。
  scaleX(x)    定义 3D 缩放转换，通过给定一个 X 轴的值。
  scaleY(y)    定义 3D 缩放转换，通过给定一个 Y 轴的值。
  scaleZ(z)    定义 3D 缩放转换，通过给定一个 Z 轴的值。
  
  rotate3d(x,y,z,angle)    定义 3D 旋转。
  rotateX(angle)    定义沿 X 轴的 3D 旋转。
  rotateY(angle)    定义沿 Y 轴的 3D 旋转。
  rotateZ(angle)    定义沿 Z 轴的 3D 旋转。
  
  perspective(n)    定义 3D 转换元素的透视视图。
  ```

  

#### 5.边框

CSS3新增了三个边框属性，分别是border-radius、box-shadow和border-image。border-radius可以创建圆角边框，box-shadow可以为元素添加阴影，border-image可以使用图片来绘制边框。IE9+支持border-radius和box-shadow属性。Firefox、Chrome以及Safari支持所有新的边框属性。

#### 6. 背景

CSS3新增了几个关于背景的属性，分别是background-clip、background-origin、background-size和background-break。

- background-clip

  background-clip属性用于确定背景画区，有以下几种可能的属性：

  - background-clip: border-box; 背景从border开始显示
  - background-clip: padding-box; 背景从padding开始显示
  - background-clip: content-box; 背景显content区域开始显示
  - background-clip: no-clip; 默认属性，等同于border-box

通常情况，背景都是覆盖整个元素的，利用这个属性可以设定背景颜色或图片的覆盖范围。

- background-origin

  background-clip属性用于确定背景的位置，它通常与background-position联合使用，可以从 border、padding、content来计算background-position（就像background-clip）。

  - background-origin: border-box; 从border开始计算background-position
  - background-origin: padding-box; 从padding开始计算background-position
  - background-origin: content-box; 从content开始计算background-position

- background-size

  background-size属性常用来调整背景图片的大小，主要用于设定图片本身。有以下可能的属性：

  - background-size: contain; 缩小图片以适合元素（维持像素长宽比）
  - background-size: cover; 扩展元素以填补元素（维持像素长宽比）
  - background-size: 100px 100px; 缩小图片至指定的大小
  - background-size: 50% 100%; 缩小图片至指定的大小，百分比是相对包 含元素的尺寸

- background-break

  CSS3中，元素可以被分成几个独立的盒子（如使内联元素span跨越多行），background-break 属性用来控制背景怎样在这些不同的盒子中显示。

  - background-break: continuous; 默认值。忽略盒之间的距离（也就是像元素没有分成多个盒子，依然是一个整体一样）
  - background-break: bounding-box; 把盒之间的距离计算在内；
  - background-break: each-box; 为每个盒子单独重绘背景。

#### 7.文字效果

- word-wrap

  CSS3中，word-wrap属性允许您允许文本强制文本进行换行，即这意味着会对单词进行拆分。所有主流浏览器都支持 word-wrap 属性。`p { word-wrap:break-word;}`

- text-overflow

  它与word-wrap是协同工作的，word-wrap设置或检索当当前行超过指定容器的边界时是否断开转行，而 text-overflow则设置或检索当当前行超过指定容器的边界时如何显示。对于“text-overflow”属性，有“clip”和“ellipsis”两种可供选择。

- text-shadow

  CSS3中，text-shadow可向文本应用阴影。能够规定水平阴影、垂直阴影、模糊距离，以及阴影的颜色。

  `h1{ text-shadow: 5px 5px 5px #FF0000;}`

- text-decoration

  CSS3里面开始支持对文字的更深层次的渲染，具体有三个属性可供设置：

  - text-fill-color: 设置文字内部填充颜色
  - text-stroke-color: 设置文字边界填充颜色
  - text-stroke-width: 设置文字边界宽度

###  8.CSS实现隐藏页面的方式

- opacity：设置透明度，值为0-1。为0则页面上不显示，但是元素还在那个位置,依然可以网页交互,单纯是看不到而已。不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

- display:设置不显示和显示。注意了，这里要强调的一点是，如果你想使他的子元素显示，用display:visible是没用的。而上面两种方式是可以使用。

- visibility: hidden 只是内容不可见

- display: none; 与 visibility: hidden; 的区别（结构、继承性、性能）

         **结构：**

  - display:none：会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击。

  - visibility: hidden：不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击。

    **继承性**

  - display: none和opacity: 0     非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。

   - visibility: hidden    继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

     **性能**

   - display:none    修改元素会造成文档回流。读屏器不会读取display: none元素内容，性能消耗较大

     - visibility:hidden     修改元素只会造成本元素的重绘,性能消耗较少。读屏器读取visibility: hidden元素内容

     - opacity: 0      修改元素会造成重绘，性能消耗较少

  相同点： 它们都能让元素不可见、他们都依然可以被 JS 所获取到

  | 区别           | display:none                                                 | visibility：hidden的                                         |
  | -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | 是否占据空间   | 不占据任何空间，在文档渲染时，该元素如同不存在（但依然存在文档对象模型树中） | 该元素空间依旧存在                                           |
  | 是否渲染       | 会触发reflow（回流），进行渲染                               | 只会触发repaint（重绘），因为没有发现位置变化，不进行渲染    |
  | 是否是继承属性 | 不是继承属性，元素及其子元素都会消失                         | 是继承属性，若子元素使用了visibility:visible，则不继承，这个子孙元素又会显现出 |

- position位置，把他绝对定位了 挪到远远地。

  


###  9.inline和inline-block的区别

#### 总体概念

1. block和inline这两个概念是简略的说法，完整确切的说应该是 block-level elements (块级元素) 和 inline elements (内联元素)。block元素通常被现实为独立的一块，会单独换一行；inline元素则前后不会产生换行，一系列inline元素都在一行内显示，直到该行排满。
2. 大体来说HTML元素各有其自身的布局级别（block元素还是inline元素）：
   - 块：nav、footer、header、h1~h6、p、form、div、ul

   - 行内：a、img、input、label、span、br
3. block元素可以包含block元素和inline元素；但inline元素只能包含inline元素。要注意的是这个是个大概的说法，每个特定的元素能包含的元素也是特定的，所以具体到个别元素上，这条规律是不适用的。比如 P 元素，只能包含inline元素，而不能包含block元素。
4. 一般来说，可以通过display:inline和display:block的设置，改变元素的布局级别。

#### block，inline和inline-block细节对比

- **display:block**

  - block元素会独占一行，多个block元素会各自新起一行。默认情况下，block元素宽度自动填满其父元素宽度。

  - block元素可以设置width,height属性。块级元素即使设置了宽度,仍然是独占一行。

  - block元素可以设置margin和padding属性。

    

  - `插曲`：**li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？(也称幽灵字符)**

    行框的排列会受到中间空白（回车\空格）等的影响，因为空格也属于字符, 这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为 0，就没有空格了

- **display:inline**

  - inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。

  - inline元素设置width,height属性无效。

  - inline元素的margin和padding属性，水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果；但竖直方向的padding-top, padding-bottom, margin-top, margin-bottom不会产生边距效果。

  - `插曲`：**图片下面有一个缝隙是因为什么**

    因为 img 也相当于一个 inline 的元素， inline 就要遵守行高的构成，它会按照base基线对齐，基线对齐的话那么它就会和底线间有一个缝隙。

    如何解决： 因为它会遵守文字对齐方案，那么就把图片的对齐方式修改为 **vertical-align: bottom**。或者让他**display: block**，这样图片虽然会换行，但是没有间隙了。

- **display:inline-block**

  - 简单来说就是将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性。

  - `插曲`：**display:inline-block 什么时候会显示间隙？(携程)**

    - 相邻的 inline-block 元素之间有换行或空格分隔的情况下会产生间距
    - 非 inline-block 水平元素设置为 inline-block 也会有水平间距
    - 可以借助 vertical-align:top; 消除垂直间隙
    - 可以在父级加 font-size：0; 在子元素里设置需要的字体大小，消除垂直间隙
    - 把 li 标签写到同一行可以消除垂直间隙，但代码可读性差

  - `插曲`：**inline-block的间隙**

    两个并列的inline-block中间会有一条裂缝，这个的原因是两个标签之间有空格，浏览器把这些空格当成文字中空格，所以这两个块中间多少有间隙。

    解决办法：

    1. 删除两个标签间的空格，但是这样html排版不好
    2. 容器元素font-size: 0 然后再在里面再重新设置字体大小

#### 补充说明

- 一般我们会用display:block，display:inline或者display:inline-block来调整元素的布局级别，其实display的参数远远不止这三种，仅仅是比较常用而已。

- IE（低版本IE）本来是不支持inline-block的，所以在IE中对内联元素使用display:inline-block，理论上IE是不识别的，但使用display:inline-block在IE下会触发layout，从而使内联元素拥有了display:inline-block属性的表象。

  

###  10.用纯 CSS 创建一个三角形的原理是什么？

把border的其他三条边设为透明
注意，这里要把 `border-width` 、`border-style`、 `border-color` 分开写。

```css
.tri {
  width: 0px;
  height: 0;
  border-style: solid;
  border-width: 100px;
  border-color: transparent transparent red transparent;
}
```



###  11.你对 line-height 是如何理解的？

- line-height 指一行字的高度，包含了字间距，实际上是下一行基线到上一行基线距离
- 如果一个标签没有定义 height 属性，那么其最终表现的高度是由 line-height 决定的
- 一个容器没有设置高度，那么撑开容器高度的是 line-height 而不是容器内的文字内容
- **把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中**
- line-height 和 height 都能撑开一个高度，height 会触发 haslayout（一个低版本IE的东西），而 line-height 不会

`插曲：`**line-height 三种赋值方式有何区别？（带单位、纯数字、百分比）**

- 带单位：px 是固定值，而 em 会参考父元素 font-size 值计算自身的行高
- 纯数字：会把比例传递给后代。例如，父级行高为 1.5，子元素字体为 18px，则子元素行高为 1.5 \* 18 = 27px
- 百分比：将计算后的值传递给后代

### 12.grid布局

#### 1.概述

网格布局（Grid）是最强大的 CSS 布局方案。

它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。

![img](https://www.wangbase.com/blogimg/asset/201903/1_bg2019032501.png)

上图这样的布局，就是 Grid 布局的拿手好戏。

Grid 布局与 [Flex 布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是**一维布局**。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是**二维布局**。Grid 布局远比 Flex 布局强大。

**基本概念：容器和项目**

采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）。

> ```markup
> <div>
> <div><p>1</p></div>
> <div><p>2</p></div>
> <div><p>3</p></div>
> </div>
> ```

上面代码中，最外层的``元素就是容器，内层的三个``元素就是项目。

Grid 布局的属性分成两类。一类定义在容器上面，称为容器属性；另一类定义在项目上面，称为项目属性。这部分先介绍容器属性。

注意：项目只能是容器的顶层子元素，不包含项目的子元素，比如上面代码的`p`元素就不是项目。Grid 布局只对项目生效。

#### 2.容器属性

##### 1.display 属性

- grid：指定一个容器采用网格布局。

- inline-grid：默认情况下，容器元素都是块级元素，但也可以设成行内元素。

- > ```css
  > div {
  > display: inline-grid;
  > }
  > ```

  上面代码指定**div**是一个行内元素，该元素内部采用网格布局。

![bg2019032505](/Users/hongkongsun/Desktop/bg2019032505.png)

上图是**display: inline-grid**的[效果](https://jsbin.com/qatitav/edit?html,css,output)。

> 注意，设为网格布局以后，容器子元素（项目）的**float、display: inline-block、display: table-cell、vertical-align和column**等设置都将失效。



---



##### 2.grid-template-columns 属性， grid-template-rows 属性       **（6个详细参数用法）**

> ```css
> .container {
> display: grid;
> grid-template-columns: 100px 100px 100px;
> grid-template-rows: 100px 100px 100px;
> }
> //还可以使用百分比
> .container {
> display: grid;
> grid-template-columns: 33.33% 33.33% 33.33%;
> grid-template-rows: 33.33% 33.33% 33.33%;
> }
> ```

容器指定了网格布局以后，接着就要划分行和列。`grid-template-columns`属性定义每一列的列宽，`grid-template-rows`属性定义每一行的行高。
- **repeat()**

有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用`repeat()`函数，简化重复的值。上面的代码用`repeat()`改写如下。

> ```css
> .container {
> display: grid;
> grid-template-columns: repeat(3, 33.33%);
> grid-template-rows: repeat(3, 33.33%);
> }
> 
> 
> //repeat()重复某种模式也是可以的
> grid-template-columns: repeat(2, 100px 20px 80px);
> //上面代码定义了6列，第一列和第四列的宽度为`100px`，第二列和第五列为`20px`，第三列和第六列为`80px`。
> ```



- **auto-fill 关键字**

有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用`auto-fill`关键字表示自动填充。

> ```css
> .container {
> display: grid;
> grid-template-columns: repeat(auto-fill, 100px);
> //表示每列宽度`100px`，然后自动填充，直到容器不能放置更多的列。
> }
> ```



- **fr 关键字**

为了方便表示比例关系，网格布局提供了`fr`关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为`1fr`和`2fr`，就表示后者是前者的两倍。

> ```css
> .container {
> display: grid;
> grid-template-columns: 1fr 1fr;
> //表示两个相同宽度的列
> }
> 
> 
> //fr可以与绝对长度的单位结合使用，这时会非常方便。
> .container {
> display: grid;
> grid-template-columns: 150px 1fr 2fr;
> //表示，第一列的宽度为150像素，第二列的宽度是第三列的一半。
> }
> 
> ```



- **minmax()**

`minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

> ```css
> grid-template-columns: 1fr 1fr minmax(100px, 1fr);
> //minmax(100px, 1fr)表示列宽不小于100px，不大于1fr。
> ```



- **auto 关键字**

`auto`关键字表示由浏览器自己决定长度。

> ```css
> grid-template-columns: 100px auto 100px;
> //第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了min-width，且这个值大于最大宽度。
> ```



- **网格线的名称**

`grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

> ```css
> .container {
> display: grid;
> grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
> grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
> }
> ```



上面代码指定网格布局为3行 x 3列，因此有4根垂直网格线和4根水平网格线。方括号里面依次是这八根线的名字。网格布局允许同一根线有多个名字，比如`[fifth-line row-5]`。

- **布局实例**

`grid-template-columns`属性对于网页布局非常有用。两栏式布局只需要一行代码。

> ```css
> .wrapper {
> display: grid;
> grid-template-columns: 70% 30%;
> //上面代码将左边栏设为70%，右边栏设为30%。
> }
> 
> //传统的十二网格布局，写起来也很容易。
> grid-template-columns: repeat(12, 1fr);
> ```

---



##### 3.grid-row-gap 属性， grid-column-gap 属性， grid-gap 属性

`grid-row-gap`属性设置行与行的间隔（行间距），`grid-column-gap`属性设置列与列的间隔（列间距）。

> ```css
> .container {
> grid-row-gap: 20px;
> grid-column-gap: 20px;
> }
> 
> //grid-gap属性是grid-column-gap和grid-row-gap的合并简写形式，语法如下。
> 
> .container {
> grid-gap: 20px 20px;//如果grid-gap省略了第二个值，浏览器认为第二个值等于第一个值。
> }
> ```



> 根据最新标准，上面三个属性名的`grid-`前缀已经删除，`grid-column-gap`和`grid-row-gap`写成`column-gap`和`row-gap`，`grid-gap`写成`gap`。



---



##### 4.grid-template-areas 属性

网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。`grid-template-areas`属性用于定义区域。

- 

> ```css
> .container {
> display: grid;
> grid-template-columns: 100px 100px 100px;
> grid-template-rows: 100px 100px 100px;
> 
> //先划分出9个单元格，然后将其定名为`a`到`i`的九个区域，分别对应这九个单元格。
> grid-template-areas: 'a b c'
>                  'd e f'
>                  'g h i';
> }
> 
> grid-template-areas: 'a a a'
>                'b b b'
>                'c c c';
> //上面代码将9个单元格分成`a`、`b`、`c`三个区域。
> 
> //布局实例
> 
> grid-template-areas: "header header header"
>                "main main sidebar"
>                "footer footer footer";
> //顶部是页眉区域header，底部是页脚区域footer，中间部分则为main和sidebar。
> 
> 
> //如果某些区域不需要利用，则使用"点"（`.`）表示。
> grid-template-areas: 'a . c'
>                'd . f'
>                'g . i';
> //上面代码中，中间一列为点，表示没有用到该单元格，或者该单元格不属于任何区域。
> ```



> 注意，区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为`区域名-start`，终止网格线自动命名为`区域名-end`。
>
> 比如，区域名为`header`，则起始位置的水平网格线和垂直网格线叫做`header-start`，终止位置的水平网格线和垂直网格线叫做`header-end`。

---



##### 5.grid-auto-flow 属性

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行。这个顺序由`grid-auto-flow`属性决定，默认值是`row`，即"先行后列"。也可以将它设成`column`，变成"先列后行"。`grid-auto-flow`属性除了设置成`row`和`column`，还可以设成`row dense`和`column dense`。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。

---



##### 6.justify-items 属性， align-items 属性， place-items 属性

`justify-items`属性设置单元格内容的水平位置（左中右），`align-items`属性设置单元格内容的垂直位置（上中下）。

这两个属性的写法完全相同，都可以取下面这些值。

> - start：对齐单元格的起始边缘。
> - end：对齐单元格的结束边缘。
> - center：单元格内部居中。
> - stretch：拉伸，占满单元格的整个宽度（默认值）。



`place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式。

> ```css
> place-items: <align-items> <justify-items>;
> //例子
> place-items: start end;//如果省略第二个值，则浏览器认为与第一个值相等。
> ```

---



##### 7. justify-content 属性， align-content 属性， place-content 属性

`justify-content`属性是整个内容区域在容器里面的水平位置（左中右），`align-content`属性是整个内容区域的垂直位置（上中下）。

> ```css
> .container {
> justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
> align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
> }
> ```

这两个属性的写法完全相同，都可以取下面这些值。

> - start - 对齐容器的起始边框。

> - end - 对齐容器的结束边框。

> - center - 容器内部居中。

> - stretch - 项目大小没有指定时，拉伸占据整个网格容器。

> - space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。

> - space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。

> - space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。



`place-content`属性是`align-content`属性和`justify-content`属性的合并简写形式。

> ```css
> place-content: <align-content> <justify-content>
> 
> //例子
> place-content: space-around space-evenly;//如果省略第二个值，浏览器就会假定第二个值等于第一个值。
> ```

---



##### 8. grid-auto-columns 属性， grid-auto-rows 属性

有时候，一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目。

`grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

> ```css
> .container {
> display: grid;
> grid-template-columns: 100px 100px 100px;
> grid-template-rows: 100px 100px 100px;
> grid-auto-rows: 50px; 
> }
> 
> //划分好的网格是3行 x 3列，但是，8号项目指定在第4行，9号项目指定在第5行。
> 
> //上面代码指定新增的行高统一为50px（原始的行高为100px）。
> ```

---



##### 9. grid-template 属性， grid 属性

`grid-template`属性是**grid-template-columns、grid-template-rows和grid-template-areas**这三个属性的合并简写形式。

`grid`属性是**grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow**这六个属性的合并简写形式。

从易读易写的角度考虑，还是建议不要合并属性.

#### 3.项目属性

##### 1. grid-column-start 属性， grid-column-end 属性， grid-row-start 属性， grid-row-end 属性

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

> - `grid-column-start`属性：左边框所在的垂直网格线
> - `grid-column-end`属性：右边框所在的垂直网格线
> - `grid-row-start`属性：上边框所在的水平网格线
> - `grid-row-end`属性：下边框所在的水平网格线

> ```css
> .item-1 {
> grid-column-start: 2;
> grid-column-end: 4;
> }
> //1号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线。
> ```

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032526.png)

上图中，只指定了1号项目的左右边框，没有指定上下边框，所以会采用默认位置，即上边框是第一根水平网格线，下边框是第二根水平网格线。

除了1号项目以外，其他项目都没有指定位置，由浏览器自动布局，这时它们的位置由容器的`grid-auto-flow`属性决定，这个属性的默认值是`row`，因此会"先行后列"进行排列。读者可以把这个属性的值分别改成`column`、`row dense`和`column dense`，看看其他项目的位置发生了怎样的变化。



> ```css
> .item-1 {
> grid-column-start: 1;
> grid-column-end: 3;
> grid-row-start: 2;
> grid-row-end: 4;
> }
> ```

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032527.png)

这四个属性的值，除了指定为第几个网格线，还可以指定为网格线的名字。

> ```css
> .item-1 {
> grid-column-start: header-start;
> grid-column-end: header-end;
> }
> ```



这四个属性的值还可以使用`span`关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。

> ```css
> .item-1 {
> grid-column-start: span 2;
> }
> //表示，1号项目的左边框距离右边框跨越2个网格。
> 
> 
> //效果与下面相同
> .item-1 {
> grid-column-end: span 2;
> }
> ```

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032528.png)

使用这四个属性，如果产生了项目的重叠，则使用`z-index`属性指定项目的重叠顺序。

---



##### 2. grid-column 属性， grid-row 属性

`grid-column`属性是`grid-column-start`和`grid-column-end`的合并简写形式，`grid-row`属性是`grid-row-start`属性和`grid-row-end`的合并简写形式。

> ```css
> .item-1 {
> grid-column: 1 / 3;
> grid-row: 1 / 2;
> }
> /* 等同于 */
> .item-1 {
> grid-column-start: 1;
> grid-column-end: 3;
> grid-row-start: 1;
> grid-row-end: 2;
> }
> ```



这两个属性之中，也可以使用`span`关键字，表示跨越多少个网格。

> ```css
> .item-1 {
> background: #b03532;
> grid-column: 1 / 3;
> grid-row: 1 / 3;
> }
> /* 等同于 */
> .item-1 {
> background: #b03532;
> grid-column: 1 / span 2;
> grid-row: 1 / span 2;
> }
> //项目item-1占据的区域，包括第一行 + 第二行、第一列 + 第二列。
> ```



![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032529.png)

斜杠以及后面的部分可以省略，默认跨越一个网格。

> ```css
> .item-1 {
> grid-column: 1;
> grid-row: 1;
> }
> //项目item-1占据左上角第一个网格
> ```

---



##### 3. grid-area 属性

`grid-area`属性指定项目放在哪一个区域。

> ```css
> .item-1 {
> grid-area: e;
> }
> //1号项目位于e区域
> ```

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032530.png)

`grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置。

> ```css
> .item {
> grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
> }
> 
> //例子
> .item-1 {
> grid-area: 1 / 1 / 3 / 3;
> }
> ```

---



##### 4. justify-self 属性， align-self 属性， place-self 属性

`justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。

`align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。

这两个属性都可以取下面四个值。

> - start：对齐单元格的起始边缘。
> - end：对齐单元格的结束边缘。
> - center：单元格内部居中。
> - stretch：拉伸，占满单元格的整个宽度（默认值）。

下面是`justify-self: start`的例子。

> ```css
> .item-1  {
> justify-self: start;
> }
> ```

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032532.png)

`place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式。

> ```css
> place-self: <align-self> <justify-self>;
> 
> //例子
> place-self: center center;
> 
> //如果省略第二个值，`place-self`属性会认为这两个值相等。
> ```

---



###  13.媒体查询的原理是什么？

**❤以某个网页的响应式布局为例**

**结构:@media 设备类型 and (设备特性)｛样式代码｝**



```css
/*媒体查询*/
/*当页面大于1200px 时，大屏幕，主要是PC 端*/
@media (min-width: 1200px) {
    
}
/*在992 和1199 像素之间的屏幕里，中等屏幕，分辨率低的PC*/
@media (min-width: 992px) and (max-width: 1199px) {
    #adver .center {
        width: 50%;
        margin: -10px 0 0 -25%;
    }
    main .center h2 {
        font-size: 40px;
    }
}
/*在768 和991 像素之间的屏幕里，小屏幕，主要是PAD*/
@media (min-width: 768px) and (max-width: 991px) {
    #adver .center {
        width: 60%;
        margin: -10px 0 0 -30%;
    }
    #adver .search, #adver .button {
        font-size: 20px;
    }
    main .center h2 {
        font-size: 35px;
    }
}
/*在480 和767 像素之间的屏幕里，超小屏幕，主要是手机*/
@media (min-width: 480px) and (max-width: 767px) {
    header, header .center, header .link {
        height: 45px;
    }
    header .logo, .sm-hidden,.sidebar,.md-hidden {
        display: none;
    }
    header .link {
        width: 100%;
        line-height: 45px;
    }
    #adver {
        padding: 45px 0 0 0;
    }
    #adver .center {
        width: 70%;
        height: 53px;
        margin: -10px 0 0 -35%;
    }
    #adver .search, #adver .button {
        height: 45px;
        font-size: 18px;
    }
    .sm-visible {
        display: block;
    }
    main .center h2 {
        font-size: 30px;
    }
    main .center p {
        font-size: 15px;
    }
    main figure {
        width: 49.2%;
    }
}
/*在小于480 像素的屏幕，微小屏幕，更低分辨率的手机*/
@media (max-width: 479px) {
    header, header .center, header .link {
        height: 45px;
    }
    header .logo, .xs-hidden, .sm-hidden, .sidebar, .md-hidden  {
        display: none;
    }
    header .link {
        width: 100%;
        line-height: 45px;
    }
    header .link li {
        width: 25%;


    }
    #adver {
        padding: 45px 0 0 0;
    }
    #adver .center {
        width: 80%;
        height: 48px;
        margin: -10px 0 0 -40%;
    }
    #adver .search, #adver .button {
        height: 40px;
        font-size: 16px;
    }
    .sm-visible {
        display: block;
    }
    footer .bottom, footer .version {
        font-size: 13px;
    }
    main .center h2 {
        font-size: 26px;
    }
    main .center p {
        font-size: 14px;
    }
    main figure {
        width: 99%;
    }
}
```

**响应式布局的原理就是在不同的窗口大小下显示不同的结构和样式。**



- ❤最后再补充一点常用的设备类型（媒体类型）
   1.all (所有的设备)
   2.screen (电脑显示器)
   3.print  (打印用纸或打印预览图)
   4.handheld (便携设备)
   5.tv (电视机类型的设备)

- 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的 IE？
  - 响应式设计就是网站能够兼容多个不同大小的终端，而不是为每个终端做一个特定的版本
  - 基本原理是利用 CSS3 媒体查询，为不同尺寸的设备适配不同样式
  - 对于低版本的 IE，可采用 JS 获取屏幕宽度，然后通过监听window.onresize 方法来实现兼容





### `14`.静态、流式、自适应、响应式、弹性布局

#### 1.静态布局（static layout）

　　即传统Web设计，网页上的所有元素的尺寸一律使用px作为单位。

- **布局特点**

　　不管浏览器尺寸具体是多少，网页布局始终按照最初写代码时的布局来显示。常规的pc的网站都是静态（定宽度）布局的，也就是设置了min-width，这样的话，如果小于这个宽度就会出现滚动条，如果大于这个宽度则内容居中外加背景，这种设计常见于pc端。

 

- **设计方法**

　　**PC：**居中布局，所有样式使用绝对宽度/高度(px)，设计一个Layout，在屏幕宽高有调整时，使用横向和竖向的滚动条来查阅被遮掩部分；
　　**移动设备：**另外建立移动网站，单独设计一个布局，使用不同的域名如wap.或m.。

 

**优点**：这种布局方式对设计师和CSS编写者来说都是最简单的，亦没有兼容性问题。

**缺点**：显而易见，即不能根据用户的屏幕尺寸做出不同的表现。当前，大部分门户网站、大部分企业的PC宣传站点都采用了这种布局方式。固定像素尺寸的网页是匹配固定像素尺寸显示器的最简单办法。但这种方法不是一种完全兼容未来网页的制作方法，我们需要一些适应未知设备的方法。

 

 

#### 2.流式布局（Liquid Layout）

　　流式布局（Liquid）的特点（也叫"Fluid") 是页面元素的宽度按照屏幕分辨率进行适配调整，但整体布局不变。代表作栅栏系统（网格系统）。

　　网页中主要的划分区域的**尺寸使用百分数**（搭配min-*、max-*属性使用），例如，设置网页主体的宽度为80%，min-width为960px。图片也作类似处理（width:100%, max-width一般设定为图片本身的尺寸，防止被拉伸而失真）。

- **布局特点**

　　屏幕分辨率变化时，页面里元素的大小会变化而但布局不变。【这就导致如果屏幕太大或者太小都会导致元素无法正常显示。

 

- **设计方法**

　　**使用%百分比定义宽度，高度大都是用px来固定住**，可以根据可视区域 (viewport) 和父元素的实时尺寸进行调整，尽可能的适应各种分辨率。往往配合 max-width/min-width 等属性控制尺寸流动范围以免过大或者过小影响阅读。

 

**这种布局方式在Web前端开发的早期历史上，用来应对不同尺寸的PC屏幕**（那时屏幕尺寸的差异不会太大），**在当今的移动端开发也是常用布局方式**，但**缺点明显**：**主要的问题**是如果屏幕尺度跨度太大，那么在相对其原始设计而言过小或过大的屏幕上不能正常显示。因为宽度使用%百分比定义，但是高度和文字大小等大都是用px来固定，所以在大屏幕的手机下显示效果会变成有些页面元素宽度被拉的很长，但是高度、文字大小还是和原来一样（即，这些东西无法变得“流式”），显示非常不协调

 

 

#### 3.自适应布局（Adaptive Layout）

　　自适应布局的特点是分别为不同的屏幕分辨率定义布局，即创建多个静态布局，每个静态布局对应一个屏幕分辨率范围。改变屏幕分辨率可以切换不同的静态局部（页面元素位置发生改变），但在每个静态布局中，页面元素不随窗口大小的调整发生变化。可以把自适应布局看作是静态布局的一个系列。

- **布局特点**

　　屏幕分辨率变化时，页面里面元素的位置会变化而大小不会变化。

- **设计方法**

　　**使用 @media 媒体查询给不同尺寸和介质的设备切换不同的样式。在优秀的响应范围设计下可以给适配范围内的设备最好的体验，在同一个设备下实际还是固定的布局**。

 

 

 

#### 4.响应式布局（Responsive Layout）

　　随着CSS3出现了**媒体查询**技术，又出现了**响应式设计**的概念。响应式设计的目标是确保一个页面在所有终端上（各种尺寸的PC、手机、手表、冰箱的Web浏览器等等）都能显示出令人满意的效果，对CSS编写者而言，在实现上不拘泥于具体手法，但通常是糅合了流式布局+弹性布局，再搭配媒体查询技术使用。——分别为不同的屏幕分辨率定义布局，同时，在每个布局中，应用流式布局的理念，即页面元素宽度随着窗口调整而自动适配。即：创建多个流体式布局，分别对应一个屏幕分辨率范围。可以把响应式布局看作是流式布局和自适应布局设计理念的融合。

　　**响应式几乎已经成为优秀页面布局的标准**。

- **布局特点**

　　每个屏幕分辨率下面会有一个布局样式，即元素位置和大小都会变。

- **设计方法**

　　**媒体查询+流式布局**。通常使用 @media 媒体查询 和网格系统 (Grid System) 配合相对布局单位进行布局，实际上就是综合响应式、流动等上述技术通过 CSS 给单一网页不同设备返回不同样式的技术统称。

**优点**：适应pc和移动端，如果足够耐心，效果完美。

**缺点**：（1）媒体查询是有限的，也就是可以枚举出来的，只能适应主流的宽高。（2）要匹配足够多的屏幕大小，工作量不小，设计也需要多个版本。

```
响应式页面在头部会加上这一段代码：
<meta name="applicable-device" content="pc,mobile">
<meta http-equiv="Cache-Control" content="no-transform ">
```

**响应式设计和布局**

在不同设备上正常使用，一般主要处理屏幕大小问题

 - 隐藏 + 折行 + 自适应空间
 - rem做单位
 - viewport
   - width=divice-width,
 - 媒体查询

#### 5.弹性布局（rem/em布局）

- **1. rem/em区别**：rem是相对于html元素的font-size大小而言的，而em是相对于其父元素。
- 使用 em 或 rem 单位进行相对布局，相对%百分比更加灵活，同时可以支持浏览器的字体大小调整和缩放等的正常显示，因为em是相对父级元素的原因没有得到推广。【中国站点制作网页的时候，习惯用CSS强制定义字体大小，保证每个人都看到一致的效果，包括网易、搜狐这些门户网站在内的大部分站点，用的都是绝对单位px（像素）。但是，如果从网站**易用性**方面考虑，字体大小应该是可变的，一些视力不是那么好的人需要放大字体才能看得清页面内容。然而，占据大部分浏览器市场的IE无法调整那些使用px作为单位的字体大小。国外人士非常重视网站的易用性，相当一部分外国站点已经使用em作为字体单位。
- 这类布局的特点是，**包裹文字的各元素的尺寸采用em/rem做单位，而页面的主要划分区域的尺寸仍使用百分数或px做单位（同「流式布局」或「静态/固定布局」）**。**早期浏览器不支持整个页面按比例缩放**，仅支持网页内文字尺寸的放大，这种情况下。使用em/rem做单位，可以使包裹文字的元素随着文字的缩放而缩放。
- 浏览器的默认字体高度一般为`16px`，即1em:16px，但是 1:16 的比例不方便计算，为了使单位em/rem更直观，CSS编写者常常将页面跟节点字体设为62.5%，比如选择用rem控制字体时，先需要设置根节点html的字体大小，因为浏览器默认字体大小16px*62.5%=10px。这样1rem便是10px，方便了计算。
- 用em/rem定义尺寸的另一个好处是更能适应缩进/以字体单位padding或margin／浏览器设置字体尺寸等情况（因为em/rem相对于字体大小，会同步改变）。例如：p{ text-indent: 2em; }。
- **使用rem单位的弹性布局****在移动端也很受欢迎**。**
- 其实在移动端使用所谓的弹性布局，是比较勉强的**。移动端弹性布局流行起来的原因归根结底是rem单位对于（根据屏幕尺寸）调整页面的各元素的尺寸、文字大小时比较好用。其实，使用vw、vh等后起之秀的单位，可以实现完美的流式布局（高度和文字大小都可以变得“流式”），弹性布局就不再必要了。

 

#### 结论

1.如果只做pc端，那么静态布局（定宽度）是最好的选择；

2.如果做移动端，且设计对高度和元素间距要求不高，那么弹性布局（rem+js）是最好的选择，一份css+一份js调节font-size搞定；

3.如果pc，移动要兼容，而且要求很高那么响应式布局还是最好的选择，前提是设计根据不同的高宽做不同的设计，响应式根据媒体查询做不同的布局。





### `15`.实现三栏布局（圣杯布局，双飞翼布局，flex布局）

三栏布局，顾名思义就是两边固定，中间自适应。即左右模块固定宽度，中间模块随浏览器变化自适应。

**下面七种技巧各有千秋，在开发中可以根据实际需求选择适合自己的方法进行编码。**

#### 1. 流体布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
	.left {
	    float: left;
	    height: 200px;
	    width: 100px;
	    background-color: red;
	}
	.right {
	    width: 200px;
	    height: 200px;
	    background-color: blue;
	    float: right;
	}
	.main {
	    margin-left: 120px;
	    margin-right: 220px;
	    height: 200px;
	    background-color: green;
	}
    </style>
</head>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="right"></div>
        <div class="main"></div>
    </div>
</body>
</html>
```

左右模块各自向左右浮动，并设置中间模块的 margin 值使中间模块宽度自适应。

缺点就是主要内容无法最先加载，当页面内容较多时会影响用户体验。

#### 2. BFC 三栏布局

BFC 规则有这样的描述：BFC 区域，不会与浮动元素重叠。因此我们可以利用这一点来实现 3 列布局。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
	.left {
	    float: left;
	    height: 200px;
	    width: 100px;
	    margin-right: 20px;
	    background-color: red;
	}
	.right {
	    width: 200px;
	    height: 200px;
	    float: right;
	    margin-left: 20px;
	    background-color: blue;
	}	
	.main {
	    height: 200px;
	    overflow: hidden;
	    background-color: green;
	}
    </style>
</head>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="right"></div>
        <div class="main"></div>
    </div>
</body>
</html>
```

缺点跟方法一类似，主要内容模块无法最先加载，当页面中内容较多时会影响用户体验。因此为了解决这个问题，有了下面要介绍的布局方案双飞翼布局。



#### 3. 双飞翼布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
  .content {
  	    float: left;
  	    width: 100%;
        }
        .main {
  	    height: 200px;
  	    margin-left: 110px;
  	    margin-right: 220px;
  	    background-color: green;
        }
	.left {
	    float: left;
	    height: 200px;
	    width: 100px;
	    margin-left: -100%;
	    background-color: red;
	}
	.right {
	    width: 200px;
	    height: 200px;
	    float: right;
	    margin-left: -200px;
	    background-color: blue;
	}	
    </style>
</head>
<body>
    <div class="content">
        <div class="main"></div>
    </div>
    <div class="left"></div>
    <div class="right"></div>
</body>
</html>
```

利用的是浮动元素 margin 负值的应用，感兴趣的同学可以上网搜搜原理。

主体内容可以优先加载，HTML 代码结构稍微复杂点。





原理：主体元素上设置左右边距，预留两翼位置。左右两栏使用浮动和负边距归位。

左翅left有200px,右翅right..220px.. 身体main自适应未知

1.html代码中，main要放最前边，left  right

2.将main  left  right 都float:left

3.将main占满 width:100%

4.此时main占满了，所以要把left拉到最左边，使用margin-left:-100%  同理 right使用margin-left:-220px

（这时可以直接继续上边圣杯布局的步骤，也可以有所改动）

5.main内容被覆盖了吧，除了使用外围的padding，还可以考虑使用margin。

给main增加一个内层div-- main-inner, 然后margin:0 220px 0 200px

#### 4. 圣杯布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
	.container {
	    margin-left: 120px;
	    margin-right: 220px;
	}
	.main {
	    float: left;
	    width: 100%;
	    height: 300px;
	    background-color: red;
	}
	.left {
	    float: left;
	    width: 100px;
	    height: 300px;
	    margin-left: -100%;
	    position: relative;
	    left: -120px;
	    background-color: blue;
	}
	.right {
	    float: left;
	    width: 200px;
	    height: 300px;
	    margin-left: -200px;
	    position: relative;
	    right: -220px;
	    background-color: green;
	}
    </style>
</head>
<body>
    <div class="container">
      <div class="main"></div>
      <div class="left"></div>
      <div class="right"></div>
    </div>
</body>
</html>
```

跟双飞翼布局很像，有一些细节上的区别，相对于双飞翼布局来说，HTML 结构相对简单，但是样式定义就稍微复杂，也是优先加载内容主体。



原理：利用相对定位、浮动、负边距布局，而不添加额外标签

实现方式：

main部分首先要放在container的最前部分。然后是left,right

1.将三者都 float:left , 再加上一个position:relative (因为相对定位后面会用到）

2.main部分 width:100%占满

3.此时main占满了，所以要把left拉到最左边，使用margin-left:-100%

4.这时left拉回来了，但会覆盖main内容的左端，要把main内容拉出来，所以在外围container加上 padding:0 220px 0 200px

5.main内容拉回来了，right也跟着过来了，所以要还原，就对left使用相对定位 left:-200px  同理，right也要相对定位还原 right:-220px

6.到这里大概就自适应好了。如果想container高度保持一致可以给left main right都加上min-height:130px



#### 5. Flex 布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
	.container {
      display: flex;
	}
	.main {
      flex-grow: 1;
	    height: 300px;
	    background-color: red;
	}
	.left {
	    order: -1;
	    flex: 0 1 200px;
	    margin-right: 20px;
	    height: 300px;
	    background-color: blue;
	}
	.right {
	    flex: 0 1 100px;
      margin-left: 20px;
	    height: 300px;
	    background-color: green;
	}
    </style>
</head>
<body>
    <div class="container">
      <div class="main"></div>
      <div class="left"></div>
      <div class="right"></div>
    </div>
</body>
</html>
```

简单实用，未来的趋势，需要考虑浏览器的兼容性。

#### 6. Table 布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        .container {
	    display: table;
	    width: 100%;
        }
        .left, .main, .right {
	    display: table-cell;
        }
        .left {
	    width: 200px;
	    height: 300px;
	    background-color: red;
        }
        .main {
	    background-color: blue;
        }
        .right {
	    width: 100px;
	    height: 300px;
	    background-color: green;
        }
    </style>
</head>
<body>
    <div class="container">
	<div class="left"></div>
	<div class="main"></div>
	<div class="right"></div>
    </div>
</body>
</html>
```

缺点：无法设置栏间距

#### 7. 绝对定位布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
	.container {
	    position: relative;
	}
	.main {
	    height: 400px;
	    margin: 0 120px;
	    background-color: green;
	}
	.left {
	    position: absolute;
	    width: 100px;
	    height: 300px;
	    left: 0;
	    top: 0;
	    background-color: red;
	}
	.right {
	    position: absolute;
	    width: 100px;
	    height: 300px;
	    background-color: blue;
            right: 0;
	    top: 0;
	}
    </style>
</head>
<body>
    <div class="container">
        <div class="main"></div>
	<div class="left"></div>
	<div class="right"></div>
    </div>
</body>
</html>
```

简单实用，并且主要内容可以优先加载。



### 16.css3动画，transition和animation的区别

- **前端动画怎么做**
   - animation过渡动画
   - transition过渡动画
   - JS原生控制DOM位置
   - canvas绘制动画

- **transition和animation的区别**
  主要体现在触发方式，循环方式，如何定义复杂的动画，跟JS的搭配使用

  - 触发方式
    transition只作为一种反应过渡到一个CSS属性已经改变了。一个常见的场景是你使用:hover伪类来改变CSS属性的值；触发一个过渡的另一种方法是使用JavaScript以编程方式添加或删除CSS类来模拟一个CSS属性改变。排我们做一个属性改变的方法。
    animation动画则不需要任何显式的触发。一旦你定义动画,它将自动开始播放。

  - 循环
    animation这是非常简单的。动画可以很容易地进行循环通过设置animation-iteration-count财产。您可以指定一个固定的你想让你的动画重复的次数；
    transition过渡没有一个属性,用于指定多少次他们可以运行。当触发时,过渡只运行一次。你可以过渡循环通过摆弄transitionEnd事件,但这并不是特别简单,尤其是相比,动画。

  - 定义中间点/关键帧
    animation动画,你可以定义关键帧,给你更多的控制你的CSS属性值不仅仅是开始和结束；
    transition一个过渡,你没有太多的控制最终的结果，只有start和end两个时间帧；

  - 指定前面的属性
    transition：如果变化涉及到两个属性，则需要多次指定属性

    ```css
    #mainContent {
        background-color: #CC0000;
       /*
      	 transition-property    规定设置过渡效果的 CSS 属性的名称。
     		 transition-duration   规定完成过渡效果需要多少秒或毫秒。
     		 transition-timing-function  	 规定速度效果的速度曲线。
      			
      			#### transition-timing-function
             - ease  慢速开始，然后变快，然后慢速结束
             - ease-in 慢速开始
             - ease-out 慢结束
             - ease-in-out 
             - linear
             - cubic-bezier(a,b,c,d)
      
     		 transition-delay       定义过渡效果何时开始
      */
      
        transition:background-color .5s ease-in, width .5s ease-in
    }
    #mainContent:hover {
        cursor: pointer;
        background-color: #000000;
        width: 500px;
    }
    ```

    animation：则通过帧添加任何属性变化


```css
#one{
  width: 50px;
  height: 50px;
  background-color: orange;
  animation: imageSlide;
  animation-delay: 0.5s;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
/*
	`animation: name duration timing-function delay iteration-count direction;`

   - animation-name		规定需要绑定到选择器的 keyframe 名称。
   - animation-duration		规定完成动画所花费的时间，以秒或毫秒计
   - animation-timing-function		动画的速度曲线
   - animation-delay		动画开始之前的延迟
   - animation-iteration-count
     - n | infinit
     - 动画应该播放的次数
   - animation-direction
     - normal | alternate
     - 是否应该轮流反向播放动画
   - animation-play-state
     - 可用于暂停动画
   - animation-fill-mode 
     - forwards 动画停了就保持最后的那个状态
     - backwards 动画停了还得反着做一遍回去
     - 在动画执行之前和之后如何给动画的目标应用样式。

*/

keyframes imageSlide {
0%  {
    left: -150px;
}
20% {
    left: 50px;
    height: 200px;
}
80% {
    left: 200px;
    height:300px;
}
100% {
    left: 600px;
    background-color:#FFFFFF;
}
  /*
  	#### 逐帧动画

    关键帧之间是有补间的，会选一个效果过渡过去，而逐帧动画则是每个keyframe之间没有过渡
    关键是使用下面这行CSS
    `animation-timing-function: steps(1);`
    这个step是指定关键帧之间需要有几个画面
  
  */
```

  - 与JS的相互作用
    transition经常跟JS搭配，让js改动属性，从而触发transition的操作

- 结论：

  如果要灵活定制多个帧以及循环，用animation；如果仅仅是简单的from和to 效果，用 transition.

  如果要使用js灵活设定动画属性，用transition.

  

- 总结版：过渡动画和关键帧动画的区别
   - 过渡动画需要有状态变化
   - 关键帧动画不需要状态变化
   - 关键帧动画能控制更精细

- **扩展：CSS动画的性能**
   - CSS动画不差
   - 部分情况下优于JS
   - JS可以做到更精细
   - 含高危属性，会让性能变差 (如box-shadow)

###  17.sass less(CSS 预处理器)

#### 为什么要使用CSS预处理器？

  作为前端开发人员，大家都知道，Js中可以自定义变量，而CSS仅仅是一个标记语言，不是编程语言，因此不可以自定义变量，不可以引用等等。

**CSS有具体以下几个缺点：**

  语法不够强大，比如无法嵌套书写，导致模块化开发中需要书写很多重复的选择器；

  没有变量和合理的样式复用机制，使得逻辑上相关的属性值必须以字面量的形式重复输出，导致难以维护。

  这就导致了我们在工作中无端增加了许多工作量。而使用CSS预处理器，提供 CSS 缺失的样式层复用机制、减少冗余代码，提高样式代码的可维护性。大大提高了我们的开发效率。

  但是，CSS预处理器也不是万金油，CSS的好处在于简便、随时随地被使用和调试。预编译CSS步骤的加入，让我们开发工作流中多了一个环节，调试也变得更麻烦了。更大的问题在于，预编译很容易造成后代选择器的滥用。

  所以我们在实际项目中衡量预编译方案时，还是得想想，比起带来的额外维护开销，CSS预处理器有没有解决更大的麻烦。

#### 语法

**[Sass](https://links.jianshu.com/go?to=http%3A%2F%2Fsass-lang.com%2F)**是成熟、稳定、强大的**CSS预处理器**，而SCSS是Sass3版本当中引入的新语法特性，完全兼容CSS3的同时继承了Sass强大的动态功能。

##### 特性概览

CSS书写代码规模较大的Web应用时，容易造成选择器、层叠的复杂度过高，因此推荐通过SASS预处理器进行CSS的开发，SASS提供的变量、嵌套、混合、继承等特性，让CSS的书写更加有趣与程式化。

------

##### 变量

变量用来存储需要在CSS中复用的信息，例如颜色和字体。SASS通过$符号去声明一个变量。



```bash
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

上面例子中变量$font-stack和$primary-color的值将会替换所有引用他们的位置。



```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333; }
```

##### 嵌套

SASS允许开发人员以嵌套的方式使用CSS，但是过度的使用嵌套会让产生的CSS难以维护，因此是一种不好的实践，下面的例子表达了一个典型的网站导航样式：



```cpp
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

大家注意上面代码中的ul、li、a选择器都被嵌套在nav选择器当中使用，这是一种书写更高可读性CSS的良好方式，编译后产生的CSS代码如下：



```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none; }
nav li {
  display: inline-block; }
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none; }
```

##### 引入

SASS能够将代码分割为多个片段，并以underscore风格的下划线作为其命名前缀（_partial.scss），SASS会通过这些下划线来辨别哪些文件是SASS片段，并且不让片段内容直接生成为CSS文件，从而只是在使用@import指令的位置被导入。CSS原生的@import会通过额外的HTTP请求获取引入的样式片段，而SASS的@import则会直接将这些引入的片段合并至当前CSS文件，并且不会产生新的HTTP请求。下面例子中的代码，将会在base.scss文件当中引入_reset.scss片断。



```csharp
// _reset.scss
html, body, ul, ol {
  margin:  0;
  padding: 0;
}

// base.scss
@import 'reset';
body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef;
}
```

SASS中引入片断时，可以缺省使用文件扩展名，因此上面代码中直接通过@import 'reset'引入，编译后生成的代码如下：



```css
html, body, ul, ol {
  margin: 0;
  padding: 0; }

body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef; }
```

##### 混合

混合（Mixin）用来分组那些需要在页面中复用的CSS声明，开发人员可以通过向Mixin传递变量参数来让代码更加灵活，该特性在添加浏览器兼容性前缀的时候非常有用，SASS目前使用@mixin name指令来进行混合操作。



```ruby
@mixin border-radius($radius) {
          border-radius: $radius;
      -ms-border-radius: $radius;
     -moz-border-radius: $radius;
  -webkit-border-radius: $radius;
}

.box {
  @include border-radius(10px);
}
```

上面的代码建立了一个名为border-radius的Mixin，并传递了一个变量$radius作为参数，然后在后续代码中通过@include border-radius(10px)使用该Mixin，最终编译的结果如下：



```css
.box {
  border-radius: 10px;
  -ms-border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px; }
```

##### 继承

继承是SASS中非常重要的一个特性，可以通过@extend指令在选择器之间复用CSS属性，并且不会产生冗余的代码，下面例子将会通过SASS提供的继承机制建立一系列样式：



```dart
// 这段代码不会被输出到最终生成的CSS文件，因为它没有被任何代码所继承。
%other-styles {
  display: flex;
  flex-wrap: wrap;
}

// 下面代码会正常输出到生成的CSS文件，因为它被其接下来的代码所继承。
%message-common {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.message {
  @extend %message-common;
}

.success {
  @extend %message-common;
  border-color: green;
}

.error {
  @extend %message-common;
  border-color: red;
}

.warning {
  @extend %message-common;
  border-color: yellow;
}
```

上面代码将.message中的CSS属性应用到了.success、.error、.warning上面，魔法将会发生在最终生成的CSS当中。这种方式能够避免在HTML元素上书写多个class选择器，最终生成的CSS样式是下面这样的：



```css
.message, .success, .error, .warning {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333; }

.success {
  border-color: green; }

.error {
  border-color: red; }

.warning {
  border-color: yellow; }
```

##### 操作符

SASS提供了标准的算术运算符，例如+、-、*、/、%。在接下来的例子里，我们尝试在aside和article选择器当中对宽度进行简单的计算。



```css
.container { width: 100%; }

article[role="main"] {
  float: left;
  width: 600px / 960px * 100%;
}

aside[role="complementary"] {
  float: right;
  width: 300px / 960px * 100%;
}
```

上面代码以960px为基准建立了简单的流式网格布局，SASS提供的算术运算符让开发人员可以更容易的将像素值转换为百分比，最终生成的CSS样式如下所示：



```css
.container {
  width: 100%; }

article[role="main"] {
  float: left;
  width: 62.5%; }

aside[role="complementary"] {
  float: right;
  width: 31.25%; }
```

#### CSS扩展

------

##### 引用父级选择器"&"

Scss使用"&"关键字在CSS规则中引用父级选择器，例如在嵌套使用伪类选择器的场景下：



```swift
/*===== SCSS =====*/
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
```

