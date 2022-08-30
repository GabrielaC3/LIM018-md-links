#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const chalk = require('chalk');

const [, , ...args] = process.argv;

if (args.length === 0 ) {
console.error(chalk.hex('FFB562')(chalk.bgHex('F2D7D9').bold
(` ฅ^•ﻌ•^ฅ─✧─ Debe ingresar una ruta o ingrese --help para ver los comandos válidos ─✧─`)))
}

if (args.length === 1){
    if (args[0]=="--help") {
        console.log(chalk.cyan(`
        ┌─ ☾ ⋆ ────────────────────────────────────────────────────────────┐
                                    MD LINKS - Gaby
            Comandos válidos:
            1. path: Ruta absoluta o relativa al archivo o directorio.
               Retorna los links encontrados con el siguiente formato: 
                    href: URL encontrada.
                    text: Texto que aparecía dentro del link (<a>).
                    file: Ruta del archivo donde se encontró el link.

            2. --validate: Para veriguar si los links encontrados funciona o no.
                Retorna los links encontrados con el siguiente formato: 
                    href: URL encontrada.
                    text: Texto que aparecía dentro del link (<a>).
                    file: Ruta del archivo donde se encontró el link.
                    status: Código de respuesta HTTP.
                    ok: Mensaje fail en caso de fallo u ok en caso de éxito.
            
            3. --stats: Retorna estadísticas básicas sobre los links:
                    Total: Número total de links encontrados.
                    Unique: Número de links únicos.
            
            4. --validate --stats: Retorna estadísticas que necesitan de los
               resultados de la validación:
                    Total: Número total de links encontrados.
                    Unique: Número de links únicos.
                    Broken: Número de links rotos.
        └──────────────────────────────────────────────────────────── ☾ ⋆ ─┘
        `));
    } else {
        mdLinks(args[0], {validate:false})
        .then((res) => {
            console.log(chalk.magenta(`
            ┌─ ☾ ⋆ ────────────────────────────────────────────────────────┐
                                   Links Encontrados
            └──────────────────────────────────────────────────────── ☾ ⋆ ─┘
            `));
            res.forEach(link => {
                console.log('\t'+ "file: "+chalk.hex('#800080')(link.file) + 
                '\n\t' + "href: " + chalk.hex('54BAB9')(link.href) + 
                '\n\t' + "text: " + chalk.hex('F6D7A7')(link.text)+ '\n\t' 
                + chalk.magenta('─────────────────────────────────────── ⋆ ⋆ ⋆ ──────────────────────────────────────'))
        })
    })
        .catch((rej) => console.log(chalk.red(rej)))
    }
}
    
if(args.length === 2){
    if (args[1]=="--validate") {
        mdLinks(args[0], {validate:true})
        //.then((res) => console.log(res))
        .then((res) => {
            console.log(chalk.magenta(`
            ┌─ ☾ ⋆ ────────────────────────────────────────────────────────┐
                            Validación de los Link Encontrados
            └──────────────────────────────────────────────────────── ☾ ⋆ ─┘
            `));
            res.forEach(link => {
                console.log('\t'+  "file: "+chalk.hex('#800080')(link.file) + '\n\t' 
                +  "href: " + chalk.hex('54BAB9')(link.href) + '\n\t' 
                +  "ok: " + chalk.hex('EEBB4D')(link.ok) + '\n\t' 
                +  "status: " + chalk.hex('70AF85')(link.status) + '\n\t' 
                +  "text: " + chalk.hex('F6D7A7')(link.text)+ '\n\t'
                + chalk.magenta('─────────────────────────────────────── ⋆ ⋆ ⋆ ──────────────────────────────────────'))
        })
    })
        .catch((rej) => console.log(chalk.red(rej)))
    }else if(args[1]=="--stats") {
        mdLinks(args[0], {validate:false})
        .then((res) => {
            const totalLinks = res.length;
            const uniqueLinks = new Set(res.map((el) => el.href));
            console.log(chalk.magenta.bold(`
            ┌─ ☾ ⋆ ────────────────────────┐
                        Total:   ${totalLinks}
                        Unique:  ${uniqueLinks.size}
            └──────────────────────── ☾ ⋆ ─┘
                `));
        })
        .catch((rej) => console.log(chalk.red(rej)))
    }else{
        console.log("El comando ingresado no es válido ")
    }
}

if(args.length === 3){
    if ((args[1] === "--stats" && args[2] === "--validate") || (args[1] === "--validate" && args[2] === "--stats")) {
        mdLinks(args[0], {validate:true})
        .then((res) => {
            const totalLinks = res.length;
            const uniqueLinks = new Set(res.map((el) => el.href));
            const brokenLinks = res.filter((links) => links.ok === 'fail');
            console.log(chalk.magenta.bold(`
            ┌─ ☾ ⋆ ────────────────────────┐
                        Total:   ${totalLinks}
                        Unique:  ${uniqueLinks.size}
                        Broken:  ${brokenLinks.length}
            └──────────────────────── ☾ ⋆ ─┘
                `));
        })
        .catch((rej) => console.log(chalk.red(rej)))
    }else{
        console.log("Los comandos ingresados no son válidos")
    }
}
