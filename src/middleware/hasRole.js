module.exports = (role) => (req,res,next)=>{
    try{
       if(role){
         if(req.user.role===role){
        next()
       }
       return res.status(401).json({
        status:401,
        error: new Error('invalid request !')
       })
       }else{
        next()
       }
    }catch{
       return res.status(500).json({ status: 500, error:new Error('invalid request !') })
    }
}