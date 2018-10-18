<template>
  <div class="page">
    <h1>登入成功！</h1>
    <section>
      <h3>接下來你可以：</h3>
      <h4><i class="fas fa-check"></i>使用投票功能</h4>
      <related-section v-bind:related="related" title="進入相關文章，票選市長辯論問題："></related-section>
    </section>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import RelatedSection from '~/components/announcement/relatedSection.vue'

export default {
  components: {
    RelatedSection
  },
  data () {
    return {
      related: []
    }
  },
  head () {
    return {
      meta: [
        { hid: 'description', name: 'description', content: '這是成功大學學生會的官方網站，目前所在的位置為登入成功頁面，在這邊會顯示目前有什麼重要訊息可以瀏覽，以及目前釋出的帳號功能 | NCKUSU offisial website. Here is the account page of the website, there will be a particular message from the backend to tell the user about the latest article that has posted and what feature the user can use.' }
      ]
    }
  },
  async asyncData () {
    try {
      const result = await axios.get(`/api/getArticles?id=1`)
      return {
        related: result.data.related
      }
    } catch (error) {
      console.log(error)
    }
  },
  beforeCreate () {
    if (!this.$store.getters.getAuthUser) {
      this.$router.replace('/account/login')
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background-color: #f6f6f6;
  text-align: center;
}

section {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: start;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 12.8vw ;
  text-align: left;
}

h1 {
  width: 100vw;
  color: #60c3c5;
  font-size: 7.2vw;
  margin: 38.5vw 0 18.6vw 0;
  font-weight: 500;
}

label {
  border: 10px solid #f6f6f6;
}

h3:nth-child(1) {
  width: 100vw;
  color: #707070;
  font-size: 4.27vw;
  font-weight: 500;
  margin-bottom: 2vw;
}

h3:nth-child(3) {
  width: 100vw;
  color: #707070;
  font-size: 3.74vw;  
  font-weight: 500;
}

h4 {
  width: 100vw;
  margin-top: 0;
  color: #60c3c5;
  font-size:  4.27vw;
  font-weight: 500;
}

</style>
