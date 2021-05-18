const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTweets(data) {
    let errors = {};

    data.text = validText(data.text)? data.text : '';

    if (!Validator.isLength({min: 5, max: 140})) {
        errors.text = 'Tweet must be between 5 and 140 characters';
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Tweets field is required';
    }

    return{
        errors,
        isValid: Object.keys(errors).length === 0
    };
}