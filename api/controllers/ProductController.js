/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAllproducts:async function(res,res){
    var QUERY = `SELECT prd.*,doc.DocumentData AS documentData FROM product prd
    LEFT JOIN document  doc ON doc.id=prd.bigImg`;
    var profileInputer = await sails.sendNativeQuery(QUERY);
    return res.json(profileInputer['rows']);
  },

  getAllproductsPagination:async function(req, res,pageNumber = req.body.page, pageSize = req.body.size, keyword = req.body.keyword, orderColumn = req.body.orderBy, orderType = "desc") 
  {
      try {
      
        let data = {};
        let result = [];
        let totalRecord = 0;
        let totalPage = 0;
        var sql = `SELECT prd.*,doc.DocumentData AS documentData FROM product prd
        LEFT JOIN document  doc ON doc.id=prd.bigImg` ;

        if(req.body.keyword){
          sql += ` where prd.name LIKE "%` + req.body.keyword + `%"`
        }
        sql += `  ORDER BY ` + orderColumn + `, prd.id `
       
        console.log("QUery here  ===> ",sql)
        result = await sails.sendNativeQuery(sql + ` limit ` + req.body.limit);
       
        totalRecord = result["rows"].length;
        console.log("totalRecord",totalRecord)
        totalPage = totalRecord / pageSize;
        console.log("totalPage",totalPage)
        if (totalPage.toString().includes(".")) {
            var t = totalPage.toString().split(".");
            totalPage = Number(t[0].toString()) + 1;
        }
        var offset
        pageNumber=req.body.page
        console.log("pageNumber ",pageNumber);       
       offset = ((pageNumber - 1) * pageSize) ;
        sql=sql+" limit  " + (offset + pageSize <= req.body.limit ? pageSize : req.body.limit - offset) + " offset " + offset;
        console.log("QUERY FOR PRODUCT LIST =================",sql)
        result = await sails.sendNativeQuery(sql);
        data.data = result["rows"];
        data.totalRecord = totalRecord;
        data.totalPage = totalPage;
        return res.json(data);
      } catch (error) {
        return res.json(error);
      }
      
 },
  getProductDetailById:async function(req,res){
    var QUERY = `SELECT prd.*,doc.DocumentData,
    smlImg1.DocumentData AS smlImg1, 
    smlImg2.DocumentData AS smlImg2,
    smlImg3.DocumentData AS smlImg3
     FROM product prd
    LEFT JOIN document doc ON doc.id=prd.bigImg
    LEFT JOIN document smlImg1 ON smlImg1.id=prd.smallImg1
    LEFT JOIN document smlImg2 ON smlImg2.id=prd.smallImg2
    LEFT JOIN document smlImg3 ON smlImg3.id=prd.smallImg3
    WHERE prd.id=` + req.params.id ;
    var profileInputer = await sails.sendNativeQuery(QUERY);
    return res.json(profileInputer['rows']);
  },
  updateStock:async function(req,res){
    var cartDetails = await Product.find({ id: req.body.id })
    if(cartDetails && cartDetails[0]){
        var userObject = await Product.update({
            id: req.body.id
        }).set({
          stock:req.body.quantities
        });
        return res.json({ status: 200, message: "Stock updated sucessefully!", data: userObject });
    }else{
        return res.json({ status: 400, message: "Product not found", data: null });
    }
  }

};

