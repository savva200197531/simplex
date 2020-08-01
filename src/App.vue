<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('storage', ['handleAuthStateChanged'])
  },
  mounted() {
    this.handleAuthStateChanged()
  }
};
</script>
