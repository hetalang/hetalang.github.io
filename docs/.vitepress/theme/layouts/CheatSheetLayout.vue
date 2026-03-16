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
  padding: 0px;
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

  border: 0 solid #ea580c;
  border-width: 0 2px 0 2px;
  padding: 0;
  font-family: 'Manrope', system-ui, sans-serif;
}

/* for headers */
.cheatsheet-content :deep(h1) {
  color: white;
  background-color: #ea580c;
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 22px;
  font-weight: 600;
}
.cheatsheet-content :deep(h2) {
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 18px;
  font-weight: 600;
}

/* for all elements inside the column */
.cheatsheet-content :deep(p),
.cheatsheet-content :deep(h1),
.cheatsheet-content :deep(h2),
.cheatsheet-content :deep(ol),
.cheatsheet-content :deep(ul)  {
  margin: 0px;
  padding: 12px;
}

/* for lists */
.cheatsheet-content :deep(ul) {
  padding-left: 2em;
  list-style: square;
}
.cheatsheet-content :deep(ol) {
  padding-left: 2em;
}
.cheatsheet-content :deep(ul li::marker) {
  color: #ea580c;
}

/* for code blocks */
.cheatsheet-content :deep(div[class*='language-']) {
  background: #f1f3f5;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 12px;
  margin: 0px;
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

.cheatsheet-content :deep(table),
.cheatsheet-content :deep(div[class*='language-']) {
  max-width: 100%;
  overflow-x: none;
  margin: 12px;
}

/* tables */
.cheatsheet-content :deep(tr:nth-child(odd)) {
  background-color: #ffedd5;
}
.cheatsheet-content :deep(tr:nth-child(even)) {
  background-color: #ffffff;
}

.cheatsheet-content :deep(td) {
  padding: 2px 8px;
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

/* for printing */
@page {
  margin: 0cm;
  size: 45 landscape;
}
@media print {
  .cheatsheet-content :deep(> div) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>