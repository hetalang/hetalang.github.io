<script setup>
import { Content } from 'vitepress'
</script>

<template>
  <main class="cheat-sheet-layout">
    <div class="cheat-sheet-layout__container">
      <Content class="vp-doc cheat-sheet-layout__content" />
    </div>
  </main>
</template>

<style scoped>
.cheat-sheet-layout {
  min-height: 100vh;
  padding: 24px;
}

.cheat-sheet-layout__container {
  margin: 0 auto;
  width: 100%;
  max-width: 980px;
}

.cheat-sheet-layout__content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
}

@media (min-width: 768px) {
  .cheat-sheet-layout {
    padding: 32px;
  }

  .cheat-sheet-layout__content {
    padding: 36px;
  }
}
</style>
