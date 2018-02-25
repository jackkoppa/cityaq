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
const addJsonObj = (jsonObj) => {
    // allow for organizational empty rows in CSV files, 
    // by only adding those rows that have at least one non-empty, non-index column
    if (Object.keys(jsonObj).some(key => jsonObj[key] && key !== 'originalOrder'))
        calculateAQICases.push(jsonObj)
}

deleteFolderRecursive('test/json');
fs.mkdirSync('test/json');
csv({checkType: true})
    .fromFile(calculationNewServiceCalculateAQI)
    .on('json', (jsonObj) => addJsonObj(jsonObj))
    .on('done', (error) => jsonfile.writeFileSync('test/json/calculation-new.service.calculate-aqi.json',calculateAQICases));