const { sequelize,Sequelize } = require("./sequelizeConfig");

{sequelize}
const user=sequelize.define('user',{
    id:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false,
        
    },
    firstName:{
        type:Sequelize.DataTypes.STRING(45),
        allowNull:false ,
    },
    lastName:{
        type:Sequelize.DataTypes.STRING(45),
        allowNull:false ,
    },
    username:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false,
        unique:'username'
    },
    email:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false ,
        unique:'email' //must put 'email' instead of true to avoid 'too many keys specified bug' ->https://github.com/sequelize/sequelize/issues/9653
    },
    
    password:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    },
    dateOfBirth:{
        type:Sequelize.DataTypes.DATE,
        allowNull:false ,
    },
    status:{
        type:Sequelize.DataTypes.ENUM("active","banned"),
        allowNull:false ,
    },
    role:{
        type:Sequelize.DataTypes.ENUM("admin","user"), //User.getAttributes().role.values
        allowNull:false ,
        defaultValue: "user",
    },
    profile:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false,
        defaultValue:"https://user-profile-pic-bucket.s3.amazonaws.com/f29c8ca4875b6bdbb7639f0900ac49a5"//Default user picture in S3
    }  
}, 
{
    timestamps:false
});
;
module.exports=user;
