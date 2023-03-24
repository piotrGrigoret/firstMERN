const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    text:{type: String, required: true},
    title: {type: String, required:true},
    userId:{type: String}
});
// const obj = model('Article', schema);
module.exports = model('Article', schema);


