<template>
  <div>
    <img src="~/assets/img/activity.png"/>
    <section>
      <h1> {{title}} </h1>
      <h2> {{subtitle}} </h2>
      <article> {{content}} </article>
    </section>

    <section v-if="this.$store.getters.getAuthUser">
      <voting-result v-bind:option1="options.first" v-bind:option2="options.second" v-bind:option3="options.third" v-bind:questionID="id"></voting-result>
    </section>
    <section class="login-button" v-if="!this.$store.getters.getAuthUser">
      <router-link to="/account/login" tag="button"> 請登入後再進行投票 </router-link>
    </section>

    <section class="gray-background" v-on:click="first = !first">
      <label> {{question_1}} </label>
      <article> {{question_1_subtitle}} 
        <label v-if="!first"> ...(點擊展開) </label>
        <label v-if="first"> ...(點擊關閉) </label>
      </article>
    </section>
    <transition name="slide">
      <section v-show="first" class="slide">
        <article v-html="question_add_1">  </article>
      </section>
    </transition>

    <section class="gray-background" v-on:click="second = !second">
      <label> {{question_2}} </label>
      <article> {{question_2_subtitle}} 
        <label v-if="!second"> ...(點擊展開) </label>
        <label v-if="second"> ...(點擊關閉) </label>
      </article>
    </section>
    <transition name="slide">
      <section v-show="second" class="slide">
        <article v-html="question_add_2"> </article>
      </section>
    </transition>

    <section class="gray-background" v-on:click="third = !third">
      <label> {{question_3}} </label>
      <article> {{question_3_subtitle}} 
        <label v-if="!third"> ...(點擊展開) </label>
        <label v-if="third"> ...(點擊關閉) </label>
      </article>
    </section>
    <transition name="slide">
      <section v-show="third" class="slide">
        <article v-html="question_add_3">  </article>
      </section>
    </transition>
        
    <section>
      <related-section v-bind:related="related" title="進入其他公民提問投票："></related-section>
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
      meta: [
        { hid: 'description', name: 'description', content: '這是成功大學學生會的官方網站，目前所在的位置為投票頁面，在這邊會針對某個議題說明，並且提供投票的功能 | NCKUSU offisial website. Here is the voting page of the website, there will be a article that descriped from the six Tainan mayor candidate' }
      ]
    }
  },
  data () {
    return {
      first: false,
      second: false,
      third: false
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
      const related = await axios.get(`/api/getArticles?id=1`)
      result.data.related = related.data.related
      return result.data
    } catch (error) {
      console.log('Get vote content failed!!')
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
  margin-top: 14vw;
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

article >>> img, section img {
  box-sizing: border-box;
  width: 80vw;
  margin: 0 auto;
}

article >>> ul {
  color: #707070;
  font-size: 4.24vw;
  padding: 0;
  margin: 0;
}

article >>> ul li {
  cursor: pointer;
  list-style-type: none;
  margin-block-start: 2.5vw;
}

article >>> li::before {
  content: '';
  display: inline-block;
  border-style: solid;
  border-width: 1.6vw 0 1.6vw 2.4vw;
  border-color: transparent transparent transparent #74bfc3;
  cursor: pointer;
  margin-right: 1.5vw;
}

article >>> a {
  color: #707070;
  font-size: 3.74vw;

}


section label {
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

.gray-background {
  background-color: #f6f6f6;
}

.login-button {
  text-align: center;
}

  .slide {
    transform-origin: top;
    overflow: hidden;
    transition: .2s ease-in-out;
    will-change: margin-bottom transform;
  }


  .slide-enter, .slide-leave-to {
    transform: scaleY(0);
    margin-bottom: -50%
  }

  .slide-enter-to, .slide-leave {
    transform: scaleY(1);
    margin-bottom: 0;
  }



</style>
