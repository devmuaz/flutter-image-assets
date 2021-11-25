const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

/**
 * 
 * @param {string} directoryPath 
 * @param {string} imagePath 
 * @param {number} mode 
 * @param {number} scale 
 * @returns 
 */
const scaleImageToMode = (directoryPath, imagePath, mode, scale = 0.25) => {
    const fileName = path.basename(imagePath);
    var destinationPath = path.join(directoryPath, fileName);
    if (mode == 1) {
        scaleImage(destinationPath, imagePath, scale);
        return;
    }

    destinationPath = path.join(directoryPath, `${mode}x`);
    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath);
    }
    scaleImage(path.join(destinationPath, fileName), imagePath, mode == 2 ? 0.50 : mode == 3 ? 0.75 : scale);
};

/**
 * 
 * @param {string} destinationImagePath 
 * @param {string} imagePath 
 * @param {number} scale 
 * @returns 
 */
const scaleImage = (destinationImagePath, imagePath, scale) => {
    return new Promise((resolve, reject) => {
        Jimp.read(imagePath, (error, image) => {
            if (error) {
                reject(error);
                console.log(error);
                throw error;
            }
            image.scale(scale).write(destinationImagePath);
            resolve();
        });
    });
};

const ImageUtils = () => { };

ImageUtils.scaleImageToMode = scaleImageToMode;

module.exports = ImageUtils;