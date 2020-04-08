<template>
  <div class="comment-form">
    <span class="comment-form__title">Добавить комментарий
      <span v-on:mouseover="showMarkdownHelp = true"
            v-on:mouseleave="showMarkdownHelp = false"
            class="comment-form__info"
      >
        ?
        <transition name="fade">
          <img height="306px" width="396px" class="comment-form__info-img" v-show="showMarkdownHelp" src="https://d33v4339jhl8k0.cloudfront.net/docs/assets/545804d8e4b09c5ca72525ce/images/5bfffa1304286304a71cca67/file-HkUrvqZYBI.png" alt="markdown help">
        </transition>
      </span>
    </span>
    <form class="comment-form__form" v-on:submit.prevent="checkForm">
      <label v-bind:class="{ error: errors.username }" class="comment-form__label" for="name">
        <span class="comment-form__label-text">Имя</span>
        <input v-model="username" class="comment-form__input" type="text" name="name" id="name">
      </label>
      <label v-bind:class="{ error: errors.email }" class="comment-form__label" for="email">
        <span class="comment-form__label-text">E-mail</span>
        <input v-model="email" class="comment-form__input" type="email" name="email" id="email">
      </label>
      <label v-bind:class="{ error: errors.text }" class="comment-form__label" for="text">
        <span class="comment-form__label-text">Текст комментария</span>
        <textarea v-model="text" class="comment-form__textarea" name="text" id="text" cols="30" rows="10"></textarea>
      </label>
      <label class="comment-form__label">
        <span class="comment-form__label-text"></span>
        <input type="submit" class="comment-form__button" value="Добавить комметарий">
      </label>
    </form>
  </div>
</template>

<script>
  import { getCommentId } from "@/js/utils"
  // import MarkdownHelp from "@/assets/i/markdownHelp.jpg"

  export default {
  props: ['replyToUsername'],
  data() {
    return {
      text: '',
      username: '',
      email: '',
      errors: {
        username: false,
        email: false,
        text: false
      },
      showMarkdownHelp: false
    }
  },
  methods: {
    checkForm() {
      for (let e in this.errors){
        this.errors[e] = false
      }
      if (this.username.trim() && this.text.trim() && this.email.trim()) {
        const newComment = {
          id: getCommentId(),
          username: this.username,
          voted: false,
          voteTotal: 0,
          email: this.email,
          date: new Date(),
          text: this.text,
          avatar: '',
          replies: []
        }
        this.$emit(
          'add-comment', newComment
        )
        this.username = ''
        this.email = ''
        this.text = ''
      } else {
        if (this.username.trim() === '') {
          this.errors.username = true
        }
        if (this.email.trim() === '') {
          this.errors.email = true
        }
        if (this.text.trim() === '') {
          this.errors.text = true
        }
      }
    }
  },
  computed: {
  },
  created() {
    if (this.replyToUsername !== undefined)
      this.text = this.replyToUsername + ', '
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
</style>
