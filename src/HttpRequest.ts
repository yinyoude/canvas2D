export interface HttpResponse {
    success : boolean ;                                 // http 请求成功，返回 true，否则返回 false
    responseType : XMLHttpRequestResponseType ;         // 返回请求的资源类型
    response : any ;                                    // 根据请求的类型不同，可能返回的是字符串、ArrayBuffer 或 blob 对象，因此使用 any 类型
}

export class HttpRequest {
    
    /**
     * @param url {String} 请求资源的url 
     * @return: HttpResponse
     */    
    public static doGet ( url : string ) : HttpResponse {
        // 初始化 XMLHttpRequest 对象
        let xhr : XMLHttpRequest = new XMLHttpRequest () ;
        // XHR 的 open 函数的第三个参数 true 表示异步请求， false 表示同步请求
        // 笨函数是同步请求函数，因此未 false
        xhr . open ( "get" , url , false , null , null ) ;
        // 向服务器发送请求
        xhr . send () ;
        // 请求发送成功
        if ( xhr.status == 200 ) {
            // 返回自己定义的 HttpResponse 接口对象
            // 这里可以看到接口的第二种用法
            // 并没有实现该接口，但是可以用大括号及键值对方式来定义接口（其实和JS定义对象是一样的方式）
            // 可以把这种接口当成纯数据类来使用
            return { success : true , responseType : "text" , response : xhr . response };
        } else {
            // 请求失败， success 标记为 false， response 放回 Null
            return { success : false , responseType : "text" , response : null }
        }

    }
}