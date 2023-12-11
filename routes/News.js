const express=require('express')
const router=express.Router()
const {getAllNews,addNews}=require('../controller/News')

router.get('/news',getAllNews)
//router.post('/news',addNews)

module.exports=router