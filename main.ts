import { Canvas2D } from "./canvas2d/Canvas2D"

let canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;

if( canvas == null ) {
    alert( "无法获取 HTMLCanvasElement !!! " );
    throw new Error( "无法获取 HTMLCanvasElement !!! " );
}

let canvas2d: Canvas2D = new Canvas2D( canvas );
canvas2d.drawText( "Hello World" )