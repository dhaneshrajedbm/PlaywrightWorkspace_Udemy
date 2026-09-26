
const base = require('playwright/test')

exports.customTest = base.test.extend(   // extending default behaviour of test to make custom fxture

    {
        TestDataAsFixture: {
            username    : "at@gmail.comtdm",   // data defines as javascript object so no coat for keys
            password    : "Attdm@1234",
            productName : "ZARA COAT 3"
        }

    }

)