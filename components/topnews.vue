<template>
  <div>
    <ul>
      <li v-for="(iter, index) of topnews" v-bind:key="iter.title">
        <router-link v-bind:to="{path: `/detail/${index}`}" >
          <img class="homephoto" v-bind:src="iter.image" alt="學生會重要公告圖片"/>
        </router-link>
        <router-link v-bind:to="{path: `/detail/${index}`}" >
          <section class="hometitle">
            <h1> {{iter.title}} </h1>
            <h2> {{iter.subtitle}} </h2>
          </section>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    topnews: Object
  }
}
</script>

<style>

</style>
