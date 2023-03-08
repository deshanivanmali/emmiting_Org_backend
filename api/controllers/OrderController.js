/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    orderStatusChange:async  function(req,res){
        var cartDetails = await Order.find({ id: req.body.id })
        if(cartDetails && cartDetails[0]){
            var userObject = await Order.update({
                id: req.body.id
            }).set({
                orderstatus:req.body.status
            });
            return res.json({ status: 200, message: "Order status updated sucessefully!", data: userObject });
        }else{
            return res.json({ status: 400, message: "Order not found", data: null });
        }
        
    },
    getOrderByStatus:async  function(req,res){
        var orderDetails = await Order.find({ orderstatus: req.params.status })
        return res.json({ status: 200, message: "Order fetched sucessefully!", data: orderDetails });
        
    },
    getorderDetailsbyOrderId:async function(req,res){
    let sql=`select c.productName AS pname,c.price AS price,c.quantities AS qty,c.size as sizeWeight,uorder.*  FROM user_cart AS c
    INNER JOIN user_order uorder ON uorder.id=c.orderId
    INNER JOIN USER u ON u.id=c.userId
    WHERE uorder.id=${req.params.id} AND c.userId=u.id`;

    var orderData = await sails.sendNativeQuery(sql);
    if(orderData){
        return res.json(orderData['rows']);
    }else{
        return res.json({message:"Data not found"});
    }
   
    }
};

