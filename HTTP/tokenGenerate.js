 import jwt from 'jsonwebtoken'; 
 import dotenv from 'dotenv'; 
 
 dotenv.config(); 
 
 const payload = { 
    user_id: "001", 
    name: "sahil" 
} 
const token = jwt.sign(payload, process.env.SECRET_KEY, { 
    expiresIn: "3m" 
}); 

console.log(token);