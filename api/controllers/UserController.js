/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    atobFunction(data){
        const buf = Buffer.from(req.body.password, "utf8");
        const base64Encode = buf.toString("base64");
    },
    login: async function (req, res) {
        const plain = Buffer.from(req.body.password, 'base64').toString('utf8');
        // if(req.body.userName === undefined || req.body.userName === null || req.body.userName === ""  || req.body.password === undefined || req.body.password === null || req.body.password === "")  {
        //     console.log("req.body.userName==undefined {} ");
        //     return res.json({ status: 400, message: "Something wants wrong..", data: null });
        // }
      
        var userObject = await User.find({
            userName: req.body.userName,
            password:plain// atob(req.body.password)
        });
      
       
        if (userObject && userObject[0]) {
            // let sql=`SELECT u.userName,u.firstName,u.mobileNumber,u.email,urole.role FROM USER u
            // LEFT JOIN user_role urole ON urole.id=u.role_id
            // WHERE u.userName=${ req.body.userName} AND u.password=${ atob(req.body.password)}`;
            return res.json({ status: 200, message: "Login sucessefully!", data: userObject });
        } else {
            return res.json({ status: 400, message: "Wrong username/password", data: null });
        }

    },

    register: async function (req, res) {
     
        var userObject = await User.create({
            userName: req.body.userName,
            password:req.body.password,// atob(req.body.password),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email

        }).fetch();
        if (userObject || userObject[0]) {
            return res.json({ status: 200, message: "Registration sucessefully!", data: userObject });
        } else {
            return res.json({ status: 400, message: "Something wants wrong", data: null });
        }

    },
    sendOtp: async function (req, res) {
        var user = await User.find({ email: req.body.email });

        if (user && user[0]) {
            var sixdigitsrandom = Math.floor(100000 + Math.random() * 900000);
            await User.update({
                email: req.body.email
            }).set({
                otp: sixdigitsrandom
            });
            /// email logic here 
            // return res.json({ message: "An Email Has Been Sent To Your " + req.body.email + "  Account inbox (don’t forget to check your spam folder!),You Will Find An OTP To set new password", userId: user[0].id });
            var response = await sails.helpers.sendEmail(req.body.email, "OTP For Login", "OTP : " + sixdigitsrandom);

            if (response && response.error) {
                return res.json({ error: response.error });
            } else {
                //A recovery email has been sent to your inbox (don’t forget to check your spam folder!)”
                return res.json({ message: "An Email Has Been Sent To Your " + req.body.email + "  Account inbox (don’t forget to check your spam folder!),You Will Find An OTP To set new password", userId: user[0].id });
            }

        } else {
            return res.json({ status: 400, message: "Email not registered" });
        }
    },
    chekUniqueEmailAndUSerName: async function (req, res) {
        if (req.body.email != undefined || req.body.email != null) {
            var user = await User.find({ email: req.body.email });
            if (user && user[0]) {
                return res.json({ status: 400, message: "Email already registered!" });
            } else {
                return res.json({ status: 200, message: "Email availabel!" });
            }
        }
        if (req.body.userName != undefined || req.body.userName != null) {
            var user = await User.find({ userName: req.body.userName });
            if (user && user[0]) {
                return res.json({ status: 400, message: "UserName already registered!" });
            } else {
                return res.json({ status: 200, message: "UserName availabel!" });
            }
        }
    },
    updateProfile: async function (req, res) {
        var user = await User.find({ id:parseInt( req.body.id) });

        if (user && user[0]) {
            var userObject = await User.update({
                id: parseInt( req.body.id)
            }).set({
                mobileNumber: parseInt(req.body.mobileNumber),
                firstName: req.body.firstName,
                lastName: req.body.lastName,               
                email: req.body.email,
                fkPrifilePictureID: req.body.fkPrifilePictureID,
            }).fetch();
            return res.json({ status: 200, message: "Profile updated sucessefully!", data: userObject });
        } else {
            return res.json({ status: 400, message: "User not found", data: null });
        }

    },
    createUSer: async function (req, res) {
        
        const plain = Buffer.from(req.body.password, 'base64').toString('utf8') 
        var userObject = await User.create({
            userName: req.body.userName,
            password:plain,// atob(req.body.password),
            role_id: req.body.role_id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobileNumber: req.body.mobileNumber,
            email: req.body.email,
            fkPrifilePictureID: req.body.fkPrifilePictureID,
        });
        if (userObject && userObject[0]) {
            return res.json({ status: 200, message: "Profile created sucessefully!", data: userObject });
        } else {
            return res.json({ status: 500, message: "Profile creation time error" });
        }

    },
    updateProfilePicture: async function (req, res) {
        var user = await User.find({ id: req.body.id });
        if (user && user[0]) {
            await User.update({
                id: req.body.id
            }).set({
                fkPrifilePictureID: req.body.fkPrifilePictureID
            });
            return res.json({ status: 200, message: "Profile picture chaged sucessefully!" });
        } else {
            return res.json({ status: 400, message: "User not found" });
        }
    },
    checkOtp: async function (req, res) {
        var user = await User.find({ email: req.body.email, otp: req.body.otp });
        if (user && user[0]) {
            return res.json({ status: 200, message: "OTP matched" });
        } else {
            return res.json({ status: 400, message: "OTP dose not matched" });
        }
    },
    checkOldPassword: async function (req, res) {
        const plain = Buffer.from(req.body.password, 'base64').toString('utf8');
        const newPass=Buffer.from(req.body.newPassword, 'base64').toString('utf8')
        var user = await User.find({ email: req.body.email, password: plain });
        if (user && user[0]) {
            //return res.json({ status: 200, message: "Password matched" });
            var userObject = await User.update({
                email: req.body.email
            }).set({
                password: newPass//atob(req.body.newPassword)
            }).fetch();
            if (userObject && userObject[0]) {
                return res.json({ status: 200, message: "Password changed sucessefully!" });
            } else {
                return res.json({ status: 400, message: "Something wents wrong" });
            }


        } else {
            return res.json({ status: 400, message: "Old password dose not matched" });
        }
    },

    changePassword: async function (req, res) {
        
        const newPass=Buffer.from(req.body.password, 'base64').toString('utf8')
        var user = await User.find({ email: req.body.email });
        if (user && user[0]) {
            var userObject = await User.update({
                email: req.body.email
            }).set({
                password: newPass//atob(req.body.password)
                
            });
            return res.json({ status: 200, message: "Password changed sucessefully!", data: userObject });

        } else {
            return res.json({ status: 400, message: "Email not registered" });
        }
    },
    getUserById: async function (req, res) {
       
        var user = await User.find({ id: req.body.id });
        if (user && user[0]) {
            var QUERY = `SELECT u.email,u.address,u.userName,u.firstName,u.lastName,u.mobileNumber,u.email,urol.role,doc.DocumentData FROM user u
            LEFT JOIN user_role urol ON u.role_id=urol.id
            LEFT JOIN document doc ON u.fkPrifilePictureID=doc.id
            WHERE u.ID=` + req.body.id + ``;
            var profileInputer = await sails.sendNativeQuery(QUERY);
            return res.json(profileInputer['rows']);
        } else {
            return res.json({ status: 400, message: "User not found" });
        }
    },
    sendEmail:async function(req,res){
        var response = await sails.helpers.sendEmail(req.body.email, "Thank you for your feed,We are happy to hear you back" );

        if (response && response.error) {
            return res.json({ error: response.error });
        } else {
            //A recovery email has been sent to your inbox (don’t forget to check your spam folder!)”
            return res.json({ message: "An Email Has Been Sent To Your " + req.body.email + "  Account inbox (don’t forget to check your spam folder!)", userId: user[0].id });
        }
    },
    callRestApi:async function(req,res){
        
     const axios = require('axios');
     console.log("its called");
     try {
         temp={
  "cle":req.body.cle,
 //  erreur:req.body.erreur,
  "donnees":{
      "id":req.body.donnees.id,
      "date":req.body.donnees.date,
      "urlReliad":req.body.donnees.urlReliad,
      "message":req.body.donnees.message
  }
 };
 
 confi={
  method: 'post',
  url: 'https://script.google.com/macros/s/AKfycby-TJmFFUFTfiNUbMoSIZx8LVtiskQ-bUt4xO6hmrU0XQpJS8IPUBow/exec',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : req.body
 };
 var options = {
     'method': 'POST',
     'url': 'https://script.google.com/macros/s/AKfycby-TJmFFUFTfiNUbMoSIZx8LVtiskQ-bUt4xO6hmrU0XQpJS8IPUBow/exec',
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
       },
     data:temp
   };
   const result = await axios(options);
     
     console.log(result)
     return res.status(200).send({
         status: 200,
         data: result.data
     })
      console.log(res.data);
  } catch (err) {
      console.error(err);
      return res.status(500).send({
         status: 500,
         data: null
     })
  }
    }
};

