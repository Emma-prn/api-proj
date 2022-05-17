<template>
  <div  id="box">
    <section class="question">Please wait ...</section>
  </div>
</template>

<script>

export default {
  name: 'Loading'
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
  height: auto;
  margin-bottom: 15px;
}
@media (max-width:768px){
  #box {
    width: 80vw;
  }
}
</style>