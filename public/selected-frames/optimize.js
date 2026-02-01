const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const VALID_EXT = ['.jpg', '.jpeg', '.JPG', '.JPEG']

const files = fs.readdirSync(__dirname)

const images = files.filter(file =>
  VALID_EXT.includes(path.extname(file))
)

if (!images.length) {
  console.log('Nenhuma imagem encontrada para converter.')
  process.exit(0)
}

images.forEach(file => {
  const output = file.replace(path.extname(file), '.webp')

  sharp(path.join(__dirname, file))
    .resize(1280, 720, { fit: 'inside' })
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(__dirname, output))
    .then(() => console.log('OK:', output))
    .catch(err => console.error('Erro:', file, err))
})
