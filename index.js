// Usage: node index.js --list {path to questions file} -n {number of results}
// Example: node index.js --list ./questions.csv -n 5

const program = require('commander');
const csv = require('csv');
const fs = require('fs');

let list;
let numberOfResults;
let questions = {};

program
  .version('0.0.1')
  .option('-l, --list [list]', 'list of questions in CSV file')
  .option('-n, --numberOfResults [numberOfResults]', 'number of questions to return as result')
  .parse(process.argv)

let stream = fs.createReadStream(program.list)
  .pipe(csv.parse({
    delimiter: ','
  }));

let firstLine = true;
let strandId;
let standardId;
let seen = {};
let numberOfQuestions = 0;

stream
  .on("error", function (err) {
    return console.error(err.response);
  })
  .on('data', function (data) {
    if (firstLine) {
      firstLine = false;
    } else {
      let q = {
        question_id: parseInt(data[4]),
        difficulty: parseFloat(data[5])
      };
      if (!(data[0] in questions)) {
        questions[data[0]] = {};
      }
      if (!(Array.isArray(questions[data[0]][data[2]]))) {
        questions[data[0]][data[2]] = [];
      }
      questions[data[0]][data[2]].push(q);
      ++numberOfQuestions;
    }
  })
  .on("end", function () {
    let result = [];
    let strands = Object.keys(questions);
    let roundRobinIndex = 0;
    let i = 0;
    while (i < program.numberOfResults) {
      // pick from each strand in round robin fashion
      let strand = questions[strands[roundRobinIndex]];
      let standards = Object.keys(strand);
      // TODO: we should change this to some kind of round robin as well
      // so that we try to put same number of questions from each standards
      // As it is right now that is not guaranteed 
      let stdIndex = Math.floor(Math.random() * standards.length);
      let numQuestions = strand[standards[stdIndex]].length;
      let qIndex = Math.floor(Math.random() * numQuestions);
      // if there are more questions than results the second condition is 
      // checked so that we do not repeat answers
      // if there are less questions than results we ignore the second condition 
      // and allow for duplications
      if (numberOfQuestions < program.numberOfResults ||
        !(strand[standards[stdIndex]][qIndex].question_id in seen)
      ) {
        seen[strand[standards[stdIndex]][qIndex].question_id] = true;
        result.push(strand[standards[stdIndex]][qIndex].question_id);
        roundRobinIndex = ++roundRobinIndex % strands.length;
        ++i;
      }
    }

    console.log(result.join(','));
  });
