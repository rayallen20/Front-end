学习笔记

# PART1. 轮播组件所需CSS相关属性

## 1.1 transform属性和translate()函数

### 1.1.1 transform属性的定义和应用场景

- a. **定义**:transform属性对元素应用2D或3D转换.该属性允许我们对元素进行**旋转、缩放、移动或倾斜.**

- b. **应用场景:**在轮播功能的实现中需要通过JS动态修改该属性的值,以便达到"每隔固定时间(time.Duration)图片自动切换"的效果.

### 1.1.2 translate()函数的定义和应用场景

- a. **定义**:translate(x,y)定义2D转换.该函数默认以元素的中心点为原点,可通过transform-origin属性进行基点的设置;该函数x和y两个参数的量纲可以为px或%.
- b. **应用场景**:在轮播功能的实现中需通过JS动态修改translate()函数的实参x的值,以便达到"每隔固定时间(time.Duration)自动位移"的效果.
- c. **一个小Tips**:实际上在轮播图的实现过程中,只是通过JS动态修改translate()函数实参x的值,而并不修改实参y的值.所以另一种实现方式可以这样描述:在轮播功能的实现中需通过JS动态修改translateX()函数的实参x的值,以便达到"每隔固定时间(time.Duration)自动位移"的效果.我们此处的轮播组件实现采用的是修改translate()函数实参x值的方式.

### 1.1.3 一个小demo

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        div {
            display: inline-block;
            white-space:nowrap;
        }

        .outer {
            width: 1200px;
            height: 200px;
            background-color: #3EDFF4;
            margin-top: 50px;
            margin-left: 50px;
        }

        .inner1 {
            width: 300px;
            height: 200px;
            background-color: silver;
            transform: translate(100%);
        }

        .inner2 {
            width: 300px;
            height: 200px;
            background-color: cadetblue;
            transform: translate(100%);
        }
    </style>
</head>
<body>
<div class="outer">
    <div class="inner1">inner1</div><div class="inner2">inner2</div>
</div>
</body>
</html>
```

## 1.2 transition属性

### 1.2.1 transition属性的定义和应用场景

- a. **定义**:transition属性是一个简写属性,用于设置4个过渡属性:


    1. transition-property:该属性定义设置过渡效果的**CSS属性名**.(也就是说该属性的值应该是一个属性名)
	2. transition-duration:该属性定义完成过渡效果需要的**秒数**或**毫秒数**.
	3. transition-timing-function:该属性定义过渡效果的**速度**.取值:
		
		linear:从开始到结束速度相同
		
		ease:慢速开始,之后变快,再慢速结束
		
		ease-in:慢速开始
		
		ease-out:慢速结束
		
		ease-in-out:以慢速开始和结束
		
		cubic-bezier(n1,n2,n3,n4):自定义速度.其中n∈[0,1]
		
		Tips1:实际上这4个形参描述的是二维坐标系中2个点的坐标,这2个点分别为:(n1,n2) (n3,n4).并根据这2个点和坐标系原点(0,0)确定一条三次贝塞尔曲线.
		
		Tips2:贝塞尔曲线通项公式如下:
		
		![Image text](https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D801/sign=a9e1f30835a85edffe8cf323785509d8/f9dcd100baa1cd11675be878b812c8fcc2ce2dfc.jpg)
		
		Tips3:三次贝塞尔曲线表达式如下:
		
		![Image text](https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D421/sign=9a6521eab8014a90853e47bf98763971/f603918fa0ec08fad54f8dff58ee3d6d55fbda1f.jpg)
		
	4. transition-delay:该属性定义动画效果从何时开始.单位可以为**秒数**或**毫秒数**.

	Tips:在设置transition属性时,**必须**设置transition-duration属性值.
	
- b. **应用场景**:在实现轮播功能时,图片的切换是一个动画效果,而非瞬时从图片A切换到图片B.因此需要设置该属性.

### 1.2.2 一个小demo

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background-color: blue;
            transition-property: width;
            transition-duration: 5s;
            transition-timing-function: cubic-bezier(.17, .86, .73, .14);
            transition-delay: 3s;
        }

        .box:hover {
            width: 300px;
        }
    </style>
</head>
<body>
<div class="box"></div>
</body>
</html>
```

# PART2. 轮播组件的开发

## 2.1 问题背景及边界

### 2.1.1 问题背景
我们做这件事的核心目的不在于实现一个轮播功能,而在于理解"组件化".因此通过本项目的开发,希望读者理解组件的概念并在日后的工作中可以自行设计组件.此处我们从4个视角去审视"组件化":

1. 组件化的起源
2. 组件化的本质
3. 定义一个组件
4. 组件化的发展

#### 2.1.1.1 组件化的起源
组件化源于对自定义标签的诉求,这种诉求从2006年开始出现.当时的开发者希望:如果能通过某些途径或手段实现自定义标签名并同时可定义该标签的属性样式,那该多方便.直到2016年前后,出现了[webComponent的标准](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components).虽然我们还不能在HTML中自定义标签,但是我们可以通过JS生成标签.从这个思路出发,产生了许多解决方案.可以把组件化理解为一种思想或基础工程设施.

Tips:前端开发者应该了解一些图形学(例如上文中的贝塞尔曲线).组合数学、离散数学、线性代数对图形学的学习很有帮助.另外最好再了解一些集合论、复变函数、运筹学的知识.

#### 2.1.1.2 组件化的本质

- a. **复用**:组件作为一种可复用性较强的代码单元,被用在多处,减少了代码量.
- b. **解耦**:组件的存在隔离了变化,把代码分成了组件内和组件外.作为组件的开发者,只需关注"组件应该发育成何种形态"的问题;而作为组件的使用者,只需关注"该如何使用组件"的问题.
- c. **封装**:屏蔽内部细节.举一个例子:input框.它屏蔽了键盘行为(譬如tabindex accesskey等属性),开发者只需写一个input标签就可以用了.
- d. **抽象**:站在一个抽象层级较高的层面理解组件.关注组件的特性(attribute,在HTML中访问)、属性(property,在JS代码中访问)和事件(event,组件对事件的输出).这种认知模式降低了使用者的心智成本.

#### 2.1.1.3 定义一个组件
以如下代码为例:

```javascript
let elementB = document.createElement("div");
```

创建一个DOM对象后,做一些操作(比如为这个元素设置一些CSS属性之类的操作),之后通过

```javascript
elementA.appendChild(elementB);
```

的方式将我们创建的这个DOM对象挂载到DOM树上去.那么问题来了:我们要复用elementB,该怎么办呢?唯一的解决办法:复制粘贴这段代码.

那么有没有更好的代码组织方式呢?可以将这段代码封装成一个函数,该函数接收一个DOM并返回该DOM.

```javascript
function mountElementOnDOMTree(elementA) {
	let elementB = document.createElement("div");
	elementA.appendChild(elementB);
	return elementA;
}
```

还有没有其他思路呢?

**思路1**:使用JS来创建一个JS对象并将这个对象挂载到DOM树上去也是一种解决方案.除了DOM对象外,我们也可以使用JS对象来解决这个问题.但是有一个问题:JS的对象无法像DOM对象一样可以使用appendChild这种API将该对象挂载到DOM树上去,因为这个API的目标对象是DOM对象而非JS对象,因此需要使用appendTo.可是使用appendTo带来了另外一个问题:这个做法不符合OOP原则.OOP原则认为自身的方法应该改变自身的属性,而appendTo改变的是其他对象的属性.

**思路2**:在构造函数中return一个对象,则使用new关键字创建的对象就是构造函数中return的这个对象了.我们在构造函数中将属性和方法挂载到一个DOM节点上,之后再将这个DOM节点挂载到DOM树上.而这种方法也产生了一个问题:这种结构无法继承,因为无法在prototype链上写东西.


#### 2.1.1.4 组件化的发展
组件化的发展经历过3个时代:早年->jQuery时代->三大框架(Angular VUE React)时代

早年在上文中已经略有提及,此处笔者能力有限,也无从考证了.(主要是我TM也不知道)

jQuery时代:以Plugin的思路解决问题.

三大框架时代:走向了成熟.比之前的Plugin又多了2点:

- **模板被考虑进来**:在组件中写代码,同时也会包含UI声明时的部分
- **样式被考虑进来**:CSS的能力被融入了组件中

(其实这段我TM自己都不知道自己说的是TM啥 = =)

### 2.1.2 问题边界

#### 2.1.2.1 定义问题
问题:轮播是什么?或者我们退一步,换一个问法,一个轮播功能应该由什么组成?

回答:一个轮播功能应该由以下3部分组成:

- **排版布局**
- **动画**
- **拖拽**

实际上这3个部分已经为我们定义好了轮播组件的问题边界.换言之,本部分内容就解决这3个问题.

//TODO:这块写的有点突兀 等有美国时间了再改改

#### 2.1.2.2 根据问题排列优先级
已经确认要解决上述提到的3个问题,那么问题又来了:这3个关键字只是指明了一个方向,具体细节上的定义在哪儿?在这3个问题中,哪些是P0级别的需求?哪些又是P1级别的需求?因此我们本小节要解决的问题是:**自己给自己写一份需求文档**.既然是面向组件的需求文档,那肯定是没有PM的.而且**大部分轮播组件的需求,是来自于各种不同轮播的抽象.**

Tips:**需求文档要有优先级的概念**(五星重要).

此处我们的需求文档就按照功能模块来划分并标明优先级:

1. 轮播需求
	
	a. **P0**:展示一个序列的图片
	
	b. **P0**:每隔N秒通过动画,切换到下一张图片
	
	c. **P0**:循环播放
	
	d. **P1**:展示指示器
	    
2. 点击需求

	a. **P0**:点击图片可跳转至连接
	
3. 手势/鼠标操作轮播

	a. **P0**:拖拽图片时,图片可跟随手指/鼠标移动
	
	b. **P0**:停止拖拽时,如水平拖拽距离超过(大于关系)**当前图片宽度/2**则播放动画弹到下一张图;如未超过**当前图片宽度/2**,则不切换图片
	
	c. **P1**:如手势超出组件边界外,则对边界外手势需做特殊case处理
	
4. 鼠标悬停展示左右操作按钮

	a. **P1**:鼠标悬停,展示向左翻页和向右翻页按钮
	
	b. **P2**:第1张图无向左按钮,最后1张图无向右按钮
	
	c. **P1**:点击向左按钮向前播放,点击向右按钮向后播放


## 2.2 轮播的实现

### 2.2.1 定时器的使用

本小节我们先抛开"轮播"这件事儿,换个话题.来看一个需求:现有一页面如下:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #displayBox {
            width: 300px;
            height: 300px;
            margin: auto;
            background-color: lightblue;
            text-align: center;
            line-height: 300px;
        }
    </style>
</head>
<body>
<div id="displayBox">0</div>
</body>
</html>
```

请写一段JS代码,实现如下需求:

1. 当用户打开页面后,div内的文本内容需和用户停留在该页面的秒数相同;
2. 当用户停留在该页面指定秒数后,弹出一个提示框,提示框内容为:"you have stay on this page ? seconds".其中?为用户停留在该页面的秒数;
3. 当弹出提示框后,div内的文本内容不再变化;

思路分析:本需求是一种"随时间流逝而有某种效果"的需求,因此很明显应该使用定时器.此处我们以setTimeout()为例来实现这个需求.

// TODO:实际上这个需求使用setTimeout()来实现并不合适.但因为下文中要用到setTimeout()方法,故此处用它来做一个demo.

那么问题来了,我们来看一下[setTimeout()的定义](https://www.w3school.com.cn/jsref/met_win_settimeout.asp):setTimeout()方法用于**在指定的毫秒数后调用**函数或计算表达式.

从定义中我们可以很清晰的看到,setTimeout()方法只能在指定的毫秒数后调用**1次**函数或计算表达式.可是我们的需求是"当用户打开页面后的某段时间内,div中的内容需不断变化",这很明显靠1次定时器是搞不定的.该怎么办呢?怎么办呢?

让我们再来看一下文档上关于[setTimeout()的提示](https://www.w3school.com.cn/jsref/met_win_settimeout.asp):setTimeout()只执行code一次.如果要多次调用,请使用 setInterval()或者**让code自身再次调用setTimeout()**.

那么我们的解决方案就出现了:让回调函数自身再次调用setTimeout(),就可以实现"某段时间内div中的内容不断变化"这一功能了.代码如下:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #displayBox {
            width: 300px;
            height: 300px;
            margin: auto;
            background-color: lightblue;
            text-align: center;
            line-height: 300px;
        }
    </style>
</head>
<body>
<div id="displayBox">0</div>

<script>
    /**
     * @method 本方法用于为id=displayBox的DOM元素修改其中的文本内容
     * 使该文本内容与用户停留在网页上的秒数相同 并在用户停留在该网页上指定时间(单位:s)后 弹出一个提示框
     * @param {number} staySeconds
     * @return {void}
     * */
    function countSecond(staySeconds) {
        let e = document.getElementById("displayBox");
        let content = Number(e.innerText);
        // console.log(content);
        // console.log(++content);
        e.innerText = String(++content);
        if(content === staySeconds) {
            alert("you have stay on this page " + staySeconds + " seconds");
        } else {
            setTimeout(countSecond, 1000, staySeconds);
        }
    }

    setTimeout(countSecond, 1000, 3);
</script>
</body>
</html>
```

Tips:setTimeout()下文中还要用到,此处如果真TM没看懂,请在谷歌一下 - -|||


### 2.2.2 数据从何处来

看到这个标题,我们只能要用问题来回答问题了:**数据是什么?**

回答:此处的数据指的是:轮播中所有图片的url.

这个回答虽然是个定义,但不足以指导我们实践.因为我们还有另外一个问题:**数据以何种数据类型表达?**

回答:本文要解决的问题是和**组件相关的前端知识**,而非"前后端以何种方式传输数据"和"前端如何解析数据",因此此处我们直接给一段JS代码表示我们从后端获取到的数据:

```javascript
    let data = [
        "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
        "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
        "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
        "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    ];
```

### 2.2.3 轮播功能实现

关于定时器的前置技能和关于数据的定义及其来源问题我们都已经解决了.本小节我们可以正式进入轮播功能的开发了.此处我们要解决几个问题:

- 视口的样式(宽高、位置、边框)
- img元素的创建与挂载
- 随时间流逝而切换图片
- 切换时的动画效果

#### 2.2.3.1 视口的样式

既然是视口的样式,那我们先来思考一个问题:**如何获取视口?**换言之就是如何获取一个**HTMLElement**?

如果单纯是解决这个问题,那就so TM easy了,以下3种方式均可解决这个问题:

```javascript
document.getElementById();
document.getElementsByName();
document.getElementsByTagName();
```

可是我们思考一下我们要做的事:轮播**组件**.如果从组件化开发的角度思考这个问题,可能以上3种方式就都不是太好的解决办法了(不是不能解决获取视口的问题,而是以上述方式解决不是一种太好的实践方案).

从OOP的角度上看,视口这个HTMLElement一定会成为组件中某个类的一个私有属性(根据SRP,引起类修改的原因应该只有**1**个,因此这个属性的访问修饰符必然是private.当然JS中不存在真正的私有属性).那么我们可不可以采用这个思路:**通过JS给视口添加一个classname,这个classname表明了(通过单词含义的形式表明)该HTMLElement是轮播组件的视口**.代码如下:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style></style>
</head>
<body>
<div id="container">

</div>

<script>
    /**
     * @method 本方法用于给轮播组件的容器DOM对象增加一个classname
     * @param {HTMLElement} container 轮播组件的容器DOM对象
     * @return {HTMLElement} container 增加了classname之后的轮播组件容器DOM对象
     * */
    function addClassNameForContainer(container) {
        container.classList.add("carousel");
        return container;
    }

    addClassNameForContainer(document.getElementById("container"));
</script>
</body>
</html>
```

之后我们就可以给视口添加样式了:

```css
.carousel {
	width: 500px;
	height: 300px;
	overflow: hidden;
	white-space: nowrap;
	margin: 100px auto;
	border: 1px solid blue;
}
```

#### 2.2.3.2 img元素的创建与挂载

我们再来看一下数据:

```javascript
    let data = [
        "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
        "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
        "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
        "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    ];
```

很自然地,既然是一个表示集合的数据类型,那么其中元素的数量就是不确定的.落地一点的话就是:**list中有多少个元素,就要创建多少个img元素**.JS代码如下:

```javascript
/**
 * @method 本方法用于给轮播组件的容器DOM对象增加一个classname
 * @param {HTMLElement} container 轮播组件的容器DOM对象
 * @return {HTMLElement} container 增加了classname之后的轮播组件容器DOM对象
 * */
function addClassNameForContainer(container) {
    container.classList.add("carousel");
    return container;
}

/**
 * @method 本方法用于根据list中元素的数量创建对应数量的img元素,并将创建的每个img作为container的子元素挂载到DOM树上
 * @param {HTMLElement} container 轮播组件的容器DOM对象
 * @return {void}
 * */
function createAndAppendImgElements(container) {
    for(let d of data) {
        let e = document.createElement("img");
        e.src = d;
        container.appendChild(e);
    }
}

createAndAppendImgElements(
    addClassNameForContainer(document.getElementById("container"))
);
```

当然,别忘了给img元素加点样式:

```css
.carousel>img {
    width: 100%;
    height: 100%;
    /*1血伏笔:此处设置行内块元素是有用的 下一小节会解释这个问题*/
    display: inline-block;
}
```

#### 2.2.3.3 随时间流逝而切换图片
此处我们人为定义:每**3秒**切换1张图片.而且此处我们仅实现能够**切换图片**的功能即可,不考虑动画效果.

此处我们人为给图片加一个顺序,方便之后解释:**我们定义container中的第N个子元素即为第N张该被显示在视口内的图片,其中N为整数且N∈[0,3]**.

那么我们来列一下流逝时间与当前显示图片之间的关系:

- 第0秒 :显示第0张图片
- 第3秒 :显示第1张图片
- 第6秒 :显示第2张图片
- 第12秒:显示第3张图片
- 第15秒:显示第0张图片
- 第18秒:显示第1张图片
- 第21秒:显示第2张图片
- 第24秒:显示第3张图片
- ...

再来回顾一下我们之前点出的前置技能:setTimeout():

```javascript
function xxx() {
	// do something
	setTimeout(xxx, 1000);
}

setTimeout(xxx, 1000);
```

两块拼图拼起来,似乎我们找到了问题的本质(布莱恩.铜须:天知道我们会发现什么样的大秘密~):**使用定时器每3秒调用一个函数,该函数负责切换图片**.

那么我们的核心问题转换成了:**如何切换图片**?

这里有2个CSS样式需要我们关注一下:

- 1. 关于容器的一个属性:

```css
.carousel {
	height: 300px;
}
```

- 2. 关于图片的一个属性:

```css
.carousel>img {
	/*伏笔消除*/
    display: inline-block;
}
```

那么基本上结论就出来了:**将container内所有子元素都做一个水平方向的位移,就可以在<font color="red">视觉上</font>实现切换图片了.**之所以说是视觉上,是因为本质上只是通过所有子元素的水平位移,达到显示在视口内的图片不同的目的.这样看起来就是切换了图片.

那么来列一下函数**调用次数**与**容器内所有子元素水平位移距离**和**视口中应显示图片**之间的关系:

- 第0次调用 :没有水平位移,也就是尚未调用,即轮播组件的初始状态.应显示第**0**张图片.
- 第1次调用 :向左位移**1**张图片的距离,应显示第**1**张图片.
- 第2次调用 :向左位移**2**张图片的距离,应显示第**2**张图片.
- 第3次调用 :向左位移**3**张图片的距离,应显示第**3**张图片.
- 第4次调用 :没有水平位移(即轮播组件初始状态),应显示第**0**张图片.
- 第5次调用 :向左位移**1**张图片的距离,应显示第**1**张图片.
- 第6次调用 :向左位移**2**张图片的距离,应显示第**2**张图片.
- 第7次调用 :向左位移**3**张图片的距离,应显示第**3**张图片.
- ...

从数学的角度上看这个问题,实际上这是一个数列,其通项公式为:

a(n) = mod(n, 4)	其中:

- n即函数调用次数.
- a(n)即应该显示在视口中的容器子元素下标.

再抽象一次:通项公式中的4是从哪儿来的?如果容器中有5张图片,这个通项公式还成立吗?

那么我们再来列一下如果有5张图片时的函数**调用次数**与**容器内所有子元素水平位移距离**和**视口中应显示图片**之间的关系:

- 第0次调用 :没有水平位移,也就是尚未调用,即轮播组件的初始状态.应显示第**0**张图片.
- 第1次调用 :向左位移**1**张图片的距离,应显示第**1**张图片.
- 第2次调用 :向左位移**2**张图片的距离,应显示第**2**张图片.
- 第3次调用 :向左位移**3**张图片的距离,应显示第**3**张图片.
- 第4次调用 :向左位移**4**张图片的距离,应显示第**4**张图片.
- 第5次调用 :没有水平位移(即轮播组件初始状态),应显示第**0**张图片.
- 第6次调用 :向左位移**1**张图片的距离,应显示第**1**张图片.
- 第7次调用 :向左位移**2**张图片的距离,应显示第**2**张图片.
- 第8次调用 :向左位移**3**张图片的距离,应显示第**3**张图片.
- 第9次调用 :向左位移**4**张图片的距离,应显示第**4**张图片.
- ...

那么这个场景下的数列通项公式就变成了:

a(n) = mod(n, 5) 其中:

- n即函数调用次数.
- a(n)即应该显示在视口中的容器子元素下标.

Tips:其实这个推导过程应该是个数学归纳法(当i = 1时命题成立,进而假设i = j时命题成立,可推导出i = j + 1时命题成立)的应用,本文不是讲数学的,有兴趣的翻翻数分就能解决这个问题.

通过这个推论,我们就可以进行更高层级的抽象:

a(n) = mod(n, m)	其中:

- n即函数调用次数.
- m即容器内子元素的数量.
- a(n)即应该显示在视口中的容器子元素下标.

那么到了这个步骤,代码写起来就白给(犹豫 就会败北 果断 就是白给 人生 就是竹篮打水)了:

```javascript
/**
 * @method 本方法用于每3秒切换1张图片
 * @param {HTMLElement} container 轮播组件的容器DOM对象
 * @param {number} position 要移入视口的img元素索引
 * @return {void}
 * */
function alterImg(container, position) {
    let children = Array.prototype.slice.call(container.children);
    console.log(position);
    // 要移入视口的img元素在数组中的下标
    position = position % children.length;
    for(let child of children) {
        child.style.transform = `translate(${-100 * position}%)`;
    }
    position = position + 1;
    setTimeout(alterImg, 3000, container, position);
}

setTimeout(alterImg, 3000, document.getElementById("container"), 1);
```

示意图如下:
		![Image text](http://strike.frontend.codingdeath.com/transform%E5%B1%9E%E6%80%A7%E5%80%BC%E4%B8%8EalterImg%28%29%E5%87%BD%E6%95%B0%E4%B9%8B%E9%97%B4%E5%85%B3%E7%B3%BB%E7%A4%BA%E6%84%8F%E5%9B%BE.jpg)

到了这一步,实际上切换图片的功能就已经实现了.但是这段代码写的"很不JS"----一看就是不知道学啥的跑来写JS了.明显变量position应该使用闭包传递,所以我们来改一改:

```javascript
/**
 * @method 本方法用于每3秒切换1张图片
 * @param {HTMLElement} container 轮播组件的容器DOM对象
 * @return {void}
 * */
function alterImg(container) {
    let children = Array.prototype.slice.call(container.children);
    let position = 1;
    let nextImg = () => {
        position = position % children.length;
        // console.log(position);
        for(let child of children) {
            child.style.transform = `translate(${-100 * position}%)`;
        }
        position = position + 1;
        setTimeout(nextImg, 3000);
    };
    setTimeout(nextImg, 3000);
}

alterImg(document.getElementById("container"));
```

实际上这里遗留了一个问题:每当所有图片轮播完毕,都会出现一次**<font color="red">不正确</font>**的动画效果:所有图片从左向右移动.正确的动画效果应该是:所有图片一直从右向左移动.这个问题我们将在下一小节解决.

#### 2.2.3.4 图片切换时的动画效果

这部分也是简单的,毕竟在我们的技能树里,前文已经点过这个技能了.给容器中的图片加一个过渡效果就可以了.

```css
.carousel>img {
    width: 100%;
    height: 100%;
    display: inline-block;
    transition: ease 0.5s;
}
```

#### 2.2.3.5 切换图片--只移动2张

根据上文中实现,我们可以得出这样的一个结论:**切换图片时,是将所有的img元素一起做水平位置上的位移**.

那么问题来了:视口中只展示1张图片,但所有图片都在一起位移,这样的实现是否成本过高?

换个落地一点的问法就是:视口中呈现的动画效果是:一张图片挪出,另一张图片挪入.这和其他图片的位置并无关系,其他图片为什么要和这两张要发生位移的图片一起移动呢?

因此更好的解决方案是:**只操作需要发生位移的图片**.即:在定时器调用的函数中,只做2步操作:

- 1. 把当前视口中的图片移走
- 2. 把下一张要显示在视口中的图片移入

代码如下:

```javascript
/**
 * @method 本方法用于每3秒切换1张图片 但仅改变2张图片的位置
 * @param {HTMLElement} container 轮播组件的容器DOM对象
 * @return {void}
 * */
function alterTwoImg(container) {
    let children = Array.prototype.slice.call(container.children);

    // 要移出视口的img元素在数组中的下标
    let outPosition = 0;

    let nextImg = () => {
        // 要移入视口的img元素在数组中的下标
        let inPosition = outPosition + 1;
        outPosition = outPosition % children.length;
        inPosition = inPosition % children.length;

        // 调试用 实在看不懂代码把它打开
        // console.log(outPosition);
        // console.log(inPosition);

        let outImg = children[outPosition];
        let inImg = children[inPosition];

        outImg.style.transform = `translate(${-100 - 100 * outPosition}%)`;
        inImg.style.transform = `translate(${-100 * inPosition}%)`;

        outPosition = outPosition + 1;
        setTimeout(nextImg, 3000);
    };
    setTimeout(nextImg, 3000);
}
```

示意图如下:
		![Image text](http://strike.frontend.codingdeath.com/transform%E5%B1%9E%E6%80%A7%E5%80%BC%E4%B8%8EalterImg%28%29%E5%87%BD%E6%95%B0%E4%B9%8B%E9%97%B4%E5%85%B3%E7%B3%BB%E7%A4%BA%E6%84%8F%E5%9B%BE--%E5%8F%AA%E7%A7%BB%E5%8A%A82%E5%BC%A0.jpg)
		
至此,我们已经实现了**只移动2张图片**,换言之就是:**只移动当次轮播需要发生位移的图片**.达到了提升性能的效果.

但是还有一个问题没有解决:**所有图片在第一次轮播结束后,位移方向和需求方向相反.**即:需求是所有图片从右向左位移,但所有图片在第一次轮播结束后,都将从左向右位移.

解决方案:在待移入视口的图片移入视口之前(这句话可能描述的不是很好,但一时半会儿也确实没想到更好的描述了)先将它从视口的左侧移动到视口的右侧.这样再次移动这张图片时,即可达到**从右向左位移**的效果了.

代码如下:

```javascript
/**
 * @method 本方法用于每3秒切换1张图片 但仅改变2张图片的位置 同时实现将需要移入视口的图片移动到视口的右侧 
 * 以便所有图片在视口中呈现的效果均为:从右向左位移
 * @param {HTMLElement} container 轮播组件的容器DOM对象
 * @return {void}
 * */
function alterTwoImg(container) {
    let children = Array.prototype.slice.call(container.children);

    // 要移出视口的img元素在数组中的下标
    let outPosition = 0;

    let nextImg = () => {
        // 要移入视口的img元素在数组中的下标
        let inPosition = outPosition + 1;

        outPosition = outPosition % children.length;
        inPosition = inPosition % children.length;

        // 调试用 实在看不懂代码把它打开
        console.log(outPosition);
        console.log(inPosition);

        let outImg = children[outPosition],
            inImg = children[inPosition];

        inImg.style.transition = "0s";
        inImg.style.transform = `translate(${100 - 100 * inPosition}%)`;

        // 调试用 实在看不懂代码把它打开
        // console.log(inImg.style.transform);

        setTimeout(() => {
            outImg.style.transition = "";
            outImg.style.transform = `translate(${-100 - 100 * outPosition}%)`;

            inImg.style.transition = "";
            inImg.style.transform = `translate(${-100 * inPosition}%)`;

            outPosition = outPosition + 1;
        }, 16);
        setTimeout(nextImg, 3000);
    };
    setTimeout(nextImg, 3000);
}
```

此处需要解释3处代码:

1. 设置动画的播放时间为0秒:

```javascript
inImg.style.transition = "0s";
```

这一行必须写,否则将待移入视口的图片从视口左侧移动至视口右侧时,受CSS的影响,还会有0.5s的动画效果.

2. 清除要移动的图片的transition

```javascript
outImg.style.transition = "";
inImg.style.transition = "";
```

这两行也是必须写,因为只有JS清除了transition属性值,DOM才会使用CSS的transition属性值.

结论:**对于transition属性,如果JS设置了该属性的属性值,则DOM会使用JS设置的;如果JS没有设置,则DOM使用CSS设置的值.**

3. nextImg()中箭头函数的定时器时间与nextImg()函数的定时器时间不同问题

```javascript
setTimeout(() => {
    outImg.style.transition = "";
    outImg.style.transform = `translate(${-100 - 100 * outPosition}%)`;

    inImg.style.transition = "";
    inImg.style.transform = `translate(${-100 * inPosition}%)`;

    outPosition = outPosition + 1;
}, 16);
```

此处只要写小于3000的uint值,其实都是可以的.原因:该函数虽然调用频率为:16s/次,远远高于nextImg()函数的调用频率(3000s/次).但是上文中的箭头函数虽然会执行多次,但**影响图片位置**的**outPosition**和**inPosition**值不会改变,因此箭头函数的定时器时间是无所谓的.




至此,轮播主要功能已经实现完毕了,还有一些可以细化的功能,我们将在下一章节讲解.

## 2.3 轮播手势--鼠标拖拽

轮播的动画效果和手势结合,会使开发难度直线上升.因此我们本节内容先不考虑动画的问题,也不做和touch相关的手势(即移动端适配),只做PC端的手势,也就是鼠标拖拽.实现本节功能时,请先将定时器停掉.因为我们本节的问题边界是:不考虑动画的前提条件下实现拖拽.

### 2.3.1 前置技能

#### 2.3.1.1 JavaScript的EventLoop机制

先来做一个小题目:请设计一段代码,实现以下需求:

- 1. 页面上有一个**宽500px** **高500px** 边框为 **海军蓝** **实线** **1px**的盒子 该盒子在页面上水平居中,距页面顶部高度100px;
- 2. 当鼠标在**盒子内**进行拖拽操作时,每完成一次拖拽(即鼠标从点击到移动直到放开鼠标视作完成一次拖拽)后,在控制台打印出2个值:**本次鼠标在X轴上的拖拽距离**和**鼠标总计在X轴上拖拽的距离**

实现如下:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #wrapper {
            width: 500px;
            height: 500px;
            border:1px solid navy;
            margin: 100px auto;
        }
    </style>
</head>
<body>
<div id="wrapper"></div>

<script>
    // 记录鼠标点击时的X坐标
    let startX;

    // 记录每次拖拽在X轴上的距离
    let displacementX;

    // 记录总X轴的位移 初始化0个px
    let totalDisplacementX = 0;

    let wrapper = document.getElementById("wrapper");

    let start = (event) => {
        event.preventDefault();

        // 记录鼠标点击时的X坐标
        startX = event.clientX;

        wrapper.addEventListener("mousemove", move);
        wrapper.addEventListener("mouseup", end);
    };

    let move = (event) => {
        // 计算本次位移在X轴上的距离
        displacementX = event.clientX - startX;
    };

    let end = (event) => {

        // 打印本次X轴移动距离
        console.log("本次在X轴上拖拽的距离为:" + Math.abs(displacementX) + "px");

        // 打印总X轴的距离
        totalDisplacementX += displacementX;
        console.log("总计在X轴上拖拽的距离为" + Math.abs(totalDisplacementX) + "px");
        
        wrapper.removeEventListener("mousemove", move);
        wrapper.removeEventListener("mouseup", end);
    };

    wrapper.addEventListener("mousedown", start);

</script>
</body>
</html>
```

在这段代码中,我们想要引出一个问题:为什么在第1次拖拽行为结束后,变量totalDisplacementX的值没有受到

```javascript
let displacementX = 0;
```

的影响,重置为0呢?

这也就引出了本小节我们想要讲解的内容:JavaScript的Event Loop机制.只有对这个机制足够了解,才能回答我们刚刚提出的问题.

##### a. 为什么JavaScript是单线程的?

此处我们先不回答这个问题,转而再提出一个问题:JavaScript为毛没有sleep()函数?

答案:因为JavaScript是单线程的.当一个线程进入sleep状态后,没有其他线程或线程管理者(可以理解为线程池)能够唤醒这个进入sleep状态的线程.因此JavaScript没有sleep()函数.

此处也只是多提一嘴:可能有的人会问:那么PHP也是单线程的语言啊,为什么PHP有sleep()函数呢? 答案也很简单:因为PHP的线程管理是由php-fpm来做的,每当一个请求到达服务器时,php-fpm开启一个php的线程来处理这个请求.因此对于PHP的每一个线程来讲,是有一个线程池来统一管理它们的,所以PHP实现了sleep()函数.

那么我们回到主题,还是回答上文提到的问题:为毛JavaScript是单线程的呢?

这涉及到一些编程语言范式的问题.我们从语言用途的角度出发,回答这个问题.JavaScript的主要用途是什么?这个答案就比较清晰了:根据用户的行为产生对应的效果,以及操作DOM.很自然的,1个用户大概率在同一时刻只发生1个行为(当然如果你非要说我就要在同一时刻既操作鼠标又操作键盘,那么我也只能建议你去打星际争霸了 = = showmethemoney欢迎你),所以JavaScript是一门单线程的语言.

当然也可以逆向思考:如果JavaScript是一门多线程的语言会发生什么?

那就有可能出现这样的情况:线程A在操作一个DOM,而线程B删除了这个DOM.那此时浏览器该以哪个线程的操作结果为准?甚至更深一层的思考,加锁(互斥锁、读写锁、原子锁等)或许是可以解决这个问题,但是把JS改造成多线程的意义何在呢?还是上文中提到的观点:**1个用户大概率在同一时刻只发生1个行为**,因此JS被设计为了一门单线程的语言.

##### b. 任务队列

单线程的等价表达就是:所有任务都需要排队,上一个任务执行完毕后,才会开始执行下一个任务.如果上一个任务耗时很长,那排在他之后的任务该怎么办呢?俩字:等着.

进一步的思考:有没有什么办法解决"上一个任务耗时很长"这件事呢?想解决这个问题,就要思考这样一个问题:为什么"上一个任务耗时很长"呢?

如果是因为CPU计算量大,导致的使用率过高,那也确实够呛有什么好办法了(换个牛逼的电脑或许是个解决方案),但是我们在日常浏览网页时,很少出现CPU使用率过高(超过90%)的情况.反而是因为IO设备很慢(比如WebSocket操作从socket中读取数据.因为这个场景需要先等待服务器端向socket写入数据才能读取),不得不等待IO设备操作完毕后,再往下执行.

JavaScript语言的设计者意识到,这种场景下主线程完全可以不管IO设备,将等待中的任务挂起(俗称hang住),先运行排在后边的任务.等到IO设备操作完毕之后,再回过头来把hang住的任务继续执行下去.

因此所有的任务就被分为了2种:

- 1. 同步任务:即在主线程上排队执行的任务.其特点为:只有上一个任务执行完毕,才能执行下一个任务;
- 2. 异步任务:即不进入主线程,而进入"任务队列"(task queue)的任务.其特点为:只有"任务队列"通知主线程,某个异步任务可以被执行时,该异步任务才会进入主线程执行.

当然了,这个"任务队列"有宏队列(marcotask)和微队列(mircotask),此处就不细致展开了,因为它和我们要回答的问题关系不大.(其次原因是我TM也没看 = = 找个天朗气清惠风和畅的日子解决一下这个问题)

因此:异步执行的运行机制如下:

- step1. 所有同步任务都在主线程上执行,形成一个执行栈(execution context stack)
- step2. 主线程之外,还存在一个"任务队列".只要异步任务有了运行结果,就向"任务队列"中放置一个事件.
- step3. 当执行栈中的所有同步任务执行完毕后,主线程会读取"任务队列",检查"任务队列"中有哪些事件.这些事件对应的异步任务就结束等待状态,进入执行栈,开始执行.
- step4. 以上三步不断重复.

此处也是多提一嘴:实际上这个模型有些像MQ,但是和MQ不同的是:程序作为MQ的Consumer,当消费了一条Message后,可以选择将该Message放回MQ中(可选择放置到队列头部或队列尾部),即Consumer负责处理Message的去向;而此处提到的task queue,则是当有事件被触发时,有一个Producer(实际上这个Producer是啥我也不清楚,只是定性的可以理解为一种"事件驱动机制".但Message的去向一定不是由Consumer来决定,甚至Consumer都没有决定权)向这个task queue中放入Message.

主线程和任务队列的示意图如下:
		![Image text](http://strike.frontend.codingdeath.com/JavaScript%E4%B8%BB%E7%BA%BF%E7%A8%8B%E5%92%8C%E4%BB%BB%E5%8A%A1%E9%98%9F%E5%88%97%E7%A4%BA%E6%84%8F%E5%9B%BE.jpg)

##### c. 事件和callback

上文中已经说到,"任务队列"可以看做一个MQ,IO设备每完成一项任务(也就是发生了一次"行为"),就在"任务队列"中添加一个事件,这个信号就表明和该行为相关的异步任务可以进入执行栈了.之后主线程读取"任务队列",实际上就是在读取其中的事件.只要指定了callback,这些事件在被触发时就会进入"任务队列",等待主线程读取.

而所谓的callback,也就是上文中提到的会被hang住的代码.异步任务必须指定callback,当主线程开始执行异步任务时,实际上就是在执行被触发的事件所对应的callback.

##### d. Event Loop

主线程从"任务队列"中读取事件的这个过程,是在不断循环的.因此这种运行机制被称为Event Loop.其特点为:**执行栈中的代码总在读取"任务队列"之前执行**.

##### e. 定时器

"任务队列"中除了可以放置异步任务的事件外,还可以放置定时事件.即指定一段代码在某个时间之后执行.即定时器(timer)功能.以

```javascript
setTimeout(() => {
    // some code }
    // , 0);
});
```

为例,它的含义为:指定某个任务在主线程**最早的空闲时间**执行,换言之就是**尽可能早**的执行.但实际上它的"尽可能早",就是向"任务队列"的尾部添加一个事件,因此需要等到同步任务和"任务队列"中的现有事件都处理完,才会被执行.

HTML5标准中规定了setTimeout()的第二个参数的最小值**不得低于4ms,如果低于这个值,则自动增加**.而且对于DOM的变动(尤其是涉及到页面重新渲染的部分),通常都不会立即执行,而是每16ms执行一次,这种场景下使用requestAnimationFrame()的效果好于setTimeout().(我也不知道为毛 找个天朗气清惠风和畅的日子查查的).

注意:**setTimeout()只是将事件放置到了"任务队列"的尾部,但它想要被执行,还是得等到执行栈中的代码执行完毕.如果执行栈中的代码执行时间超过了setTimeout()设置的时间,则无法保证callback一定会在setTimeout()指定的时间点上执行!**

参考文献:[JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

##### f. 解答问题

我们的问题是:在上文的代码中,为什么在第1次拖拽行为结束后,变量totalDisplacementX的值没有受到

```javascript
let displacementX = 0;
```

的影响,重置为0呢?

此时就很好解答了:因为这行代码在执行栈中先被执行完毕,才能够从"任务队列"中读取事件并执行对应的callback.但是执行栈中的代码只执行1次,而callback只要事件触发了就会执行,因此displacementX没有被重置为0.(务必理解这个知识点,之后写拖拽时就不再讲了).

#### 2.3.1.2 event.clientX的定义讲解--以mousedown和mousemove事件为例

##### a. event.clientX的定义

定义:clientX事件属性返回当事件被触发时鼠标指针相对于浏览器页面(或客户区)的水平坐标.

##### b. 以mousedown和mousemove事件为例讲解event.clientX

来看下面一段代码:

```html
<!DOCTYPE html>
<html  lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #wrapper {
            width: 500px;
            height: 300px;
            border: 1px solid deepskyblue;
            margin: 100px auto;
        }
    </style>
</head>
<body>
<div id="wrapper"></div>
<script>
    let startX;

    let wrapper = document.getElementById("wrapper");

    let start = (event) => {
        startX = event.clientX;
        wrapper.addEventListener("mousemove", move);
        wrapper.addEventListener("mouseup", end);
    };

    let move = (event) => {
        if(event.clientX === startX) {
            console.log(true);
        } else {
            console.log("startX = " + startX);
            console.log("move event.clientX = " + event.clientX);
        }
    };

    let end = (event) => {
        wrapper.removeEventListener("mousemove", move);
        wrapper.removeEventListener("mouseup", end);
    };

    wrapper.addEventListener("mousedown", start);
</script>
</body>
</html>
```

问:当鼠标在盒子内部拖拽(此处我们定义"先将鼠标按下再在盒子中移动一段距离,最后放开鼠标"这一全过程为一次拖拽)时,控制台中是否会打印出true?如果会,每次拖拽会打印出几个true?

答:每次拖拽至少会打印出1个true.

原因:想解释这个现象,我们就要回到概念上.再复习一次clientX事件属性的概念:**clientX事件属性返回当事件被触发时鼠标指针相对于浏览器页面(或客户区)的水平坐标**.

有了这个概念,来假设这样一个场景:在水平方向(X1)的位置上按下鼠标,之后位移1px,在水平方向(X1)+1的位置上停止位移.那么对于mousemove事件来讲,当该事件**被触发**时,根据定义,此时鼠标的水平坐标为(X1),和mousedown事件被触发时的水平坐标是相同的.换言之,对于mousemove事件而言,所谓的**被触发时**实际上和**位移发生前**的概念是相同的.因此上述代码每次拖拽时至少会打印出1个true.

#### 2.3.1.3 给DOM绑定事件与给document绑定事件的区别

此处我们将上文中讲解JavaScript的EventLoop机制的代码修改1行,来讲解这两者的区别:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #wrapper {
            width: 500px;
            height: 500px;
            border:1px solid navy;
            margin: 100px auto;
        }
    </style>
</head>
<body>
<div id="wrapper"></div>

<script>
    // 记录鼠标点击时的X坐标
    let startX;

    // 记录每次拖拽在X轴上的距离
    let displacementX;

    // 记录总X轴的位移 初始化0个px
    let totalDisplacementX = 0;

    let wrapper = document;

    let start = (event) => {
        event.preventDefault();

        // 记录鼠标点击时的X坐标
        startX = event.clientX;

        wrapper.addEventListener("mousemove", move);
        wrapper.addEventListener("mouseup", end);
    };

    let move = (event) => {
        // 计算本次位移在X轴上的距离
        displacementX = event.clientX - startX;
    };

    let end = (event) => {

        // 打印本次X轴移动距离
        console.log("本次在X轴上拖拽的距离为:" + Math.abs(displacementX) + "px");

        // 打印总X轴的距离
        totalDisplacementX += displacementX;
        console.log("总计在X轴上拖拽的距离为" + Math.abs(totalDisplacementX) + "px");

        wrapper.removeEventListener("mousemove", move);
        wrapper.removeEventListener("mouseup", end);
    };

    wrapper.addEventListener("mousedown", start);

</script>
</body>
</html>
```

运行后发现,我们在页面上任何位置进行拖拽操作,都会在控制台中打印出移动距离的信息.那么我们进一步做一个设想:如果事件对应的callback会改变盒子中的一些属性(比如盒子中的内容),给盒子绑定事件与给document绑定事件,两者的差距在哪儿呢?

答:如果给盒子绑定事件,则只有在盒子上触发事件,JS才会执行事件对应的callback,进而改变盒子中的一些属性;而如果给document绑定事件,则只要在页面上触发事件,就可以改变盒子中的一些属性.具体要把事件绑定给谁,是要看需求的(后文中有一部分内容与这个知识点有关,所以提前先铺垫一下,后文会有一个实例再来讲这个知识点).

### 2.3.2 实现拖拽

#### 2.3.2.1 程序设计
想要实现任何一个功能,都是先设计再实现,因此我们本小节先来考虑一个问题:实现拖拽的代码应该长成什么样?当然我们这里不考虑具体实现的问题.分析问题的思路应该是自顶至低的,解决问题的实现才应该是自底至顶的.

callback是和事件对应的.有1个事件就应该有1个负责处理这个事件的callback.那么拖拽有几个事件呢?

3个.

- 鼠标按下
- 鼠标移动
- 鼠标抬起

初步设计如下:

```javascript
/**
 * @method 本方法用于"鼠标按下"事件被触发时的callback
 * @param {Event} event 事件对象 // TODO: 这玩意儿具体是个啥我也不清楚 回头查查
 * @return {void}
 * */
let down = (event) => {
    console.log("down");
};

/**
 * @method 本方法用于"鼠标移动"事件被触发时的callback
 * @param {Event} event 事件对象
 * @return {void}
 * */
let move = (event) => {
    console.log("move");
};

/**
 * @method 本方法用于"鼠标抬起"事件被触发时的callback
 * @param {Event} event 事件对象
 * @return {void}
 * */
let up = (event) => {
    console.log("up");
};
```

callback定义完毕,callback对应的事件我们也清楚.之后该考虑的2个问题就是:监听谁?何时监听?

这里我们先监听视口,后文中还会提到这个问题.此处的重点在于:**何时监听?**

我们拿出拖拽的定义:先将鼠标按下,再在盒子中移动一段距离,最后放开鼠标.这一全过程为一次拖拽.

所以我们此处以事件为主体来分析监听的时间节点:

- 鼠标按下:只有当鼠标按下时才有可能发生一次拖拽行为,因此对于该事件的监听是持续的,不会取消监听的.
- 鼠标移动:由于拖拽行为需要"先将鼠标按下,再在盒子中移动一段距离,最后放开鼠标",也就是说当鼠标按下的情况下发生鼠标移动的行为,才叫拖拽.因此对于**鼠标移动事件的监听,应该在鼠标按下之后**.但鼠标抬起之后,如果鼠标指针在视口中移动,又不应该触发鼠标移动事件,所以还需要在**鼠标抬起时,解除对视口中鼠标移动事件的监听**.
- 鼠标抬起:这里有一个比较难以发现的逻辑:**在视口中,不是所有的鼠标抬起事件,都是由拖拽这个行为造成的.**举个例子:在视口外按下鼠标,再将鼠标指针移动到视口内,最后在视口内抬起鼠标.这样的鼠标抬起事件,就不是由视口内的拖拽引发的.所以这样的鼠标抬起事件,就不应该引起视口内的图片变化.因此应该**当鼠标在视口内按下之后,再去监听鼠标抬起事件.**同时**在鼠标抬起时,需要解除对视口中鼠标抬起事件的监听.**如果不解除的话,则当鼠标按下事件的callback被调用过至少1次之后(因为是在鼠标按下事件之后才能够监听鼠标抬起事件,所以必须先让鼠标按下事件的callback被执行一次),鼠标抬起事件会一直被监听.则有:当鼠标按下事件的callback被执行后,当鼠标在视口外被按下,之后将鼠标指针移动到视口内,最后在视口内抬起鼠标时,鼠标抬起事件的callback会被调用.而实际上我们对"拖拽"这一系列行为的认知是:鼠标在视口内完成按下、移动、抬起这一系列操作.所以如果不解除对鼠标抬起事件的监听,是和需求不符的.(实在不理解,就把Chrome的Event Listener点出来,分别在解除监听鼠标抬起事件和不解除监听鼠标抬起事件时,在视口内拖拽几次,就明白这段话了)

为了帮助理解,此处列一个事件与绑定的时间节点表格:

![Image text](http://strike.frontend.codingdeath.com/%E4%BA%8B%E4%BB%B6%E4%B8%8E%E7%BB%91%E5%AE%9A%E7%9A%84%E6%97%B6%E9%97%B4%E8%8A%82%E7%82%B9%E8%A1%A8.png)

那么根据这个表格修改代码:

```javascript
/**
 * @method 本方法用于"鼠标按下"事件被触发时的callback
 * @param {Event} event 事件对象 // TODO: 这玩意儿具体是个啥我也不清楚 回头查查
 * @return {void}
 * */
let down = (event) => {
    console.log("down");
    document.getElementById("container").addEventListener("mousemove", move);
    document.getElementById("container").addEventListener("mouseup", up);
};

/**
 * @method 本方法用于"鼠标移动"事件被触发时的callback
 * @param {Event} event 事件对象
 * @return {void}
 * */
let move = (event) => {
    console.log("move");
};

/**
 * @method 本方法用于"鼠标抬起"事件被触发时的callback
 * @param {Event} event 事件对象
 * @return {void}
 * */
let up = (event) => {
    console.log("up");
    document.getElementById("container").removeEventListener("mousemove", move);
    document.getElementById("container").removeEventListener("mouseup", up);
};

document.getElementById("container").addEventListener("mousedown", down);
```

#### 2.3.2.2 禁止浏览器的默认功能

首先,想要实现拖拽功能,就必须先禁止浏览器的默认拖拽事件.如果不禁止,则当鼠标在图片上拖拽时,会出现一张透明度较高的图片随鼠标指针的移动而移动.

```javascript
/**
 * @method 本方法用于"鼠标按下"事件被触发时的callback
 * @param {Event} event 事件对象 // TODO: 这玩意儿具体是个啥我也不清楚 回头查查
 * @return {void}
 * */
let down = (event) => {
    event.preventDefault();
    console.log("down");
    document.getElementById("container").addEventListener("mousemove", move);
    document.getElementById("container").addEventListener("mouseup", up);
};

/**
 * @method 本方法用于"鼠标移动"事件被触发时的callback
 * @param {Event} event 事件对象
 * @return {void}
 * */
let move = (event) => {
    event.preventDefault();
    console.log("move");
};

/**
 * @method 本方法用于"鼠标抬起"事件被触发时的callback
 * @param {Event} event 事件对象
 * @return {void}
 * */
let up = (event) => {
    console.log("up");
    document.getElementById("container").removeEventListener("mousemove", move);
    document.getElementById("container").removeEventListener("mouseup", up);
};
```

#### 2.3.2.3 拖拽实现--问题:拖拽后恢复到原来的位置

基于上面的代码,想要实现拖拽就比较简单了:在down()函数中记录鼠标按下时的X坐标,之后再在move()函数中使用鼠标的当前X坐标减去鼠标按下时的坐标值即可.

```javascript
/**
 * @method 本方法用于"鼠标按下"事件被触发时的callback
 * @param {MouseEvent} event 事件对象 // TODO: 这玩意儿具体是个啥我也不清楚 回头查查
 * @return {void}
 * */
let down = (event) => {
    event.preventDefault();

    // 记录鼠标按下时的X坐标
    downX = event.clientX;

    document.getElementById("container").addEventListener("mousemove", move);
    document.getElementById("container").addEventListener("mouseup", up);
};

/**
 * @method 本方法用于"鼠标移动"事件被触发时的callback
 * @param {MouseEvent} event 事件对象
 * @return {void}
 * */
let move = (event) => {
    let displacementX = event.clientX - downX;
    console.log(displacementX);
    let children = Array.prototype.slice.call(container.children);
    for(let child of children) {
        child.style.transition = "0s";
        child.style.transform = `translate(${displacementX}px)`;
    }
};

/**
 * @method 本方法用于"鼠标抬起"事件被触发时的callback
 * @param {MouseEvent} event 事件对象
 * @return {void}
 * */
let up = (event) => {
    console.log("up");
    document.getElementById("container").removeEventListener("mousemove", move);
    document.getElementById("container").removeEventListener("mouseup", up);
};

document.getElementById("container").addEventListener("mousedown", down);
```

但是这样的实现有一个问题:下一次拖拽时,所有图片将回到原位.出现这个问题的原因很简单:下一次拖拽时,move()函数中的变量displacementX都将被重置为0.至于原因,2.3.1.2小节已经讲过了,此处不再赘述.

#### 2.3.2.4 拖拽改进--拖拽后留在原位

想要实现这个功能,就需要在每一次拖拽行为结束时,记录当次拖拽行为对图片造成的水平位移像素值(我们称它为deltaX).并将每一次拖拽行为对图片造成的水平位移像素值相加,该值表示历史拖拽行为对图片造成的水平位移像素值(我们称它为lastX).则根据这两个值,我们就可以推算本次拖拽对图片造成的水平位移像素值(我们称它为totalX)计算公式: totalX = lastX + deltaX;代码实现如下:

```javascript
/**
 * @var {number} 本变量用于记录鼠标按下时的X坐标
 * */
let downX;

/**
 * @var {number} 本变量用于记录所有拖拽行为(含本次拖拽)对图片造成的水平位移像素值
 * */
let totalX = 0;

/**
 * @var {number} 本变量用于记录历史拖拽行为(不含本次拖拽)对图片造成的水平位移像素值
 * */
let lastX = 0;

/**
 * @method 本方法用于"鼠标按下"事件被触发时的callback
 * @param {MouseEvent} event 事件对象 // TODO: 这玩意儿具体是个啥我也不清楚 回头查查
 * @return {void}
 * */
let down = (event) => {
    event.preventDefault();

    // 记录鼠标按下时的X坐标
    downX = event.clientX;

    document.getElementById("container").addEventListener("mousemove", move);
    document.getElementById("container").addEventListener("mouseup", up);
};

/**
 * @method 本方法用于"鼠标移动"事件被触发时的callback
 * @param {MouseEvent} event 事件对象
 * @return {void}
 * */
let move = (event) => {
    /**
     * @var {number} 本变量用于记录本次拖拽行为对图片造成的水平位移像素值
     * */
    let deltaX = event.clientX - downX;
    totalX = lastX + deltaX;
    // console.log("totalX = " +totalX);
    console.log("deltaX = " + deltaX);
    let children = Array.prototype.slice.call(container.children);

    for(let child of children) {
        child.style.transition = "0s";
        child.style.transform = `translate(${totalX}px)`;
    }
};

/**
 * @method 本方法用于"鼠标抬起"事件被触发时的callback
 * @param {MouseEvent} event 事件对象
 * @return {void}
 * */
let up = (event) => {
    console.log("up");
    lastX = totalX;
    console.log("lastX = " + lastX);
    document.getElementById("container").removeEventListener("mousemove", move);
    document.getElementById("container").removeEventListener("mouseup", up);
};

document.getElementById("container").addEventListener("mousedown", down);
```

#### 2.3.2.5 拖拽结束后将图片完整地挪回视口

上述实现还有一个问题:鼠标拖拽之后,视口中会出现这样一种诡异的情况:视口中一部分位置显示的是上一张图片的内容,而另一部分位置显示的是下一张图片的内容.这绝对是不符合人类常识的(而且也没有哪个网站的轮播是这么干的 = = 要这么干估摸着这家公司的前端早让人喷出翔来了).比较符合常识的需求是:拖拽选哪个为结束后播放一个动画,将距离视口最近的一张图片完整地挪回视口中.

此处我们要解释一下"最近"这个概念(这是一个定量概念,不好理解,后文中有定性描述):移出视口的图片的左边框到视口左边框的距离与移入视口图片的左边框到视口左边框的距离.两个距离较小者,最终应该被完整地显示在视口上.

示意图如下:

![Image text](http://strike.frontend.codingdeath.com/%E8%B7%9D%E7%A6%BB%E8%A7%86%E5%8F%A3%E6%9C%80%E8%BF%91%E5%9B%BE%E7%89%87%E7%9A%84%E5%AE%9A%E4%B9%89%E7%A4%BA%E6%84%8F%E5%9B%BE.jpg)

定义清楚了,那么该怎么实现呢?实际上我们不需要真正如图所示的去算2个距离,然后比大小,最终得出应该显示在视口上的图片.我们只需要作如下步骤即可:

- step1. 用totalX 除以视口的宽度(此处就是500)
- step2. 将step1中的值四舍五入,再乘以视口宽度即可

原因:我们从最终需要的值出发,来反推这个结论.我们最终要解决的问题是:当拖拽行为结束(即鼠标放开)时,img元素的translate(Xpx)函数内的X值应该等于多少?我们定性地(上图和定义都是定量描述)描述一下本节的需求:如果视口中当前显示的图片移出视口的范围大于等于视口宽度的一半,则视口中应该显示下一张图片;如果视口中当前显示的图片移出视口的范围小于视口宽度的一半,则视口中应该显示当前图片.

那么这个问题就变成了一道几何证明题:**求证:X = Math.round(totalX / 500) * 500**

以下为证明过程:(Tips:几何太差的可略过证明,直接记结论.不过个人认为记个结论并没有什么卵用)

- step1. 术语定义

当前图片移出视口的距离(以下简称**d1**) = mod(总拖拽距离, 图片宽度)

下一张图片移出视口的距离(以下简称**d2**) = 图片宽度 - mod(总拖拽距离, 图片宽度) (实际上这里的图片宽度就是500,后文的证明过程为方便理解,图片宽度和视口宽度均直接使用常量500代替)

当前图片移出视口的距离与视口宽度的比值(以下简称**rate**) = mod(总拖拽距离, 图片宽度) / 视口宽度  (实际上视口宽度也是500)

所有拖拽行为对图片造成的总移动距离我们称之为**totalX**


- step2. 根据rate的值分类讨论

- conditionA: rate < 0.5

rate < 0.5时的各个距离示意图如下:

![Image text](http://strike.frontend.codingdeath.com/%E8%B7%9D%E7%A6%BB%E8%A7%86%E5%8F%A3%E6%9C%80%E8%BF%91%E5%9B%BE%E7%89%87-rate%20_%200.5.jpg)

此处重复一遍需求:若rate < 0.5,则根据需求,图片1应被放入视口中.

若rate < 0.5,则有:min(d1,d2) = d1 = mod(totalX, 500)

则此时: totalX - d1 = totalX - mod(totalX, 500) = 500 * Math.floor(totalX / 500)

结论:若 rate < 0.5 => X = 500 * Math.floor(totalX / 500)

- conditionB: rate ≥ 0.5

rate < 0.5时的各个距离示意图如下:

![Image text](http://strike.frontend.codingdeath.com/%E8%B7%9D%E7%A6%BB%E8%A7%86%E5%8F%A3%E6%9C%80%E8%BF%91%E5%9B%BE%E7%89%87-rate%20%E2%89%A5%200.5.jpg)

此处重复一遍需求:若rate < 0.5,则根据需求,图片2应被放入视口中.

若rate ≥ 0.5,则有:min(d1, d2) = d2 = 500 - mod(totalX, 500)

则此时:totalX - + d2 = totalX + 500 - mod(totalX, 500) = 500 * Math.ceil(totalX / 500)

结论:若 rate ≥ 0.5 => X = 500 * Math.ceil(totalX / 500)

- step3. 结论

综上所述,无论rate取值是否 ≥ 0.5,X = 500 * Math.round(totalX / 500).结论成立.证毕.

代码实现如下:

```javascript
/**
 * @method 本方法用于"鼠标抬起"事件被触发时的callback
 * @param {MouseEvent} event 事件对象
 * @return {void}
 * */
let up = (event) => {
    // console.log("up");
    lastX = totalX;
    console.log("totalX = " + totalX);
    // console.log("totalX = " + Math.abs(totalX));

    let children = Array.prototype.slice.call(document.getElementById("container").children);
    let inPosition = Math.round(totalX / 500);
    lastX = inPosition * 500;

    console.log("totalX / 500 = " + totalX / 500);
    console.log("mod(totalX, 500) = " + totalX % 500);
    console.log("500 - mod(totalX, 500) = " + (500 - totalX % 500));
    console.log("Math.round(totalX / 500) = " + Math.round(totalX / 500));
    console.log("rate = " + (Math.abs(totalX) % 500) / 500);
    console.log(inPosition);

    for (let child of children) {
        child.style.transition = "";
        child.style.transform = `translate(${lastX}px)`;
    }

    document.getElementById("container").removeEventListener("mousemove", move);
    document.getElementById("container").removeEventListener("mouseup", up);
};
```

#### 2.3.2.6 首张图片向右移出视口后或末张图片向左移出视口后导致视口中空白问题

按照上文中的实现,实际上还有一个问题:首张图片向右移出视口后,或末张图片向左移出视口后,视口中将会呈现一片空白,没有图片了.这肯定是不行的.按照常人的理解应该是:**向右拖拽首张图片后,首张图片回到视口内;向左拖拽末张图片后,末张图片回到视口内.**那么问题来了,上述的代码,怎么改捏?

此处我们首先提供一种比较暴力的解决方案:若totalX为负值,则说明图片向左拖拽,此时若inPosition = -4,则说明末张图片被移出了视口,强行修改inPosition = -3即可保证translate()函数中的值是正确的;若totalX为正值,则说明图片向右拖拽,此时若inPosition = 1,则说明首张图片被移出了视口,强行修改inPosition = 0即可保证保证translate()函数中的值是正确的.

代码如下:

```javascript
    /**
     * @method 本方法用于"鼠标抬起"事件被触发时的callback
     * @param {MouseEvent} event 事件对象
     * @return {void}
     * */
    let up = (event) => {
        // console.log("up");
        lastX = totalX;
        console.log("totalX = " + totalX);
        // console.log("totalX = " + Math.abs(totalX));

        let children = Array.prototype.slice.call(document.getElementById("container").children);
        let inPosition = Math.round(totalX / 500);
        console.log(inPosition);

        // 比较好理解的方式

        // 限制第1张图片向右移动
        if (inPosition >= 1 && totalX > 0) {
            inPosition = 0;
        }

        // 限制最后1张图片向左移动
        if(inPosition <= -4 && totalX < 0) {
            inPosition = -3;
        }

        lastX = inPosition * 500;

        for (let child of children) {
            child.style.transition = "";
            child.style.transform = `translate(${lastX}px)`;
        }

        document.getElementById("container").removeEventListener("mousemove", move);
        document.getElementById("container").removeEventListener("mouseup", up);
    };
```

这样做可以吗?完全可以解决需求.但是往后考虑一步棋,这个做法就GG了:up()函数和render()函数中的inPosition,均表示应该移入视口的图片下标.注意我们在做的事:**组件化开发**.也就是说我们这一坨POP的代码,它的destination是一个类.这也就意味着变量inPosition的重点是一个**私有成员属性**.该成员属性的值由up()方法和render()方法共同维护.所以这种暴力的做法是没有前途的(年轻人你的思想很危险 此处手动狗头保命).所以我们的目标是:**保证inPosition的含义为"应该移入视口的图片下标"的同时,修改这段代码使它实现需求.**

首先我们先考虑一个问题:为什么inPosition的值会出现负值?

答案:当totalX < 0时,**totalX的符号和图片数组下标(也就是数组children的下标)的符号是相反的**.受totalX的影响,inPosition也就出现了负值.

示意图如下:

![Image text](http://strike.frontend.codingdeath.com/totalX%E4%B8%8E%E6%95%B0%E7%BB%84%E4%B8%8B%E6%A0%87%E7%9A%84%E7%AC%A6%E5%8F%B7%E5%85%B3%E7%B3%BB.jpg)

但我们预期中的inPosition是没有负号的(因为数组的下标是没有负号的).这也就意味着我们需要调整上文代码中计算得出的inPosition值(以下简称inPosition计算值),使其能够表示应当移入视口的图片下标(以下简称inPosition正确值).

此处我们来列一下inPosition计算值和inPosition正确值之间的关系:

![Image text](http://strike.frontend.codingdeath.com/inPosition%E8%AE%A1%E7%AE%97%E5%80%BC%E4%B8%8E%E6%AD%A3%E7%A1%AE%E5%80%BC%E7%9A%84%E6%98%A0%E5%B0%84%E5%85%B3%E7%B3%BB.png)

根据这个映射关系,我们需要3步操作,将inPosition计算值转化为inPosition正确值:

- step1. 对inPosition计算值取反,使得少部分计算值和正确值相同(计算值为-3、-2、-1、0时可满足此条件);
- step2. 当inPosition计算值∈[1, +∞)时,取反后inPosition计算值∈(-∞, -1],此时inPosition正确值为0,即Math.max(0,-inPosition);
- step3. 当inPosition计算值∈(-∞, -4]时,取反后inPosition计算值∈[4, +∞),此时inPosition正确值为3,即Math.min(3, -inPosition);

但是实际上step2与step3之间并没有一个逻辑上的递进关系,孰先孰后都可以,因此step2和step3的代码可以简化为1行:

```javascript
// 此处的3是指数组长度
inPosition = Math.min(3, Math.max(0, -inPosition)); 
```

因此,修改后的up()函数的代码为:

```javascript
/**
 * @method 本方法用于"鼠标抬起"事件被触发时的callback
 * @param {MouseEvent} event 事件对象
 * @return {void}
 * */
let up = (event) => {
    // console.log("up");
    lastX = totalX;
    // console.log("totalX = " + totalX);
    // console.log("totalX = " + Math.abs(totalX));

    let children = Array.prototype.slice.call(document.getElementById("container").children);
    let inPosition = -Math.round(totalX / 500);

    // console.log("origin inPosition = " + inPosition);

    inPosition = Math.min(children.length-1, Math.max(0, inPosition));

    // console.log("after change inPosition = " + inPosition);

    lastX = inPosition * -500;

    // console.log("final count lastX = " + lastX);
    // console.log("final totalX = " + totalX);

    for (let child of children) {
        child.style.transition = "";
        child.style.transform = `translate(${lastX}px)`;
    }

    document.getElementById("container").removeEventListener("mousemove", move);
    document.getElementById("container").removeEventListener("mouseup", up);
};
```

此处需要注意的是:由于我们将inPosition值统一置为了一个自然数且inPosition∈[0, 3],所以我们需要在计算lastX时,将负号交给图片宽度(即500)来处理,所以修改了计算lastX的代码.


#### 2.3.2.7 事件的监听--container还是document?

截至目前为止,实际上我们已经比较完善的实现了一个轮播功能.但是还有一个比较不符合人类常理认知的问题:当鼠标按下后(即开始拖拽后),向整个container的左下方移动(即鼠标移动轨迹为一条弧线,该轨迹形似函数f(x)=-x²的图像中 x∈(-∞,0]部分的图像),当鼠标在垂直方向上移出container的高度时,会出现一个诡异的现象:图片不受鼠标拖拽的控制了.

原因:这是因为我们监听的"鼠标移动"和"鼠标抬起"事件,是针对container的.所以当鼠标离开container时,这两个事件就不会再被监听了,进而导致的情况就是:对应的callback也不会再被调用了,因此视觉上看起来图片就hang在原地了.

解决方案:实际上比较符合人类常理认知的需求是:

- 1. 鼠标在container内按下,开始拖拽
- 2. 鼠标在整个页面的任意位置上移动,图片均随拖拽而移动
- 3. 鼠标在整个页面的任意位置上放开,图片不再移动

根据这个需求,我们需要将"鼠标移动"和"鼠标抬起"这两个事件的监听,从对container的监听,修改为对整个文档(也就是document)的监听.

修改后的down()函数和up()函数如下:

```javascript
/**
 * @method 本方法用于"鼠标按下"事件被触发时的callback
 * @param {MouseEvent} event 事件对象 // TODO: 这玩意儿具体是个啥我也不清楚 回头查查
 * @return {void}
 * */
let down = (event) => {
    event.preventDefault();

    // 记录鼠标按下时的X坐标
    downX = event.clientX;

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
};

/**
 * @method 本方法用于"鼠标抬起"事件被触发时的callback
 * @param {MouseEvent} event 事件对象
 * @return {void}
 * */
let up = (event) => {
    lastX = totalX;

    let children = Array.prototype.slice.call(document.getElementById("container").children);

    let inPosition = -Math.round(totalX / 500);
    inPosition = Math.min(children.length-1, Math.max(0, inPosition));

    lastX = inPosition * -500;

    for (let child of children) {
        child.style.transition = "";
        child.style.transform = `translate(${lastX}px)`;
    }

    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
};
```

## 2.3 轮播库的封装

在上文中,我们已经实现了一个完整的轮播功能.但是还有一个巨大的问题:这一坨POP的代码,仅仅能够实现功能.受代码组织形式的影响,他们无法成为一个库,进而让这个库可以被其他开发者调用.因此我们需要将这些函数封装成一个类,以便其他开发者可以调用.

### 2.3.1 第一个坑--普通函数函数体内的this与箭头函数函数体内的this

初步的想法我们只要把之前实现的所有函数写到一个类(Carousel类 即轮播类)中,并将之前定义的变量写为该类的成员属性即可.HTML和JS代码如下:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .carousel {
            width: 500px;
            height: 300px;
            /*overflow: hidden;*/
            overflow: visible;
            white-space: nowrap;
            margin: 100px auto;
            border: 3px solid blue;
        }

        .carousel>img {
            width: 100%;
            height: 100%;
            display: inline-block;
            transition: ease 0.5s;
        }
    </style>
    <script src="17-carousel-normalFuncOrArrowFunc.js"></script>
</head>
<body>
<div id="container">

</div>
<script>
    let data = [
        "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
        "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
        "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
        "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    ];

    let carousel = new Carousel(document.getElementById("container"), data);
</script>
</body>
</html>
```

```javascript
class Carousel {
    constructor(container, data) {
        this._container = container;
        this._outPosition = 0;
        this._inPosition = null;
        this._data = data;
        this._downX = 0;
        this._totalX = 0;
        this._lastX = 0;
        this._children = null;
        this.addClassNameForContainer();
        this.createAndAppendImgElements();
        this.alterTwoImg();
    }

    /**
     * @method 本方法用于给轮播组件的容器DOM对象增加一个classname
     * @return {void}
     * */
    addClassNameForContainer() {
        this._container.classList.add("carousel");
    }

    /**
     * @method 本方法用于根据list中元素的数量创建对应数量的img元素,并将创建的每个img作为container的子元素挂载到DOM树上
     * @return {void}
     * */
    createAndAppendImgElements() {
        for(let d of this._data) {
            let e = document.createElement("img");
            e.src = d;
            this._container.appendChild(e);
        }
    }

    /**
     * @method 本方法用于每3秒切换1张图片 但仅改变2张图片的位置 同时实现将需要移入视口的图片移动到视口的右侧
     * 以便所有图片在视口中呈现的效果均为:从右向左位移
     * @return {void}
     * */
    alterTwoImg() {
        this._children = Array.prototype.slice.call(this._container.children);

        let nextImg = () => {
            this._inPosition = this._outPosition + 1;
            this._outPosition = this._outPosition % this._children.length;
            this._inPosition = this._inPosition % this._children.length;

            let outImg = this._children[this._outPosition],
                inImg = this._children[this._inPosition];

            inImg.style.transition = "0s";
            inImg.style.transform = `translate(${100 - 100 * this._inPosition}%)`;

            setTimeout(() => {
                outImg.style.transition = "";
                outImg.style.transform = `translate(${-100 - 100 * this._outPosition}%)`;

                inImg.style.transition = "";
                inImg.style.transform = `translate(${-100 * this._inPosition}%)`;

                this._outPosition = this._outPosition + 1;
            }, 16);
            setTimeout(nextImg, 3000);
        };

        // TODO:此处由于需要动画库的支持 所以暂时无法实现既拖拽又轮播的功能
        // setTimeout(nextImg, 3000);
        
        this._container.addEventListener("mousedown", this.down);
    }

    /**
     * @method 本方法用于"鼠标按下"事件被触发时的callback
     * @param {MouseEvent} event 事件对象
     * @return {void}
     * */
    down(event) {
        console.log(this);
        event.preventDefault();

        // 记录鼠标按下时的X坐标
        this._downX = event.clientX;

        document.addEventListener("mousemove", this.move);
        document.addEventListener("mouseup", this.up);
    }

    /**
     * @method 本方法用于"鼠标移动"事件被触发时的callback
     * @param {MouseEvent} event 事件对象
     * @return {void}
     * */
    move(event) {
        console.log("move");
        event.preventDefault();
        /**
         * @var {number} 本变量用于记录本次拖拽行为对图片造成的水平位移像素值
         * */
        let deltaX = event.clientX - this._downX;
        this._totalX = this._lastX + deltaX;

        for(let child of this._children) {
            child.style.transition = "0s";
            child.style.transform = `translate(${this._totalX}px)`;
        }
    }

    /**
     * @method 本方法用于"鼠标抬起"事件被触发时的callback
     * @param {MouseEvent} event 事件对象
     * @return {void}
     * */
    up(event) {
        this._lastX = this._totalX;

        this._inPosition = -Math.round(this._totalX / 500);
        this._inPosition = Math.min(this._children.length-1, Math.max(0, this._inPosition));

        this._lastX = this._inPosition * -500;

        for (let child of this._children) {
            child.style.transition = "";
            child.style.transform = `translate(${this._lastX}px)`;
        }

        document.removeEventListener("mousemove", this.move);
        document.removeEventListener("mouseup", this.up);
    }
}
```

跑起来之后我们发现了一个问题:成员方法down()能够被调用到,但成员方法move()与成员方法up()无法被调用到.为什么会出现这种情况呢?

答案:这与普通函数中的this指针的指向有关.普通函数的this指针,指向的是**函数的调用者**.

先回答这个问题的前半部分:为什么down()方法能被调用到呢?这里我们就要看alterTwoImg()方法了.首先alterTwoImg()方法是个普通函数,根据之前的定义,普通函数的this指针,指向的是函数的调用者.alterTwoImg()方法在Carousel类的构造中被调用,因此该方法的方法体内的this,指向的是Carousel类的实例.因此在alterTwoImg()方法中调用this.down,是能够调用到的.

再回答这个问题的后半部分:为什么move()和up()方法无法被调用到?这里需要看down()方法.down()方法作为一个普通函数,根据之前的定义,普通函数的this指针指向的是函数的调用者.那么问题来了:谁是down()方法的调用者?看下面一行代码:

```javascript
this._container.addEventListener("mousedown", this.down);
```

这句话的意思非常明确:当鼠标按下事件被触发时,调用方法this.down.可是问题在于:谁来调用this.down?我们在down()方法中打印了this,发现this指针指向的是一个DOM元素(也就是this._container).这就足以证明:是这个DOM元素调用了down()方法.换言之:此时down()方法的方法体内的this指针,指向的是一个DOM元素.那么这个DOM元素必然没有move()和up()方法.因此move()方法和up()方法没有被调用到.

那么,怎么破呢?

解决方案:箭头函数.[箭头函数的函数体内的this指针指向的是函数定义时所在的对象,而非使用时所在的对象.](http://es6.ruanyifeng.com/#docs/function#%E4%BD%BF%E7%94%A8%E6%B3%A8%E6%84%8F%E7%82%B9)

根据这个定义,我们只要在绑定/解绑事件时使用箭头函数的方式调用up()、move()、down()即可.修改后的JS代码如下:

```javascript
class Carousel {
    constructor(container, data) {
        this._container = container;
        this._outPosition = 0;
        this._inPosition = null;
        this._data = data;
        this._downX = 0;
        this._totalX = 0;
        this._lastX = 0;
        this._children = null;
        this.addClassNameForContainer();
        this.createAndAppendImgElements();
        this.alterTwoImg();
    }

    /**
     * @method 本方法用于给轮播组件的容器DOM对象增加一个classname
     * @return {void}
     * */
    addClassNameForContainer() {
        this._container.classList.add("carousel");
    }

    /**
     * @method 本方法用于根据list中元素的数量创建对应数量的img元素,并将创建的每个img作为container的子元素挂载到DOM树上
     * @return {void}
     * */
    createAndAppendImgElements() {
        for(let d of this._data) {
            let e = document.createElement("img");
            e.src = d;
            this._container.appendChild(e);
        }
    }

    /**
     * @method 本方法用于每3秒切换1张图片 但仅改变2张图片的位置 同时实现将需要移入视口的图片移动到视口的右侧
     * 以便所有图片在视口中呈现的效果均为:从右向左位移
     * @return {void}
     * */
    alterTwoImg() {
        this._children = Array.prototype.slice.call(this._container.children);

        let nextImg = () => {
            this._inPosition = this._outPosition + 1;
            this._outPosition = this._outPosition % this._children.length;
            this._inPosition = this._inPosition % this._children.length;

            let outImg = this._children[this._outPosition],
                inImg = this._children[this._inPosition];

            inImg.style.transition = "0s";
            inImg.style.transform = `translate(${100 - 100 * this._inPosition}%)`;

            setTimeout(() => {
                outImg.style.transition = "";
                outImg.style.transform = `translate(${-100 - 100 * this._outPosition}%)`;

                inImg.style.transition = "";
                inImg.style.transform = `translate(${-100 * this._inPosition}%)`;

                this._outPosition = this._outPosition + 1;
            }, 16);
            setTimeout(nextImg, 3000);
        };

        // TODO:此处由于需要动画库的支持 所以暂时无法实现既拖拽又轮播的功能
        // setTimeout(nextImg, 3000);
        this._container.addEventListener("mousedown", (event) => {this.down(event)});
    }

    /**
     * @method 本方法用于"鼠标按下"事件被触发时的callback
     * @param {MouseEvent} event 事件对象
     * @return {void}
     * */
    down(event) {
        console.log(this);
        event.preventDefault();

        // 记录鼠标按下时的X坐标
        this._downX = event.clientX;

        document.addEventListener("mousemove", (event) => {this.move(event)});
        document.addEventListener("mouseup", (event) => {this.up(event)});
    }

    /**
     * @method 本方法用于"鼠标移动"事件被触发时的callback
     * @param {MouseEvent} event 事件对象
     * @return {void}
     * */
    move(event) {
        console.log("move");
        event.preventDefault();
        /**
         * @var {number} 本变量用于记录本次拖拽行为对图片造成的水平位移像素值
         * */
        let deltaX = event.clientX - this._downX;
        this._totalX = this._lastX + deltaX;

        for(let child of this._children) {
            child.style.transition = "0s";
            child.style.transform = `translate(${this._totalX}px)`;
        }
    }

    /**
     * @method 本方法用于"鼠标抬起"事件被触发时的callback
     * @param {MouseEvent} event 事件对象
     * @return {void}
     * */
    up(event) {
        this._lastX = this._totalX;

        this._inPosition = -Math.round(this._totalX / 500);
        this._inPosition = Math.min(this._children.length-1, Math.max(0, this._inPosition));

        this._lastX = this._inPosition * -500;

        for (let child of this._children) {
            child.style.transition = "";
            child.style.transform = `translate(${this._lastX}px)`;
        }

        document.removeEventListener("mousemove", (event) => {this.move(event)});
        document.removeEventListener("mouseup", (event) => {this.up(event)});
    }
}
```

再运行一下,确实我们解决的move()和up()调用不起来的问题,但我们引入了一个新的问题:无法解除事件的绑定.也就是我们的removeEventListener()失效了.这个问题我们下一小节解决.

### 2.3.2 第二个坑--addEventListener()与removeEventListener()的参数一致性问题

欲要解决纷争,必先陷入纷争.--审判天使

所以我们就要先明白,这个问题是如何产生的:造成removeEventListener()失效的原因在于:由于addEventListener()时绑定的callback是一个匿名函数(也就是我们上文中使用的箭头函数),所以在removeEventListener()时,是无法找到这个函数的,因此解绑失效.

解决方案:将callback定义为Carousel类的成员属性,以便能够在addEventListener()时以普通函数的形式(实际上这几个成员属性也是箭头函数)绑定事件与callback之间的关系,进而在removeEventListener()时能够指明需要解绑的事件与函数.

修改后的JS代码如下:

```javascript
class Carousel {
    constructor(container, data) {
        this._container = container;
        this._outPosition = 0;
        this._inPosition = null;
        this._data = data;
        this._downX = 0;
        this._totalX = 0;
        this._lastX = 0;
        this._children = null;

        this.down = (event) => {
            console.log(this);
            event.preventDefault();

            // 记录鼠标按下时的X坐标
            this._downX = event.clientX;

            document.addEventListener("mousemove", this.move);
            document.addEventListener("mouseup", this.up);
        };

        this.move = (event) => {
            console.log("move");
            event.preventDefault();
            /**
             * @var {number} 本变量用于记录本次拖拽行为对图片造成的水平位移像素值
             * */
            let deltaX = event.clientX - this._downX;
            this._totalX = this._lastX + deltaX;

            for(let child of this._children) {
                child.style.transition = "0s";
                child.style.transform = `translate(${this._totalX}px)`;
            }
        };

        this.up = (event) => {
            this._lastX = this._totalX;

            this._inPosition = -Math.round(this._totalX / 500);
            this._inPosition = Math.min(this._children.length-1, Math.max(0, this._inPosition));

            this._lastX = this._inPosition * -500;

            for (let child of this._children) {
                child.style.transition = "";
                child.style.transform = `translate(${this._lastX}px)`;
            }

            document.removeEventListener("mousemove", this.move);
            document.removeEventListener("mouseup", this.up);
        };

        this.addClassNameForContainer();
        this.createAndAppendImgElements();
        this.alterTwoImg();
    }

    /**
     * @method 本方法用于给轮播组件的容器DOM对象增加一个classname
     * @return {void}
     * */
    addClassNameForContainer() {
        this._container.classList.add("carousel");
    }

    /**
     * @method 本方法用于根据list中元素的数量创建对应数量的img元素,并将创建的每个img作为container的子元素挂载到DOM树上
     * @return {void}
     * */
    createAndAppendImgElements() {
        for(let d of this._data) {
            let e = document.createElement("img");
            e.src = d;
            this._container.appendChild(e);
        }
    }

    /**
     * @method 本方法用于每3秒切换1张图片 但仅改变2张图片的位置 同时实现将需要移入视口的图片移动到视口的右侧
     * 以便所有图片在视口中呈现的效果均为:从右向左位移
     * @return {void}
     * */
    alterTwoImg() {
        this._children = Array.prototype.slice.call(this._container.children);

        let nextImg = () => {
            this._inPosition = this._outPosition + 1;
            this._outPosition = this._outPosition % this._children.length;
            this._inPosition = this._inPosition % this._children.length;

            let outImg = this._children[this._outPosition],
                inImg = this._children[this._inPosition];

            inImg.style.transition = "0s";
            inImg.style.transform = `translate(${100 - 100 * this._inPosition}%)`;

            setTimeout(() => {
                outImg.style.transition = "";
                outImg.style.transform = `translate(${-100 - 100 * this._outPosition}%)`;

                inImg.style.transition = "";
                inImg.style.transform = `translate(${-100 * this._inPosition}%)`;

                this._outPosition = this._outPosition + 1;
            }, 16);
            setTimeout(nextImg, 3000);
        };

        // TODO:此处由于需要动画库的支持 所以暂时无法实现既拖拽又轮播的功能
        // setTimeout(nextImg, 3000);
        this._container.addEventListener("mousedown", this.down);
    }
}
```

此处唯一需要注意的是构造中的代码书写顺序:

一定要先定义this.down、this.move、this.up,再去调用它们.换言之,如果在构造中,先调用alterTwoImg(),再去定义this.down、this.move、this.up,则无法绑定事件,因为此时在alterTwoImg()被执行时,this.down尚未被定义,此时在alterTwoImg()方法中打印this.down,结果为undefined.

比较好的构造函数代码书写顺序:

- 1. 赋值
- 2. 绑定函数
- 3. 调用函数

至此,轮播库的实现已全部结束.完结撒花.



