const fs = require('fs');
const path = require('node:path');
const marked = require('marked');
const axios = require('axios');

//Lee archivo
const readFile = (route) => fs.readFileSync(route, 'utf8');

//Lee directorio
const readDir = (ruta) => fs.readdirSync(ruta);

//Une dos rutas
const joinPath = (ruta1, ruta2) => path.join(ruta1, ruta2);
//joinPath('C:/Users/USER/Laboratoria-Proyectos/LIM018-md-links', 'prueba.md');

//Verifica si la ruta existe (true) o no existe (false)
const pathExist = (ruta) => fs.existsSync (ruta);

//Verifica si la ruta es absoluta y si es relativa la convierte en absoluta
const convertAbsolutePath = (ruta) => {
  if (path.isAbsolute(ruta)){
      return ruta;
    }else{
      if(path.resolve(ruta) == path.normalize(ruta));
      return path.resolve(ruta);
    }
};

//Averigua la extensión de un archivo
const getExt = (file) => path.extname(file);

//Verifica si la ruta es un directorio
const pathIsADir = (ruta) => fs.lstatSync(ruta).isDirectory();

const getLinks = (file) => {
  const renderer = new marked.Renderer();
  let arrayOnlyUrl = [];
  const expUrl = /^(http|https):\/\/[^ "]+$/;
  renderer.link  = (url, title, text) => {
  let arrayLinks = {
      href: url,
      text: text.slice(0,50),
      file: file
  }
  if(expUrl.test(arrayLinks.href)){
    arrayOnlyUrl.push(arrayLinks)
  }
}
      marked.use({ renderer });
      marked.parse(readFile(file));
  return arrayOnlyUrl;
}

const arrayLinks = getLinks('./archivosPrueba/link1.md');

const validateStatus = (arrayLinks) => {
  return Promise.all( arrayLinks.map((link) => 
   axios.get(link.href)
    .then((resolve)=>{
      link.status = resolve.status,
      link.ok= 'ok';
      return link;
        })
   .catch((error) => {
      link.status = 'Este link esta roto '+ error;
      link.ok = 'fail';
      return link;    
    })
  ))
}
/* validateStatus(arrayLinks)
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); */


//Recorre directorios y encuentra archivos md (recursiva)
const findFiles = (ruta) => {
  let arrayFiles = [];
    const arrayDirectory = readDir(ruta);
    for(let i=0; i<arrayDirectory.length; i++) {
      const routeList = joinPath(ruta, arrayDirectory[i]);
      if(pathIsADir(routeList)){
          let continueFindFiles = findFiles(routeList);
          arrayFiles = arrayFiles.concat(continueFindFiles)
      }
      if(path.extname(routeList) === '.md'){
          arrayFiles.push(routeList);
      }
    }
  return arrayFiles;
}
//const arrayFiles = findFiles('./archivosPrueba');
//console.log(arrayFiles);

const getLinksOfDir = (arrayFiles) => {
  const linksObtenidos = [];
  for(let i=0; i<arrayFiles.length; i++){
    const links = getLinks(arrayFiles[i]);
    linksObtenidos.push(links);
  }
  return linksObtenidos.flat();
}

//console.log(getLinksOfDir(arrayFiles));

module.exports = {
  pathExist,
  convertAbsolutePath,
  getExt,
  pathIsADir,
  findFiles,
  readDir,
  getLinks,
  validateStatus,
  getLinksOfDir
}
