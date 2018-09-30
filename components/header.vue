<template>
  <div class="container">
    <h3>成大學生會</h3>
    <svg width="8vw" height="8vw">
      <rect y="0" width="6.5vw" height="1.5vw" fill="#74bfc3"></rect>
      <rect y="2vw" width="6.5vw" height="1.5vw" fill="#74bfc3"></rect>
      <rect y="4vw" width="6.5vw" height="1.5vw" fill="#74bfc3"></rect>
    </svg>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

  .container
  {
    display: flex;
    align-items: center;
    position: fixed;
    height: 14vw;
    width: 100%;
    background-color:rgba(223, 223, 223, 0.151);
    padding: 1vw;
    box-sizing: border-box;
  }

  svg {
    position: fixed;
    right: 0;
    top: 0;
    margin: 4vw;
  }

  h3 {
    font-size: 4.27vw;
    margin-left: 5vw;
    color: #A2A2A2;
  }

</style>
