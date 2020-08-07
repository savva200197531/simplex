<template>
  <div
      id="show-messages"
      class="chat"
      ref="chat">
    <v-list
        v-for="(mes, idx) in messages"
        :key="idx"
        class="chat__list"
        :class="{'owner': mes.id === userDetails.userId}"
    >
      <v-list-item
          class="chat__item theme--dark"
          :class="{'hidden': !showMessages}"
          @click="showTime"
      >
        <span
            class="chat__time"
            :class="{'your-time': mes.id === userDetails.userId}"
        >
          {{ mes.createdAt }}
        </span>
        <span class="chat__nickname font-weight-bold">{{ mes.from }}</span>: {{ mes.message }}
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "ShowMessages",
  data() {
    return {
      showMessages: false,

    }
  },
  computed: {
    ...mapState('storage', [
      'userDetails',
      'messages'
    ]),
  },
  methods: {
    scrollToBottom() {
      let chat = this.$refs.chat
      setTimeout(() => {
        chat.scrollTo(0, chat.scrollHeight)
      }, 20)
      setTimeout(() => {
        this.showMessages = true
      }, 1000)
    },
    showTime() {

    }
  },
  watch: {
    messages: function (val) {
      if (Object.keys(val).length) {
        this.scrollToBottom()
      }
    }
  },
  mounted() {
    this.scrollToBottom()
  }
}
</script>

<style scoped>
.chat {
  height: calc(70vh - 64px);
  width: 100%;
  overflow-y: auto;
  padding: 0 10px;
}

.chat__list {
  display: flex;
  position: relative;
}

.chat__list.owner {
  justify-content: flex-end;
}

.chat__time {
  position: absolute;
  right: -50px;
  color: black;
  display: inline-block;
}

.your-time {
  left: -50px;
  right: 0;
}

.chat__item {
  border-radius: 3px;
  font-size: 15px;
  max-width: 40%;
  max-height: 100%;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  text-align: justify;
  background: #3f51b5;
  position: relative;
}

.hidden {
  opacity: 0;
}
</style>
