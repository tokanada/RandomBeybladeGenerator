const FileReader = require('fs');
const CsvReader = require('csv-reader');
const AutoDetectDecoderStream = require('autodetect-decoder-stream');

let inputStream = FileReader.createReadStream('csv/FusionWheel.csv')
    .pipe(new AutoDetectDecoderStream({ defaultEncoding: '1255' }));

inputStream
    .pipe(new CsvReader({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function(row) {
        console.log('A row arrived: ', row);
    })
    .on('end', function() {
        console.log('No more rows!');
    });