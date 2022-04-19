<template>
  <div  id="box">
    <section class="question">Question {{QuestionNumber + 1}} of {{Question.length}}</section>
    <section class="question">Who said ?</section>
    <section class="question">{{Question[QuestionNumber].question}}</section>
    <div id="answer-box">
      <Answer v-for="(answer, index) in Question[QuestionNumber].answers" :key="index" :answer_id="index" :name="answer"/>
    </div>
    <Button @click.native="getNextQuote" :button_text="isNext ? 'Next Question' : 'View Score'"/>
    {{QuotesFiltered}}
  </div>
</template>

<script>
import Answer from './Answer.vue'
import Button from './Button.vue'

import {quoteQuestion} from '@/services/js/random.js'
import {authorAnswers} from '@/services/js/random.js'
import {questions} from '@/services/js/quiz.js'
import {getQuotes} from '@/services/api/apiCall.js'
import {getAuthors} from '@/services/api/apiCall.js'

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
          QuestionNumber: Number,
          isNext : true
      }
  },

  created: function(){
    this.generateQuestions();
    this.setScore();
  },

  computed: {
    QuotesFiltered: function () {
      let SelectedCat = this.Tag;
      return this.QuotesData.results.filter(quote => {
        return quote.tags.includes(SelectedCat);
      })
    }
  },

  methods: {
    generateQuestions: async function() {
      this.QuotesData = await getQuotes();
      this.AuthorData = await getAuthors();
      this.Question = questions;
      this.getQuestion(this.QuotesData, this.Question);
      this.getAwsers(this.AuthorData, this.Question);
      this.QuestionNumber = 0;
      this.$root.$emit('load-end', false);
      console.log(this.Question);
      console.log(this.Question[0].answers.sort(function() { return 0.5 - Math.random() }));
      //this.Question[0].answers.sort(() => Math.random() - 0.5);
    },
    getQuestion: function(arg, questions){
      quoteQuestion(arg, questions);
    },
    getAwsers: function(arg, questions) {
      authorAnswers(arg, questions);
    },
    getNextQuote: function(){
      this.QuestionNumber++;
      if(this.QuestionNumber + 1 == this.Question.length){
        this.isNext = false;
      }
    },
    setScore: function(){
      localStorage.setItem("mostRecentScore", this.Score);
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
}
</style>