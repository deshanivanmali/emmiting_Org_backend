/**
 * DocumentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var fs = require("fs");
module.exports = {
    uploadAvatar: function (req, res) {
        // var name = req.body.name;
        // var ex = req.body.fileType;
        // var documentType = req.body.documentType;
        // console.log(new Date() + ' : file name : ' + name);
        // console.log(new Date() + ' : file extension : ' + ex);
        // console.log(new Date() + ' : document type : ' + documentType);
        //console.log(new Date() + ' : '  +  req.file('avatar'));
        req.file('avatar').upload({
            // maxBytes: 5 : 1024  1024,
            // saveAs:name,
            //saveAs: '/' + name + '.' + ex,
            dirname: require('path').resolve(sails.config.appPath, 'assets/images')
        }, async function (eruploadAvatarr, uploadedFiles) {
            if (eruploadAvatarr) {
                console.log(new Date() + ' : Error in uploading file : ');
                console.log(new Date() + ' : ' + eruploadAvatarr);
                return res.serverError(eruploadAvatarr);

            } else {
                console.log(new Date(), uploadedFiles);
                var image = fs.readFileSync(uploadedFiles[0].fd);

                var document = await Document.create({
                    DocumentData: image

                }).fetch();
                console.log(new Date() + ' : document id : ' + document.id);
                return res.json({
                    documentId: document.id,
                    message: uploadedFiles.length + ' file(s) uploaded successfully!'
                });
            }
        });

    },

};

