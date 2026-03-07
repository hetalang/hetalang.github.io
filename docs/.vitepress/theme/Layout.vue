<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import CheatSheetLayout from './layouts/CheatSheetLayout.vue'

const { frontmatter } = useData()
const DefaultLayout = DefaultTheme.Layout
</script>

<template>
  <CheatSheetLayout v-if="frontmatter.layout === 'cheat-sheet'" />
  <DefaultLayout v-else />
</template>
