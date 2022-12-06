# Test Engineer Charging Communication task

### How do I get set up the repo?

- run npm i

### How to run tests

- npm start

### what to expect

- an html report in ./reports folder along with xml junit for CD pipelines. and CLI report during execution

### How to execute the tool:

Transformation.exe <path_to_bmp> [without argument = clockwise rotation | 1 =
counter clockwise rotation]
e.g.:
Transformation.exe sample.bmp 1 // rotate counter clockwise
Transformation.exe sample.bmp // rotate clockwise

### tests

- 001 call the tool with no argument
- 002 call the tool with non existing file
- 003 call the tool with invalid format file
- 004 call the tool with non existing file and 1 argument
- 005 call the tool with invalid format file and 1 argument
- 006 call the tool with valid file (clockwise test)
- 007 call the tool with valid file and 1 argument (counter clockwise test)

### Approach to implement

- I thought I need to rotate the input myself and compare it with the tool's output.
- I chose python unittest at first as it is more convenient for image processsing. and I implemented functions to rotate and compare images (I attached the python functions in "./python solution" folder and a ssingle test for reference)

- I came back to using Node.js because I used this package in my current work [nightwatch html reporter](https://www.npmjs.com/package/nightwatch-html-reporter) and I built on it to create custom reports with handlebars.

so this is what I did,I used nodejs, customized a report for the solution, and used [JIMP](https://www.npmjs.com/package/jimp) for image processing

### Author

- Alaa Sayed (alaa.elsayed.aly@gmail.com)
