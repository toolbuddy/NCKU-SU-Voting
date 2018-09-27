<template>
  <div>
    <div  class="container">
      <bighead :isLogin="isLogin" :profile="profile"></bighead>
      <div v-if="!isLogin">
          <button type="button" v-on:click="login"> Login</button>
      </div>
      <div v-else>
          <button type="button" v-on:click="logout"> Logout</button>
      </div>
    </div>
    <img class="homephoto" src="~/assets/img/home.png">

    <div class="hometitle">
      <div class="_hometitle">
      WHY辯論會？<br>
      一些副標文字，說明這則新聞的內容。
      </div>
    </div>
  </div>
</template>

<script>
import bighead from '../components/bighead'

export default {
  name: 'Login',
  components: {
    bighead
  },
  head () {
    return {
      title: 'Voting'
    }
  },
  data () {
    return {
      profile: {},
      isLogin: false
    }
  },
  methods: {
    getProfile () {
      let me = this
      FB.api('/me?field=name,id,email', function (response) {
        console.log('getProfile', response)
        me.$set(me, 'profile', response)
      })
    },
    login () {
      let me = this
      FB.login(function (response) {
        console.log('login success!')
        me.statusChange(response)
      }, {
        scope: 'email,public_profile',
        return_scopes: true
      })
    },
    logout () {
      let me = this
      FB.logout(function (response) {
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
  },
  mounted () {
    let me = this
    window.fbAsyncInit = function () {
      FB.init({
        appId: '249512712375058',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      })
      FB.AppEvents.logPageView()
      // check FB login status
      FB.getLoginStatus(response => {
        me.statusChange(response)
      })
    }
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/zh_TW/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  }
}
</script>

<style scoped>
@media screen and (min-width: 600 px) and (max-width: 2560 px)
{
  img.homephoto 
  {
    position: fixed;
    top: 10%;
    height: 70%;
    width: auto;
    display: block;
    margin: auto;
  }
}

  img.homephoto 
  {
    position: fixed;
    top: 20%;
    height: 56%;
    width: auto;
    display: block;
    margin: auto;
  }


.hometitle {
    position: absolute;
    top: 64.3%;
    left: 0%;
    width: 100%;
    height:20vh;
    margin: auto;
    background-color:rgba(81,81,81,0.48);
    border:0px;
    z-index: 0;
}

._hometitle {
    position: absolute;
    top: 15%;
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


.title
{
  margin: 30px 0;
}
</style>
