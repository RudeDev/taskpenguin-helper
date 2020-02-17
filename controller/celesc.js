const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');

function myFunc(arg) {
    console.log(`arg was => ${arg}`);
}

module.exports = class Celesc {
    async login() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://agenciaweb.celesc.com.br/AgenciaWeb/autenticar/loginUC.do');
        await page.type('input[name=numDoc]', "56792026972");
        await page.type('input[name=dtaNascimentoDoc]', "02051965")
        await page.click('input[type=submit]');
        await page.waitFor(5000);
        const linkHandlers = await page.$x("//a[contains(text(), 'Imprimir')]");
        let hrefs = await page.evaluate(() => {
            const anchors = document.querySelectorAll('a');
            return [].map.call(anchors, a => a.href);
        });
        if (linkHandlers.length > 0) {
            await linkHandlers[0].click();
        } else {
            throw new Error("Link not found");
        }
        await page.waitFor(5000);
        await page.goto("https://agenciaweb.celesc.com.br/AgenciaWeb/imprimirSegundaVia/exibirFat.do?MES_REF=2&codUnCons=10851955&NUM_SEQ_OPER=20205657808245&COD_UN_CONS=10851955&COD_CPU=01&COD_SITU_FAT_DA=N&DEBITO=519.66&COD_SITU_FAT=AB&NUM_CLI=10851955")
        await page.screenshot({ path: 'example.png' });
        console.log("printed")
    }
}
