<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>
<script>
import { mapActions } from 'vuex'
import firebase from 'firebase'

export default {
  methods: {
    ...mapActions('storage', ['handleAuthStateChanged'])
  },
  mounted() {
    this.handleAuthStateChanged();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.replace('/').catch(() => {})
      } else {
        this.$router.replace('/auth').catch(() => {})
      }
    })
  }
};
</script>

<style>
.btn__text-username {
  text-transform: lowercase;
}
.btn__text-username:first-letter {
  text-transform: uppercase;
}
</style>
