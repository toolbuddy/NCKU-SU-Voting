<template>
  <div>
    <h1>登入成功！</h1>
    <section>
      <h3>接下來你可以：</h3>
      <h4>使用投票功能</h4>
      <h3>進入相關文章，票選市長辯論問題：</h3>
      <ul>
        <router-link v-for="(title, index) in titles" v-bind:key="index" v-bind:to="{path: '/vote/' + (index+1)}" tag="li"> {{title}} </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      titles: []
    }
  },
  async asyncData () {
    try {
      let result = await axios.get('/api/getAllVote')
      return {
        titles: result.data
      }
    } catch (error) {
      console.log(error)
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
  justify-content: center;
  width: 100vw;
  background-color: #f6f6f6;
  text-align: center;
  min-height: 100vh;
}

section {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: start;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 12.8vw ;
  text-align: left;
}

h1 {
  width: 100vw;
  color: #60c3c5;
  font-size: 7.2vw;
  margin: 38.5vw 0 18.6vw 0;
  font-weight: 500;
}

label {
  border: 10px solid #f6f6f6;
}

h3:nth-child(1) {
  width: 100vw;
  color: #707070;
  font-size: 4.27vw;
  font-weight: 500;
  margin-bottom: 2vw;
}

h3:nth-child(3) {
  width: 100vw;
  color: #707070;
  font-size: 3.74vw;  
  font-weight: 500;
}

h4 {
  width: 100vw;
  margin-top: 0;
  color: #60c3c5;
  font-size:  4.27vw;
  font-weight: 500;
}


ul {
  color: #707070;
  font-size: 3.74vw;
  padding: 0;
  margin: 0;
}

li::before {
  content: '';
  display: inline-block;
  border-style: solid;
  border-width: 1.6vw 0 1.6vw 2.4vw;
  border-color: transparent transparent transparent #74bfc3;
  cursor: pointer;
}

li {
  margin: 2.14vw;
  list-style-type: none;
  cursor: pointer;
}


</style>
