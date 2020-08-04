<template>
  <v-app id="chat">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <display-users></display-users>
    </v-navigation-drawer>
    <v-app-bar
        app
        color="indigo"
        dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Simplex Chat</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          color="indigo"
          class="btn mr-4 white--text v-btn--outlined"
          @click="logout"
          v-if="userDetails.userId"
      >
        <h4 class="btn__text">
          Logout<br>
          <p class="btn__text-username mb-0">{{ userDetails.name }}</p>
        </h4>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div class="chat">
        <v-list
            v-for="mes in messages"
            :key="mes.text"
            class="chat__list"
            :class="{'owner': mes.id === userDetails.userId}"
        >
          <v-list-item class="chat__item theme--dark">
            {{ mes.from }}: {{ mes.message }}
          </v-list-item>
        </v-list>
      </div>
      <div class="actions">
        <v-textarea
            v-model.trim="message.newMessage"
            @keydown.enter="sendMessage"
            placeholder="Type your message..."
            autofocus
            autocomplete="false"
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
    </v-main>
    <v-footer
        color="indigo"
        app
    >
      <span class="white--text">&copy; Кашин С. И., "Simplex", {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import DisplayUsers from '@/components/DisplayUsers';

export default {
  name: "Chat",
  components: {
    DisplayUsers
  },
  data() {
    return {
      drawer: null,
      message: {
        newMessage: '',
        createdAt: new Date()
      },
    }
  },
  computed: {
    ...mapState('storage', [
      'userDetails',
      'messages'
    ]),
    ...mapGetters('storage', [
      'users'
    ]),
  },
  methods: {
    ...mapActions('storage', [
      'logoutUser',
      'firebaseSendMessage',
      'firebaseGetMessages'
    ]),
    logout() {
      this.logoutUser();
    },
    sendMessage() {
      if (this.message.newMessage.length !== 0) {
        this.firebaseSendMessage(this.message)
        this.firebaseGetMessages()
        this.message.newMessage = '';
      }
    },
  },
  mounted() {
    this.firebaseGetMessages()
  }
}
</script>

<style scoped>
.actions {
  border-top: 1px solid #272727;
  height: calc(30vh - 31px);
  padding: 20px;
}

.chat {
  height: calc(70vh - 64px);
  width: 100%;
  overflow-y: auto;
}

.chat__list {
  display: flex;
}

.chat__list.owner {
  justify-content: flex-end;
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
}
</style>
