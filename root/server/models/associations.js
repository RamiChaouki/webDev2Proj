const user = require("./user");
const post = require("./post");
const friendStatus = require("./friendStatus");


//POSTS-USER ASSOCIATION
post.hasMany(post, {
  foreignKey: {
    name: "parentId",
    allowNull: true,
  },
  onDelete: "cascade",
});
user.hasOne(post,{
    foreignKey:{
        name: "userId",
        allowNull: false,
    },
    onDelete: "cascade",
});

//FRIENDSTATUS-USER-USER ASSOCIATION
user.hasOne(friendStatus,{as:'FriendID',foreignKey:'friendId'});
user.hasOne(friendStatus,{as:'UserID',foreignKey:'userId'});
friendStatus.belongsTo(user);