<template>
  <div>
    <custom-header></custom-header>
    <nuxt/>
  </div>
</template>

<script>
import CustomHeader from '~/components/header.vue'

export default {
  components: {
    CustomHeader
  }
}
</script>

<style>

.button, .button:visited
{
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #000;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #000;
}

.title
{
  color: #000;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
</style>
