export function random(n) {
  const numberResponse = Math.floor(Math.random() * n);
  return numberResponse;
}

export function quoteQuestion(arg, questions, count) {
  for (let index = 0; index < questions.length; index++) {
    let num = random(count);
    let good = questions[index].correctAnswer;
    questions[index].question = arg[num].content;
    questions[index].answers[good] = arg[num].author;
  }
}

export function authorAnswers(arg, questions, count) {
  for (let index = 0; index < questions.length; index++) {
    let good = questions[index].correctAnswer;
    for (let indexA = 0; indexA < questions[index].answers.length; indexA++) {
      let num = random(count);
      if (indexA == good) {
        continue;
      } else {
        questions[index].answers[indexA] = arg[num].name;
      }
    }
  }
}