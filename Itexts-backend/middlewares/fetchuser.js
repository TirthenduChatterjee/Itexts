const jwt = require('jsonwebtoken');
const fetchuser=(req,res,next)=>{
const token = req.header('Auth-token');
if(!token){
    res.status(401).send("Access Denied");
}
try {
    const data = jwt.verify(token,process.env.JWT_TOKEN);
    req.user=data.user;
    next();
} catch (error) {
    res.status(401).send("Access Denied");
}
}
module.exports=fetchuser;