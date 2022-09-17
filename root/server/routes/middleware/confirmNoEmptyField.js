const ErrorApi = require('./errorHandling/ErrorApi');

async function ConfirmNoEmptyField(req,res,next){
    var exitRouter=false;
    
    //Creates value/key pair array of what was posted that were inputted
    //eg. array = [[value1,key1],[value2,key2],...]
    //eg2. array = [[[firstName,kyle],0],[[lastName,piche],1]],....
    const fields=Object.entries(req.body);

    //Uncomment for clarity
    // console.log(fields);

    fields.forEach((value,key)=>{ 
        if(!value[1]){
            next(ErrorApi.badRequest(value[0]+" field was left empty"));
            exitRouter=true;
            return; //initially had bug here, I thought the return exited the router, but it merely exited the for loop and then read line 22, thereby going to the router
        }
    })
    if(exitRouter){return;}//added this return to exit the router
    next();
}

module.exports=ConfirmNoEmptyField;