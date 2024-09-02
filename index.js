require('dotenv').config()

const express = require('express')

const cors = require('cors')

const router = require('./routes')

require('./connection')

const wishMartServer = express()


wishMartServer.use(cors())

wishMartServer.use(express.json())

wishMartServer.use(router)



const PORT = 3000 || process.env.PORT

wishMartServer.listen(PORT,()=>{
    console.log(`Server Running Successfully at Port No:${PORT}`);
})

