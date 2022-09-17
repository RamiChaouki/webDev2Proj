//EXPRESS IMPORTS
const express = require('express');
const cors = require('cors');
const app = express();

//ENV FILE
require('dotenv').config();

//SEQUELIZE IMPORTS
const {Sequelize,sequelize}=require('./models/sequelizeConfig');
require('./models/associations');
require('./models/user');
require('./models/post')


app.use(express.json());
app.use(cors());



//ROUTES

//User router
const userRouter = require('./routes/user');
app.use('/User',userRouter);

//Feed router
const feedRouter = require('./routes/feed');
app.use('/Feed',feedRouter);

//Admin router
const adminRouter = require('./routes/admin')
app.use('/Admin',adminRouter);


sequelize.sync({alter:true}).then(()=>{
    app.listen(process.env.S_PORT,()=>{
        console.log("Listening on port "+process.env.S_PORT);
    })
});