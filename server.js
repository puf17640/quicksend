const express = require('express'),
	mongoose = require('mongoose')

const app = express(),
	config = require('dotenv').config()

if (config.error) {
	console.warn('[ERROR]: cannot parse .env file')
	process.exit(-1)
}

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/quicksend', { useNewUrlParser: true, useUnifiedTopology: true})

app.use(require('morgan')('[REQUEST]: :remote-addr - :method :url :status :response-time ms - :res[content-length]'))
app.use(require('cookie-parser')())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(require('express-session')({
	secret: process.env.SESSION_SECRET || 'quicksend',
	cookie: { maxAge: parseInt(process.env.MAX_COOKIE_AGE) || 36e5 },
	resave: false,
	saveUninitialized: true,
	httpOnly: true
}))
app.use(require('helmet')())

app.use(require('./routes'))

app.listen(process.env.PORT, () => console.log(`[INFO]: listening on port ${process.env.PORT}`))
