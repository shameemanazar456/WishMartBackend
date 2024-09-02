const products = require("../model/productModel")


exports.getAllProductController = async(req,res)=>{
    try{

        const allProducts = await products.find()
        res.status(200).json(allProducts)
        
    }
    catch(err){
        res.status(401).json(err)
    }
}

//controller to get a particular project

exports.getAProduct = async(req,res)=>{
    const {id} = req.params
    try{
        const product = await products.findOne({id})
        res.status(200).json(product)
    }   
    catch(err){
        res.status(401).json(err)
    }
}