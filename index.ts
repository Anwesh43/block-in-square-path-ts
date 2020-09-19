import { ContextReplacementPlugin } from "webpack"

const colors : Array<string> = [
    "#F44336",
    "#4CAF50",
    "#03A9F4",
    "#FFEB3B",
    "#3F51B5"
]
const parts : number = 5 
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90
const pathFactor : number = 3 
const blockSizeFactor : number = 3.4 
const backColor : string = "#bdbdbd"
const delay : number = 20
const w : number = window.innerWidth 
const h : number = window.innerHeight 

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class Animator {

    animated : boolean = false 
    interval : number 

    start(cb : Function) {
        if (!this.animated) {
            this.animated = true 
            this.interval = setInterval(cb, delay)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false 
            clearInterval(this.interval)
        }
    }
}

class DrawingUtil {

    static drawBlockInSquare(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / blockSizeFactor 
        const pathSize : number = Math.min(w, h) / pathFactor 
        const sf : number = ScaleUtil.sinify(scale)
        context.save()
        context.translate(w / 2, h / 2)
        var deg : number = 0
        var currSc = 0 
        const bSize : number = size * ScaleUtil.divideScale(sf, 0, parts)
        for (var j = 0; j < parts - 1; j++) {
            const sfj : number = ScaleUtil.divideScale(sf, j + 1, parts)
            deg += Math.PI / 2 * Math.floor(sfj)
            currSc = sfj > 0 && sfj < 1 ? sfj : 0 
        }
        context.rotate(deg)
        context.translate(-pathSize / 2 - bSize / 2, -pathSize / 2)
        context.fillRect(pathSize * currSc, -bSize / 2, bSize, bSize)
        context.restore() 
    } 

    static drawBISNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.fillStyle = colors[i]
        DrawingUtil.drawBlockInSquare(context, scale)
    }
}

class State {

    scale : number = 0 
    dir : number = 0
    prevScale : number = 0 

    update(cb : Function) {
        this.scale += this.dir * scGap 
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir 
            this.dir = 0 
            this.prevScale = this.scale 
            cb()
        }
    }

    startUpdating(cb : Function) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale 
            cb()
        }
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D 

    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor 
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {
        
        }
    }

    static init() {
        const stage : Stage = new Stage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}