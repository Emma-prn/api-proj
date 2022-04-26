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
      id: null,
    }
  },
  methods: {
  }, 
  mounted () {
    this.id = this.answer_id
  }
}
</script>

<style>
.answer {
  background-color: #E0C9A6;
  color: black;
  width: 35%;
  margin: auto;
  cursor: pointer;
}
.vrai {
  background-color: green;
  animation: fadeIn ease 1s;
}
.faux {
  background-color: red;
  animation: fadeIn ease 1s;
}
.deja-rep {
    pointer-events: none;
}
@keyframes fadeIn {
    0% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}
@media (max-width:768px){
  .answer {
    width: 80%;
  }
}
</style>