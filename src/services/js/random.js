export function random(n) {
  const numberResponse = Math.floor(Math.random() * n);
  return numberResponse;
}

export function quoteQuestion(arg, questions) {
  for (let index = 0; index < questions.length; index++) {
    let num = random(arg.count);
    let good = questions[index].correctAnswer;
    questions[index].question = arg.results[num].content;
    questions[index].answers[good] = arg.results[num].author;
  }
}

export function authorAnswers(arg, questions) {
  for (let index = 0; index < questions.length; index++) {
    let good = questions[index].correctAnswer;
    for (let indexA = 0; indexA < questions[index].answers.length; indexA++) {
      let num = random(arg.count);
      if (indexA == good) {
        continue;
      } else {
        questions[index].answers[indexA] = arg.results[num].name;
      }
    }
  }
}