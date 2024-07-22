require("dotenv/config");
const config={
                port: +process.env.PORT,
                jwt_secret_key: process.env.JWT_SECRET_KEY,
                jwt_expires_in: process.env.JWT_EXPIRES_IN
}

module.exports=config;