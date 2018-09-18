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
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import bighead from '../components/bighead'

export default {
  name: 'Voting',
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
    getProfile() {
      let me = this
      FB.api('/me?field=name,id,email',function(response){
        console.log('getProfile',response)
        me.$set(me, 'profile' ,response)
      })
    },
    login() {
      let me = this 
      FB.login(function(response){
        console.log('login success!');
        me.statusChange(response);
      },{
        scope: 'email,public_profile',
        return_scopes: true
      })
    },
    logout() {
      let me = this
      FB.logout(function(response) {
        console.log('logout!');
        me.statusChange(response);
      })
    },
    statusChange(res) {
      let me = this
      if( res.status === 'connected' ){
        me.isLogin = true
        me.getProfile()
      } else {
        me.profile = {}
        me.isLogin = false
      }
      console.log('profile: ',me.profile);
      console.log('isLogin: ',me.isLogin);
    }
  },
  mounted() {
    let me = this
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '249512712375058',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      FB.AppEvents.logPageView();
      // check FB login status
      FB.getLoginStatus( response => {
        me.statusChange(response)
      });
    };

    (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/zh_TW/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
