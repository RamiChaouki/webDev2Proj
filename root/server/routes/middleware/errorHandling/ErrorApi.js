class ErrorApi{

    constructor(code,msg){
        this.code=code;
        this.msg=msg;
    }

    static badRequest(msg){
        return new ErrorApi(400,msg);
    }
    
    static internal(msg){
        return new ErrorApi(500,msg);
    }

    static conflict(msg){
        return new ErrorApi(409,msg);
    }

    static unauthorized(msg){
        return new ErrorApi(401,msg);
    }

}

module.exports=ErrorApi;
