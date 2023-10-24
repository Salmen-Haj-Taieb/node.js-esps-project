const express = require('express')
const router = express.Router()
const commandController = require('../controller/commandController')
const auth = require('../middleware/auth')
const hasRole = require('../middleware/hasRole') 

router.post('/addCommand',auth,commandController.addCommand)
router.get('/getAllCommands',commandController.getAllCommands)
module.exports=router