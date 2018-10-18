<template>
<form>
  <div class="container">
    <div class="title" v-show="!isVoted" >關於{{type}}身為學生，我最想知道：</div>
    <div class="title" v-show="isVoted" >目前投票結果：</div>
    <input type="radio" ref="radio1" id ="op1" name="Option" v-on:click="voteColumn(0)"  v-bind:disabled="isVoted" v-bind:checked="isVoted && voted === (questionID - 1) * 3" v-bind:key="questionID * 3"/>
    <label class="button-1" for="op1"></label>
    <section class="content-1">
      <label class="option-1" for="op1">{{option1}}</label>
      <div v-bind:class="{ votedBar: voted === (questionID - 1) * 3 }" v-show="isVoted" v-bind:style="{ width: percent_1 + '%' }" type="progress-bar" id="bar-1"></div>
      <label v-bind:class="{ votedNum: voted ===  (questionID - 1) * 3  }"  v-show="isVoted" id="percent-1">{{percent_1.toFixed(2) + '%'}} - {{number_1 + ' 票'}}</label>
    </section>
    
    <input type="radio" ref="radio2" id ="op2" name="Option" v-on:click="voteColumn(1)" v-bind:disabled="isVoted" v-bind:checked="isVoted && voted === (questionID - 1) * 3 + 1" v-bind:key="questionID * 3 + 1"/>
    <label class="button-2" for="op2"></label> 
    <section class="content-2">
      <label class="option-2" for="op2">{{option2}}</label>
      <div v-bind:class="{ votedBar: voted ===  (questionID - 1) * 3 + 1  }" v-show="isVoted" v-bind:style="{ width: percent_2 + '%' }"  type="progress-bar" id="bar-2"></div>
      <label v-bind:class="{ votedNum: voted ===  (questionID - 1) * 3 + 1  }" v-show="isVoted" id="percent-2">{{percent_2.toFixed(2) + '%'}} - {{number_2 + ' 票'}}</label>
    </section>
    
    <input type="radio" ref="radio3" id ="op3" name="Option" v-on:click="voteColumn(2)" v-bind:disabled="isVoted" v-bind:checked="isVoted && voted === (questionID - 1) * 3 + 2" v-bind:key="questionID * 3 + 2"/>
    <label class="button-3" for="op3"></label> 
    <section class="content-3">
      <label class="option-3" for="op3">{{option3}}</label>
      <div v-bind:class="{ votedBar: voted ===  (questionID - 1) * 3 + 2  }" v-show="isVoted" v-bind:style="{ width: percent_3 + '%' }"  type="progress-bar" id="bar-3"></div>
      <label v-bind:class="{ votedNum: voted ===  (questionID - 1) * 3 + 2  }" v-show="isVoted" id="percent-3">{{percent_3.toFixed(2) + '%'}} - {{number_3 + ' 票'}}</label>
    </section>
  </div>
</form>
</template>

<script>
import qs from 'querystring'
import axios from '~/plugins/axios'

export default {
  props: {
    option1: String,
    option2: String,
    option3: String,
    questionID: Number,
    type: String
  },
  data () {
    return {
      isVoted: false,
      percent_1: 0,
      percent_2: 0,
      percent_3: 0,
      number_1: 0,
      number_2: 0,
      number_3: 0,
      voted: -1,
      type: ''
    }
  },
  async mounted () {
    switch (this.questionID) {
      case 1:
        this.type = '學生'
        break
      case 2:
        this.type = '文化'
        break
      case 3:
        this.type = '環境'
        break
      case 4:
        this.type = '交通'
        break
      case 5:
        this.type = '教育'
        break
    }
    if (this.$store.getters.getAuthUser) {
      const lowerBound = (this.questionID - 1) * 3
      const upperBound = (this.questionID - 1) * 3 + 2
      const voted = this.$store.getters.getVote
      for (let iter of voted) {
        if (iter <= upperBound && iter >= lowerBound) {
          this.isVoted = true
          this.voted = iter
          break
        }
      }
      if (this.isVoted) {
        await this.showPercent()
        const self = this
        setInterval(async function () {
          console.log('fetch data')
          await self.showPercent()
        }, 300000)
      }
    } else {
      this.isVoted = false
    }
  },
  methods: {
    async showPercent () {
      try {
        console.log((this.questionID - 1) * 3 + 1)
        const voteData1 = (await axios.get(`/api/getVoteResult?id=${(this.questionID - 1) * 3}&type=${this.questionID - 1}`)).data
        const voteData2 = (await axios.get(`/api/getVoteResult?id=${(this.questionID - 1) * 3 + 1}&type=${this.questionID - 1}`)).data
        const voteData3 = (await axios.get(`/api/getVoteResult?id=${(this.questionID - 1) * 3 + 2}&type=${this.questionID - 1}`)).data
        this.percent_1 = voteData1.rate * 100
        this.percent_2 = voteData2.rate * 100
        this.percent_3 = voteData3.rate * 100
        this.number_1 = voteData1.number
        this.number_2 = voteData2.number
        this.number_3 = voteData3.number
      } catch (error) {
        console.log('get percent data failed!!')
      }
    },
    async voteColumn (index) {
      let check = confirm('確定投這票嗎？')
      if (!check) {
        this.$refs.radio1.checked = this.$refs.radio2.checked = this.$refs.radio3.checked = false
        return
      }
      if (!this.isVoted) {
        this.isVoted = true
        this.voted = (this.questionID - 1) * 3 + index
        this.$store.dispatch('addVote', this.voted)
        try {
          const params = {
            userID: this.$store.getters.getAuthUser,
            choice: JSON.stringify([(this.questionID - 1) * 3 + index])
          }
          console.log(params)
          await axios('/api/vote', {
            method: 'post',
            data: qs.stringify(params)
          })
          this.showPercent()
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style scoped>
input[type="radio"] {
  display: none;
}

input[type="radio"] + label:before {
  font-family: "FontAwesome";
  content: "\f00c";
  border: 0.27vw solid #CDCDCD;
  vertical-align: middle;
  display: inline-block;
  width: 5.33vw;
  height: 5.33vw;
  margin: 0 auto;
  font-size: 5vw;
  background-color: #f5f5f5;
  color: #f5f5f5;
  cursor: pointer;
}

input[type="radio"]:checked + label:before {
  background-color: #60c3c5;
  border-color: #60c3c5;
}

.container{
  display: grid;
  grid-template-rows: 6.4vw repeat(3, 1fr);
  grid-template-columns: 7.2vw auto;
  grid-template-areas:
    "title title"
    "btn-1 op-1"
    "btn-2 op-2"
    "btn-3 op-3";
  border: 0.27vw solid #60c3c5;
  border-radius: 4.27vw;
  background: #f5f5f5;
  padding-left: 5.07vw;
  padding-right: 3.2vw;
  padding-top: 4.27vw;
  padding-bottom: 5.33vw;
  grid-row-gap: 4.53vw;
}

.title{
  grid-area: title;
  color: #707070;
  font-size: 3.73vw;
}

.button-1{
  grid-area: btn-1;
}

.button-2{
  grid-area: btn-2;
}

.button-3{
  grid-area: btn-3;
}

.content-1 {
  grid-area: op-1;
}

.content-2 {
  grid-area: op-2;
}

.content-3 {
  grid-area: op-3;
}

.option-1, .option-2, .option-3 {
  display: block;
  line-height: 6.93vw;
}

.content-1, .content-2, .content-3 {
  display: inline-block;
  color: #707070;
  font-size: 3.73vw;
}


#bar-1, #bar-2, #bar-3 {
  float: left;
  color: #A0A0A0;
  background: currentColor;
  max-width: 100%;
  height: 2.67vw;
  margin-top: 1.5vw;
  transition: .4s ease-in-out;
}

#percent-1, #percent-2, #percent-3 {
  box-sizing: border-box;
  margin-left: 1vw;
  font-size: 2.67vw;
}

.votedBar {
  background: #60c3c5 !important;
}

.votedNum {
  color: #60c3c5;
}
</style>
