const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./router/user');


dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(
    process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true}
).then(() => console.log('Mongoose Connected...'))
.catch(err => console.log(err));



app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

app.use((err, req, res, next) => {
    res.json({success: false, message: err.message});
});


app.use('/api/users', userRouter);



app.listen(PORT, () => 
    console.log(`Server is running on http://localhost:${PORT}`));