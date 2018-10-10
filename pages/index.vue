<template>
  <div>

    <router-link v-bind:to="{path: '/detail/1'}" >
      <img class="homephoto" src="~/assets/img/home.png"/>
    </router-link>
    <router-link v-bind:to="{path: '/detail/1'}" >
      <div class="hometitle">
        <div class="_hometitle">
        <h1>WHY辯論會？</h1>
        <h2>一些副標文字，<br>說明這則新聞的內容。</h2>
        </div>
      </div>
    </router-link>
    
    <div class="article_title">
      <div class="_article_title">
        <svg class="articleicon" width="22vw" height="22vw">
          <image xlink:href="~/assets/img/system/fig01.svg" width="22vw" height="22vw"></image>
        </svg>
        <h3>文章總覽</h3>
      </div>
    </div>
    <div class="article_subtitle">
      <div class="_article_subtitle">
        <h5>解釋的話包含什麼啊有什麼啊，整體<br>而言的一句解釋整體而言的一句釋。</h5>
      </div>
      <article-column v-bind:url="image" v-bind:title="title" v-bind:subtitle="subtitle"> </article-column>
      <article-column v-bind:url="image" v-bind:title="title" v-bind:subtitle="subtitle"> </article-column>
      <article-column v-bind:url="image" v-bind:title="title" v-bind:subtitle="subtitle"> </article-column>
    </div>
    <div class="show_more">
      <div class="_show_more">
        <h6>顯示更多</h6>
      </div>
    </div>

    <div class="graycolor">
      <div class="_graycolor">
        <svg class="publicstage" width="22vw" height="22vw">
          <image xlink:href="~/assets/img/system/fig02.svg" width="22vw" height="22vw"></image>
        </svg>
        <h3>公共參與平台</h3>
      </div>
    </div>

    <div class="publicstage_subtitle">
      <div class="_publicstage_subtitle">
        <h5>解釋的話包含什麼啊有什麼啊，整體<br>而言的一句解釋整體而言的一句釋。</h5>
      </div>
      <div class="box1"><h4>文化</h4><h5>解釋的話包含什麼啊有什麼啊，整體<br>而言的一句解釋整體而言的一句釋。</h5></div>
      <div class="box2"><h4>教育</h4><h5>解釋的話包含什麼啊有什麼啊，整體<br>而言的一句解釋整體而言的一句釋。</h5></div>
      <div class="box3"><h4>轉型正義</h4><h5>解釋的話包含什麼啊有什麼啊，整體<br>而言的一句解釋整體而言的一句釋。</h5></div>
    </div>
    <div class="show_more2">
      <div class="_show_more2">
        <h6>顯示更多</h6>
      </div>
    </div>

    <div class="graycolor2">
      <div class="_graycolor2">
        <svg class="mailSuc" width="22vw" height="22vw">
        <image xlink:href="~/assets/img/system/fig03.svg" width="22vw" height="22vw"></image>
        </svg>
        <h3>聯絡我們</h3>
      </div>
    </div>
        
    <svg class="path" v-on:click="sendMessage">
    <image xlink:href="~/assets/img/system/path.svg" width="5.83vw"></image>
    </svg>

    <a href="https://www.facebook.com/NCKUSU/" title="Facebook">        
        <svg class="link-fb">
        <image xlink:href="~/assets/img/system/fb.svg" width="10.93vw"></image>
        </svg>
    </a>
    <a href="https://www.instagram.com/ncku_su/" title="Instagram">      
        <svg class="link-ig">
        <image xlink:href="~/assets/img/system/ig.svg" width="10.93vw"></image>
        </svg>
    </a>
    

    
    <form class="email_form">
   email <input type="text" class="border" v-model="sender" name="email" v-validate="{ required: true }" v-bind:class="{ 'is-invalid': send && errors.has('email') }" >
    <br/>
   主旨 <input type="text" class="border" v-model="subject" name="subject" v-validate="{ required: true }" v-bind:class="{ 'is-invalid': send && errors.has('subject') }">
    <br/>
    <input type="text" class="_border" v-model="content" name="content" v-validate="{ required: true }" v-bind:class="{ 'is-invalid': send && errors.has('content') }">
    </form>

    
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import qs from 'querystring'
import articleColumn from '~/components/articleColumn.vue'

export default {
  name: 'Login',
  components: {
    articleColumn
  },
  data () {
    return {
      send: false,
      sender: '',
      subject: '',
      content: ''
    }
  },
  head () {
    return {
      meta: [
        { hid: 'description', name: 'description', content: 'NCKUSU offisial website. Here is the index page of the website, there will be a general message from the student union and options for other page links.' }
      ]
    }
  },
  async asyncData () {
    try {
      const params = {
        limit: 1,
        offset: 0
      }
      const result = await axios.post('/api/getArticles', {
        method: 'post',
        data: qs.stringify(params)
      })
      console.log(result.data)
      return result.data
    } catch (error) {
      console.log('Get article failed')
    }
  },
  methods: {
    sendMessage: function () {
      this.send = true
      console.log(this.$validator)
      this.$validator.validateAll().then(async (result) => {
        console.log(result)
        if (result) {
          const params = {
            sender: this.sender,
            subject: this.subject,
            content: this.content
          }
          await axios('/api/sendMessage', {
            method: 'post',
            data: qs.stringify(params)
          })
          this.$router.go(0)
        } else {
          alert('請輸入正確的資料!')
        }
      })
    }
  }
}
</script>

<style scoped>
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

h3 {
  font-size: 6.93vw;
  font-weight: 100px;
  color:#A2A2A2 ;
}

h4 {
  color:#A2A2A2 ;
  padding-left: 10vw;
  font-size: 5.33vw;
  text-align: left;
}

h5 {
  font-size: 4.26vw;
  color: #A2A2A2;
}

h6 {
  font-size: 4.8vw;
  color: #09A6AA;
}

img.homephoto {
  position: absolute;
  top: 34vw;
  width: 99vw;
  height: 99vw;
  display: block;
  margin: auto;
}

.hometitle {
  position: absolute;
  top: 114.8vw;
  left: 0%;
  width: 100vw;
  height:41vw;
  margin: auto;
  background-color:rgba(81,81,81,0.48);
  border:0px;
  z-index: 0;
}

._hometitle {
  position: absolute;
  top: 3vw;
  left: 11vw;
  height: 10vw;
  text-align: left;
}

.title {
  margin: 30px 0;
}

.article_title {
  position: absolute;
  top: 182vw;
  left: 0vw;
  width: 100%;
  height:auto;
  z-index:2;
}

._article_title {
  position: absolute;
  top: 0vw;
  left: 34.8vw;
  height: auto;
  text-align: center;
}

svg.articleicon {
  
  display: block;
  margin: 0 auto;
}

.article_subtitle {
  position: absolute;
  top: 242vw;
  left: 0vw;
  width: 100vw;
  height:auto;
}

._article_subtitle {
  position: absolute;
  top: -25vw;
  left: 14.29vw;
  height: auto;
  text-align: left;
  z-index: 2;
}

img.news1 {
  position: absolute;
  top: 26.78vw;
  padding-left:3.57vw;
  height: 44.64vw;
  width: auto;
  display: block;
  margin: auto;
}

img.news2 {
  position: absolute;
  top: 73.21vw;
  padding-left:3.57vw;
  height: 44.64vw;
  width: auto;
  display: block;
  margin: auto;
}

img.news3 {
  position: absolute;
  top: 119.64vw;
  padding-left:3.57vw;
  height: 44.64vw;
  width: auto;
  display: block;
  margin: auto;
}

.show_more {
  position: absolute;
  top: 375vw;
  left: 0vw;
  width: 100vw;
  height:auto;
}

._show_more {
  position: absolute;
  top: 3.57vw;
  left: 39.28vw;
  height: 17.86vw;
  text-align: left;
}

.graycolor {
  position: absolute;
  top: 400vw;
  left: 0vw;
  height: 250vw;
  width: 100vw;
  background-color: #F6F6F6;
}

._graycolor {
  position: absolute;
  top: 10vw;
  left: 29vw;
  height: auto;
  text-align: left;
}

svg.publicstage {
  top: -14.4vw;
  display: block;
  margin: 0 auto;
}

.publicstage_subtitle {
  position: absolute;
  top: 445vw;
  left: 0vw;
  width: 100vw;
  height:auto;
}

._publicstage_subtitle {
  position: absolute;
  top: 3.57vw;
  left: 14.3vw;
  text-align: left;
  z-index: 2;
}

.box1 {
  position: absolute;
  top: 30.36vw;
  left:5vw;
  height: 44.64vw;
  width: 90vw;
  display: block;
  margin: auto;
  background-color: #FFFFFF;
  z-index:2;
  box-shadow: 0px 3px 6px #CDCDCD;
  border-radius: 8px;
  text-align: center;
  padding:0vw;
}

.box2 {
  position: absolute;
  top: 78.57vw;
  left:5vw;
  height: 44.64vw;
  width: 90vw;
  display: block;
  margin: auto;
  background-color: #FFFFFF;
  z-index:2;
  box-shadow: 0px 3px 6px #CDCDCD;
  border-radius: 8px;
  text-align: center;
  padding:0vw;
}

.box3 {
  position: absolute;
  top: 126.79vw;
  left:5vw;
  height: 44.64vw;
  width: 90vw;
  display: block;
  margin: auto;
  background-color: #FFFFFF;
  z-index:2;
  box-shadow: 0px 3px 6px #CDCDCD;
  border-radius: 8px;
  text-align: center;
  padding:0vw;
}



.show_more2 {
  position: absolute;
  top: 616vw;
  left: 0vw;
  width: 100vw;
}

._show_more2 {
  position: absolute;
  top: 3.57vw;
  left: 39.29vw;
  text-align: left;
}

.graycolor2 {
  position: absolute;
  top: 650vw;
  left: 0vw;
  height: 200vw;
  width: 100vw;
  background-color: #EDEDED;
}

._graycolor2 {
  position: absolute;
  top: 15vw;
  left: 35vw;
  height: auto;
  text-align: left;
}

svg.mailSuc {
  top: -18vw;
  display: block;
  margin: 0 auto;
}


svg.link-fb {
  position: absolute;
  top: 830vw;
  left:26.4vw;
  width:10.93vw;
  display: block;
  margin: auto;
}
svg.link-ig {
  position: absolute;
  top: 830vw;
  left:62.6vw;
  width:10.93vw;
  display: block;
  margin: auto;
}
svg.path{
  position: absolute;
  top: 805vw;
  left:75.5vw;
  width:5.83vw;
  display: block;
  margin: auto;
  z-index:3;
  cursor: pointer;
}

.email_form {
  position: absolute;
  top: 710vw;
  left:12.5vw;
  text-align: center;
  font-size: 4.266vw;
  line-height:10vw;
  color: #707070;
}

.border{
  border-radius: 8px;
  border-color: transparent;
  width:63.2vw;
  height:6.13vw;
}

._border{
  position: absolute;
  top: 22vw;
  left: 0vw;
  border-radius: 8px;
  border-color: transparent;
  width:74.5vw;
  height:82.4vw;
  vertical-align: top;
}
  .is-invalid {
    border: 1px solid #F44336;
  }
</style>
