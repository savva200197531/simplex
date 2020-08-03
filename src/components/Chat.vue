<template>
  <v-app id="chat">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-list
          v-for="(user, key) in users"
          :key="key"
          class="users-list"
          dense
      >
        <v-list-item>
          <span class="users-list__avatar">{{ user.name.charAt(0) }}</span>
          {{ user.name }}
          <span class="users-list__text text" :class="user.online ? 'online' : 'offline'">{{ user.online ? 'Online' : 'Offline' }}</span>
        </v-list-item>
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
            type=""
            placeholder="Type your message..."
            autofocus
            autocomplete="false"
        >
        </v-textarea>

        <v-btn
            class="btn mr-4"
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
// import firebase from 'firebase'
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: "Chat",
  components: {},
  data() {
    return {
      drawer: null,
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
      'logoutUser'
    ]),
    logout() {
      this.logoutUser();
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
.users-list__text {

}
.online {
  border: 1px;
  border-radius: 6px;
  background: #4caf50;
  color: #fff;
  margin-left: auto;
  padding: 2px;
}
.offline {
  border: 1px;
  border-radius: 6px;
  background: #4caf50;
  color: #fff;
  margin-left: auto;
  padding: 2px;
  opacity: 0.5;
}
.users-list__avatar {
  background: #3f51b5;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  color: #fff;
  text-align: center;
  line-height: 35px;
  margin-right: 3px;
}
</style>
