<template>
  <v-app id="chat">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-list class="users-list" dense>

      </v-list>
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
          @click="logout"
          color="indigo"
          class="btn mr-4 white--text v-btn--outlined"
      >
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <div class="chat">
        <v-list class="chat-messages">

        </v-list>
      </div>
      <div class="actions">
        <v-textarea
            type=""
            placeholder="Type your message..."
            v-model.trim="message"
            autofocus
            autocomplete="false"
            @keydown.enter="saveMessage"
        >
        </v-textarea>

        <v-btn
            class="btn mr-4"
            @click="saveMessage"
            color="success"
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
import firebase from 'firebase'
export default {
  name: "Chat",
  components: {

  },
  data() {
    return {
      // vuetify
      drawer: null,
      // login
      message: null,
      messages: [],
      authUser: {},
      author: '',
      userNickname: '',
      // user info
      allUsers: [],
      userId: '',
    }
  },
  methods: {
    saveMessage() {

    },
    fetchMessages() {

    },
    saveNicknamesId() {

    },
    viewNicknames() {

    },
    logout() {
      firebase.auth().signOut();
      this.$router.push('/auth').catch(() => {
      })
    },
    scrollToBottom() {

    },
  },
  created() {

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next();
        } else {
          vm.$router.push('/auth').catch(() => {
          })
        }
      })
    })
  }
}
</script>

<style scoped>
.active {
}
.your-message {
}
.chat {
  display: flex;
  height: calc(70vh - 64px);
  width: 100%;
}
.actions {
  border-top: 1px solid #272727;
  height: calc(30vh - 31px);
  padding: 20px;
}
.chat-messages {
  width: 100%;
  overflow-y: auto;
}
</style>
