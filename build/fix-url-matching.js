/*
*
* Temporary fix for https://github.com/angular/angular/issues/21636
*
*/

const replace = require('replace-in-file');

const existing = {
    files: 'dist/ngsw-worker.js',
    from: /this\.state = DriverReadyState\.EXISTING_CLIENTS_ONLY;/g,
    to: '/*this.state = DriverReadyState.EXISTING_CLIENTS_ONLY;*/ ' + 
        '// removing EXISTING_CLIENTS_ONLY state, as it behaves incorrectly in offline GitHub pages testing'

}

const baseHref = {
    files: 'dist/ngsw.json',
    from: /\"index\": \"https:\/\/jackkoppa\.github\.io\/cityaq\/index\.html\",/g,
    to: '"index": "https://jackkoppa.github.io/cityaq/index.html", ',
};

const serviceWorkerURLFix = {
    files: 'dist/ngsw-worker.js',
    from: /return parsed\.path;/g,
    to: '/*return parsed.path;*/ ' +
        'return url; ' +
        '// overriding default @angular/service-worker URL behavior, to handle routing bug angular/angular #21636'
}

try {
    const existingInstances = replace.sync(existing);
    console.log('Replacements of EXISTING_CLIENTS_ONLY states: ', existingInstances.join(', '));
}
catch(error) {
    console.error('Error occurred while replacing EXISTING_CLIENTS_ONLY states: ', error);    
}

try {
    const baseHrefInstances = replace.sync(baseHref);
    if (baseHrefInstances && baseHrefInstances.length > 0) {
        try {
            const override = replace.sync(serviceWorkerURLFix);
            console.log('Changes made: ', override.join(', '))
        }
        catch (error) {
            console.error('Error occurred while overriding default service worker URL behavior: ', error)
        }
    }
    else {
        console.log('baseHref was not set; no URL matching changes needed', baseHrefInstances);
    }
}
catch (error) {
    console.error('Error occurred while looking for baseHref: ', error);
}