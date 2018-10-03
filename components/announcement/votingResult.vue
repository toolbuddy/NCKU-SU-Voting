<template>
<form>
  <div class="container">
    <div class="title" v-show="!isVoted" >關於文化身為學生，我最想知道：</div>
    <div class="title" v-show="isVoted" >目前投票結果：</div>
    <input type="radio" id ="op1" name="Option"  v-on:click="showPercent"/>
    <label class="button-1" for="op1"></label>
    <section class="content-1">
      <label class="option-1" for="op1">第一個：五六七八九十一二三四五六七八九十一二三四五六七八九十。{{option1}}</label>
      <div v-bind:class="{ votedBar: isVoted }" v-bind:style="{ width: percent_1 + '%' }" v-show="isVoted" type="progress-bar" id="bar-1"></div>
      <label v-bind:class="{ votedNum: isVoted }"  v-show="isVoted" id="percent-1">{{percent_1}}</label>
    </section>
    
    <input type="radio" id ="op2" name="Option"  v-on:click="showPercent"/>
    <label class="button-2" for="op2"></label> 
    <section class="content-2">
      <label class="option-2" for="op2">第二個：五六七八九十一二三四五六七八九十一二三四五六七八九十。{{option2}}</label>
      <div v-bind:class="{ votedBar: isVoted }" v-bind:style="{ width: percent_2 + '%' }" v-show="isVoted" type="progress-bar" id="bar-2"></div>
      <label v-bind:class="{ votedNum: isVoted }" v-show="isVoted" id="percent-2">{{percent_2}}</label>
    </section>
    
    <input type="radio" id ="op3" name="Option"  v-on:click="showPercent"/>
    <label class="button-3" for="op3"></label> 
    <section class="content-3">
      <label class="option-3" for="op3">第三個：五六七八九十一二三四五六七八九十一二三四五六七八九十。{{option3}}</label>
      <div v-bind:class="{ votedBar: isVoted }" v-bind:style="{ width: percent_3 + '%' }" v-show="isVoted" type="progress-bar" id="bar-3"></div>
      <label v-bind:class="{ votedNum: isVoted }" v-show="isVoted" id="percent-3">{{percent_3}}</label>
    </section>
  </div>
</form>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  props: ['option1', 'option2', 'option3', 'questionID'],
  data () {
    return {
      isVoted: false,
      percent_1: 0,
      percent_2: 0,
      percent_3: 0
    }
  },
  methods: {
    async showPercent () {
      if (!this.isVoted) {
        this.isVoted = true
        try {
          this.percent_1 = await axios.get('/api/vote?id=' + this.questionID)
          this.percent_2 = await axios.get('/api/vote?id=' + (this.questionID + 1))
          this.percent_3 = await axios.get('/api/vote?id=' + (this.questionID + 2))
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
  display: none;
  float: left;
  background: #A0A0A0;
  max-width: 100%;
  height: 2.67vw;
}

#percent-1, #percent-2, #percent-3 {
  display: none;
  font-size: 2.67vw;
}

.votedBar {
  background: #60c3c5;
}

.votedNum {
  color: #60c3c5;
}
</style>