const express = require("express") 
const cors = require("cors")
const mongoose = require('mongoose')
const User = require("./models/User")
const Place = require("./models/Place")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const imageDownloader = require("image-downloader")
const multer = require("multer")
const fs = require("fs")
const Booking = require("./models/Booking")


require('dotenv').config()
const app = express()

const bcryptSalt = bcrypt.genSaltSync()
const jwtSecret = 'dafgij5644644fasvcadaswad87'

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))


mongoose.connect(process.env.MONGO_URL)

function getUserDataFromReq(req){
    return new Promise((resolve, reject)=>{
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if(err) reject(err)
            resolve(userData)
        })
    })
  }

app.get('/test', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    res.json('test ok');
  });
  
  app.post('/register', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {name,email,password} = req.body;
  
    try {
      const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) {
        console.log(e)
      res.status(422).json(e);
    }
  
  });
  
  app.post('/login', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
  });
  
  app.get('/profile', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
      });
    } else {
      res.json(null);
    }
  });
  
  app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
  });

  app.post('/upload-by-link', async (req, res) =>{
    const {link} = req.body
    const newName = Date.now() + '.jpg'
    try{
    await imageDownloader.image({
        url: link,
        dest: __dirname+'/uploads/' + newName
    })
    res.json(newName)
  }
  catch(error){
    console.log(error)
  }
  })

  const photosMiddleware = multer({dest: 'uploads/'})

  app.post('/upload', photosMiddleware.array('photos', 20) ,async (req, res) => {
    const uploadedFiles = []
    for(let i=0; i<req.files.length; i++){
        const {path, originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length-1]
        const newPath = path+ '.' +ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''))
        
    }
    res.json(uploadedFiles)
  })

  app.delete('/upload/:filename', async (req, res) => {
    const filename = req.params.filename;
    const filePath = `uploads\\${filename}`; // Assuming uploaded files are stored in the 'uploads' directory

    try {
        await fs.unlink(filePath,()=>{}); // Delete the files
        res.status(200).json({ message: `File ${filename} deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: `Error deleting file ${filename}: ${error.message}` });
    }
});

  app.post('/places', (req,res)=>{
    mongoose.connect(process.env.MONGO_URL)
    const {token} = req.cookies
    const {title, address, lat,lng,addedPhotos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests,price} = req.body
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address,lat,lng, photos: addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests,price
        })
        res.json(placeDoc)
      })
  })

  app.get('/user-places', async(req,res)=>{
    mongoose.connect(process.env.MONGO_URL)
    try {
      const userData = await getUserDataFromReq(req)
      const {id} = userData
      res.json(await Place.find({owner:id}))
    } 
    catch (error) {
      res.status(401).json("Not logged in")
    }
  })

  app.get('/places/:id', async(req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params
    res.json(await Place.findById(id))
  })

  app.put('/places', async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies
    const {id, title, address,lat,lng, addedPhotos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests,price} = req.body
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id)
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title, address, lat, lng, photos: addedPhotos, 
                description, perks, extraInfo, 
                checkIn, checkOut, maxGuests,price
            })
            await placeDoc.save()
            res.json('ok')
        }
    })

  })

  app.get('/places', async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    res.json(await Place.find())
  })

  app.post('/places-search', async (req, res) => {
    try {
      const { lat, lng, checkIn, checkOut, guests } = req.body;
      console.log(req.body);
      
      const radius = 20;
      
      const longitudeRange = radius / (111.32 * Math.cos(lat * (Math.PI / 180)));
  
      const places = await Place.find({
        lat: {
          $gte: lat - (radius / 111.12),
          $lte: lat + (radius / 111.12)
        },
        lng: {
          $gte: lng - longitudeRange,
          $lte: lng + longitudeRange
        }
      });
  
      console.log(places);
      res.json(places);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  app.post('/bookings', async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    try {
      const userData = await getUserDataFromReq(req)
      const {place, checkIn, checkOut,
        guests, name, phone,price } = req.body
        Booking.create({
            place,checkIn,checkOut,guests,name,phone,price, user: userData.id
          }).then((doc) => {
            res.json(doc);
          }).catch((err) => {
            throw err;
          });
    } catch (error) {
      res.status(401).json("Not logged in")
    }
  })


  app.get('/bookings', async (req, res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const userData  = await getUserDataFromReq(req)
    res.json(await Booking.find({user: userData.id}).populate('place'))

  })

app.listen(4000)