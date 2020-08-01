<template>
  <div id="display-users">
    <v-list-item
        class="users-list__item"
        :class="{'active': user.userId === userId}"
    >
      {{ user.nickname }}
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "DisplayUsers",
  props: {
    userId: String,
    user: Object
  }
}
</script>

<style scoped>
</style>
