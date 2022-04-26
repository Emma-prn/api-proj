export function random(n) {
  const numberResponse = Math.floor(Math.random() * n);
  return numberResponse;
}

function selectRandom(alreadySelected, list, f) {
  let i = random(list.length);
  let item = f(list[i]);
  while (alreadySelected.findIndex(i => i == item) != -1) {
    i = random(list.length);
    item = f(list[i]);
  }
  return item;
}
function genAnswers(len, question, data, good, f) {
  let ids = [];
  for (let i = 0; i < len; i++) {
    question.answers[i] = null;
    ids.push(i);
  }
  let goodId = random(len);
  ids.splice(goodId, 1);
  question.answers[goodId] = good;
  question.correctAnswer = goodId;
  for (let i = 0; i < ids.length; i++) {
    question.answers[ids[i]] = selectRandom(question.answers, data, f);
  }
}

export function quoteQuestion(arg1, questions, count1, arg2) {
  for (let index = 0; index < questions.length; index++) {
    let num = random(count1);
    let quote = arg1[num];
    questions[index].question = quote.content;
    genAnswers(4, questions[index], arg2, quote.author, f => f.name);
  }
}

export function getResult(event, index, question) {
  const id = index;
  const currentQuestion = question;
  if (id == currentQuestion.correctAnswer) {
    console.log('Vrai', id, currentQuestion.correctAnswer);
    event.currentTarget.classList.add('vrai');
  } else {
    console.log('Faux');
    event.currentTarget.classList.add('faux');
    const rep = document.getElementById('answer-box');
    const ansLen = rep.children.length;
    for (let i = 0; i < ansLen; i++) {
      if (parseInt(rep.children[i].id) == currentQuestion.correctAnswer) {
        rep.children[i].classList.add('vrai');
      }
    }
  }
  dejAns();
}

function dejAns() {
  const rep = document.getElementById('answer-box');
  const ansLen = rep.children.length;
  for (let i = 0; i < ansLen; i++) {
    rep.children[i].classList.add('deja-rep');
  }
}