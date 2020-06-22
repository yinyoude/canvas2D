import { IDoom3Token, IDoom3Tokenizer, Doom3Factory, ETokenType } from "./src/doom3Tokenizer";
import { HttpRequest, HttpResponse } from "./src/HttpRequest";

let str : string = `
    numMeshes 5
    joints {
        "origin" -1 ( 0 0 0 ) ( -0.5 -0.5 -0.5 )
        "Body" 0 ( -12.1038131714 0 79.004776001 ) ( -0.5 -0.5 -0.5 )
    }
`;

/* // 从 Dooms3Factory 工厂创建 IDoom3Tokenizer 接口
let tokenizer: IDoom3Tokenizer = Doom3Factory . createDoom3Tokenizer ();
// IDoom3Tokenizer 要解析的数据源
let token : IDoom3Token = tokenizer . createIDoom3Token (); */
let tokenizer = Doom3Factory.createDoom3Tokenizer()

// 设置 IDoom3Tokenizer 要解析的数据源
tokenizer . setSource ( str );

// getNextToken 函数返回 true，说明没有到达字符串的结尾，仍有 Token 需要解析
// 解析的结果以传引用的方式从参数 token 中传出来
// 如果 getNextToken 返回 false，说明已经到达字符串结尾，则停止循环
/* while ( tokenizer . moveNext() ) {
    // 如果当前的 Token 的 type 是 Number 类型
    if ( tokenizer .current . type === ETokenType . NUMBER ) {
        console . log ( " NUMBER : " + tokenizer .current . getFloat () );   // 输出该数字的浮点值
    } else if ( tokenizer .current . isString ( " joints " ) ) {
        // 如果当前 TOken 是字符串类型，并且其值是 joints，则输出
        console . log ( " 开始解析 joints 数据 " );
    } else {    // 否则获取当前 Token 的字符串值
        console . log ( " STRING : " + tokenizer .current . getString () )
    }

} */
//从服务器请求level.proc文件，该文件是Doom3的关卡文件，261k字节，word中字数统计，将近7万个单词
let response : HttpResponse = HttpRequest . doGet ( "level.proc" ) ;

//请求成功的话，进行文件解析
if ( response.success === true ) {
    //将response转换为string类型，因为我们知道是文本文件
    str = response.response as string;

    //设置要解析的字符串
    tokenizer.setSource( str );
    while ( tokenizer.moveNext() ) {
        if ( tokenizer.current.type === ETokenType.NUMBER ) {
            console.log( "NUMBER : " + tokenizer.current.getFloat() );
        }
        else {
            console.log( "STRING : " + tokenizer.current.getString() );
        }
    }
}
