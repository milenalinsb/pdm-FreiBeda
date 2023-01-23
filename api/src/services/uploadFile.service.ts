import { UploadedFile } from 'express-fileupload'

export const uploadFile = (file: UploadedFile) => {
    const uploadPath = `${__dirname.split('/services')[0]}/public/${file.name}.png`
    file.mv(uploadPath, (err) => {
        if (err) {
            throw new Error('Erro no upload')
        }
    })
}
