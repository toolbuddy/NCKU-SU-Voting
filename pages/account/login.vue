<template>
  <div>
    <button v-on:click="login"> 使用 facebook 登入 </button>
    <label>登入後即可使用投票功能！</label>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  methods: {
    statusChange: async function (response) {
      if (response.status === 'connected') {
        console.log(response)
        const vote = await axios.get(`/api/getVoted?userID=${response.authResponse.userID}`)
        response.authResponse.vote = parseInt(vote.data)
        await this.$store.dispatch('login', response.authResponse)
        this.$router.replace('/account')
      }
    },
    login: function () {
      const self = this
      window.FB.login(function (response) {
        console.log('login success!')
        self.statusChange(response)
      }, {
        scope: 'email,public_profile',
        return_scopes: true
      })
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
  width: 100vw;
  height: 100vh;
  text-align: center;
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
  margin: 0 auto;
  box-shadow: 0 0.8vw 1.6vw rgba(0, 0, 0, 0.16);
}
label {
  color: #848484;
  box-sizing: border-box;
  margin: 5.34vw auto;
}
</style>
