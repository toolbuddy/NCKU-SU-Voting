<template>
  <div class="container">
    <label>成大學生會</label>

    <svg width="6vw" height="6vw">
      <rect y="0" width="6vw" height="1vw" fill="#74bfc3"></rect>
      <rect y="2vw" width="6vw" height="1vw" fill="#74bfc3"></rect>
      <rect y="4vw" width="6vw" height="1vw" fill="#74bfc3"></rect>
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
    position: absolute;
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

  label {
    font-size: 18px;
    margin-left: 5vw;
  }
</style>
