<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button
          class="button"
          @click="show">
          Sign up
        </button>
        <router-link
          class="button"
          to="/posts/new">
          New post
        </router-link>
      </div>
    </div>
  </div>

  <teleport to="#modal">
    <sign-up />
  </teleport>
</template>
<script src="./navbar.ts" lang="ts">
import SignUp from '../SignUp/SignUp.vue';</script>
