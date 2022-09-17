const { sequelize,Sequelize } = require("./sequelizeConfig");

{sequelize}
const post=sequelize.define('post',{
    id:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false,
        
    },
    postText:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false ,
    },
    type:{
        type:Sequelize.DataTypes.ENUM('post', 'comment'),
        allowNull:false,
    },
    postDate:{
        type:Sequelize.DataTypes.DATE,
        allowNull:false ,
        
    },    
}, 
{
    timestamps:false
});
;
//TODO Associations with User and Posts (UserId and parentPost(NULLABLE))

module.exports=post;
