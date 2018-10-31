'use strict';

let express = require('express');
let app = express();
let messageCatalogManager = require('../index.js');

const insertTransformer = (data) => {
    return new Promise((resolve) => {
        //Transform key inserts
        for (let key in data.namedInserts) {
            if (data.namedInserts.hasOwnProperty(key)) {
                switch (typeof data.namedInserts[key]) {
                    //Upper case strings
                    case 'string':
                        data.namedInserts[key] = data.namedInserts[key].toUpperCase();
                        break;
                    //Toggle booleans
                    case 'boolean':
                        data.namedInserts[key] = !data.namedInserts[key];
                        break;
                    //Double numbers
                    case 'number':
                        data.namedInserts[key] = data.namedInserts[key] * 2;
                        break;
                }
            }
        }
        resolve(data);
    });
};

app.use(messageCatalogManager.formattingMiddleware(__dirname + '/../catalog-index.json', insertTransformer));

app.get('/*', function (req, res) {
    let exampleMsg = new messageCatalogManager.CatalogedError('0002', 'messages-pt', 'Exemplo de mensagem com inserções especiais',{ id: "TESTE", number: 123, boolean: false }, []);
    res.status(400).send(exampleMsg);
});

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});