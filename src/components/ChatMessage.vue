<template>
  <div
      id="chat-message"
      :class="{'owner': id === message.id}"
  >
    <v-list-item class="message-content theme--dark">
      {{ message.userNickname }}: {{ message.message }}
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "ChatMessage",
  props: {
    message: Object,
    id: String,
    userNickname: String
  },
  methods: {
    consoleLog() {
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
#chat-message {
  display: flex;
}
#chat-message.owner {
  justify-content: flex-end;
}
.message-content {
  border-radius: 3px;
  padding: 6px 9px;
  font-size: 15px;
  margin-bottom: 10px;
  max-width: 40%;
  max-height: 100%;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  text-align: justify;
  background: #3f51b5;
}
</style>
