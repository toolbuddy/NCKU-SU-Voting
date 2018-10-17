<template>
  <div>
    <topnews v-bind:topnews="topnews" v-bind:max="topnews.length"></topnews>
    
    <div class="article_title">
      <div class="_article_title">
        <svg class="articleicon" width="22vw" height="22vw" viewbox="0 0 500 500">
          <image xlink:href="~/assets/img/system/fig01.svg" width="100%" height="100%"></image>
        </svg>
        <h3>文章總覽</h3>
      </div>
    </div>
    <div class="article_subtitle">
      <div class="_article_subtitle">
        <h5>喚起年輕世代對政治的想望，<br>以及政治對世代青年的重視。</h5>
      </div>
      <router-link v-for="(iter, index) of articles" v-bind:key="index" v-bind:to="`/detail/${iter.id}`"><article-column v-bind:url="iter.image" v-bind:title="iter.title" v-bind:subtitle="iter.subtitle"> </article-column></router-link>
    </div>

    <div class="graycolor">
      <div class="_graycolor">
        <svg class="publicstage" width="22vw" height="22vw" viewbox="0 0 500 500">
          <image xlink:href="~/assets/img/system/fig02.svg" width="100%" height="100%"></image>
        </svg>
        <h3>公民提問投票</h3>
      </div>
    </div>

    <div class="publicstage_subtitle">
      <div class="_publicstage_subtitle">
        <h5>五大面向、十五題提問，<br>交由公民投出最終四題，送進辯論會！</h5>
      </div>
      <router-link to="/vote/1"><div class="box1"><h4>學生提問</h4><h5>📢 學生進入市府<br>📢 打工違法低薪<br>📢 得過且過的火車站</h5></div></router-link>
      <router-link to="/vote/2"><div class="box2"><h4>文化提問</h4><h5>📢 文創產業過度商業化<br>📢 文資保存實務困境<br>📢 歷史城區特別條例</h5></div></router-link>
      <router-link to="/vote/3"><div class="box3"><h4>環境提問</h4><h5>📢 事業廢棄物處理<br>📢 淹水の臺南<br>📢 農地違章工廠</h5></div></router-link>
      <router-link to="/vote/4"><div class="box4"><h4>交通提問</h4><h5>📢 城鄉發展不均<br>📢 公共運輸網路規劃<br>📢 交通亂象</h5></div></router-link>
      <router-link to="/vote/5"><div class="box5"><h4>教育提問</h4><h5>📢 性平教育<br>📢 親職支持系統<br>📢 校內不當管教</h5></div></router-link>
    </div>

<!--
    <div class="show_more2">
      <div class="_show_more2">
        <h6>顯示更多</h6>
      </div>
    </div>

    <div class="graycolor2">
      <div class="_graycolor2">
        <svg class="mailSuc" width="22vw" height="22vw" viewbox="0 0 500 500">
        <image xlink:href="~/assets/img/system/fig03.svg" width="100%" height="100%"></image>
        </svg>
        <h3>聯絡我們</h3>
      </div>
    </div>
        
    <svg class="path" v-on:click="sendMessage" width="5.83vw" height="5.83vw" viewbox="0 0 500 500">
    <image xlink:href="~/assets/img/system/path.svg" width="100%"></image>
    </svg>

    <a href="https://www.facebook.com/NCKUSU/" title="Facebook">        
        <svg class="link-fb" width="10.93vw" height="10.93vw" viewbox="0 0 500 500">
        <image xlink:href="~/assets/img/system/fb.svg" width="100%"></image>
        </svg>
    </a>
    <a href="https://www.instagram.com/ncku_su/" title="Instagram">      
        <svg class="link-ig" width="10.93vw" height="10.93vw" viewbox="0 0 500 500">
        <image xlink:href="~/assets/img/system/ig.svg" width="100%"></image>
        </svg>
    </a>
    

    
    <form class="email_form">
   email <input type="text" class="border" v-model="sender" name="email" v-validate="{ required: true }" v-bind:class="{ 'is-invalid': send && errors.has('email') }" >
    <br/>
   主旨 <input type="text" class="border" v-model="subject" name="subject" v-validate="{ required: true }" v-bind:class="{ 'is-invalid': send && errors.has('subject') }">
    <br/>
    <textarea class="_border" v-model="content" name="content" v-validate="{ required: true }" v-bind:class="{ 'is-invalid': send && errors.has('content') }"> </textarea>
    </form>
-->
    
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import qs from 'querystring'
import articleColumn from '~/components/articleColumn.vue'
import Topnews from '~/components/topnews.vue'

export default {
  name: 'Login',
  components: {
    articleColumn,
    Topnews
  },
  data () {
    return {
      articles: [],
      send: false,
      sender: '',
      subject: '',
      content: '',
      show: false
    }
  },
  head () {
    return {
      meta: [
        { hid: 'description', name: 'description', content: '這是成功大學學生會的官方網站，目前所在的位置為首頁，並且提供概括性的訊息給學生，並且提供選項連結到其他頁面 | NCKUSU offisial website. Here is the index page of the website, there will be a general message from the student union and options for other page links.' }
      ]
    }
  },
  async asyncData () {
    try {
      const result = await axios.get('/api/getArticlesCurrent')
      return {
        topnews: result.data
      }
    } catch (error) {
      console.log('Get article failed')
      console.log(error)
    }
  },
  mounted () {
    this.articles = this.topnews.slice(0, 3)
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
  color: white;
}
h2 {
  font-size: 4.8vw;
  color: white;
}
h3 {
  font-size: 6.93vw;
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
  width: 99vw;
  height: 99vh;
  display: block;
  margin: 14vw auto 0 auto;
  object-fit: cover;
  object-position: top; 
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
  top: 216vw;
  left: 0vw;
  width: 100vw;
  height:auto;
}
._article_subtitle {
  display: flex;
  justify-content: center;
  z-index: 2;
  margin-bottom: 7vw;
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
  top: 325vw;
  left: 0vw;
  height: 300vw;
  width: 100vw;
  background-color: #F6F6F6;
}
._graycolor {
  position: absolute;
  top: 5vw;
  left: 29vw;
  height: auto;
  text-align: left;
}
svg.publicstage {
  display: block;
  margin: 0 auto;
}
.publicstage_subtitle {
  position: absolute;
  top: 360vw;
  width: 100vw;
  height: auto;
  margin: 0 auto;
}
._publicstage_subtitle {
  position: absolute;
  top: 3.57vw;
  left: 14.3vw;
  text-align: center;
  z-index: 2;
}
.box1 {
  position: absolute;
  boz-sizing: border-box;
  top: 20.36vw;
  left:5vw;
  height: 44.64vw;
  width: 90vw;
  display: block;
  margin: auto;
  background-color: #FFFFFF;
  z-index:2;
  box-shadow: 0px 3px 6px #CDCDCD;
  border-radius: 8px;
  text-align: left;
  padding:0vw;
}

.box1 h4 {
  margin-top: 5vw;
  margin-bottom: 5vw;
}

.box1 h5 {
  margin-left: 10vw;
  margin-top: 5vw;
  margin-bottom: 5vw;
}
.box2 {
  position: absolute;
  boz-sizing: border-box;
  top: 68.57vw;
  left:5vw;
  height: 44.64vw;
  width: 90vw;
  display: block;
  margin: auto;
  background-color: #FFFFFF;
  z-index:2;
  box-shadow: 0px 3px 6px #CDCDCD;
  border-radius: 8px;
  text-align: left;
  padding:0vw;
}
.box2 h4 {
  margin-top: 5vw;
  margin-bottom: 5vw;
}


.box2 h5 {
  margin-left: 10vw;
  margin-top: 5vw;
  margin-bottom: 5vw;
}

.box3 {
  position: absolute;
  boz-sizing: border-box;
  top: 116.79vw;
  left:5vw;
  height: 44.64vw;
  width: 90vw;
  display: block;
  margin: auto;
  background-color: #FFFFFF;
  z-index:2;
  box-shadow: 0px 3px 6px #CDCDCD;
  border-radius: 8px;
  text-align: left;
  padding:0vw;
}
.box3 h4 {
  margin-top: 5vw;
  margin-bottom: 5vw;
}

.box3 h5 {
  margin-left: 10vw;
  margin-top: 5vw;
  margin-bottom: 5vw;
}

.box4 {
  position: absolute;
  boz-sizing: border-box;
  top: 165.01vw;
  left:5vw;
  height: 44.64vw;
  width: 90vw;
  display: block;
  margin: auto;
  background-color: #FFFFFF;
  z-index:2;
  box-shadow: 0px 3px 6px #CDCDCD;
  border-radius: 8px;
  text-align: left;
  padding:0vw;
}
.box4 h4 {
  margin-top: 5vw;
  margin-bottom: 5vw;
}

.box4 h5 {
  margin-left: 10vw;
  margin-top: 5vw;
  margin-bottom: 5vw;
}

.box5 {
  position: absolute;
  boz-sizing: border-box;
  top: 213.23vw;
  left:5vw;
  height: 44.64vw;
  width: 90vw;
  display: block;
  margin: auto;
  background-color: #FFFFFF;
  z-index:2;
  box-shadow: 0px 3px 6px #CDCDCD;
  border-radius: 8px;
  text-align: left;
  padding:0vw;
}
.box5 h4 {
  margin-top: 5vw;
  margin-bottom: 5vw;
}

.box5 h5 {
  margin-left: 10vw;
  margin-top: 5vw;
  margin-bottom: 5vw;
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

