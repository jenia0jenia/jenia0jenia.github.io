<template>
    <Comments
      :comments="comments"
      :defaultAvatar="defaultAvatar"
    />
</template>

<script>
  import Comments from "@/components/Comments"
  import Avatar from "@/assets/i/avatar.jpg"
  import CommentsJson from "@/comments-list.json"

  export default {
    name: 'App',
    data() {
      return {
        defaultAvatar: Avatar,
        comments: CommentsJson,
      }
    },
    components: {
      Comments
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
