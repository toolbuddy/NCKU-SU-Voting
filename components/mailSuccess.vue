<template>
    <div class="container">
        <label class="btn-close"></label>
        <img class="mailSucPhoto" src="~/assets/img/mailSuc.png"/>
        <label class="tick"><i class="fas fa-check"></i></label>
        <label class="msg">信件已成功寄出！</label>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>

.container {
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-rows: 30% 12.5% 3.6% 3.6% auto;
  grid-template-areas:
    "x"
    "msg"
    "tick"
    "text"
    ".";
}

.mailSucPhoto {
  grid-area: msg;
  width: 22.13vw;
  height: 22.13vw;
  margin: 0px auto;
  margin-bottom: 2.93vw;
}

label {
  margin: 0px auto;
  color: #60c3c5;
}

.tick {
  grid-area: tick;
  font-family: 'FontAwesome';
  content: "\f00c";
  width: 6.42vw;
  height: 5.08vw;
}

.msg {
  grid-area: text;
  font-size: 4.8vw;
  margin-top: 6.13vw;
}
</style>
