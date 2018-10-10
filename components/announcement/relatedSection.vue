<template>
  <div>
    <p> {{title}} </p>
    <ul>
      <router-link v-for="(value, key) in related" v-bind:key="key" v-text="value.title" tag="li" v-bind:to="value.url" ></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    related: Object
  }
}
</script>


<style scoped>

div {
  justify-content: start !important;
}

p {
  color: #707070;
  font-size: 3.74vw;
  margin-bottom: 1.5vw;
}
ul {
  color: #707070;
  font-size: 4.24vw;
  padding: 0;
  margin: 0;
}

ul li {
  cursor: pointer;
  list-style-type: none;
  margin-block-start: 2.5vw;
}

li::before {
  content: '';
  display: inline-block;
  border-style: solid;
  border-width: 1.6vw 0 1.6vw 2.4vw;
  border-color: transparent transparent transparent #74bfc3;
  cursor: pointer;
  margin-right: 1.5vw;
}
</style>
