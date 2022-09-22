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
        status: Sequelize.DataTypes.ENUM("Request received", "Request sent", "Friends")
    }

)

module.exports=friendStatus;