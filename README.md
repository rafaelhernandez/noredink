## Background

One of our engineering challenges at NoRedInk is deciding how to show students the right mix of content in a performant manner.  By choosing the right cross-section of content we can ensure that:
  1.  Students achieve content mastery in the least amount of time, and
  2.  Students don't get bored with the same questions.

We base our decision on a number of factors:
  * Student ability
  * Questions students have already seen
  * Pedagogical hierarchy
    ...and more

We have simplified this problem so that you can actually get something done in a few hours.

## Backend Take-Home Challenge

You have 2 hours to code a solution to the following challenge.

We are providing you with two csv files:

`questions.csv` and `usage.csv`

The `questions.csv` file contains a mini-taxonomy.  This taxonomy consists of __Strands__, __Standards__, and __Questions__.  Strands have many Standards, and Standards have many Questions. Questions have a difficulty rating between 0 and 1, where 1 means everyone always gets the question correct, and 0 means no one ever does.

The `usage.csv` file contains the output of a previous run of the application. Each row describes a single question selected for a student.

We would like you to write a program to select questions for a quiz. Please feel free to use any languages or libraries you choose.

### Basic Requirements
#### Input & Output
* The program should accept the number of questions as a command line argument. Any integer value greater than 0 is acceptable.
* The expected output is to display a comma-delimited list of question_ids.

```bash
$ my_great_app 5
1,1,1,1,1
```
> maybe the distribution above needs a little work

#### The Distribution
* First, try to put the same number of questions from each strand into the quiz. (e.g. There are two strands, so if the user asks for a 3 question quiz, it's okay to choose one question from the first strand and two questions from the second strand.)
* Second, try to put the same number of questions from each of the strand's standards into the quiz.
* Third, **without** the usage file, prefer questions that have not yet been assigned. (e.g. Put each of the strand's questions into the quiz as close as possible to an equal number of times.)
* Duplicating questions in the quiz is OKAY, if the quiz requires more questions than are available with even distribution!

#### Other Notes
* Please use git to track progress. E.g. progressively commit changes so we can track your thought process.
* Not completing the basic requirements IS NOT FAILURE.  We'd rather see a beautiful attempt than a complete attempt.

### Bonus Requirements
Choose any or all of the following, time permitting:
* Write reasonable tests
* Parse the CSVs files instead of hard-coding the data.
* Order the questions in the quiz from easiest to hardest.
* Use the usage file to seed pre-assigned questions.
  * Take that previous distribution of strands, standards, and questions into account when picking questions.
  * Prefer questions that have not yet been assigned, either through pre-assignment or through your application.
  * Don't output these pre-assigned questions when your application runs (but output duplicates of those questions if they are picked during the run).
* Group the questions by standard, and then order the questions within each standard by difficulty (easiest to hardest).
* Append the output of your application to usage.csv

### General Guidelines
* This is not an assessment of your front-end prowess. Function over form.
* You only have two hours. Take shortcuts, but leave real solution in comments. If you have enough time at the end, you can go back and make your solution less ugly.
* You will be assessed on both how well your program works, and how well your code reads. E.g.
  - clear data modeling, naming, comments
  - some documentation
  - small & clear git commits

##### Finally, a tip:
* If you're about to begin, and you think to yourself: "I think I should use Rails/Django/...!" then you should know that nobody who has ever gone down that rabbit hole has ever succeeded. THERE BE DHHRAGONS! (The most successful submissions are command line applications.)

-[Good luck!](https://s3-us-west-2.amazonaws.com/static.noredink.com/stan-carey-doge-meme-wow-such-win-because-grammar-so-amaze-much-usage-very-language.jpg)
