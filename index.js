 import express from 'express'
 import mongoose from 'mongoose'
 import dotenv from 'dotenv'
 import cors from 'cors'
 import fileUpLoad from 'express-fileupload'

 import authRoute from './routes/auth.js'
 import usersRoute from './routes/users.js'
 import productRoute from './routes/product.js'
 import manufactureRoute from './routes/manufacture.js'
 import serviceRoute from './routes/service.js'
 import commentRoute from './routes/comments.js'
 import ratingRoute from './routes/rating.js'
 import  favoriteRoute from './routes/favorites.js'
 import mainRoute from './routes/main.js'
 import faqRoute from './routes/faqs.js'
 import evalRoute from './routes/evaluate.js'
 import reviewRoute from './routes/review.js'

 const app = express()
 dotenv.config()

 // Constants
 const PORT = process.env.PORT || 3001
 const DB_USER = process.env.DB_USER
 const DB_PASSWORD = process.env.DB_PASSWORD
 const DB_NAME = process.env.DB_NAME
 const TOKEN = process.env.TG_TOKEN
 const CHAT_ID = process.env.TG_BOT

 //Midllware
 app.use(cors())
 app.use(fileUpLoad())
 app.use(express.json())
 app.use(express.static('uploads'))
 //Routes
 app.use('/api/manufactures', manufactureRoute)
 app.use('/api/products' ,productRoute)
 app.use('/api/auth', authRoute)
 app.use('/api/users', usersRoute)
 app.use('/api/service', serviceRoute)
 app.use('/api/comments', commentRoute)
 app.use('/api/rating', ratingRoute)
 app.use('/api/favorites', favoriteRoute)
 app.use('/api/main', mainRoute)
 app.use('/api/faqs', faqRoute)
 app.use('/api/eval', evalRoute)
 app.use('/api/reviews', reviewRoute)

 app.post('/api/telegram', async(req, res)=>{
    console.log('TELEGRAM');
    try{
        const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}`
        console.log(URL);
        console.log(req.body);
        await fetch(URL, {
            method: 'POST',
            body: JSON.stringify({text: req.body.text }), 
            headers: {
            'Content-Type': 'application/json'
            }
         })

        res.json({tel: 'ok'}) 
    }
    catch{
        res.json({tel: 'bed'}) 
    }
})

 const start = async () =>{
    try {
        await mongoose.connect(
            // `mongodb://127.0.0.1:27017/conditioners`
         `mongodb+srv://${DB_USER}:${DB_PASSWORD}@mongolearn.ajck94y.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
       // `mongodb://${DB_USER}:${DB_PASSWORD}@ac-cb0jtfu-shard-00-00.ajck94y.mongodb.net:27017,ac-cb0jtfu-shard-00-01.ajck94y.mongodb.net:27017,ac-cb0jtfu-shard-00-02.ajck94y.mongodb.net:27017/${DB_NAME}?ssl=true&replicaSet=atlas-bp445r-shard-0&authSource=admin&retryWrites=true&w=majority`
        )

        app.listen( PORT,()=>{
            console.log(`Server started on PORT ${PORT}`)
        } )
    }
    catch (error){
        console.log('Error start ', error)
    }
 }

 start()



