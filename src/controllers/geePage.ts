import puppeteer from 'puppeteer'



export default async function getPage () {
    const browser = await puppeteer.launch({
        args: [
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--single-process",
          "--no-zygote",
        ],
        executablePath:
          process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
      });

    try {
        
        const page = await browser.newPage()
        await page.goto('https://example.com/');

        const title = await page.$$eval('p', (doc) => {
            const arr: any = []
            doc.forEach(data => arr.push(data.textContent))
            return arr
        })

        await page.close()
        
        
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
    finally {
        await browser.close()
    }
}