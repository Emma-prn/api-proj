<template>
  <div  id="box">
    <h1>High Scores</h1>
    <ul id="list">
        <li v-for="(score,index) in highScores" :key="index">{{score.name}} - {{score.score}}</li>
    </ul>
    <Button @click.native="showHightScores" :button_text="'Home'"/>
  </div>
</template>

<script>

import Button from './Button.vue'

export default {
  name: 'HightScore',
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
      showHightScores: function(){
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
</style>