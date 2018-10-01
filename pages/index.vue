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
font-family: ‘segoe ui’, sans-serif;
font-size: 26px;
font-weight: 100px;
color: white;
}
h2{
font-family: ‘segoe ui’, sans-serif;
font-size: 18px;
font-weight: 100px;
color: white;
}
h3{
font-family: ‘segoe ui’, sans-serif;
font-size: 16px;
font-weight: 100px;
color: #A2A2A2;
}

@media screen and  (orientation:landscape) 
{
      
      img.homephoto 
      {
      position: absolute;
      left: 35%;
      top: 7%;
      height: 70%;
      width: 70%;
      display: block;
      margin: auto;
      }
      .container
      {
        position: absolute;
        top: 0%;
        height:20%;
        width: 100%;
        background-color:rgba(223, 223, 223, 0.151);
      }
      .hometitle 
      {
       position: absolute;
       top: 50%;
       left: 0%;
       width: 100%;
       height:30vh;
       margin: auto;
       background-color:rgba(81,81,81,0.48);
       border:0px;
       z-index: 0;
      }

      ._hometitle {
          position: absolute;
          top: 5%;
          left: 10%;
          height: 10vh;
          text-align: left;
      }

}

@media screen and(orientation:landscape) and(max-width: width 1024px)

{
      img.homephoto 
      {
      position: absolute;
      left: 35%;
      top: 5%;
      height: 300px;
      width: 300px;
      display: block;
      margin: auto;
      }
      .container
      {
        position: absolute;
        top: 0%;
        height:40px;
        width: 100%;
        background-color:rgba(223, 223, 223, 0.151);
      }
      .hometitle 
      {
       position: absolute;
       top: 50%;
       left: 0%;
       width: 100%;
       height:30vh;
       margin: auto;
       background-color:rgba(81,81,81,0.48);
       border:0px;
       z-index: 0;
      }

      ._hometitle {
          position: absolute;
          top: 5%;
          left: 10%;
          height: 10vh;
          text-align: left;
      }

     }
     /* orientation: portrait   直式*/
     /* orientation: landscape  橫式*/

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
</style>
