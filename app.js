if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const urlMongoose = 'mongodb://localhost/LelangHouse'
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(urlMongoose, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true }, function(err) {
    if(err) console.log(`Failed to connect to db`)
    else console.log(`Connected to db `);
})

app.use(cors())
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, ()=> console.log('Running on port: ', PORT))