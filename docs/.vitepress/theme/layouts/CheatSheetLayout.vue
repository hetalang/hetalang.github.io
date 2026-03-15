<script setup>
import { Content } from 'vitepress'
</script>

<template>
  <main class="cheatsheet-layout">
    <div class="cheatsheet-container">
      <Content class="cheatsheet-content" />
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
.cheatsheet-content :deep(> div) {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  align-items: start;
}

/* each column */
.cheatsheet-content :deep(> div > div) {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;

  border: 0 solid #222;
  border-width: 0 1px 0 1px;
  padding: 0 6px 0 6px;
  font-family: 'Manrope', system-ui, sans-serif;

}

.cheatsheet-content :deep(h1) {
  border: 0 solid red;
  border-width: 1px 0;
}

/* to prevent headers from sticking */
.cheatsheet-content :deep(> div > div > :first-child) {
  margin-top: 0;
}

/* for code blocks */
.cheatsheet-content :deep(div[class*='language-']) {
  background: #f1f3f5;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 6px;
}
.cheatsheet-content :deep(span.lang) {
  display: none;
}
.cheatsheet-content :deep(button.copy) {
  display: none;
}

.cheatsheet-content :deep(code) {
  font-family: 'JetBrains Mono', monospace;
}

/* to prevent wide tables and code blocks from breaking the column */
.cheatsheet-content :deep(pre),
.cheatsheet-content :deep(table),
.cheatsheet-content :deep(div[class*='language-']) {
  max-width: 100%;
  overflow-x: auto;
}

@media (min-width: 900px) {
  .cheatsheet-content :deep(> div) {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1400px) {
  .cheatsheet-content :deep(> div) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>