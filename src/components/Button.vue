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

<style scoped>
.button {
  background: #E0C9A6;
  border: none;
  padding: 10px;
  margin-left: 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: ease 0.5s;
  cursor: pointer;
}
</style>