<template>
  <div id="display-users">
    <v-list
        v-for="(user, key) in users"
        :key="key"
        class="users-list pb-0"
        dense
    >
      <v-list-item class="users-list__item">
        <span class="users-list__avatar">{{ user.name.charAt(0) }}</span>
        {{ user.name }}
        <v-icon class="users-list__you mr-1" v-if="userDetails.email === user.email">mdi-account-circle</v-icon>
        <span
            class="users-list__text text"
            :class="user.online ? 'online' : 'offline'"
        >
          {{ user.online ? 'Online' : 'Offline' }}
        </span>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: "DisplayUsers",
  computed: {
    ...mapState('storage', [
      'userDetails',
    ]),
    ...mapGetters('storage', [
      'users'
    ])
  },
}
</script>

<style scoped>
.online {
  border: 1px;
  border-radius: 6px;
  background: #4caf50;
  color: #fff;
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

.users-list__item {
  display: flex;
  flex-wrap: wrap
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

.users-list__you {
  margin-left: auto;
}
</style>
