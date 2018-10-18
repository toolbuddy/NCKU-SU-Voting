<template>
  <div class="root grid grid-gap-6">
    <span class="grid">
      <svg width="22vw" height="22vw" viewbox="0 0 500 500">
        <image xlink:href="~/assets/img/system/fig01.svg" width="100%" height="100%"></image>
      </svg>
      <h3> 文章總覽 </h3>
      <h5>喚起年輕世代對政治的想望，<br>以及政治對世代青年的重視。</h5>
    </span>
    <router-link v-for="(iter, index) of announcements" v-bind:key="index" v-bind:to="`/announcement/detail/${iter.id}`"><column v-bind:url="iter.image" v-bind:title="iter.title" v-bind:subtitle="iter.subtitle"> </column></router-link>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import column from '~/components/announcement/column.vue'

export default {
  components: {
    column
  },
  async asyncData () {
    try {
      const result = await axios.get('/api/getAnnouncements')
      return {
        announcements: result.data
      }
    } catch (error) {
      console.log('Get announcements failed')
      console.log(error)
    }
  }
}
</script>

<style scoped>
h3 {
  font-size: 6.93vw;
  color:#707070;
  text-align: center;
  margin-bottom: 3vw;
}

h5 {
  font-size: 4.26vw;
  color: #707070;
  text-align: center; 
}

.root {
  margin-top: 14vw;
  padding: 6vw;
  box-sizing: border-box;
}

.grid {
  display: grid;
  justify-items: center;
  justify-content: center;
}
.grid-gap-6 {
  grid-gap: 6vw;
}
</style>
