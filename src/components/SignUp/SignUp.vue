<template>
  <form @submit.prevent="submit">
    <form-input
      :error="usernameStatus.message"
      name="Username"
      type="text"
      v-model="username"  />

    <form-input
      :error="passwordStatus.message"
      name="Password"
      type="password"
      v-model="password"  />

    <button
      class="button is-primary"
      :disabled="!usernameStatus.valid || !passwordStatus.valid">
      Save
    </button>
  </form>
</template>

<script lang="ts" src="./signUp.ts"></script>

<style scoped>
  form {
    background-color: #fff;
    padding: 16px;
  }
</style>
