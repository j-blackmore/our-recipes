const express = require('express');
const router = express.Router();
const IncomingForm = require('formidable').IncomingForm;

const { cloudinaryUpload, uploadLocally } = require('../services/filesService');

router.route('/upload').post((req, res) => {
    if (process.env.ENV !== 'PROD') {
        uploadLocally(req, res, err => {
            if (err) res.status(500).json({ status: 'image upload failed' });

            const fileName = req.file.originalname;
            res.status(200).json({
                status: 'image upload success',
                imageUrl: '/images/' + fileName,
                imageId: fileName
            });
        });
    } else {
        IncomingForm().parse(req, (err, _fields, files) => {
            if (err) {
                res.status(500).json({
                    status: 'Parsing error when saving image'
                });
            }

            cloudinaryUpload(files.recipeImage).then(
                result => {
                    res.status(result.status).json(result);
                },
                error => {
                    res.status(error.status).json(error);
                }
            );
        });
    }
});

module.exports = router;
