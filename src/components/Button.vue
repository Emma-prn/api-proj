<template>
  <button class="button">{{button_text}}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    button_text: String
  }
}
</script>

<style>
.button {
  font-family: 'Courgette',cursive;
  background: #E0C9A6;
  border: none;
  padding: 10px;
  margin-left: 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: ease 0.5s;
  cursor: pointer;
}
.button:hover, .answer:hover {
  background-color: #b8873d;
}
@media (max-width:768px){
  .button {
    margin-bottom: 5px;
  }
}
</style>