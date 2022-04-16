const fs = require("fs");
const path = require("path");

// Product class banaunga jiske objects mere products honge
module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    // defining non-static method of a class
    save() {
        const p = path.join(path.dirname(process.mainModule.filename), "data", "products.json");
        fs.readFile(p, (err, data) => {
            let products = []
            if (!err) {
                // err ni he matlab file exist karti he
                products = JSON.parse(data);
            }
            // yaha "this" refers to the class object
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => { console.log(err) })
            // IMP - writeFile() ko 3rd arg err ka callback dena imp he warna chalega ni
            // callback ni dete to invalid rehta he writeFile()
        })
        // basically, jis object pe push() method ko call kiya wohi object mai array mai push kar dunga
    }

    // defining static method of a class
    // ye method directly class pe call ho jaega
    static fetchAll() {
        const p = path.join(path.dirname(process.mainModule.filename), "data", "products.json");
        // fs.readFileSync(p, (err, fileContent) => {
        //     if (err) {
        //         return []; // dir not found etc
        //     }
        //     return JSON.parse(fileContent)
        // })
        const file = fs.readFileSync(p, "utf-8")
        const data = JSON.parse(file)
        console.log(data)
        return data;
    }
}