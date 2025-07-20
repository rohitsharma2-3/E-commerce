require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const Product = require('./Models/ProductModel')
const User = require('./Models/UserModel')
const Customer = require('./Models/CustomerData')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const { storage } = require('./utils/Cloudinary')
const multer = require('multer');
const upload = multer({ storage })
const verifyToken = require('./middleware/Verify')
const requireLogin = require('./middleware/userLogin')

const port = process.env.PORT || 4000
app.use(express.json());

const allowedOrigins = [
  'https://ecommerce-t9fl.onrender.com',
  'https://e-commerce-1-1yfx.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(cookie())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/ecommerce/create', upload.array('image'), async (req, res) => {
    try {
        let imagePaths = req.files.map(file => file.path)
        let { product, description, price, category, size } = req.body
        let createProducts = new Product({
            image: imagePaths,
            product,
            description,
            price,
            category,
            size: Array.isArray(size) ? size : [size]
        })
        await createProducts.save()
        res.status(200).json(createProducts)
    } catch (err) {
        console.log(err)
        res.status(500).json('Server Error')
    }
})

app.get('/ecommerce/show', async (req, res) => {
    try {
        let product = await Product.find({})
        res.status(200).json(product)
    } catch (err) {
        console.log(err)
        res.status(500).json('Server Side Error')
    }
})

app.get('/ecommerce/show/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/ecommerce/delete/:id', async (req, res) => {
    let { id } = req.params
    let del = await Product.findByIdAndDelete(id)
    res.json(del)
})

// Sign Up Routes
app.post('/ecommerce/signup', async (req, res) => {
    try {
        let { name, email, password } = req.body
        console.log(req.body)

        const userCheck = await User.findOne({ email });
        if (userCheck) {
            return res.status(400).json({ message: 'User already exists!' });
        }


        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            email,
            password: hash
        })

        let token = jwt.sign({ id: user._id, email: user.email }, process.env.SUPER_SECRET_CODE, {
            expiresIn: '7d',
        })
       res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(201).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Signup failed', error: err.message });
    }
})

// Logout
app.post('/ecommerce/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
});



// Login Up Routes
app.post('/ecommerce/login', async (req, res) => {
    try {
        let { email, password } = req.body

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        let CheckPass = await bcrypt.compare(password, user.password)
        if (!CheckPass) {
            return res.status(400).json({ message: 'Incorrect password!' });
        }

        let token = jwt.sign({ id: user._id, email: user.email }, process.env.SUPER_SECRET_CODE, {
            expiresIn: '7d',
        })
        res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            message: 'Login Successfull',
            user
        })
    } catch (error) {
        res.status(501).json({ message: "Server Error", error: error.message })
    }
})


// Customer Data
app.post('/ecommerce/customer', verifyToken, async (req, res) => {
    try {
        const {
            firstname, lastname, email, street, state, city, zipcode, image,
            country, phone, cart, paymentMethod, subTotal, shippingFee, totalAmount, product } = req.body;

        const customerDetails = new Customer({
            userId: req.user.id,
            firstname,
            lastname,
            email,
            image,
            phone,
            address: { street, city, state, zipcode, country },
            cart,
            product,
            paymentMethod,
            subTotal,
            shippingFee,
            totalAmount
        })
        await customerDetails.save()
        console.log(customerDetails)
        res.status(201).json(customerDetails)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
})

// Get orders of logged-in user only
app.get('/ecommerce/customer/myorders', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Customer.find({ userId })
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/ecommerce/customer/show', async (req, res) => {
    try {
        let customer = await Customer.find().populate('userId');
        res.status(201).json(customer)
    } catch (error) {
        res.status(500).json('Error in Server')
    }
})


mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log('MongoDb Connected')
        app.listen(port, () => {
            console.log(`port is listing http://localhost:${port}/`)
        })
    })
    .catch((err) => {
        console.log("Error =>", err)
    })
