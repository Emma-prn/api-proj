<template>
  <div class="answer" :id="id">
    <p>{{name}}</p>
  </div>
</template>

<script>
export default {
  name: 'Answer',
  props: {
    name: String,
    answer_id: Number
  },
  data () {
    return {
      id: null
    }
  },
  methods: {
  }, 
  mounted () {
    this.id = this.answer_id
  }
}
</script>

<style scoped>
.answer {
  background-color: #E0C9A6;
  color: black;
  width: 35%;
  margin: auto;
  cursor: pointer;;
}
@media (max-width:768px){
  .answer {
    width: 80%;
  }
}
</style>