<template>
  <div>
    <img v-bind:src="url"/>
    <section>
      <h1> {{title}} </h1>
      <h3> {{subtitle}} </h3>
    </section>
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
div {
  width: 100vw;
  height: 54.94vw;
  position: relative;
  margin-bottom: 2.14vw;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  margin: auto;
  -webkit-filter: brightness(50%);
}
h1 {
  color: #ffffff;
  font-size: 8.54vw;
}
h3 {
  color: #ffffff;
  font-size: 6.4vw;
}
section {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 12.8vw;
}
</style>
