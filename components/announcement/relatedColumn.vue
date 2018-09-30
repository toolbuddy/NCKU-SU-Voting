<template>
  <div>
    <img />
    <h1> {{title}} </h1>
    <h2> {{subtitle}} </h2>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    title: String,
    subtitle: String
  }
}
</script>

<style scoped>
img {
  -webkit-filter: brightness(50%);
}
</style>
