<template>
  <div>
    <!--
    temporarily hide the FB login button
    <div  class="container">
      <bighead :isLogin="isLogin" :profile="profile"></bighead>
      <div v-if="!isLogin">
          <button type="button" v-on:click="login"> Login</button>
      </div>
      <div v-else>
          <button type="button" v-on:click="logout"> Logout</button>
      </div>
    </div>
    -->

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
        <img class="articleicon" src="~/assets/img/articleicon.png">
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
        <img class="publicstage" src="~/assets/img/publicstage.png">
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
        <h3>關於學生會</h3>
      </div>
    </div>
    
    <div class="aboutsu_subtitle">
      <div class="_aboutsu_subtitle">
        <h5>解釋的話包含什麼啊有什麼啊，整體<br>而言的一句解釋整體而言的一句釋。</h5>
      </div>
      <div class="box1"><h4>組織架構</h4><h5>解釋的話包含什麼啊有什麼啊，整體<br>而言的一句解釋整體而言的一句釋。</h5></div>
      <div class="box2"><h4>學生會史</h4><h5>解釋的話包含什麼啊有什麼啊，整體<br>而言的一句解釋整體而言的一句釋。</h5></div>
      <div class="box3"><h4>組織章程</h4><h5>解釋的話包含什麼啊有什麼啊，整體<br>而言的一句解釋整體而言的一句釋。</h5></div>
      <div class="box4"><h4>法規彙編</h4><h5>解釋的話包含什麼啊有什麼啊，整體<br>而言的一句解釋整體而言的一句釋。</h5></div>
      <div class="box5"><h4>會長的話</h4><h5>解釋的話包含什麼啊有什麼啊，整體<br>而言的一句解釋整體而言的一句釋。</h5></div>
    </div>
    <div class="show_more3">
      <div class="_show_more3">
        <h6>顯示更多</h6>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import qs from 'querystring'
import bighead from '../components/bighead'
import articleColumn from '~/components/articleColumn.vue'

export default {
  name: 'Login',
  components: {
    bighead,
    articleColumn
  },
  head () {
    return {
      title: 'Voting'
    }
  },
  data () {
    return {
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
    getProfile () {
      let me = this
      window.FB.api('/me?field=name,id,email', function (response) {
        console.log('getProfile', response)
        me.$set(me, 'profile', response)
      })
    },
    login () {
      let me = this
      window.FB.login(function (response) {
        console.log('login success!')
        me.statusChange(response)
      }, {
        scope: 'email,public_profile',
        return_scopes: true
      })
    },
    logout () {
      let me = this
      window.FB.logout(function (response) {
        console.log('logout!')
        me.statusChange(response)
      })
    },
    statusChange (res) {
      let me = this
      if (res.status === 'connected') {
        me.isLogin = true
        me.getProfile()
      } else {
        me.profile = {}
        me.isLogin = false
      }
      console.log('profile: ', me.profile)
      console.log('isLogin: ', me.isLogin)
    }
  }
}
</script>

<style scoped>

h1{
font-size: 6.93vw;
font-weight: 100px;
color: white;
}
h2{
font-size: 4.8vw;
font-weight: 100px;
color: white;
}
h3{
font-size: 6.93vw;
font-weight: 100px;
color:#A2A2A2 ;
}
h4{
color:#A2A2A2 ;
padding-left: 10vw;
font-size: 5.33vw;
text-align: left;
}

h5{
font-size: 4.26vw;
color: #A2A2A2;
}
h6{
font-size: 4.8vw;
color: #09A6AA;
}





img.homephoto 
  {
    position: absolute;
    top: 20%;
    height: 56vh;
    width: auto;
    display: block;
    margin: auto;
  }


.hometitle {
    position: absolute;
    top: 64.3%;
    left: 0%;
    width: 100%;
    height:23vh;
    margin: auto;
    background-color:rgba(81,81,81,0.48);
    border:0px;
    z-index: 0;
}

._hometitle {
    position: absolute;
    top: 10%;
    left: 10%;
    height: 10vh;
    text-align: left;
}


.container
{
  position: absolute;
  top: 0%;
  height:6.1%;
  width: 100%;
  background-color:rgba(223, 223, 223, 0.151);
}
._container
{
  position: fixed;
  top: 0px;
  left: 3%;
  display: block;
  margin: auto;
}


.title
{
  margin: 30px 0;
}


.article_title 
{
    position: absolute;
    top: 115vh;
    left: 0%;
    width: 100%;
    height:10vh;
}
._article_title 
{
    position: absolute;
    top: 0vh;
    left: 19.5vh;
    height: 10vh;
    text-align: left;
}

img.articleicon 
  {
    position: absolute;
    top: -8vh;
    padding-left:2vh;
    height: 12.4vh;
    width: auto;
    display: block;
    margin: auto;
  }


.article_subtitle 
{
    position: absolute;
    top: 120vh;
    left: 0%;
    width: 100%;
    height:10vh;
}
._article_subtitle 
{
    position: absolute;
    top: 2vh;
    left: 9vh;
    height: 10vh;
    text-align: left;
}

img.news1
  {
    position: absolute;
    top: 15vh;
    padding-left:2vh;
    height: 25vh;
    width: auto;
    display: block;
    margin: auto;
  }
  img.news2
  {
    position: absolute;
    top: 41vh;
    padding-left:2vh;
    height: 25vh;
    width: auto;
    display: block;
    margin: auto;
  }
  img.news3
  {
    position: absolute;
    top: 67vh;
    padding-left:2vh;
    height: 25vh;
    width: auto;
    display: block;
    margin: auto;
  }

  .show_more 
{
    position: absolute;
    top: 210vh;
    left: 0%;
    width: 100%;
    height:10vh;
}
._show_more  
{
    position: absolute;
    top: 2vh;
    left: 22vh;
    height: 10vh;
    text-align: left;
}
.graycolor 
{
    position: absolute;
    top: 225vh;
    left: 0vw;
    height: 140vh;
    width: 100%;
    background-color: #F6F6F6;
}
._graycolor
{
    position: absolute;
    top: 20vh;
    left: 29vw;
    height: 10vh;
    text-align: left;
}

img.publicstage
  {
    position: absolute;
    top: -8vh;
    padding-left:5vh;
    height: 12.4vh;
    width: auto;
    display: block;
    margin: auto;
  }

  .publicstage_subtitle 
{
    position: absolute;
    top: 250vh;
    left: 0%;
    width: 100%;
    height:10vh;
}
._publicstage_subtitle 
{
    position: absolute;
    top: 2vh;
    left: 8vh;
    height: 10vh;
    text-align: left;
}

  .box1
  {
    position: absolute;
    top: 17vh;
    left:5vw;
    height: 25vh;
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
    .box2
  {
    position: absolute;
    top: 44vh;
    left:5vw;
    height: 25vh;
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
    .box3
  {
    position: absolute;
    top: 71vh;
    left:5vw;
    height: 25vh;
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
     .box4
  {
    position: absolute;
    top: 98vh;
    left:5vw;
    height: 25vh;
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
     .box5
  {
    position: absolute;
    top: 125vh;
    left:5vw;
    height: 25vh;
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
  .show_more2 
{
    position: absolute;
    top: 345vh;
    left: 0%;
    width: 100%;
    height:10vh;
}
._show_more2
{
    position: absolute;
    top: 2vh;
    left: 23vh;
    height: 10vh;
    text-align: left;
}


.graycolor2
{
    position: absolute;
    top: 400vh;
    left: 0vw;
    height: 180vh;
    width: 100%;
    background-color: #F6F6F6;
}
._graycolor2
{
    position: absolute;
    top: 5vh;
    left: 31vw;
    height: 10vh;
    text-align: left;
}

 .aboutsu_subtitle 
{
    position: absolute;
    top: 415vh;
    left: 0%;
    width: 100%;
    height:10vh;
}
._aboutsu_subtitle 
{
    position: absolute;
    top: 2vh;
    left: 8vh;
    height: 10vh;
    text-align: left;
}

  .show_more3
{
    position: absolute;
    top: 500vh;
    left: 0%;
    width: 100%;
    height:10vh;
}
._show_more3
{
    position: absolute;
    top: 2vh;
    left: 23vh;
    height: 10vh;
    text-align: left;
}

</style>
