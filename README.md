# Librería md-links-gabycr

## Índice

* [1. Descripción del módulo](#1-descripción-del-módulo)
* [2. Diagrama de Flujo](#2-diagrama-de-flujo)
* [3. Instrucciones de Instalación](#3-instrucciones-de-instalación)
* [4. Documentación](#4-documentación)
* [5. Ejemplos](#5-ejemplos)
* [6. Developer](#6-developer)

***

## 1. Descripción del módulo

md-links-gabycr es una librería desarrollada en JavaScript y node.js que lee y analiza archivos en formato Markdown, para verificar los links que contengan y devuelve algunas estadísticas.

## 2. Diagrama de Flujo

Diagrama de Flujo de API md-links

![Diagrama de Flujo de API md-links](https://github.com/GabrielaC3/LIM018-md-links/blob/main/images/Diagrama%20de%20Flujo%20de%20API%20md-links.png)

Diagrama de Flujo de CLI md-links

![Diagrama de Flujo de CLI md-links](https://github.com/GabrielaC3/LIM018-md-links/blob/main/images/Diagrama%20de%20Flujo%20de%20CLI%20md-links.png)


## 3. Instrucciones de Instalación

Para instalar la librería debe ejecutar lo siguiente:

``npm i md-links-gabycr``


## 4. Documentación

La librería puede ejecutarse de la siguiente manera a través de la **terminal**:

`md-links <path-to-file> [options]`

En el caso de que ingrese como argumento solo la ruta (path), la librería indentificará los archivos markdown, analizará el archivo Markdown e imprimirá los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link (truncado a 50 caracteres).

```
**Salida:**
file:
href:
text:
```

#### Options

##### `--validate`

Si se ingresa como segundo argumento la opción `--validate`, el módulo debe hará una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces se considera el link como ok.

El _output_ en este caso incluirá la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

```
**Salida:**
file:
href:
ok:
status:
text:
```

##### `--stats`

Si se ingresa como argumento la opción `--stats` el output (salida) será un texto con estadísticas básicas sobre los links.

```
Número total de links
Número de links únicos
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que necesiten de los resultados de la validación.

```
Número total de links
Número de links únicos
Número de links rotos
```

## 5. Ejemplos

En el caso de ingresar solo la ruta:

`md-links <path-to-file> [options]`

![Ejemplo solo ruta como arg](https://github.com/GabrielaC3/LIM018-md-links/blob/main/images/soloRuta.PNG)

#### Options

##### `--validate`

![Ejemplo validate](https://github.com/GabrielaC3/LIM018-md-links/blob/main/images/validate.PNG)

##### `--stats`

![Ejemplo stats](https://github.com/GabrielaC3/LIM018-md-links/blob/main/images/stats.PNG)

##### `--validate --stats`

![Ejemplo validate y stats](https://github.com/GabrielaC3/LIM018-md-links/blob/main/images/validateStats.PNG)

##### `--help`

![Ejemplo validate y stats](https://github.com/GabrielaC3/LIM018-md-links/blob/main/images/help.PNG)

##### `sin argumentos`

![Ejemplo sin argumentos](https://github.com/GabrielaC3/LIM018-md-links/blob/main/images/sinArgumentos.PNG)

## 6. Developer

Gabriela Córdova

