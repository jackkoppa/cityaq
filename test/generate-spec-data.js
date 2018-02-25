const csv = require('csvtojson');
const jsonfile = require('jsonfile');
const fs = require('fs');
const path = require('path');

const spreadsheetsDir = 'test/spreadsheets';
const jsonDir = 'test/json';

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
const addJsonObj = (jsonObj, jsonArray) => {
    // allow for organizational empty rows in CSV files, 
    // by only adding those rows that have at least one non-empty, non-index column
    if (Object.keys(jsonObj).some(key => jsonObj[key] && key !== 'originalOrder'))
        jsonArray.push(jsonObj)
}


deleteFolderRecursive(jsonDir);
fs.mkdirSync(jsonDir);

fs.readdirSync(spreadsheetsDir).forEach(file => {
    if (path.extname(file) === '.csv') {
        let jsonArray = [];
        csv({checkType: true})
            .fromFile(`${spreadsheetsDir}/${file}`)
            .on('json', (jsonObj) => addJsonObj(jsonObj, jsonArray))
            .on('done', (error) => jsonfile.writeFileSync(`${jsonDir}/${path.basename(file, '.csv')}.json`,jsonArray));
    }
});