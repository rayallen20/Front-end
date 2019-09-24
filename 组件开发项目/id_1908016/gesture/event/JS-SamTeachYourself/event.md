# 第9章 用JS处理事件

主要内容:

- 1. 什么是事件
- 2. 事件处理器是什么,以及它们的用途
- 3. 添加事件处理器的不同方法
- 4. 如何使用event对象
- 5. 事件冒泡和捕获

问题背景:想要让程序对那些在浏览器中发生的行为作出响应,因此出现了事件(event).

## 9.1 事件的类型

比较常规的事件有:鼠标事件、键盘事件、DOM对象事件和表单事件.[详细事件参考可参阅MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events)

## 9.2 事件处理器

事件处理器(eventHandler)的定义:当JS检测到一个特定的事件时,所执行的一段代码.

### 9.2.1 内联事件处理器

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #wrapper {
            width: 300px;
            height: 300px;
            margin: 100px auto;
            border: 5px solid cornflowerblue;
        }
    </style>
</head>
<body>
<div id="wrapper" onclick="alert('123')">

</div>
</body>
</html>
```

缺点:

- 1. 将元素的展示层代码和行为层代码放到了一起.
- 2. 当eventHandler的代码较为复杂、代码量较大时,这种方式会导致代码无法维护.

### 9.2.2 作为DOM对象属性的事件处理器

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #wrapper {
            width: 300px;
            height: 300px;
            margin: 100px auto;
            border: 5px solid navy;
        }
    </style>
</head>
<body>
<div id="wrapper"></div>
<script>
    let wrapper = document.getElementById("wrapper");

    let clickEventHandler1 = (event) => {
        alert("clickEventHandler1");
    };

    let clickEventHandler2 = (event) => {
        alert("clickEventHandler2");
    };

    wrapper.onmousedown = clickEventHandler1;
    wrapper.onmousedown = clickEventHandler2;

</script>
</body>
</html>
```

缺点:

- 1. 如demo所示,无法给同一个DOM的同一个事件添加多个eventHandler.后者会覆盖前者.

### 9.2.3 使用addEventListener()

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #wrapper {
            width: 300px;
            height: 300px;
            margin: 100px auto;
            border: 5px solid navy;
        }
    </style>
</head>
<body>
<div id="wrapper"></div>
<script>
    let wrapper = document.getElementById("wrapper");

    let clickEventHandler1 = (event) => {
        alert("clickEventHandler1");
    };

    let clickEventHandler2 = (event) => {
        alert("clickEventHandler2");
    };

    wrapper.addEventListener("mousedown", clickEventHandler1);
    wrapper.addEventListener("mousedown", clickEventHandler2);

</script>
</body>
</html>
```

优点:

```
// TODO:这句话是书上的原话,我没看懂啥意思.我认为是我对DOM树没概念导致的这句话理解不能.
```

- 1. <font color="red">可以在任何DOM节点上调用addEventListener()方法(不仅仅是页面元素) </font>
- 2. 可以对同一个DOM下的同1个事件绑定多个eventHandler,且多个eventHandler之间的执行先后顺序与绑定的先后顺序是一致的.

注:既然能够绑定eventHandler给事件,就应该能够解绑.所以很自然地也有removeEventListener().需要注意的是,使用匿名函数的方式添加的eventHandler,不能够使用removeEventHandler()来移除.

## 9.3 event对象

问题背景:开发者们想要在eventHandler中获取到与事件相关的、更多的、更详细的信息.因此DOM提供了一个event对象,该对象中包含了这种信息.且这个event对象会自动传递给eventHandler.

### 9.3.1 阻止默认行为

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<a href="https://www.baidu.com/" target="_blank" id="go">GO TO BaiDu</a>
<a href="https://www.baidu.com/" target="_blank" id="notGo">NOT GO TO BaiDu</a>
<script>
    let go = document.getElementById("go");
    let notGo = document.getElementById("notGo");

    let allowGo = (event) => {
        alert("allow go to baiDu");
    };

    let forbiddenGo = (event) => {
        event.preventDefault();
        alert("forbidden go to baiDu");
    };

    go.addEventListener("click", allowGo);
    notGo.addEventListener("click", forbiddenGo);
</script>
</body>
</html>
```

重点:event.preventDefault()可阻止DOM的默认行为.

### 9.3.2 事件冒泡与捕获

#### a. 冒泡

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
            margin: 100px auto;
            border: 5px solid cornflowerblue;
        }

        #inner {
            width: 300px;
            height: 300px;
            margin: 100px auto;
            border: 5px solid skyblue;
        }
    </style>
</head>
<body>
<div id="wrapper">
    <div id="inner">

    </div>
</div>

<script>
    let wrapper = document.getElementById("wrapper");
    let inner = document.getElementById("inner");

    let wrapperMousedownEventHandler = (event) => {
        alert("wrapper alert");
    };

    let innerMousedownEventHandler = (event) => {
        alert("inner alert");
    };

    wrapper.addEventListener("mousedown", wrapperMousedownEventHandler, false);
    inner.addEventListener("mousedown", innerMousedownEventHandler, false);
</script>
</body>
</html>
```

addEventListener()方法的第3个可选参数,该参数可以为boolean.

- 1. true:在捕获阶段移除事件句柄
- 2. false:在冒泡阶段移除事件句柄

所以此处需要明确的定义是**捕获**和**冒泡**.

前提:如本小节的demo所示,现有一div嵌套在另外一个div中,我们给这2个div的同一个事件(此处我们使用的是mousedown事件举例)分别绑定不同的eventHandler.那么当我们在浏览器中点击id="inner"的div时:

- **冒泡**:先触发内部元素的eventHandler,再触发外部元素的eventHandler.
- **捕获**:与冒泡相反,先触发外部元素的eventHandler,在触发内部元素的eventHandler.

本段demo描述的就是捕获状态下事件的触发顺序

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
            margin: 100px auto;
            border: 5px solid cornflowerblue;
        }

        #inner {
            width: 300px;
            height: 300px;
            margin: 100px auto;
            border: 5px solid skyblue;
        }
    </style>
</head>
<body>
<div id="wrapper">
    <div id="inner">
    </div>
</div>

<script>
    let wrapper = document.getElementById("wrapper");
    let inner = document.getElementById("inner");

    let wrapperMousedownEventHandler = (event) => {
        alert("wrapper alert");
    };

    let innerMousedownEventHandler = (event) => {
        alert("inner alert");
    };

    wrapper.addEventListener("mousedown", wrapperMousedownEventHandler, true);
    inner.addEventListener("mousedown", innerMousedownEventHandler, true);
</script>
</body>
</html>
```

### 9.3.3 关闭冒泡和捕获

问题背景:当嵌套元素都对同一个时间绑定了eventHandler,且仅希望内部元素的eventHandler生效(即不触发外部元素的eventHandler),此时需对该事件设置阻止冒泡.

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
            margin: 100px auto;
            border: 5px solid cornflowerblue;
        }

        #inner {
            width: 300px;
            height: 300px;
            margin: 100px auto;
            border: 5px solid skyblue;
        }
    </style>
</head>
<body>
<div id="wrapper">
    <div id="inner">

    </div>
</div>

<script>
    let wrapper = document.getElementById("wrapper");
    let inner = document.getElementById("inner");

    let wrapperMousedownEventHandler = (event) => {
        alert("wrapper alert");
    };

    let innerMousedownEventHandler = (event) => {
        alert("inner alert");
        event.stopPropagation();
    };

    wrapper.addEventListener("mousedown", wrapperMousedownEventHandler, false);
    inner.addEventListener("mousedown", innerMousedownEventHandler, false);
</script>
</body>
</html>
```

keyWord:event.stopPropagation()

注:event.target

event.target:该属性描述了一个事件最初被检测到时的元素.在冒泡的过程中,该属性值不会改变.

注:mousedown、mouseup、click事件的触发顺序?

mousedown和mouseup事件都在click事件之前被触发

遗留问题:

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
            margin: 100px auto;
            border: 5px solid cornflowerblue;
        }

        #inner {
            width: 300px;
            height: 300px;
            margin: 100px auto;
            border: 5px solid skyblue;
        }
    </style>
</head>
<body>
<div id="wrapper">
    <div id="inner">
    </div>
</div>

<script>
    let wrapper = document.getElementById("wrapper");
    let inner = document.getElementById("inner");

    let wrapperMousedownEventHandler = (event) => {
        alert("wrapper alert");
    };

    let innerMousedownEventHandler = (event) => {
        alert("inner alert");
    };

    wrapper.addEventListener("mousedown", wrapperMousedownEventHandler, false);
    inner.addEventListener("mousedown", innerMousedownEventHandler, true);
</script>
</body>
</html>
```

如上文demo,给inner的mousedown时间设置为捕获,给wrapper的mousedown事件设置为冒泡.点击inner,还是会先触发inner的eventHandler,为什么?

这个问题我此时无法解释.这就说明一个问题:我对事件传播机制不了解.需要继续跟进