export class Canvas2D {
    // 声明 public 访问级别的成员变量
    public context: CanvasRenderingContext2D | null;
    // public 访问级别的构造函数
    public constructor ( canvas: HTMLCanvasElement ) {
        this.context = canvas.getContext("2d")
    }
    // public 访问级别的成员函数
    public drawText (text: string): void {
        if ( this.context ) {
            // Canvas2D 和 webGL 这种底层绘图 API 都是状态机模式
            //每次绘制前调用 save 将即将要修改的状态记录下来
            //每次绘制后调用 restore 将已修复的状态丢弃，恢复到初始化的状态
            //这样的好处是状态不会混乱
            //假设当前绘制文本使用红色，如果你没有使用 save/restore 配对函数的话
            //则下次调用其他绘图函数的时候，如果你没更改颜色，，则会继续使用上次设置的红色进行绘制
            //随着程序越来越复杂，如果不使用 save/restore 来管理，最后整个渲染状态会极其混乱
            //请时刻保持使用 save/restore 配对函数来管理渲染状态
            this.context.save();
            //让要绘制的文本居中对齐
            this.context.textBaseline = "middle";
            this.context.textAlign = "center";
            //计算 canvas 的中心坐标
            let centerX: number = this.context.canvas.width * 0.5;
            let centerY: number = this.context.canvas.height * 0.5;
            //红色填充
            // this.context.fillStyle = "red";
            //调用文字填充命令
            this.context.fillText(text, centerX, centerY);
            //绿色描边
            this.context.strokeStyle = "green";
            //调用文字描边命令
            this.context.strokeText(text, centerX, centerY);
            //将上面 context 中的 textAlign, extBaseLine, fillStyle, strokeStyle 状态恢复到初始状态
            this.context.restore();
        }
    }
}