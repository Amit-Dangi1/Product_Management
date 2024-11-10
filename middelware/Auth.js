import jwt from "jsonwebtoken";
  

export const auth = (request,response,next)=>{
    try {
        let{token} = request.cookies;
   
        if(!token)
            return response.status(404).json({message:"Invalide Admin"});
    
       let decode = jwt.verify(token,"amitdangijiii");
        
       request.user=decode;
       next();
    } catch (error) {
        console.log(error);
        return response.status(500).json({message:"Internal Server Error"});
        
    }
};
  