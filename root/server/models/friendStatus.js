const {sequelize,Sequelize}=require('./sequelizeConfig');

const friendStatus=sequelize.define(
    'friendstatus',
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