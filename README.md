# Duplex Stream NodeJS Challenge

This challenge was to show how we would build and use Duplex streams in NodeJS. This application will read from a file called "file.txt" (contains lorem ipsum text)
and calculate the following:
  - Time Elapsed (ms)
  - Number of Lines
  - Length in Bytes
  - Throughput Rate

Once calculated, it will input all the raw data into a an object called "output". The object will then be written to a Writable Stream where it will output a summary report into a file called "report.txt".
## Running the tests

node . (runs the default index.js file)

OR

node index.js

node growth (to run the growth.js script)
## Running process.argv

- cat file.txt | node . -w (this option will calculate and display the number of words in the file)
- cat file.txt | node . -c (this option will calculate and display the number of characters in the file)

## Challenges
Calculating the growth rate was a difficult process for me where I cannot figure out. However, I made a second script file called "growth.js" that uses stdin to let the user add new lines of text into "file.txt". After inputting new lines of text into the file, a console.log will notify you that the text file has been updated with the number of line inside the file.

## Work in progress
Trying to figure out the growth rate part of the stream.

## Built With

* NodeJS

## Authors

* **Wesley Mok** 
