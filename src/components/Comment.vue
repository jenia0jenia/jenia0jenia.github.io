<template>
  <li class="comment-list__item" :id="commentId" :key="commentId">
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
          <button v-if="canHide"
                  v-on:click.prevent="threadCollapsed = !threadCollapsed"
                  class="comment__collapse-button"
          >{{ threadCollapsed ? 'Показать ветку' : 'Свернуть' }}</button>
          <a href="#" class="comment__reply">Ответить</a>
        </div>
        <transition-group name="slide-fade" mode="out-in">
          <div v-if="hideBadComment && badVoteTotal"
               v-on:click="hideBadComment = !hideBadComment"
               :key="1"
               class="comment__text comment__show-bad"
          >Показать комментарий</div>
          <div v-else
               :key="2"
               v-html="comment.text"
               class="comment__text"
          ></div>
        </transition-group>
      </div>
    </div>

    <transition name="fade" mode="in-out">
      <div v-if="!threadCollapsed">
        <ul v-if="level < 2" class="comment-list comment-list_replies">
          <Comment
            v-for="(comm, id) in thisLevelComments"
            :key="id"
            :commentId="id"
            :comment="comm"
            :comments="comments"
            :level="level + 1"
            :defaultAvatar="defaultAvatar"
          />
        </ul>
        <Comment
          v-else
          v-for="(comm, id) in thisLevelComments"
          :key="id"
          :commentId="id"
          :comment="comm"
          :comments="comments"
          :level="level + 1"
          :defaultAvatar="defaultAvatar"
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
    defaultAvatar: {
      type: String
    }
  },
  data() {
    return {
      thisLevelComments: {},
      threadCollapsed: false,
      hideBadComment: true
    }
  },
  watch: {
  },
  methods: {
    voting(e) {
      console.log('voting')
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
      console.log(this.hideBadComment)
    }
  },
  computed: {
    datePassed() {
      return getDatePassed(this.comment.date)
    },
    canHide() {
      return this.level < 2 &&
        Object.keys(this.thisLevelComments).length
    },
    badVoteTotal() {
      // this.hideBadComment = true
      return this.comment.voteTotal < -9
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
  .rating__action_voted {
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
