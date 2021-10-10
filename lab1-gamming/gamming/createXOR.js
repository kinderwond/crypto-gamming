const puppeteer = require('puppeteer')
const parseUrl = `http://xor.pw`

/**
 * 
 * @param {*} text 
 * @param {*} key 
 * @param {object} options {
 *      textSystem - 2,16,256
 *      keySystem - 2,16,256
 *      responseSystem - 2,16, 256
 * }
 * @returns 
 */
const exec =  async (text, key, options) => {
 
    text = text.split("")
    key = key.split("")
    
    const page = await openBrowserAndGetPage(parseUrl,)
    const encodedStr = await encodeText(text, key, page)
    console.log(encodedStr.join(""));
    return encodedStr.join("")
}

async function encodeText (text, key, page) {
    const res = []
    for (let index in text) {
        const char = text[index]
        if (!char) continue;
        const encodedChar = await getEncodedXOR(page, char, key[index])
        console.log("encodedCHAR", encodedChar);
        res.push(encodedChar)
    }
    return res
}

async function getEncodedXOR(page, firstChar, secondChar) {
    await page.waitForSelector('textarea')

    // enter characters to encode
    await page.evaluate(el => {
        const calcButton = document.querySelector("button")
        const textAreas = document.querySelectorAll("textarea")
        const selects =document.querySelectorAll("select")
        for (let select of selects) {
            select.selectedIndex = 3
        }
        textAreas[0].value = el.firstChar
        textAreas[1].value = el.secondChar
        calcButton.click()
    }, {
        firstChar,
        secondChar
    })

    await page.waitForNavigation();

    // enter characters to decode
    const eval = await page.evaluate(async el => {
        const selects =document.querySelectorAll("select")
        for (let select of selects) {
            select.selectedIndex = 1
        }
        const textAreas = document.querySelectorAll("textarea")
        return textAreas[2].value
    })
    return eval
}

async function openBrowserAndGetPage(url,) {
    const browser = await puppeteer.launch({ devtools: true });
    const page = await browser.newPage();

    await page.goto(url);

    return page
}

const key = "this fuck shit"
const str = "fuck this shit"
exec(str, key)
module.exports = exec