const user = require("./user");
const post = require("./post");

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