<template>
  <div  id="box">
    <section class="question">Question {{QuestionNumber + 1}} of {{Question.length}}</section>
    <section class="question">Who said ?</section>
    <section class="question">{{Question[QuestionNumber].question}}</section>
    <div id="answer-box">
      <Answer v-for="(answer, index) in Question[QuestionNumber].answers" :key="index" :answer_id="index" :name="answer" @click.native="getResult($event,index,Question[QuestionNumber])"/>
    </div>
    <Button @click.native="next" :button_text="isNext ? 'Next Question' : 'View Score'"/>
    {{QuotesFiltered}}
  </div>
</template>

<script>
import Answer from './Answer.vue'
import Button from './Button.vue'

import {quoteQuestion} from '@/services/js/random.js' 
import {questions} from '@/services/js/quiz.js'
import {getQuotes} from '@/services/api/apiCall.js'
import {getAuthors} from '@/services/api/apiCall.js'
import {getResult} from '@/services/js/random.js'

export default {
  name: 'QuizzBox',
  components: {
    Answer,
    Button
  },
  props: {
    Score: Number,
    Tag: String
  },
  data() {
      return {
          QuotesData: [],
          AuthorData: [],
          Question: [],
          QuestionNumber: 0,
          isNext : true
      }
  },

  created: function(){
    this.generateQuestions();
  },

  computed: {
    QuotesFiltered: function () {
      if (this.Tag != "") {
        let SelectedCat = this.Tag;
        const newQuotes = this.QuotesData.results.filter(quote => {
          return quote.tags.includes(SelectedCat);
        });
        quoteQuestion(newQuotes, this.Question, newQuotes.length, this.AuthorData.results);
        return "";
      }
      else {
        return this.Tag;
      }
    }
  },

  methods: {
    generateQuestions: async function() {
      this.QuotesData = await getQuotes();
      this.AuthorData = await getAuthors();
      this.Question = questions;
      quoteQuestion(this.QuotesData.results, this.Question, this.QuotesData.count, this.AuthorData.results);
      this.$root.$emit('load-end', false);
    },
    next: function(){
      this.QuestionNumber++;
      if (this.QuestionNumber + 1 == 10) {
        this.isNext = false;
      }
      if(this.QuestionNumber == this.Question.length){
        localStorage.setItem("mostRecentScore", this.Score);
        this.$root.$emit('end-quiz',true);
      }
      var elementsArray = document.getElementsByClassName("answer");
      for (let i = 0; i < elementsArray.length; i++) {
        elementsArray[i].classList.remove('true','false','already-ans');
      }
    },
    getResult: function(event,index,question){
      getResult(event,index,question);
      if (index == question.correctAnswer) {
        this.$emit('incrementScore', 1);
      }
    }
  }
}
</script>
<style scoped>
#answer-box {
  width: 80%;
  margin: auto;
  height: 35vh;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
}
</style>