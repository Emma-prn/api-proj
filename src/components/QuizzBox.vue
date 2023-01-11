<template>
  <div  id="box">
    <section class="question">Question {{questionNumber + 1}} of {{Question.length}}</section>
    <section class="question">Who said ?</section>
    <section class="question">{{Question[questionNumber].question}}</section>
    <div id="answer-box">
      <Answer v-for="(answer, index) in Question[questionNumber].answers" :key="index" :answer_id="index" :name="answer" @click.native="getResult($event,index,Question[questionNumber])"/>
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
import {getQuotesByTags} from '@/services/api/apiCall.js'
import {getAuthors} from '@/services/api/apiCall.js'
import {getResult} from '@/services/js/random.js'

export default {
  name: 'QuizzBox',
  components: {
    Answer,
    Button
  },
  props: {
    score: Number,
    Tag: String
  },
  data() {
      return {
          quotesData: [],
          quotesByTag: [],
          authorData: [],
          Question: [],
          questionNumber: 0,
          isNext : true
      }
  },

  created: function(){
    this.generateQuestions();
    this.getQuotesByTags();
  },

  computed: {
    QuotesFiltered: function () {
      if (this.Tag != "") {
        let SelectedCat = this.Tag;
        const newQuotes = this.quotesByTag.results.filter(quote => {
          return quote.tags.includes(SelectedCat);
        });
        quoteQuestion(newQuotes, this.Question, newQuotes.length, this.authorData.results);
        return "";
      }
      else {
        return this.Tag;
      }
    }
  },

  methods: {
    generateQuestions: async function() {
      this.quotesData = await getQuotes();
      this.authorData = await getAuthors();
      this.Question = questions;
      quoteQuestion(this.quotesData.results, this.Question, this.quotesData.count, this.authorData.results);
      this.$root.$emit('load-end', false);
    },
    getQuotesByTags: async function() {
      this.quotesByTag = await getQuotesByTags();
    },
    next: function(){
      this.questionNumber++;
      if (this.questionNumber + 1 == 10) {
        this.isNext = false;
      }
      if(this.questionNumber == this.Question.length){
        localStorage.setItem("mostRecentScore", this.score);
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