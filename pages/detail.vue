<template>
  <div class="area">
    <div class="center">
      <img src="~/assets/img/logo.png"/>
    </div>
    <h1>WHY 辯論會</h1>
    <h2>一些副標文字，說明這則新聞的內容。</h2>
    <section>
      <p>此處放置新聞的文字內容</p>
      <p>
        <label> 發布時間 | </label> <label> {{time}} </label>  <br>
        <label> 發布者 | {{author}} </label> 
      </p>
      <p>進入相關文章，票選市長辯論問題：</p>
      <ul>
        <li v-for="(title, index) in topics" v-bind:key="index" v-text="title"></li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topics: ['台南市長辯論-文化提問', '台南市長辯論-教育提問', '台南市長辯論-教育提問',
      '台南市長辯論-教育提問', '台南市長辯論-教育提問', '台南市長辯論-教育提問'],
      time: '2018.10.10',
      author: '陳估熊'
    }
  }
}
</script>

<style scoped>


img {
  width: 63.74%;
  height: 63.74%;
}

h1 {
  color: #707070;
  font-size: 26px;
}

h2 {
  color: #707070;
  font-size: 20px;
}

p {
  color: #707070;
  font-size: 14px;
}

label {
  color: #b8b8b8;
  font-size: 12px;
}

label > time {
  color: #b8b8b8;
  font-size: 12px;
}

ul {
  color: #707070;
  font-size: 14px;
}



.center {
  display: flex;
  justify-content: center;
}

.area {
  box-sizing: border-box;
  padding: 9.5%;
}
</style>
