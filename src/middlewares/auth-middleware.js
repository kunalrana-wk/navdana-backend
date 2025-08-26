
const jwt = require('jsonwebtoken')
require('dotenv').config()

function auth(req, res, next) {
    try {
        // extract the token from the req body or cookie
        // request body 
        const token = req.cookies.token || req.body.token 
        if (!token || token === undefined) {
            return res.status(401).json({
                success: false,
                message: "Token is Missing"
            })
        }

        // now verify the token 
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Token is Invalid'
            })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Something went wrong, while verifying user"
        })
    }
}


// Higher-order middleware for role checking
function authorizeRole(role) {
  return (req, res, next) => {
    try {
      if (req.user?.role !== role) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Only ${role}s are allowed`,
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `${role} role validation failed`,
      });
    }
  };
}



module.exports = {
  auth,
  isAdmin: authorizeRole("admin"),
  isManager: authorizeRole("manager"),
  isStaff: authorizeRole("staff"),
  isCustomer: authorizeRole("customer"),
};