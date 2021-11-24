const fs = require('fs');
const Jimp = require('jimp');
/**
 * 
 * @param {string} destImagePath 
 * @param {string} imagePath 
 * @param {number} mode 
 * @param {number} scale 
 * @returns 
 */
const scaleImageToMode = (destImagePath, imagePath, mode, scale = 0.25) => {
    const fileName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length);
    var path = `${destImagePath}/${fileName}`;
    if (mode == 1) {
        scaleImage(path, imagePath, scale);
        return;
    }

    path = `/${destImagePath}/${mode}x/`;
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    scaleImage(`${path}${fileName}`, imagePath, mode == 2 ? 0.50 : mode == 3 ? 0.75 : scale);

};

/**
 * 
 * @param {string} destImagePath 
 * @param {string} imagePath 
 * @param {number} scale 
 * @returns 
 */
const scaleImage = (destImagePath, imagePath, scale) => {
    return new Promise((resolve, reject) => {
        Jimp.read(imagePath, (error, image) => {
            if (error) {
                reject(error);
                console.log(error);
                throw error;
            }
            image.scale(scale).write(destImagePath);
            resolve();
        });
    });
};

const ImageUtils = () => { };

ImageUtils.scaleImageToMode = scaleImageToMode;

module.exports = ImageUtils;