<template>
    <a
      :key="post.id"
      class="panel-block">
      <div class="is-flex is-flex-direction-column is-align-items-flex-start">
        <a>{{ post.title }}</a>
        <div>{{ post.created.format('Do MMM') }}</div>
      </div>
    </a>
</template>

<script lang="ts" src="./timelinePost.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
