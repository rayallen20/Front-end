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
        // 这里能调到down,是因为此处上下文的this指针 指向的是本类(Carousel)的实例 所以能调到down
        // 此处必须采用第1种写法 其核心原理在于:箭头函数的函数体内的this指针指向的是定义时所在的对象 而非使用时所在的对象
        // 采用第1种写法 则down()的定义是在Carousel类被实例化时生效的 因此对于down()函数而言 根据核心原理 其函数体内的this指向的是Carousel类的实例
        // 采用第2种写法 虽然也可以使down()函数被调用到 但down()的定义是在鼠标按下事件被触发时生效的 所以这种情况下down()函数体内的this指针 指向的是DOM 而非Carousel类的实例
        // this._container.addEventListener("mousedown", (e) => {this.down(e)});
        this._container.addEventListener("mousedown", this.down);
    }

    /**
     * @method 本方法用于"鼠标按下"事件被触发时的callback
     * @param {MouseEvent} event 事件对象
     * @return {void}
     * */
    down(event) {
        console.log(this);
        // 此处的this指针 指向的不是本类(Carousel)的实例 而是一个DOM元素 进而导致
        // document.addEventListener("mousemove", this.move); 这行代码无法执行
        // 因为this指针指向的DOM 没有move这个成员方法
        // TODO: 通常情况前端如何解决这个问题?
        // console.log(this);
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