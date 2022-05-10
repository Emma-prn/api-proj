<template>
  <div  id="box">
    <section class="score">{{Score}}</section>
    <form action="">
      <label for="username">Username :</label>
      <input id="username" name="username" type="text" v-model="username" placeholder="Username"/>
    </form>
    <b id="safe"></b>
    <aside>
      <Button @click.native="setHightScores" :button_text="'Save Score'" id="save" disabled/>
      <Button @click.native="playAgain" :button_text="'Play again'"/>
    </aside>
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
        const scoreSafe = document.getElementById('safe');
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
        scoreSafe.innerHTML = 'Score saved';
      },
      playAgain: function(){
        document.location.reload();
      }
  },
  mounted(){
    const saveButton = document.getElementById('save');
    const username = document.getElementById('username');
    username.addEventListener('keyup', () => {
      saveButton.disabled = !username.value;
    });
  }
}
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 10vh;
  width: 50%;
  margin: 20px;
  text-align: center;
}
.score {
  font-weight: bold;
  font-size: 3rem;
}
#safe {
  margin-bottom: 10px;
}
</style>