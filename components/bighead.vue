<template>
    <div>
        <img v-show="isLogin" :src="bighead" />
        <a v-html="word"></a>
    </div>
</template>

<script>
    export default {
      props: ['isLogin', 'profile'],
      name: 'bighead',
      computed: {
        word () {
          if (this.isLogin) {
            return `HI ${this.profile.name}`
          } else {
            return `Login Facebook`
          }
        },
        bighead () {
          if (this.isLogin) {
            return `https://graph.facebook.com/${this.profile.id}/picture?type=square`
          }
        }
      }
    }
</script>