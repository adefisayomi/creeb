"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const app = (0, express_1.default)();
app.use('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: 'new' });
    const page = yield browser.newPage();
    try {
        // Navigate the page to a URL
        yield page.goto('https://example.com/');
        const title = yield page.$$eval('p', (doc) => {
            const arr = [];
            doc.forEach(data => arr.push(data.textContent));
            return arr;
        });
        res.send({ data: title });
    }
    catch (err) {
        console.log(err.message);
    }
    finally {
        yield browser.close();
    }
}));
app.listen(5000, () => console.log('app started: 5000'));