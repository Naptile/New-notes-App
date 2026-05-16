const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    try {
        //get token from header
        const authHeader = req.header("Authorization");

        if(!authHeader){
            return res.status(401).json({
                error:"No token,authorization denied",
            });
        }
        
        // Extract the token (remove "Bearer " prefix)
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Token format invalid" });
        }

        //verify token

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded;
        next() //move to the next step
    } catch (error) {

        res.status(401).json({
            error: "Invalid token: " + error.message,
        })
        
    }
};