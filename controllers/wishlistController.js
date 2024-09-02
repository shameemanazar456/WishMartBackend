const wishes = require('../model/wishlistModel')
exports.addtoWishlist =async(req,res)=>{
    const {id,title,price,description,category,image,rating} = req.body


    const userId = req.payload
    console.log(userId);

    try{
        const existingProduct = await wishes.findOne({userId, id})
        if(existingProduct){
            console.log(existingProduct);
            res.status(406).json('Product Already In Wishlist')
        }
        else{
            const newProduct = new wishes({
                id,title,price,description,category,image,rating,userId
            })
            await newProduct.save()

            res.status(200).json(newProduct)
        }

    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.getWisslistController = async(req,res)=>{

    const userId = req.payload

    try{
        const allWishlistItem = await wishes.find({userId})
        if(allWishlistItem)
        {        res.status(200).json(allWishlistItem)
        }
        else{
            res.status(406).json('Your Wishlist is Empty')
        }
    }
    catch(err){
        res.status(401).json(err)

    }

}

exports.removeWishlistItem=async(req,res)=>{
    const {id} = req.params
    console.log(id);
    try{
        const product = await wishes.findByIdAndDelete({_id:id})
        console.log(product);
        res.status(200).json(product)
    }catch(err){
        res.status(401).json(err)
    }

}