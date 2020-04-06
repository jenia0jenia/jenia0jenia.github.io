<template>
  <li class="comment-list__item" :id="commentId">
    <div class="comment">
      <div class="comment__body">
        <div class="comment__head">
          <a href="#" class="comment__avatar">
            <img v-if="comment.avatar" :src="avatar" alt="avatar" class="comment__avatar-img">
            <img v-else :src="avatar" alt="avatar" class="comment__avatar-img">
          </a>
          <a href="#" class="comment__username">{{ comment.username }}</a>
          <time class="comment__date-time">{{ datePassed }}</time>
          <div class="comment__rating">
            <div class="rating">
              <button v-on:click="voting"
                      v-bind:class="{ voted: comment.voted === 1 }"
                      type="button"
                      class="rating__action rating__action_plus"
              >+</button>
              <span class="rating__action rating__action_value">
                <span v-if="comment.vote_total > 0">+</span>
                {{ comment.vote_total }}
              </span>
              <button v-on:click="voting"
                      :class="{ voted: comment.voted === -1 }"
                      type="button"
                      class="rating__action rating__action_minus"
              >-</button>
            </div>
          </div>
          <button v-if="canHide"
                  v-on:click.prevent="threadCollapsed = !threadCollapsed"
                  class="comment__collapse-button"
          >{{ threadCollapsed ? 'Показать ветку' : 'Свернуть' }}</button>
          <a href="#" class="comment__reply">Ответить</a>
        </div>
        <div v-if="hideBadComment"
           v-on:click="hideBadComment = !hideBadComment"
           class="comment__text comment__show-bad"
        >Показать комментарий</div>
        <div v-else
             v-bind:class="{comment_bad: hideBadComment}"
             v-html="comment.text"
             class="comment__text"
        ></div>
      </div>
    </div>

    <transition name="fade" mode="in-out">
      <div v-if="!threadCollapsed">
        <ul v-if="level < 2" class="comment-list comment-list_replies">
          <Comment
            v-for="(c, id) in thisLevelComments"
            :key="id"
            :commentId="id"
            :comment="c"
            :comments="comments"
            :level="level + 1"
            :avatar="avatar"
          />
        </ul>
        <Comment
          v-else
          v-for="(c, id) in thisLevelComments"
          :key="id"
          :commentId="id"
          :comment="c"
          :comments="comments"
          :level="level + 1"
          :avatar="avatar"
        />
      </div>
    </transition>
<!--    <transition name="fade">-->
<!--      <div v-if="threadCollapsed"-->
<!--           v-on:click.prevent="threadCollapsed = !threadCollapsed"-->
<!--           class="comment__tread-collapse">-->
<!--        <span class="comment__collapse-button">Показать ветку</span>-->
<!--      </div>-->
<!--    </transition>-->
  </li>
</template>

<script>
import { getDatePassed } from "@/js/utils"

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    },
    comments: {
      type: Object,
      required: true
    },
    commentId: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    avatar: {
      type: File
    }
  },
  data() {
    return {
      hideBadComment: false,
      thisLevelComments: {},
      threadCollapsed: false
    }
  },
  methods: {
    voting(e) {
      console.log('voting')
      if (this.comment.voted === 0) {
        let action= e.target.innerHTML

        if (action === '+') {
          this.comment.voted++
          this.comment.vote_total++
        } else if (action === '-'){
          this.comment.voted--
          this.comment.vote_total--
        }
      } else {
        this.comment.vote_total -= this.comment.voted
        this.comment.voted = 0
      }
    }
  },
  watch: {
  },
  computed: {
    datePassed() {
      return getDatePassed(this.comment.date)
    },
    canHide() {
      return this.level < 2 &&
        Object.keys(this.thisLevelComments).length
    }
  },
  created() {
    this.thisLevelComments = Object.filter(
      this.comments,
      ([commId, comm]) => this.commentId === comm.reply
    )
  }
}
</script>

<style scoped lang="scss">
  @import "../scss/vars.scss";
  .voted {
    &.rating__action_plus {
      background-color: $green-light;
    }

    &.rating__action_minus {
      background-color: $red-light;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
