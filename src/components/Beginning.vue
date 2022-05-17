<template>
  <div  id="box">
    <h1>How skilled are you with quotes ?</h1>
    <p>Welcome to Quozz !<br>
      If you believe you are unbeatable at guessing the author of quotes, come and test your knowledge ! <br>
      Will you be able to find the author of each quote ? <br>
      You can either have random quotes or quotes with a theme. <br>
      Even if you don't know the answer, pick one at random, before moving to the next question.
    </p>
    <aside>
      <Button @click.native="beginQuizz()" :button_text="'Random Quotes'"/>
      <Button @click.native="showTags" :button_text="'Choose a tag'"/>
      <Button @click.native="showHightScores" :button_text="'Hight Scores'"/>
    </aside>
    <aside class="tags" v-show="showTag">
      <Button v-for="(tag,index) in Tagsdata" :key="index" @click.native="getTag(tag.name); beginQuizz()" :button_text="tag.name"/>
    </aside>
  </div>
</template>

<script>

import Button from './Button.vue'

import {getTags} from '@/services/api/apiCall.js'

export default {
  name: 'Beginning',
  components: {
      Button
  },
  created: function(){
    this.getTags();
  },
  data() {
    return {
      Tagsdata: [],
      showTag: false,
      choosenTag: ""
    }
  },
  methods: {
    getTags: async function(){
      this.Tagsdata = await getTags();
    },
    showTags: function() {
      this.showTag = !this.showTag;
    },
    getTag: function(tag_name){
      this.choosenTag = tag_name;
      this.$root.$emit('tag', this.choosenTag);
    },
    beginQuizz: function(){
      this.$root.$emit('BeginQuizz',true);
    },
    showHightScores: function(){
      this.$root.$emit('showHighScores', true);
    }
  }
}
</script>
<style scoped>
.tags {
  margin-top: 20px;
}
</style>