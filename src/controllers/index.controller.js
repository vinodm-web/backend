const responseHandler = require('../helpers/responseHandler');
const IndexService = require('../services/index.service');
const indexService=new IndexService(); 
const Razorpay = require("razorpay");
const crypto = require("crypto");

class IndexController{

    async generateOrder(req) {
        try {
            var razorpay = new Razorpay({
                key_id: 'rzp_test_gmzArGfNF6GGi5',
                key_secret: 'JoSnybMBpmRgkaMtm0XVQnvO',
            });
            const order = await razorpay.orders.create({
                amount: req.body.amount,
                currency: req.body.currency,
                receipt: req.body.receipt,
            });
            return {
                id: order.id,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt,
            };
        } 
        catch (error) {
            console.log('getController - error',error);
            console.log(error);
            return responseHandler.error(error)
        }
    }

    async verifyOrder(req) {
        try {
            const order = req.body;

            const text = order.razorpay_order_id + "|" + order.razorpay_payment_id;
            var signature = crypto
                .createHmac("sha256", 'JoSnybMBpmRgkaMtm0XVQnvO')
                .update(text)
                .digest("hex");

            if (signature === order.razorpay_signature) {
                return { message: "Successful payment" }
            } else {
                return responseHandler.error('Payment verification failed')
            }
        } 
        catch (error) {
            console.log('getController - error',error);
            console.log(error);
            return responseHandler.error(error)
        }
    }

    async get()
    {
        console.log('getController');
        try {
            const getAllIndex=await indexService.get();
            return getAllIndex;
        } 
        catch (error) {
            console.log('getController - error',error);
            console.log(error);
            return responseHandler.error(error)
        }
    }

    async getById(req)
    {
        console.log('getByIdController');
        try {
            const id=req.params.id;
            const getIndexById=await indexService.getById(id);
            return getIndexById;
        }
        catch (error) {
            console.log('getByIdController - error',error);
            console.log(error);
            return responseHandler.error(error)
        }
    }

    async create(req)
    {
        console.log('createController');
        try {
            const data=req.body;
            const createdIndex=await indexService.create(data);
            return createdIndex;
        } catch (error) {
            console.log('createController - error',error);
            console.log(error);
            return responseHandler.error(error)
        }
    }
    
    async update(req)
    {
        console.log('updateController');
        try {
            const data=req.body;
            const id=req.params.id;
            const updatedIndex=await indexService.update(id,data);
            return updatedIndex;
        } catch (error) {
            console.log('updateController - error',error);
            console.log(error);
            return responseHandler.error(error)
        }
    }
    
    async delete(req)
    {
        console.log('deleteController');
        try {
            const id=req.params.id;
            const deletedIndex=await indexService.delete(id);
            return deletedIndex;
        } catch (error) {
            console.log('deleteController - error',error);
            console.log(error);
            return responseHandler.error(error)
        }
    }

}

module.exports = IndexController
