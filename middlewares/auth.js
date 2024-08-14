import jwt from "jsonwebtoken";

const GOKAP_TOKEN = "gokap-token"

const isAuthenticated = async (req, res, next)=> {
  try {
    const token = req.cookies?.[GOKAP_TOKEN];
    if(!token){
        return next(res.status(404).json({message: "Login First!! "}))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedData._id;
    next();
  } catch (error) {
    console.log(error)
  }
}

export { isAuthenticated }