<template>
  <div
      class="actions"
      id="send-messages"
  >
    <v-textarea
        v-model.trim="message.newMessage"
        @keydown.enter="sendMessage"
        placeholder="Type your message..."
        ref="textField"
        autofocus
        autocomplete="false"
        no-resize
    >
    </v-textarea>

    <v-btn
        class="btn mr-4"
        color="success"
        @click="sendMessage"
        :disabled="message.newMessage.length === 0"
    >
      <span class="btn-span">Send</span>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "SendMessages",
  data() {
    return {
      message: {
        newMessage: '',
        createdAt: new Date()
      },
    }
  },
  methods: {
    ...mapActions('storage', [
      'firebaseSendMessage',
      'firebaseGetMessages'
    ]),
    sendMessage() {
      if (this.message.newMessage.length !== 0) {
        this.firebaseSendMessage(this.message)
        this.firebaseGetMessages()
        this.clearMessage();
      }
    },
    clearMessage() {
      this.message.newMessage = ''
      this.$refs.textField.focus()
    },
  },
  mounted() {
    this.firebaseGetMessages()
  }
}
</script>

<style scoped>
.actions {
  border-top: 2px solid #3f51b5;
}
</style>
