<template>
<div id="comments">
  <ul class="comment-list">
      <Comment
        v-for="(comment, id) in thisLevelComments"
        :key="id"
        :commentId="id"
        :comment="comment"
        :comments="comments"
        :level="level"
        :defaultAvatar="defaultAvatar"
      />
  </ul>
  <AddComment
    v-on:add-comment="addComment"
  />
</div>
</template>

<script>
import Vue from 'vue'
import Comment from '@/components/Comment'
import AddComment from '@/components/AddComment'
import { getCommentId } from "@/js/utils"

export default {
  name: 'Comments',
  props: ['comments', 'defaultAvatar'],
  components: {
    Comment,
    AddComment
  },
  data() {
    return {
      thisLevelComments: {},
      level: 0
    }
  },
  watch: {
  },
  methods: {
    addComment(comment) {
      Vue.set(this.comments, getCommentId(), comment)
      this.$emit('force-render')
    }
  },
  computed: {
  },
  created() {
    this.thisLevelComments = Object.filter(
      this.comments,
      ([commId, comm]) => !comm.hasOwnProperty( 'reply' )
    )
  }
}

Object.filter = (obj, predicate) =>
  Object.fromEntries(Object.entries(obj).filter(predicate));

</script>

<style scoped lang="scss">
</style>
