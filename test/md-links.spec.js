const {
  pathExist,
  convertAbsolutePath,
  getExt,
  pathIsADir,
  findFiles,
  validateStatus,
  getLinks,
  getLinksOfDir,
} = require('../APIfunctions.js');

const axios = jest.createMockFromModule('axios').default;
//import mockAxios from 'jest-mock-axios';
const { mdLinks } = require('../index.js');

describe('pathExist', () => {
  it('Debería ser una función', () => {
    expect(typeof pathExist).toBe('function');
  });
  it('Verifica si la ruta existe', () => {
    expect(pathExist('./archivosPrueba/link1.md')).toBe(true);
  });
  it('Verifica que la ruta no existe', () => {
    expect(pathExist('./rutafalsa.md')).toBe(false);
  });
});

describe('convertAbsolutePath', () => {
  it('Debería ser una función', () => {
    expect(typeof convertAbsolutePath).toBe('function');
  });
  it('Si recibe una ruta absoluta devuelve la misma ruta', () => {
    expect(convertAbsolutePath('C:/Users/USER/Laboratoria-Proyectos/LIM018-md-links/archivosPrueba')).toEqual('C:/Users/USER/Laboratoria-Proyectos/LIM018-md-links/archivosPrueba');
  });
  it('Si recibe una ruta relativa la convierte en absoluta', () => {
    expect(convertAbsolutePath('prueba.md')).toEqual('C:\\Users\\USER\\Laboratoria-Proyectos\\LIM018-md-links\\prueba.md');
  });
});

describe('getExt', () => {
  it('Debería ser una función', () => {
    expect(typeof getExt).toBe('function');
  });
  it('Averigua la extensión de un archivo', () => {
    expect(getExt('prueba.md')).toEqual('.md');
  });
});

describe('pathIsADir', () => {
  it('Verifica si la ruta es un directorio', () => {
      expect(pathIsADir('./archivosPrueba')).toBe(true);
  });

  it('Verifica si la ruta no es un directorio', () => {
      expect(pathIsADir('prueba.md')).toBe(false);
  });
});

const arrayFiles=[
  'archivosPrueba\\archivo1\\link3.md',
  'archivosPrueba\\link1.md',
  'archivosPrueba\\link2.md'
];

describe('findFiles', () => {
  it('Debería ser una función', () => {
    expect(typeof findFiles).toBe('function');
  });
  it('Recorre directorios y encuentra archivos md', () => {
    expect(findFiles('./archivosPrueba')).toEqual(arrayFiles);
  });
});

const arrayUrl=[
  {
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    file: './archivosPrueba/link1.md'
  },
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    file: './archivosPrueba/link1.md'
  }
];

describe('getLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof getLinks).toBe('function');
  });
  it('Obtiene links de un archivo .md', () => {
    expect(getLinks('./archivosPrueba/link1.md')).toEqual(arrayUrl);
  });
});

const linksDir= [
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/05-objects/01-objects',
    text: 'Objetos en JavaScript',
    file: 'archivosPrueba\\archivo1\\link3.md'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
    text: 'Funciones — bloques de código reutilizables - MDN',
    file: 'archivosPrueba\\archivo1\\link3.md'
  },
  {
    href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    text: 'Módulos, librerías, paquetes, frameworks',
    file: 'archivosPrueba\\archivo1\\link3.md'
  },
  {
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    file: 'archivosPrueba\\link1.md'
  },
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    file: 'archivosPrueba\\link1.md'
  },
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
    text: 'Arreglos',
    file: 'archivosPrueba\\link2.md'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
    text: 'Array - MDN',
    file: 'archivosPrueba\\link2.md'
  }
];

describe('getLinksOfDir', () => {
  it('Debería ser una función', () => {
    expect(typeof getLinksOfDir).toBe('function');
  });
  it('Obtiene links de un array de archivos', () => {
    expect(getLinksOfDir(arrayFiles)).toEqual(linksDir);
  });
});

const statusOk = [{
  href: 'https://nodejs.org/es/',
  text: 'Node.js',
  file: './archivosPrueba/link1.md',
  status: 200,
  ok: 'ok'
    }];

const statusFail = [{
      href: 'https://www.google.com/404', 
      text: 'https://www.google.com/404',
      file: 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba3.md',
      status: 'Este link esta roto AxiosError: Request failed with status code 404',
      ok: 'fail'
  }]
describe('getLinksStatus', () => {
  it('Valida el estado de los links resueltos', () => {
      axios.mockImplementation(() => Promise.resolve([{
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: './archivosPrueba/link1.md',
        status: 200,
        ok: 'ok'
          }]))
          return validateStatus ([{
            href: 'https://nodejs.org/es/',
            text: 'Node.js',
            file: './archivosPrueba/link1.md',
            status: 200,
            ok: 'ok'
          }])
       .then((data) => {expect(data).toEqual(statusOk)})   
  });

  it('Valida el estado de los links rechazados', () => {
      axios.mockImplementation(() => Promise.reject({
              href: 'https://www.google.com/404', 
              text: 'https://www.google.com/404',
              file: 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba3.md',
              status: 'Este link esta roto AxiosError: Request failed with status code 404',
              ok: 'fail'
          }))
          return validateStatus ([{
              href: 'https://www.google.com/404', 
              text: 'https://www.google.com/404',
              file: 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba3.md',
              status: 'Este link esta roto AxiosError: Request failed with status code 404',
              ok: 'fail'
          }])
       .then((data) => {expect(data).toEqual(statusFail)
       })   
  });
});

const arraylinksUrl=[
  {
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    file: 'C:\\Users\\USER\\Laboratoria-Proyectos\\LIM018-md-links\\archivosPrueba\\link1.md',
  },
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    file: 'C:\\Users\\USER\\Laboratoria-Proyectos\\LIM018-md-links\\archivosPrueba\\link1.md',
  }
];

const arrayLinks1 = [
  {
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    file: 'C:\\Users\\USER\\Laboratoria-Proyectos\\LIM018-md-links\\archivosPrueba\\link1.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    file: 'C:\\Users\\USER\\Laboratoria-Proyectos\\LIM018-md-links\\archivosPrueba\\link1.md',
    status: 200,
    ok: 'ok'
  }
];

describe('mdLinks', () => {

  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Retorna mensaje: "La ruta es inválida" ', ()=>{
    const resultado = mdLinks('rutainvalida.md')
    resultado.then((res)=> expect(res).toStrictEqual('La ruta es inválida')).catch((rej)=>rej);
  });

  it('Retorna mensaje: "La ruta no contiene archivos md"', ()=>{
    const resultado = mdLinks('./archivosPrueba/archivo2')
    resultado.then((res)=> expect(res).toStrictEqual('La ruta no contiene archivos md')).catch((rej)=>rej);
  });

  it('Retorna mensaje: "No se encontraron links"', ()=>{
    const resultado = mdLinks('prueba.md')
    resultado.then((res)=> expect(res).toStrictEqual('No se encontraron links')).catch((rej)=>rej);
  });

  it('debe retornar en un array de objetos con href, text y file', () => {
    const resultado = mdLinks(('./archivosPrueba/link1.md'));
    resultado.then((res) => expect(res).toStrictEqual(arraylinksUrl));
  });

  it('debe retornar en un array de objetos con href, text, file, status y ok', () => {
    const resultado = mdLinks(('./archivosPrueba/link1.md'), { validate: true });
    resultado.then((res) => expect(res).toStrictEqual(arrayLinks1));
  });
});
