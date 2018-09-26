<template>
    <div>
        <button type="button" v-on:click="sendVoting">send</button>
    </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'Voting',
  data () {
    return {}
  },
  methods: {
    sendVoting () {
      axios.post('/api/Voting'
      ).then((val) => {
        console.log('open file')
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>