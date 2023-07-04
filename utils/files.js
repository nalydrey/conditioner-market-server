import path, {dirname} from 'path'
import {fileURLToPath} from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url))

export const loadImages = (newImages, oldImages) => {
    const images = []

    deleteImages(oldImages)

    Object.keys(newImages).forEach(file => {
            let imgName = Date.now().toString() + newImages[file].name
            newImages[file].mv(path.join(__dirname, '..','uploads', imgName))
              images.push(imgName)
            })
    return images
}
export const loadImage = (newImage, oldImage) => {
    deleteImage(oldImage)
    let fileName = Date.now().toString() + newImage.name
    newImage.mv(path.join(__dirname,'..','uploads', fileName))
    return fileName
}
export const deleteImages = (imagesName) => {
    console.log(imagesName)
    imagesName.forEach(img => {
        if(fs.existsSync(`${__dirname}/../uploads/${img}`)){
            fs.unlinkSync(`${__dirname}/../uploads/${img}`)
        }
    })
}
export const deleteImage = (imageName) => {
    if(imageName){
        if(fs.existsSync(`${__dirname}/../uploads/${imageName}`)){
            fs.unlinkSync(`${__dirname}/../uploads/${imageName}`)
        }
    }
}