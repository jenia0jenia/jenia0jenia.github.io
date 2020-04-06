<template>
    <Comments
      :key="componentKey"
      :comments="comments"
      :avatar="avatar"
      v-on:force-render="forceRerender"
    />
</template>

<script>
  import Comments from "@/components/Comments"
  import Avatar from "../src/assets/i/avatar.jpg"

  export default {
    name: 'App',
    data() {
      return {
        componentKey: 1,
        avatar: Avatar,
        comments: {
          '1': {
            username: 'Alex',
            voted: 0,
            date: new Date(+new Date() - 1000 * 60 * 60 * 24 * 12), // 1 hour ago
            vote_total: -9,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, fugit.',
            avatar: this.defaultAvatar,
          },
          '4': {
            username: 'Boris',
            voted: 0,
            date: new Date(+new Date() - 1000 * 60 * 60 * 2),
            vote_total: 0,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque nam optio perspiciatis tenetur. Aliquam esse fuga id ipsum tempore.',
            avatar: '',
            reply: '1'
          },
          '2': {
            username: 'John',
            voted: 0,
            date: new Date(+new Date() - 1000 * 60 * 10), // 10 min ago
            vote_total: 3,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque nam optio perspiciatis tenetur. Aliquam esse fuga id ipsum tempore.',
            avatar: '',
          },
          '11': {
            username: 'Boris',
            voted: 0,
            date: new Date(+new Date() - 1000 * 60 * 60 * 2),
            vote_total: 0,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque nam optio perspiciatis tenetur. Aliquam esse fuga id ipsum tempore.',
            avatar: '',
            reply: '4'
          },
          '12': {
            username: 'Alex',
            voted: 0,
            date: new Date(+new Date() - 1000 * 60 * 60 * 2),
            vote_total: 0,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque nam optio perspiciatis tenetur. Aliquam esse fuga id ipsum tempore.',
            avatar: '',
            reply: '11'
          },
          '3': {
            username: 'Albert',
            voted: 0,
            date: new Date(+new Date() - 1000 * 60 * 20), // 20 min ago
            vote_total: 4,
            text: 'text 3',
            avatar: '',
            reply: '2'
          }
        },
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
