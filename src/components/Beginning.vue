<template>
  <div  id="box">
    <h1>Hello and welcome to Quozz</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt nunc nec nunc suscipit, at dignissim mauris faucibus. Morbi accumsan vel est a laoreet. Praesent varius nisl leo, non dictum tellus vestibulum sed. Sed eget feugiat nisi. Fusce condimentum, diam eget cursus euismod, lorem ex facilisis eros, ac rutrum augue dolor vel diam. Donec in urna ac est lobortis venenatis.</p>
    <aside>
      <Button :button_text="'Random Quotes'"/>
      <Button @click.native="showTags" :button_text="'Choose a tag'"/>
      <Button @click.native="showHightScores" :button_text="'Hight Scores'"/>
    </aside>
    <aside class="tags" v-show="showTag">
      <Button v-for="(tag,index) in Tagsdata" :key="index" @click.native="getTag(tag.name)" :button_text="tag.name"/>
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
      console.log(this.choosenTag);
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