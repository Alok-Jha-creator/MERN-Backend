class OrderDetailController {
    async addToCart(req,res,next){
        try {
            const {product,quantity} = req.body;
            const loggedInUser =req.loggedInUser;
            //product Detail
            const productDetail = await req.db.Product.findById(product);
        } catch (exception) {
            next(exception)
            
        }
    }
}

module.exports = new OrderDetailController()