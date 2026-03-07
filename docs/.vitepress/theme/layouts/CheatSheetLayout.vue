<script setup>
import { Content } from 'vitepress'
</script>

<template>
  <main class="cheatsheet-layout">
    <div class="cheatsheet-container">
      <Content class="vp-doc cheatsheet-content" />
    </div>
  </main>
</template>

<style scoped>
.cheatsheet-layout {
  min-height: 100vh;
  padding: 20px;
}

.cheatsheet-container {
  margin: 0 auto;
  width: 100%;
  max-width: 1800px;
}

.cheatsheet-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  font-size: 0.92rem;
  line-height: 1.4;
}

/* container from markdown */
.cheatsheet-content :deep(.cheatsheet) {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  align-items: start;
}

/* each column */
.cheatsheet-content :deep(.cheatsheet > div) {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* to prevent headers from sticking */
.cheatsheet-content :deep(.cheatsheet > div > :first-child) {
  margin-top: 0;
}

/* to prevent wide tables and code blocks from breaking the column */
.cheatsheet-content :deep(pre),
.cheatsheet-content :deep(table),
.cheatsheet-content :deep(div[class*='language-']) {
  max-width: 100%;
  overflow-x: auto;
}

@media (min-width: 900px) {
  .cheatsheet-content :deep(.cheatsheet) {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1400px) {
  .cheatsheet-content :deep(.cheatsheet) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>