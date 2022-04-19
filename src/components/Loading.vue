<template>
  <div  id="box">
    <section class="question">Please wait ...</section>
  </div>
</template>

<script>

export default {
  name: 'Loading',
  components: {
  }
}
</script>
<style>
#box {
  height: auto;
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
}
.question {
  display: flex;
  align-items: center;
  height: 50px;
}
@media (max-width:768px){
  #box {
    width: 80vw;
  }
}
</style>