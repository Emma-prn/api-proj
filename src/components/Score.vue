<template>
  <div  id="box">
    <section class="question">{{Score}}</section>
    <input id="username" type="text" v-model="username" placeholder="Username"/>
    <Button @click.native="setHightScores" :button_text="'Save Score'"/>
  </div>
</template>

<script>

import Button from './Button.vue'

export default {
  name: 'Score',
  components: {
      Button
  },
  props: {
    Score: Number
  },
  data() {
      return {
          username: ""
      }
  },
  methods: {
      setHightScores: function(){
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        const saveScore = localStorage.getItem('mostRecentScore');
        const score = {
            score: saveScore,
            name: this.username
        };
        highScores.push(score);
        highScores.sort( (a,b) => b.score - a.score);
        highScores.splice(5);
        localStorage.setItem('highScores', JSON.stringify(highScores));
      }
  }
}
</script>