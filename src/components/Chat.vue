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
        <div class="btn__text">
          Logout<br>
          <p class="btn__text-username mb-0">{{ userDetails.name }}</p>
        </div>
      </v-btn>
    </v-app-bar>

    <v-main>
      <show-messages></show-messages>
      <send-messages></send-messages>
    </v-main>
    <v-footer
        color="indigo"
        app
    >
      <span class="white--text">&copy; "Simplex", {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DisplayUsers from '@/components/DisplayUsers';
import ShowMessages from '@/components/showMessages';
import SendMessages from '@/components/SendMessages';

export default {
  name: "Chat",
  components: {
    DisplayUsers,
    ShowMessages,
    SendMessages
  },
  data() {
    return {
      drawer: null,
    }
  },
  computed: {
    ...mapState('storage', [
      'userDetails',
    ]),
  },
  methods: {
    ...mapActions('storage', [
      'logoutUser',
    ]),
    logout() {
      this.logoutUser();
    },
  },
}
</script>

<style scoped>

</style>
