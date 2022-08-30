const {
  pathExist,
  convertAbsolutePath,
  getExt,
  pathIsADir,
  findFiles,
  validateStatus,
  getLinks,
  getLinksOfDir,
} = require('./APIfunctions.js');

/* const rutaAbsoluta = convertAbsolutePath('./archivosPrueba/archivo2');
console.log(rutaAbsoluta);
console.log(pathIsADir(rutaAbsoluta));
const arrayFiles = findFiles(rutaAbsoluta);
console.log(arrayFiles);
const links = getLinksOfDir(arrayFiles);
console.log(links); */

const mdLinks = (path, validateOptions = { validate: false }) => { 
  return new Promise((resolve, reject) => {
    let links = [];
    if (pathExist(path)){
      const pathAbsolute = convertAbsolutePath(path);
      if(pathIsADir(pathAbsolute)){
        const arrayFiles = findFiles(pathAbsolute);
        if (arrayFiles.length != 0){
          links= getLinksOfDir(arrayFiles);
        }else{
          reject('No se encontraron archivos md en el directorio');
        }
      }else if(getExt(pathAbsolute)==='.md'){
          links= getLinks(pathAbsolute);
        }else {
          reject('La ruta no contiene archivos md');
        }
      if (links.length != 0) {
        if (validateOptions.validate) {
          resolve(validateStatus(links));
        } else {
          resolve(links);
        }
      }else{
        reject('No se encontraron links');
      }
    }else {
      reject("La ruta es inválida");
    }
  });
}

module.exports= { mdLinks };

//'C:/Users/USER/Laboratoria-Proyectos/LIM018-md-links/archivosPrueba'

/* mdLinks('./archivosPrueba', { validate: true })
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); */

/* mdLinks('./archivosPrueba/link1.md')
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); */

/* mdLinks('./archivosPrueba/archivo2')
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); */

/* mdLinks('./archivosPrueba/archivo1')
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); */

/* mdLinks('README.md', { validate: true })
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); */

/* mdLinks('archivotxt.txt')
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); */

/* mdLinks('prueba.md')
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); */