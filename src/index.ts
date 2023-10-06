import express from 'express'
import puppeteer from 'puppeteer'

const app = express()

app.use('/', async (req, res) => {

    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage()

    try {
        // Navigate the page to a URL
        await page.goto('https://example.com/');

        const title = await page.$$eval('p', (doc) => {
            const arr: any = []
            doc.forEach(data => arr.push(data.textContent))
            return arr
        })
        res.send({data: title})
    }
    catch(err: any) {
        console.log(err.message)
    }
    finally {
        await browser.close();
    }
})

app.listen(5000, () => console.log('app started: 5000'))