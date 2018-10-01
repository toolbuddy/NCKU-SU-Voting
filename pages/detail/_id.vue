<template>
  <div>
    <section class="area">
      <div class="center">
        <img src="~/assets/img/logo.png"/>
      </div>
      <h1>WHY 辯論會</h1>
      <h2>一些副標文字，說明這則新聞的內容。</h2>
      <section>
        <p>此處放置新聞的文字內容</p>
        <p>
          <label> 發布時間 | </label> <label> {{time}} </label>  <br>
          <label> 發布者 | {{author}} </label> 
        </p>
        <p>進入相關文章，票選市長辯論問題：</p>
        <ul>
          <router-link v-for="(title, key, index) in related" v-bind:key="key" v-text="title" tag="li" v-bind:to="{path: '/vote/' + (index + 1) }"></router-link>
        </ul>
      </section>
    </section>
    <related-column url="/related_1.jpg" title="頭條新聞 2 " subtitle="一些副標文字，說明這則新聞的內容"></related-column>
    <related-column url="/related_2.jpg" title="頭條新聞 3 " subtitle="一些副標文字，說明這則新聞的內容"></related-column>
  </div>

</template>

<script>
import axios from '~/plugins/axios'
import RelatedColumn from '~/components/announcement/relatedColumn.vue'

export default {
  components: {
    RelatedColumn
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
  width: 63.74vw;
  height: 63.74vw;
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



.center {
  display: flex;
  justify-content: center;
}

.area {
  box-sizing: border-box;
  padding: 9.5vw;
}
</style>
