<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">New Post</div>
          <input
            v-model="title"
            type="text"
            class="input"
            data-test="title" />
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div
          contenteditable
          ref="contentEditable"
          @input="handleInput"
          data-test="content">
        </div>
      </div>
      <div class="column">
        <div v-html="html"></div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <button
          @click="save"
          class="button is-primary is-pulled-right"
          data-test="submit">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>


<script src="./postWriter.ts" lang="ts"></script>

<style>

  .column {
    overflow-y: scroll;
  }

</style>
