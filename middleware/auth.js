
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
//check for the authorization header 
//only if is valid then we'll send back the data with the actual user name
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Token is required');
    }

    //get the token from the front-end
    const token = authHeader.split(' ')[1];
    //verify if the token is valid
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //if we are successful, since we re working with the middleware
        
        const {id, username} = decoded; //we are getting the id and username from the decoded token
        req.user = {id, username}; //we are attaching the user to the request object
        next(); //pass it to the next middleware
       
    } catch (error) { //if the token is invalid we send back the custom error
        throw new UnauthenticatedError('Not authorized to access this route');

    }

 

}
module.exports = authenticationMiddleware;