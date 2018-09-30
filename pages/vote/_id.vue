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

  </div>
</template>

<script>
import axios from '~/plugins/axios.js'

export default {
  async asyncData ({ params, error }) {
    if (parseInt(params.id) < 1 || parseInt(params.id) > 6) {
      error({ statusCode: 404, message: 'Page not found' })
    }
    try {
      const result = await axios.get(`/api/getVoteContent?id=${params.id}`)
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

img {
  width: 100vw;
  height: auto;
}
section {
  box-sizing: border-box;
  padding: 18px 9.5%;
}

section:last-child {
  box-sizing: border-box;
  padding: 0 9.5%;
}

h1 {
  color: #707070;
  font-size: 26px;
}

h2 {
  color: #707070;
  font-size: 20px;
}

article {
  color: #707070;
  font-size: 14px;
}

section section label {
  color: #707070;
  font-size: 14px;
}

.gray-background label {
  color: #707070;
  font-size: 14px;
}

section:not(.gray-background) label {
  color: #b8b8b8;
  font-size: 12px;
}

label > time {
  color: #b8b8b8;
  font-size: 12px;
}

.gray-background {
  background-color: #f6f6f6;
}
</style>
