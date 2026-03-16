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
  padding: 0;
}

.cheatsheet-container {
  width: 297mm;
  min-height: 210mm;
  margin: 0 auto;
}

.cheatsheet-content {
  background: #ffffff;
  border: 1pt solid #cccccc;
  border-radius: 4mm;
  padding: 6mm;
  font-size: 8pt;
  line-height: 1.4;
}

/* container from markdown */
.cheatsheet-content :deep(> div) {
  display: grid;
  grid-template-columns: 1fr;
  gap: 5mm;
  align-items: start;
}

/* each column */
.cheatsheet-content :deep(> div > div) {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2mm;
  align-items: stretch;

  border: 0 solid #ea580c;
  border-width: 0 1.5pt 0 1.5pt;
  padding: 0;
  font-family: 'Manrope', system-ui, sans-serif;
}

/* for headers */
.cheatsheet-content :deep(h1) {
  color: white;
  background-color: #ea580c;
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 1.4em;
  font-weight: 600;
}
.cheatsheet-content :deep(h2) {
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: 1.2em;
  font-weight: 600;
}

/* for all elements inside the column */
.cheatsheet-content :deep(p),
.cheatsheet-content :deep(h1),
.cheatsheet-content :deep(h2),
.cheatsheet-content :deep(ol),
.cheatsheet-content :deep(ul)  {
  margin: 0;
  padding: 6pt;
}

/* for lists */
.cheatsheet-content :deep(ol) {
  padding-left: 2em;
  list-style: decimal;
}
.cheatsheet-content :deep(ul) {
  padding-left: 2em;
  list-style: square;
}
.cheatsheet-content :deep(ul li::marker) {
  color: #ea580c;
}

/* for code blocks */
.cheatsheet-content :deep(div[class*='language-']) {
  max-width: 100%;
  overflow-x: none;
  background: #f1f3f5;
  /*border: 0.3mm solid #e1e4e8;*/
  /*border-radius: 2mm;*/
  padding: 6pt;
  margin: 0.9pt;
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

.cheatsheet-content :deep(table) {
  max-width: 100%;
  overflow-x: none;
  margin: 1pt;
  border-bottom: 3pt solid #ffedd5;
}

/* tables */
.cheatsheet-content :deep(th) {
  text-align: left;
  padding: 2pt 8pt;
}
.cheatsheet-content :deep(tr:nth-child(odd)) {
  background-color: #ffedd5;
}
.cheatsheet-content :deep(tr:nth-child(even)) {
  background-color: #ffffff;
}

.cheatsheet-content :deep(td) {
  padding: 2pt 8pt;
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
  margin: 1mm;
  size: A4 landscape;
}
@media print {
  .cheatsheet-content :deep(> div) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .cheatsheet-content :deep(> div > div:nth-child(3n+1)) {
    break-before: page;
  }
}
</style>