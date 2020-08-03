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
        <v-list class="chat-messages">

        </v-list>
      </div>
      <div class="actions">
        <v-textarea
            v-model="newMessage"
            placeholder="Type your message..."
            autofocus
            autocomplete="false"
        >
        </v-textarea>

        <v-btn
            class="btn mr-4"
            color="success"
            @click="send"
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
      newMessage: '',
      messages: [

      ]
    }
  },
  computed: {
    ...mapState('storage', [
      'userDetails',
    ]),
    ...mapGetters('storage', [
      'users'
    ])
  },
  methods: {
    ...mapActions('storage', [
      'logoutUser',
      'saveMessage'
    ]),
    logout() {
      this.logoutUser();
    },
    send() {
      this.messages.push({
        text: this.newMessage,
        from: 'me',
        createdAt: new Date(),
      })
    },
  },
}
</script>

<style scoped>
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
