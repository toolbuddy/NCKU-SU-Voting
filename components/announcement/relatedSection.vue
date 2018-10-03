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

<style>
p {
  color: #707070;
  font-size: 3.74vw;
}
ul {
  color: #707070;
  font-size: 3.74vw;
  padding: 0;
  margin: 0;
}

ul li {
  cursor: pointer;
  list-style-type: none;
}

li::before {
  content: '';
  display: inline-block;
  border-style: solid;
  border-width: 1.6vw 0 1.6vw 2.4vw;
  border-color: transparent transparent transparent #74bfc3;
  cursor: pointer;
  margin-right: 10px;
}
</style>
