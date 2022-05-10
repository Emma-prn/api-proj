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
  position: relative;
  background-color: #E0C9A6;
  color: black;
  width: 35%;
  border-radius: 10px;
  overflow: hidden;
  z-index: 1;
  margin: auto;
  cursor: pointer;
  transition: ease 0.5s;
}
.true::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: green;
    z-index: -1;
    animation: slideLeft ease 1s;
}
.false::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: red;
    z-index: -1;
    animation: slideLeft ease 1s;
}
.already-ans {
    pointer-events: none;
}
@keyframes slideLeft {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0%);
    }
}
@media (max-width:768px){
  .answer {
    width: 80%;
  }
}
</style>