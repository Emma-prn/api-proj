<template>
  <div id="app">
    <Header/>
    <Loading v-if="isLoading"/>
    <Beginning v-else v-show="!showHighScores"/>
    <QuizzBox :Score="this.Score" :Tag="this.tag" v-on:incrementScore="incrementScore"/>
    <Score :Score="this.Score" v-show="!hide"/>
    <HightScore v-show="showHighScores"/>
    <Footer/>
  </div>
</template>

<script>
import Loading from './components/Loading.vue'
import Beginning from './components/Beginning.vue'
import QuizzBox from './components/QuizzBox.vue'
import Score from './components/Score.vue'
import HightScore from './components/HightScore.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Loading,
    Beginning,
    QuizzBox,
    HightScore,
    Score,
    Footer
  },
  data() {
    return {
      isLoading: true,
      showHighScores: false,
      tag: "",
      Score: 8,
      hide: true
    }
  },
  mounted() {
      this.$root.$on("load-end", (bool) => {
        this.isLoading = bool;
      });
      this.$root.$on("tag", (tag_name) => {
        this.tag = tag_name;
      });
      this.$root.$on("showHighScores", (bool) => {
        this.showHighScores = bool;
      });
  },
  methods:{
    incrementScore: function(points){
      this.Score += points;
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
