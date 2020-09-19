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