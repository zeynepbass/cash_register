
import jwt from 'jsonwebtoken'


import User from '../models/yonetıcı.js'

const signin=async (req,res)=>{

    const {email,password}=req.body;

    try {

        const isim=await User.findOne({email})
    
        
        if(!isim) return res.status(404).json({message:'Kullanıcı Bulunamadı'})

        const kullanici=await User.findOne({email})
    
        
        if(!kullanici) return res.status(404).json({message:'Kullanıcı Bulunamadı'})

       

     

        const token=jwt.sign({email:kullanici.email,id:kullanici._id},'aos-secret-code',{expiresIn:'30d'})

        res.status(200).json({result:kullanici,token})

    } catch (error) {

        res.status(500).json({message:'Bir hata oluştu'})
        
    }
}


// const getir=async (req,res)=>{

//     try {
//         const postMessage=await User.find();
//         res.status(200).json(postMessage)
     
//     } catch (error) {
//         res.status(404).json({message:error.message})
//     }
// }

export { signin };