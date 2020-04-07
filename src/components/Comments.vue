<template>
<div id="comments">
  <ul class="comment-list">
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :defaultAvatar="defaultAvatar"
        v-on:add-comment="addComment"
      />
  </ul>
  <AddComment
    v-on:add-comment="addCommentHandler"
  />
</div>
</template>

<script>
import Comment from '@/components/Comment'
import AddComment from '@/components/AddComment'

export default {
  name: 'Comments',
  props: ['comments', 'defaultAvatar'],
  components: {
    Comment,
    AddComment
  },
  data() {
    return {
    }
  },
  methods: {
    addCommentHandler(newComment) {
      this.addComment(newComment)
    },
    addComment(newComment) {
      newComment.depth = 0
      this.comments.push(newComment)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
