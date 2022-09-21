//EXPRESS DEPENDENCIES
const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('success')
})



module.exports=router;