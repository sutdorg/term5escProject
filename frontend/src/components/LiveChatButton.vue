<template>
  <div class="livechatbutton">
    <button class="open_button" v-on:click="openForm()">Live Chat</button>
  </div>
</template>

<script>
export default {
  name: 'livechatbutton',
  data () {
    return {}
  },
  methods: {
    openForm () {
      this.$router.push('fillform')
    }
  }
}
</script>

<style>
  .open_button {
    width: 270px;
    height: 40px;
    border-width: 0px;
    border-radius: 3px;
    background: rgb(14, 104, 194);
    cursor: pointer;
    outline: none;
    font-family: Microsoft YaHei;
    color: white;
    font-size: 17px;
    font-weight: 600;
}
</style>
