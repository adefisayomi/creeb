import puppeteer from 'puppeteer'



export default async function getPage () {
    try {
        const browser = await puppeteer.launch({
            headless: 'new', 
            args: ['--no-sandbox',],
            ignoreHTTPSErrors: true,
        });
        const page = await browser.newPage()
        await page.goto('https://example.com/');

        const title = await page.$$eval('p', (doc) => {
            const arr: any = []
            doc.forEach(data => arr.push(data.textContent))
            return arr
        })

        await page.close()
        await browser.close()
        
        return ({
            success: true,
            message: 'scraping complete',
            data: title
        })
    }
    catch(err: any) {
        return ({
            success: false,
            message: err.message,
            data: null
        })
    }
}