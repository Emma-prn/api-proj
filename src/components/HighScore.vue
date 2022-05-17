<template>
  <div  id="box">
    <h1>High Scores</h1>
    <ul id="list">
        <li v-for="(score,index) in highScores" :key="index">{{score.name}} - {{score.score}}</li>
    </ul>
    <Button @click.native="showHighScores" :button_text="'Home'"/>
  </div>
</template>

<script>

import Button from './Button.vue'

export default {
  name: 'HighScore',
  components: {
      Button
  },
   created: function(){
    this.getHighScores();
  },
  data() {
      return {
          highScores: []
      }
  },
  methods: {
      getHighScores: function(){
        this.highScores = JSON.parse(localStorage.getItem('highScores')) || [];
      },
      showHighScores: function(){
      this.$root.$emit('showHighScores', false);
      }
  }
}
</script>
<style scoped>
#list {
  list-style: none;
  padding: 0;
  text-align: center;
}
li {
    font-size: 1.2rem;
    transition: ease 0.5s;
}
li:hover {
    transform: scale(1.5);
}
</style>