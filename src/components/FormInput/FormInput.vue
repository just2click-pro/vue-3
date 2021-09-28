<template>
  <div class="field">
    <label
      for="name"
      class="label"
      :name="name">
      {{ name }}
    </label>
    <div class="control">
      <input
        :id="name"
        class="input"
        @input="handleInput"
        :type="type"
        :value="modelValue" />
    </div>
    <p class="is-danger help">{{ error }}</p>
  </div>
</template>

<script lang="ts" src="./formInput.ts"></script>
