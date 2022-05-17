<template>
  <div id="app">
    <Header/>
    <Loading v-if="isLoading"/>
    <Beginning v-else v-show="showBeginnig"/>
    <QuizzBox :score="this.score" :Tag="this.tag" v-on:incrementScore="incrementScore" v-show="quizzBegin"/>
    <Score :score="this.score" v-show="quizzEnd"/>
    <HighScore v-show="showHighScores"/>
    <Footer/>
  </div>
</template>

<script>
import Loading from './components/Loading.vue'
import Beginning from './components/Beginning.vue'
import QuizzBox from './components/QuizzBox.vue'
import Score from './components/Score.vue'
import HighScore from './components/HighScore.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Loading,
    Beginning,
    QuizzBox,
    HighScore,
    Score,
    Footer
  },
  data() {
    return {
      isLoading: true,
      showBeginnig: true,
      showHighScores: false,
      quizzBegin: false,
      quizzEnd:false,
      tag: "",
      score: 0
    }
  },
  mounted() {
      this.$root.$on("load-end", (bool) => {
        this.isLoading = bool;
      });
      this.$root.$on("tag", (tag_name) => {
        this.tag = tag_name;
      });
      this.$root.$on("beginQuizz",(bool) => {
        this.quizzBegin = bool;
        this.showBeginnig = !bool;
      });
      this.$root.$on("end-quiz", (bool) => {
        this.quizzEnd = bool;
        this.quizzBegin = !bool;
      });
      this.$root.$on("showHighScores", (bool) => {
        this.showHighScores = bool;
        this.showBeginnig = !bool;
      });
  },
  methods:{
    incrementScore: function(points){
      this.score += points;
    }
  }
}
</script>

<style>
body {
  margin: 0;
  background-image: url('./assets/paper.jpg');
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}
#app {
  font-family: 'Courgette', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
</style>
