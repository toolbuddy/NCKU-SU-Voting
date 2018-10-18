<template>
  <div class="grid">
    <topnews v-bind:topnews="topnews" v-bind:max="topnews.length"></topnews>
    <section class="grid grid-gap-6">
      <span class="grid">
        <svg width="22vw" height="22vw" viewbox="0 0 500 500">
          <image xlink:href="~/assets/img/system/fig01.svg" width="100%" height="100%"></image>
        </svg>
        <h3>文章總覽</h3>
        <h5>喚起年輕世代對政治的想望，<br>以及政治對世代青年的重視。</h5>
      </span>
      <router-link v-for="(iter, index) of announcements" v-bind:key="index" v-bind:to="`/announcement/detail/${iter.id}`"><announcement-column v-bind:url="iter.image" v-bind:title="iter.title" v-bind:subtitle="iter.subtitle"> </announcement-column></router-link>
      <router-link v-if="topnews.length > 3" to="/announcement/" > <label class="green-color">顯示更多</label> </router-link>
    </section>
    <section class="gray-background grid grid-gap-6">
      <span class="grid">
        <svg width="22vw" height="22vw" viewbox="0 0 500 500">
          <image xlink:href="~/assets/img/system/fig02.svg" width="100%" height="100%"></image>
        </svg>
        <h3>公民提問投票</h3>
        <h5>五大面向、十五題提問，<br>交由公民投出最終四題，送進辯論會！</h5>
      </span>
      <router-link to="/vote/1" tag="section"><h4>學生提問</h4><h5>📢 學生進入市府</h5><h5>📢 打工違法低薪</h5><h5>📢 得過且過的火車站</h5></router-link>
      <router-link to="/vote/2" tag="section"><h4>文化提問</h4><br><h5>📢 文創產業過度商業化</h5><h5>📢 文資保存實務困境</h5><h5>📢 歷史城區特別條例</h5></router-link>
      <router-link to="/vote/3" tag="section"><h4>環境提問</h4><br><h5>📢 事業廢棄物處理</h5><h5>📢 淹水の臺南</h5><h5>📢 農地違章工廠</h5></router-link>
      <router-link to="/vote/4" tag="section"><h4>交通提問</h4><br><h5>📢 城鄉發展不均</h5><h5>📢 公共運輸網路規劃</h5><h5>📢 交通亂象</h5></router-link>
      <router-link to="/vote/5" tag="section"><h4>教育提問</h4><br><h5>📢 性平教育</h5><h5>📢 親職支持系統</h5><h5>📢 校內不當管教</h5></router-link>
    </section>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import qs from 'querystring'
import announcementColumn from '~/components/announcement/column.vue'
import Topnews from '~/components/topnews.vue'

export default {
  name: 'Login',
  components: {
    announcementColumn,
    Topnews
  },
  data () {
    return {
      announcements: [],
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
      const result = await axios.get('/api/getAnnouncementsCurrent')
      return {
        topnews: result.data
      }
    } catch (error) {
      console.log('Get announcement current failed')
      console.log(error)
    }
  },
  mounted () {
    this.announcements = this.topnews.slice(0, 3)
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
  color:#707070;
  text-align: center;
  margin-bottom: 3vw;
}
h4 {
  color:#707070;
  font-size: 5.33vw;
  width: 100%;
  text-align: left;
  margin: 1vw 0;
}
h5 {
  font-size: 4.26vw;
  color: #707070;
  text-align: center; 
}

a {
  text-decoration: none;
}

section {
  width: 100vw;
  padding: 6vw;
  box-sizing: border-box;
}

section section {
  width: 88vw;
  background-color: #FFFFFF;
  box-shadow: 0px 3px 6px #CDCDCD;
  border-radius: 8px;
  padding: 5vw;
  margin: 0;
  box-sizing: border-box;
}

section section h5 {
  font-size: 4.26vw;
  color: #707070;
  text-align: left;
}

.green-color {
  color: #09A6AA;
}

.gray-background {
  background-color: #F6F6F6;
}

.grid {
  display: grid;
  justify-items: center;
  justify-content: center;
}

.grid-gap-6 {
  grid-gap: 6vw;
}
</style>

