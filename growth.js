const { createReadStream, createWriteStream } = require('fs');
const readStream = createReadStream('file.txt'); // A dummy text file 

var newData = [];

process.stdin.on('data', function(data) {
    newData.push(data.toString().split('\r\n'));
    fs.appendFile('file.txt', newData,(err) => {
        if (err) throw err;
        console.log('Updated, new data entered');
        var i;
        var count = 0;
        require('fs').createReadStream('file.txt')
        .on('data', function(chunk) {
            for (i=0; i < chunk.length; ++i)
            if (chunk[i] == 10) count++;
        })
        .on('end', function() {
            console.log(`There are now ${count} lines in this file`);
        });
    });
});