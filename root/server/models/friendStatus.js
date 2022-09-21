const {sequelize,Sequelize}=require('./sequelizeConfig');

const friendStatus=sequelize.define(
    'friendStatus',
    {
        id:{
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,  
        },
        type: Sequelize.DataTypes.ENUM("Not Friends", "Request sent", "Friends")
    }

)

module.exports=friendStatus;