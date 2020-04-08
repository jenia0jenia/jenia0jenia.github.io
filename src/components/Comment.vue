<template>
  <li class="comment-list__item">
    <div class="comment">
      <div class="comment__body">
        <div class="comment__head">
          <a href="#" class="comment__avatar">
            <img :src="comment.avatar || defaultAvatar" alt="avatar" class="comment__avatar-img">
          </a>
          <a href="#" class="comment__username">{{ comment.username }}</a>
          <time class="comment__date-time">{{ datePassed }}</time>
          <div class="comment__rating">
            <div class="rating">
              <button v-on:click="voting"
                      v-bind:class="{ rating__action_voted: comment.voted === 1 }"
                      type="button"
                      class="rating__action rating__action_plus"
              >+</button>
              <span class="rating__action rating__action_value">
                <span v-if="comment.voteTotal > 0">+</span>
                {{ comment.voteTotal }}
              </span>
              <button v-on:click="voting"
                      :class="{ rating__action_voted: comment.voted === -1 }"
                      type="button"
                      class="rating__action rating__action_minus"
              >-</button>
            </div>
          </div>
          <button v-if="hasReplies"
                  v-on:click.prevent="threadCollapsed = !threadCollapsed"
                  class="comment__collapse-button"
          >{{ threadCollapsed ? 'Показать ветку' : 'Свернуть' }}</button>
          <a href="#" v-on:click.prevent="showReplyForm = !showReplyForm" class="comment__reply">Ответить</a>
        </div>
        <transition-group name="slide-fade" mode="out-in" tag="div">
          <div v-if="hideBadComment && badVoteTotal"
               v-on:click="hideBadComment = !hideBadComment"
               :key="1"
               class="comment__text comment__text_bad"
          >Открыть комментарий</div>
          <div v-else
               :key="2"
               v-html="markdownText"
               class="comment__text"
          ></div>
        </transition-group>
      </div>
      <transition name="fade">
        <AddComment v-if="showReplyForm"
                    @add-comment="addCommentNHide"
                    :replyToUsername="comment.username"
        />
      </transition>
    </div>

    <transition name="fade" mode="in-out">
      <div v-if="hasReplies && !threadCollapsed">
        <ul :class="{'comment-list_replies': comment.depth <= 2}"
            class="comment-list"
        >
          <Comment
            v-for="comm in comment.replies"
            :key="comm.id"
            :comment="comm"
            :defaultAvatar="defaultAvatar"
            @add-to-parent-comment="addToParentComment"
          />
        </ul>
      </div>
    </transition>
  </li>
</template>

<script>
  import { getDatePassed } from "@/js/utils"
  import { markdownProcess } from "@/js/markdown"
  import AddComment from '@/components/AddComment';

export default {
  name: 'Comment',
  components: {
    AddComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    defaultAvatar: {
      type: String
    }
  },
  data() {
    return {
      threadCollapsed: false,
      hideBadComment: true,
      showReplyForm: false,
      markdownText: markdownProcess(this.comment.text)
    }
  },
  methods: {
    voting(e) {
      if (this.comment.voted === 0) {
        let action= e.target.innerHTML

        if (action === '+') {
          this.comment.voted++
          this.comment.voteTotal++
        } else if (action === '-'){
          this.comment.voted--
          this.comment.voteTotal--
        }

      } else {
        this.comment.voteTotal -= this.comment.voted
        this.comment.voted = 0
      }
    },
    addCommentNHide(newComment) {
      this.showReplyForm = false
      this.addComment(newComment, this.comment)
    },
    addToParentComment(newComment) {
      this.comment.replies.push(newComment)
    },
    addComment(newComment) {
      if (this.comment.depth < 2) {
        newComment.depth = this.comment.depth + 1
        this.comment.replies.push(newComment)
      } else {
        newComment.depth = 2
        this.$emit('add-to-parent-comment', newComment)
      }
    }
  },
  computed: {
    datePassed() {
      return getDatePassed(this.comment.date)
    },
    badVoteTotal() {
      return this.comment.voteTotal < -9
    },
    hasReplies() {
      return this.comment.replies &&
        this.comment.replies.length
    }
  }
}
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(11.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(40px);
    opacity: 0;
  }
</style>
