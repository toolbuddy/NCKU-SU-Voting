<template>
  <div>
    <section class="container">
      <h3>成大學生會</h3>
      <svg v-show="!display" width="6.5vw" height="5.5vw" v-on:click="handleClickTouch" v-on:touchstart="handleClickTouch">
        <rect y="0" width="6.5vw" height="1.5vw" fill="#74bfc3"></rect>
        <rect y="2vw" width="6.5vw" height="1.5vw" fill="#74bfc3"></rect>
        <rect y="4vw" width="6.5vw" height="1.5vw" fill="#74bfc3"></rect>
      </svg>
      <label v-show="display" style="margin-left: auto;"> Home icon here</label>
    </section>
    <section class="select-column" v-bind:class="{show: display}">
      <router-link to="#" tag="button"> 文章總覽 </router-link>
      <router-link to="#" tag="button"> 公共參與平台 </router-link>
      <router-link to="#" tag="button"> 關於學生會 </router-link>
      <router-link to="#" tag="button"> 聯絡我們 </router-link>
      <router-link to="#" tag="button"> 使用 facebook 登入 </router-link>
    </section>
  </div>

</template>

<script>
export default {
  data () {
    return {
      buttonElement: null,
      display: false,
      lastScrollY: 0
    }
  },
  mounted () {
    // add scroll up display header, scroll down hide the header
    const handleScroll = function (event) {
      event.preventDefault()
      this.display = false
      const target = this.$el.querySelector('.container')
      if (window.scrollY < this.lastScrollY) {
        target.classList.remove('hide')
      } else {
        target.classList.add('hide')
      }
      this.lastScrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll.bind(this), false)
    // add click/touch event to open the select column
    this.buttonElement = this.$el.querySelector('.container').childNodes[1]
    this.buttonElement.addEventListener('click', this.handleClickTouch.bind(this))
    this.buttonElement.addEventListener('touchstart', this.handleClickTouch.bind(this))
  },
  methods: {
    handleClickTouch: function (event) {
      event.stopPropagation()
      event.preventDefault()
      if (!this.display) {
        this.display = true
      }
      this.buttonElement.removeEventListener('click', this.handleClickTouch)
      this.buttonElement.removeEventListener('touchstart', this.handleClickTouch)
      window.addEventListener('click', this.handleHide.bind(this), false)
    },
    handleHide: function (event) {
      event.stopPropagation()
      event.preventDefault()
      if (event.target.nodeName !== '<button>' && this.display) {
        this.display = false
      }
      this.buttonElement.addEventListener('click', this.handleClickTouch.bind(this))
      this.buttonElement.addEventListener('touchstart', this.handleClickTouch)
      window.removeEventListener('click', this.handleHide.bind(this))
    }
  }
}
</script>

<style scoped>
  div {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 997;
  }

  .container
  {
    display: flex;
    align-items: center;
    position: relative;
    top: 0;
    height: 14vw;
    width: 100%;
    background-color:#f6f6f6;
    padding: 1vw;
    box-sizing: border-box;
    transition: top .4s ease-in-out;
    z-index: 999;
  }

  svg {
    margin-left: auto;
    margin-right: 6vw;
    cursor: pointer;
  }

  h3 {
    font-size: 4.27vw;
    margin-left: 5vw;
    color: #A2A2A2;
  }


  .hide {
    top: -14vw;
  } 

  .active {
    background-color: rgba(0, 0, 0, 0.33);
  }

  .select-column {
    transform-origin: top;
    transform: translateY(-120vw);
    transition: .4s ease-in-out;
    z-index: 998;
  }

  .select-column button {
    width: 100vw;
    height: 19.2vw;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.9);
    color: #74bfc3;
    font-size: 5.34vw;
    text-align: left;
    border: none;
    padding: 6.4vw;
  }

  .show {
    transform: translateY(0);
  }
</style>
