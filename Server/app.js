const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs')
const JobPost = require('./models/jobs');
const cors = require('cors')
dotenv.config()

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'))
app.use(cors())

app.get('/', (req, res) => {
    res.send('welcome to my website')

})


/* create health route*/
app.get('/health', (req, res) => {
    res.status(200).json("Server is up and running")
})


app.use((err, req, res, next) => {
    res.status(500);
    res.send("Something went wrong! Please try after some time.")
})



app.use('/api/auth', authRoutes)
app.use('/api/job', jobRoutes)

app.listen(process.env.PORT || 4000,
    mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log(`Server running on http://localhost:${process.env.PORT} and aslo connect to MongoDB`)
        })
        .catch((err) => {
            console.log("Failed to connect to MongoDB", err)
        })
)


