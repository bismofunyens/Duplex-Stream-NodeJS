const { Transform, Writable } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('file.txt'); // A dummy text file 
const writeStream = createWriteStream('raw.txt'); // A file for raw data to be inputted
const writeReport = createWriteStream('report.txt');// File for the final report

const options = process.argv;
const fileName = process.stdin;
// Calculating time elapsed(Probably not the best way to calculate it)
const oneNanoSecond = 1e9;
const startTime = process.hrtime();
const endTime = process.hrtime(startTime);
const nanoSeconds = endTime[0] * oneNanoSecond + endTime[1];
// Converting from nanoseconds to milliseconds
const milliSeconds = nanoSeconds/1000000;

// Store calculated data values into an object
const output = {
    NumberOfLines: 0,
    LengthInBytes: 0,
    TimeElapsed: milliSeconds,
    Words : 0,
    Characters: 0,
    GrowthRate: 0
};

const inputData = new Transform({
    readableObjectMode: true,// true so that we can set to have streams accept any JavaScript object 
    transform(chunk, encoding, callback) {
        output.NumberOfLines += chunk.toString().split('\n').length;
        output.LengthInBytes += chunk.length;
        output.TimeElapsed = milliSeconds;
        this.push(output); // Pushes the calculated values into the object output
        callback(); // A function that needs to be called after we're done processing the data chunk
    }
});

// Calculates the number of words in a file
const wordCount = new Transform({
    transform(chunk, encoding, callback) {
        output.Words += chunk.toString().split(' ').length;
        console.log(`Number of words in file: ${output.Words}`);
        callback();
    }
});

// Calculates the number of characters in a file
const charCount = new Transform({
    transform(chunk, encoding, callback) {
        output.Characters += chunk.toString().length;
        console.log(`Number of characters in file: ${output.Characters}`);
        callback();
    }
});

const outStream = new Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
    callback();
    }
}); 

// A writable stream for the argv only
const argStream = new Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
    callback();
    }
 });
 
outStream.on('finish', () => {
    const seconds = milliSeconds / 1000; // Converting milliseconds into seconds for the throughput rate
    const throughPutRate = Math.round(output.LengthInBytes / seconds);
    const report = 
    `SUMMARY: Time Elapsed: ${output.TimeElapsed} ms, Length in Bytes: ${output.LengthInBytes}, Number of Lines ${output.NumberOfLines}, Throughput Rate: ${throughPutRate} Bytes/Sec`;
    console.log(report);
    writeStream.write(JSON.stringify(output));
    writeReport.end(report);
});

// User can type on cmd an option to either view: word count or character count of a file
switch(options[2]) {
    case "-w": 
        readStream.pipe(wordCount).pipe(argStream);
        break;
    case "-c":
        readStream.pipe(charCount).pipe(argStream);
        break;
    default:
        readStream.pipe(inputData).pipe(outStream);
}

module.exports = {
    inputData,
    wordCount,
    charCount,
    outStream,
    argStream
};