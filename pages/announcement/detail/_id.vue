<template>
  <div>
    <section class="area">
      <div class="center">
        <img src="~/assets/img/activity.png" alt="學生會重要公告詳細頁面的圖片"/>
      </div>
      <h1>{{title}}</h1>
      <h2>{{subtitle}}</h2>
      <section>
        <p v-html="content"></p>
        <related-section v-if="related.first" v-bind:related="related" title="現在就快去投票！"></related-section>
      </section>
    </section>
  </div>

</template>

<script>
import axios from '~/plugins/axios'
import RelatedColumn from '~/components/announcement/relatedColumn.vue'
import RelatedSection from '~/components/announcement/relatedSection.vue'
export default {
  head () {
    return {
      meta: [
        { hid: 'description', name: 'description', content: '這是成功大學學生會的官方網站，目前所在位置為詳細公告的頁面，在這邊會顯示某個文章的詳細內容 | NCKUSU offisial website. Here is the detail page of the website, there will be detailed announcement content render for a topic.' }
      ]
    }
  },

  components: {
    RelatedColumn,
    RelatedSection
  },
  async asyncData ({ params, error }) {
    try {
      const length = parseInt((await axios.get('/api/getAnnouncementsNumber')).data)
      if (parseInt(params.id) > length) {
        error({ statusCode: 404, message: 'Page not found' })
      }
      const result = await axios.get(`/api/getAnnouncementById?id=${params.id}`)
      return result.data
    } catch (error) {
      console.log('Get detail content failed!!')
      console.log(error)
      return {}
    }
  }
}
</script>

<style scoped>
img {
  width: 100vw;
  height: 63.74vw;
  object-fit: scale-down;
  object-position: center; 
}
h1 {
  color: #707070;
  font-size: 6.94vw;
}
h2 {
  color: #707070;
  font-size: 5.34vw;
}
p {
  color: #707070;
  font-size: 3.74vw;
}
label {
  color: #b8b8b8;
  font-size: 3.2vw;
}
label > time {
  color: #b8b8b8;
  font-size: 3.2vw;
}
ul {
  color: #707070;
  font-size: 3.74vw
}
ul li {
  cursor: pointer;
}
.center {
  display: flex;
  justify-content: center;
}
.area {
  box-sizing: border-box;
  padding: 9.5vw;
}
</style>
