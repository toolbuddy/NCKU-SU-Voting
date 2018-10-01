<template>
  <div>
    <h1>登入成功！</h1>

    <section>
      <label>接下來你可以：</label>
      <i></i><label>使用投票功能</label>
      <br>
      <label>進入相關文章，票選市長辯論問題：</label>
      <ul>
        <li v-for="(title, index) in titles" v-bind:key="index"> {{title}} </li>
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
  align-items: center;
  flex-wrap: wrap;
}

h1 {
  color: #60c3c5;
  font-size: 7.2vw;
}
section label:nth-child(1) {
  color: #707070;
  font-size: 4.27vw;
}

section label:nth-child(3) {
  color: #60c3c5;
  font-size:  4.27vw;
}

section label:nth-child(5) {
  color: #707070;
  font-size: 3.74vw;
}

section ul {
  color: #707070;
  font-size: 4.27vw
}

</style>
