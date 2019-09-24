class Carousel {
    constructor(container, data) {
        // 此处必须将需要绑定到事件上的callback明确定义为Carousel类的成员属性
        // 否则在绑定/解绑事件监听时 只能使用箭头函数 使得this指针指向的引用为Carousel类的实例
        // 因此需要明确将callback定义为本类的成员属性 以便addEventListener和removeEventListener的参数是相同的
        this.down = (event) => {
            event.preventDefault();

            // 记录鼠标按下时的X坐标
            this._downX = event.clientX;

            // 此处由于this.down的
            document.addEventListener("mousemove", this.move);
            document.addEventListener("mouseup", this.up);
        };

        this.move = (event) => {
            // console.log(this);
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
            console.log("up");

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

        // TODO: 此处打印this 是Carousel类的实例 但打印this.down 是一个undefined 为什么?
        console.log(this);
        console.log(this.down);
        // TODO:此处由于需要动画库的支持 所以暂时无法实现既拖拽又轮播的功能
        // setTimeout(nextImg, 3000);
        // this._container.addEventListener("mousedown", (e) => {this.down(e)});
        this._container.addEventListener("mousedown", this.down);
    }
}