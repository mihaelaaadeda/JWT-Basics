



//check username and password in post (login) request (will be available in req.body)
//if exists, create new JWT
//send back to front-end       //if not, send back the error response


//setup authentication so only the request with JWT can access the dashboard
//only if we have the token we can make a successful GET request and eventually display the lucky number on the frontend

const jwt = require('jsonwebtoken');
const {BadRequestError} = require('../errors');

const login = async(req,res)=>{

    const {username,password} = req.body;
    //we can implement the validation:
    //1. mongoose validation  2.Joi 3.here, in the controller
    if(!username || !password){
        throw new BadRequestError('Please provide email and password');
    }
//assuming both username and password are given we are creating a token

//just for demo, normally provided by the database
const id = new Date().getDate();

//keep the payload small, better experience for the user
//1.payload 2.secret 3.options
    const token =jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'});

    //send the token to the front-end
    res.status(200).json({msg:'user created',token});

    // console.log(username,password);
    // res.send('Fake Login/Register/Signup Route');
}


const dashboard = async(req,res)=>{
    //now in the controller we have access to the user property
    //and now instead of looking for decoded we are looking for user
    console.log(req.user);

    const luckyNumber =Math.floor(Math.random()*100)
    
    res.status(200).json({
        msg: `Hello ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })


  
}

module.exports = {
    login,
    dashboard, 
}