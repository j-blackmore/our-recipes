const fs = require('fs');
const cloudinary = require('cloudinary');
const multer = require('multer');

const { getErrorResponseObject } = require('../utils');

const PUBLIC_DIR = '../client/public';
const IMAGES_DIR = PUBLIC_DIR + '/images/';

const storage = multer.diskStorage({
    destination: IMAGES_DIR,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// TODO: Either change 'recipeImage' to generic file name, or pass as a param
const uploadLocally = multer({ storage: storage }).single('recipeImage');

const removeLocally = imageUrl => {
    const filePath = PUBLIC_DIR + imageUrl;

    fs.unlink(filePath, error => error);
    return;
};

const cloudinaryRemove = imageId => {
    cloudinary.uploaded.destroy(imageId, error => error);
    return;
};

const cloudinaryUpload = file => {
    cloudinary.uploader.upload(
        file.path,
        { unique_filename: true, folder: 'recipes' },
        (error, image) => {
            return new Promise((resolve, reject) => {
                if (error) {
                    reject(getErrorResponseObject(500, 'Image upload failed'));
                }

                resolve({
                    status: 200,
                    message: 'Image upload successful',
                    imageUrl: image.url,
                    imageId: image.public_id
                });
            });
        }
    );
};

module.exports = {
    uploadLocally: uploadLocally,
    removeLocally: removeLocally,
    cloudinaryUpload: cloudinaryUpload,
    cloudinaryRemove: cloudinaryRemove,
    PUBLIC_DIR: PUBLIC_DIR,
    IMAGES_DIR: IMAGES_DIR
};
