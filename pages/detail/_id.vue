<template>
  <div>
    <section class="area">
      <div class="center">
        <img src="~/assets/img/logo.png" alt="學生會重要公告詳細頁面的圖片"/>
      </div>
      <h1>WHY 辯論會</h1>
      <h2>一些副標文字，說明這則新聞的內容。</h2>
      <section>
        <p>此處放置新聞的文字內容</p>
        <p>
          <label> 發布時間 | </label> <label> {{time}} </label>  <br>
          <label> 發布者 | {{author}} </label> 
        </p>
        <related-section v-bind:related="related" title="進入相關文章，票選市長辯論問題："></related-section>
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
      title: '成大學生會 - NCKUSU detail',
      meta: [
        { hid: 'description', name: 'description', content: '這是成功大學學生會的官方網站，目前所在位置為詳細公告的頁面，在這邊會顯示某個文章的詳細內容 | NCKUSU offisial website. Here is the detail page of the website, there will be detailed article content render for a topic.' }
      ]
    }
  },

  components: {
    RelatedColumn,
    RelatedSection
  },
  async asyncData ({ params, error }) {
    if (parseInt(params.id) !== 1) {
      error({ statusCode: 404, message: 'Page not found' })
    }
    try {
      const result = await axios.get(`/api/getDetailContent?id=${params.id}`)
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
  height: 63.74vw;
  object-fit: cover;
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
