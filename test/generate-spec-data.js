const csv = require('csvtojson');
const jsonfile = require('jsonfile');
const fs = require('fs');

const calculationNewServiceCalculateAQI = 'test/spreadsheets/calculation-new.service.calculate-aqi.csv';
const calculateAQICases = [];
const deleteFolderRecursive = (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

deleteFolderRecursive('test/json');
fs.mkdirSync('test/json');
csv()
    .fromFile(calculationNewServiceCalculateAQI)
    .on('json', (jsonObj) => {
        calculateAQICases.push(jsonObj);
    })
    .on('done', (error) => {
        jsonfile.writeFileSync(
            'test/json/calculation-new.service.calculate-aqi.json',
            calculateAQICases
        );
        console.log('end', calculateAQICases)
    });