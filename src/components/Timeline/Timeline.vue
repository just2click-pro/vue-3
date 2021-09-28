<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a v-for="period in periods"
        :key="period"
        :class="{ 'is-active': period === currentPeriod }"
        :data-test="period"
        @click="setPeriod(period)"
      >{{ period }}</a>
    </span>

    <timeline-post v-for="post in posts"
      :post="post"
      :key="post.id"
      class="panel-block" />
  </nav>
</template>

<script lang="ts" src="./timeline.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
