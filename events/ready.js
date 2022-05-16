const mongoose = require('mongoose');
const config = require('../config.json')

module.exports = {
    name: 'ready',
    execute(client) {
        mongoose.connect(config.mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Sus esta recontra que ready pa!')
    }
}