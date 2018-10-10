<template>
  <div class="area">
    <img src="~/assets/img/picture_1.jpg"/>
    <section>
      <h1> {{title}} </h1>
      <h2> {{subtitle}} </h2>
      <article> {{content}} </article>
    </section>

    
    <section class="gray-background">
      <label> 候選提問一 </label>
      <article> {{question_1}} </article>
    </section>
    <section>
      <article> {{question_add_1}} </article>
    </section>

    <section class="gray-background">
      <label> 候選提問二 </label>
      <article> {{question_2}} </article>
    </section>
    <section>
      <article> {{question_add_2}} </article>
    </section>

    <section class="gray-background">
      <label> 候選提問三 </label>
      <article> {{question_3}} </article>
    </section>
    <section>
      <article> {{question_add_3}} </article>
    </section>

    <section>
      <label>發布時間：<time> {{time}} </time></label>
      <br>
      <label>發布者：{{author}}</label>
    </section>

    <section v-if="this.$store.getters.getAuthUser">
      <voting-result v-bind:option1="options.first" v-bind:option2="options.second" v-bind:option3="options.third" v-bind:questionID="id"></voting-result>
    </section>
    <section v-if="!this.$store.getters.getAuthUser">
      <router-link to="/account/login" tag="button"> 請登入後再進行投票 </router-link>
    </section>
    
    <section>
      <related-section v-bind:related="related" title="進入相關文章，票選市長辯論問題："></related-section>
    </section>
  </div>
</template>

<script>
import axios from '~/plugins/axios.js'
import votingResult from '~/components/announcement/votingResult.vue'
import RelatedSection from '~/components/announcement/relatedSection.vue'

export default {
  head () {
    return {
      title: '成大學生會 - NCKUSU vote',
      meta: [
        { hid: 'description', name: 'description', content: '這是成功大學學生會的官方網站，目前所在的位置為投票頁面，在這邊會針對某個議題說明，並且提供投票的功能 | NCKUSU offisial website. Here is the voting page of the website, there will be a article that descriped from the six Tainan mayor candidate' }
      ]
    }
  },

  components: {
    votingResult,
    RelatedSection
  },
  async asyncData ({ params, error }) {
    if (parseInt(params.id) < 1 || parseInt(params.id) > 6) {
      error({ statusCode: 404, message: 'Page not found' })
    }
    try {
      const result = await axios.get(`/api/getVoteContent?id=${params.id}`)
      result.data.id = parseInt(params.id)
      const related = await axios.get(`/api/getDetailContent?id=${params.id}`)
      result.data.related = related.data.related
      return result.data
    } catch (error) {
      console.log('Get vote content failed!!')
      console.log(error)
      return {}
    }
  }
}
</script>

<style scoped>

div {
  padding-bottom: 9.5%;
}

img {
  width: 100vw;
  height: auto;
}
section {
  box-sizing: border-box;
  padding: 4.8vw 9.5%;
}

h1 {
  color: #707070;
  font-size: 6.94vw;
}

h2 {
  color: #707070;
  font-size: 5.34vw;
}

article {
  color: #707070;
  font-size: 3.74vw;
}

section section label {
  color: #707070;
  font-size: 3.74vw;
}

button {
  width: 63.2vw;
  height: 14.94vw;  
  background-color: #74bfc3;
  border-radius: 10px;
  border: none;
  font-size: 5.34vw;
  color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0 0.8vw 1.6vw rgba(0, 0, 0, 0.16);
}

.gray-background label {
  color: #707070;
  font-size: 3.74vw;
}

section:not(.gray-background) label {
  color: #b8b8b8;
  font-size: 3.2vw;
}

label > time {
  color: #b8b8b8;
  font-size: 3.2vw;
}

.gray-background {
  background-color: #f6f6f6;
}
</style>
