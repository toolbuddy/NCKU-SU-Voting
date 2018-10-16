<template>
  <div>
    <router-link v-bind:to="{path: `/detail/${topnews[index].id}`}" >
      <img v-bind:src="topnews[index].image" alt="學生會重要公告圖片"/>
    </router-link>
    <router-link v-bind:to="{path: `/detail/${topnews[index].id}`}" >
      <section>
        <h1> {{topnews[index].title}} </h1>
        <h2> {{topnews[index].subtitle}} </h2>
      </section>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    topnews: Array,
    max: Number
  },
  mounted () {
    console.log(this.topnews)
  },
  data () {
    return {
      index: 0
    }
  }
}
</script>

<style>

h1 {
  font-size: 6.93vw;
  font-weight: 100px;
  color: white;
}
h2 {
  font-size: 4.8vw;
  font-weight: 100px;
  color: white;
}

img {
  width: 99vw;
  height: 99vh;
  display: block;
  margin: 14vw auto 0 auto;
  object-fit: cover;
  object-position: top; 
}

section {
  position: absolute;
  top: 114.8vw;
  width: 100vw;
  margin: auto;
  background-color:rgba(81,81,81,0.48);
  border: 0px;
  padding-left: 11vw;
  padding-right: 11vw;
  box-sizing: border-box;
}

ul {
  padding: 0;
}

li {
  float: left;
}

</style>
