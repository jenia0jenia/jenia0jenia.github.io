<template>
    <Comments
      :key="componentKey"
      :comments="comments"
      :defaultAvatar="defaultAvatar"
      v-on:force-render="forceRerender"
    />
</template>

<script>
  import Comments from "@/components/Comments"
  import Avatar from "@/assets/i/avatar.jpg"
  import CommentsJson from "@/comments.json"

  export default {
    name: 'App',
    data() {
      return {
        componentKey: 1,
        defaultAvatar: Avatar,
        comments: CommentsJson,
      }
    },
    components: {
      Comments
    },
    methods: {
      forceRerender() {
        this.componentKey += 1;
      }
    },
    watch: {
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 400px;
    margin: 0 auto;
  }
</style>
