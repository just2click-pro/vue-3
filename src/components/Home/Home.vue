<template>
  <suspense>
    <template #default>
      <timeline />
    </template>

    <template #fallback>
      <spinner />
    </template>
  </suspense>
</template>

<script src="./home.ts" lang="ts"></script>
