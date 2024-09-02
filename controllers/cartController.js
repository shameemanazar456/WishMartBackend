const carts = require("../model/cartModel");




exports.addToCartController = async(req,res)=>{
    const {id,title,price,description,category,image,rating,Quantity} = req.body


    const userId = req.payload
   //console.log(userId);

    try{
        const existingProduct = await carts.findOne({userId, id})
        //console.log(existingProduct);
        if(existingProduct){
            //console.log(existingProduct);
            res.status(406).json('Product Already In Cart')
        }
        else{
            const newProduct = new carts({
                id,title,price,description,category,image,rating,Quantity,grandTotal:price,userId
            })
            await newProduct.save()

            res.status(200).json(newProduct)
        }

    }
    catch(err){
        res.status(405).json(err)
    }
}
exports.getCartController = async(req,res)=>{

    const userId = req.payload

    try{
        const allCartItem = await carts.find({userId})
        if(allCartItem)
        {        res.status(200).json(allCartItem)
        }
        else{
            res.status(406).json('Your Cart is Empty')
        }

    }
    catch(err){
        res.status(401).json(err)

    }

}

exports.removeItemFromCart = async(req,res)=>{
    const {id} = req.params
    console.log(id);
    console.log('inside dle');
    try{
        const product = await carts.findByIdAndDelete({_id:id})
       // const product = await carts.deleteOne({_id:id})

        //console.log(await carts.findByIdAndDelete({_id:id}));
        res.status(200).json(product)
    }catch(err){
        console.log(err);
        res.status(401).json(err)
        
    }
}

exports.emptyCart = async (req,res)=>{
    const userId = req.payload
    try{
        const product = await carts.deleteMany({userId})
        res.status(200).json('cart deleted successfully')
    }catch(err){
        console.log(err);
        res.status(401).json(err)
        
    }
}

exports.incrementController = async(req,res)=>{

    const {id} = req.params
    try{
        const selectedItem = await carts.findOne({_id:id})
        if(selectedItem){
            selectedItem.Quantity+=1
            selectedItem.grandTotal=selectedItem.price*selectedItem.Quantity
            await selectedItem.save()
            res.status(200).json(selectedItem)
        }
        

    }catch(err){
        res.status(401).json(err)
 
    }

}
exports.decrementController = async(req,res)=>{
    const {id} = req.params
    try{

        const selectedItem = await carts.findOne({_id:id})
        selectedItem.Quantity -=1
        if(selectedItem.Quantity == 0){
            await carts.deleteOne({_id:id})
            res.status(200).json('Item Removed')
        }
        else{
            selectedItem.grandTotal = selectedItem.price*selectedItem.Quantity
            await selectedItem.save()
                res.status(200).json(selectedItem)  
        }

    }catch(err){
        res.status(401).json(err)
 
    }
}
