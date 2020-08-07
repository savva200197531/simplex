<template>
  <v-app id="reg-form">
    <v-app-bar
        app
        color="indigo"
        dark
    >
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
      <v-form
          ref="form"
          v-model="valid"
          method="get"
          class="auth"
      >
        <h1 class="login-title text-lg-center">Please login</h1>
        <v-text-field
            v-model="userInfo.name"
            :counter="20"
            :rules="nameRules"
            label="Name"
            type="text"
            class="validate mt-2"
            name="name"
            required
        ></v-text-field>

        <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
        ></v-checkbox>

        <v-btn
            :disabled="!valid"
            color="success"
            class="btn mr-4"
            @click="auth"
        >
          Enter chat
        </v-btn>

        <v-btn
            color="error"
            class="btn mr-4"
            @click="reset"
        >
          Reset Form
        </v-btn>
      </v-form>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "Login",
  components: {},
  data: () => ({
    valid: true,
    userInfo: {
      name: '',
    },
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
      v => /^[a-zA-Z0-9_-]+$/.test(v) || 'Only english letters',
    ],
    checkbox: false,
  }),
  computed: {
    ...mapState('storage', [
        'userDetails',
    ])
  },
  methods: {
    ...mapActions('storage', [
        'authUser',
        'logoutUser',
    ]),
    auth() {
      this.authUser(this.userInfo);
    },
    logout() {
      this.logoutUser();
    },
    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>

<style scoped>
.auth {
  max-width: 400px;
  width: 100%;
  margin: 40px auto 0 auto;
}

.login-title {
  color: rgba(0, 0, 0, 0.6);
}
</style>
