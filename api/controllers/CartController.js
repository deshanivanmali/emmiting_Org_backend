/**
 * CartController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
loadCartDetailByUserid: async function (req, res) {
    var user = await User.find({ id: req.params.userId });
    if (user && user[0]) {
        var QUERY = `SELECT c.*,doc.DocumentData AS documentData,pr.salePrice AS SalePrice,pr.stock as stock FROM user_cart c
        LEFT JOIN product pr ON pr.id=c.productID
        LEFT JOIN document doc ON doc.id=pr.bigImg
        WHERE c.userId=` + req.params.userId + ` AND c.orderId=0`;
        var profileInputer = await sails.sendNativeQuery(QUERY);
        return res.json(profileInputer['rows']);
    } else {
        return res.json({ status: 400, message: "User not found" });
    }
},
updateQuntity:async  function(req,res){
    var cartDetails = await Cart.find({ id: req.body.id })
    if(cartDetails && cartDetails[0]){
        var userObject = await Cart.update({
            id: req.body.id
        }).set({
            quantities:req.body.quantities
        });
        return res.json({ status: 200, message: "Cart updated sucessefully!", data: userObject });
    }else{
        return res.json({ status: 400, message: "Cart not found", data: null });
    }
    
},
updateCartStatus:async  function(req,res){
    var cartDetails = await Cart.find({ id: req.body.id })
    if(cartDetails && cartDetails[0]){
        var userObject = await Cart.update({
            id: req.body.id,
            orderId:0
        }).set({
            orderId:req.body.orderId
        });
        return res.json({ status: 200, message: "Cart updated sucessefully!", data: userObject });
    }else{
        return res.json({ status: 400, message: "Cart not found", data: null });
    }
    
},
cartDetailBProductId: async function (req, res) {
    var user = await User.find({ id: req.params.userId });
    if (user && user[0]) {
        var QUERY = `SELECT cart.*,pr.stock  FROM user_cart cart
        INNER JOIN product pr ON pr.id=cart.productId        
         WHERE cart.orderId=` + req.params.orderId + ``;
        var profileInputer = await sails.sendNativeQuery(QUERY);
        return res.json(profileInputer['rows']);
    } else {
        return res.json({ status: 400, message: "User not found" });
    }
},

};

