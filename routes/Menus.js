const express = require('express');
const router = express.Router();
const { Menus } = require('../models');
const { validateToken} = require('../services/JWT');
const multer = require('multer')
const path = require('path')
const fs = require('fs')


router.get('/', validateToken, async (req, res) => {
    const menus = await Menus.findAll({ where: {UserId: req.user.id}});
    res.json(menus);
});

router.get("/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    const menu = await Menus.findByPk(id)
                                .then(function(menu) {
                                    if(menu.UserId !== userId) {res.json({error: "Unauthorized access to this menu"})}
                                    res.json(menu);
                                })
                                .catch(function (err) {
                                    // every error
                                    res.json(err);
                                });
    
});

router.delete("/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    const menu = await Menus.findByPk(id)
                                .then(function(menu) {
                                    if(menu.UserId !== userId) {res.json({error: "Unauthorized access to this menu"})}

                                    Menus.destroy({
                                            where: { id: id },
                                        })
                                        .then(function(delres){
                                            res.json({"msg": "SUCCESS"});
                                        })

                                })
                                .catch(function (err) {
                                    // every error
                                    res.json(err);
                                });
    
});



router.post("/", validateToken, async (req, res) => {
    const userId = req.user.id;
    const {title, menuDATA} = req.body;

    const menu = await Menus
                            .create({
                                menuDATA: menuDATA,
                                title: title,
                                UserId: userId,
                            })
                            .then(function (menu) {
                                res.status(200).json({"msg": "SUCCESS", "menu_id": menu.id} );
                            })
                            .catch(function (err) {
                                // every other error
                                res.status(400).json({"err": err.errors[0].message});
                            });
    
});



//img storage
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});

//POST body form data: image -> the image to upload; 
router.post("/image-upload", validateToken, upload.single('image'), (req, res) => {
    if (!req.file) {
        res.json({"msg": "No file upload"});
    } else {
        res.json({"img_name": req.file.filename, "msg": "SUCCESS"});
    }
});

router.delete("/image-delete/:imagename", (req, res) => {
    const imgname = req.params.imagename;
    console.log(imgname + " is the one");
    console.log(path.join(__dirname, '..', 'public', 'images', imgname));

    try {
        fs.unlinkSync(path.join(__dirname, '..', 'public', 'images', imgname));

        return res.status(200).send({"msg":'SUCCESS', "img":imgname});
    } catch (err) {
        return res.send(err);
    }
  });





module.exports = router;
