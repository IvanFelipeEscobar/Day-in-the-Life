const User = require(`./user`)
const Entry = require(`./Entry`)
const Comment = require(`./comment`)

User.hasMany(Entry, {
    foreignKey: `user_id`
})
Entry.belongsTo(User, {
    foreignKey: `user_id`
})
User.hasMany(Comment, {
    foreignKey: `user_id`
})
Comment.belongsTo(User, {
    foreignKey: `user_id`
})
Entry.hasMany(Comment, {
    foreignKey: `Entry_id`
})
Comment.belongsTo(Entry, {
    foreignKey: `Entry_id`
})

module.exports = {User, Entry, Comment}