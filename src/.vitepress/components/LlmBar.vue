<template>
  <div v-if="show" class="llm-bar">
    <button class="llm-btn" @click="copyForLlm" :class="{ copied }">
      <svg v-if="!copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      {{ copied ? 'Copied!' : 'Copy for LLM' }}
    </button>
    <span class="llm-sep"></span>
    <a class="llm-btn" :href="rawMdUrl" target="_blank">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
      View as Markdown
    </a>
    <span class="llm-sep"></span>
    <div class="llm-dropdown-wrap">
      <button class="llm-btn" @click="toggleAiMenu">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        Ask AI
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div v-if="aiMenuOpen" class="llm-dropdown" @mouseleave="aiMenuOpen = false">
        <a v-for="provider in aiProviders" :key="provider.key" class="llm-dropdown-item" :href="getAiUrl(provider.key)" target="_blank" rel="noopener" @click="aiMenuOpen = false">
          <img :src="provider.icon" :alt="provider.name" width="16" height="16" />
          {{ provider.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useData } from 'vitepress'

export default {
  setup() {
    const route = useRoute()
    const { page } = useData()
    return { route, page }
  },
  data() {
    return {
      copied: false,
      aiMenuOpen: false,
      aiProviders: [
        { key: 'claude', name: 'Claude', icon: '/assets/img/ai/claude.svg' },
        { key: 'chatgpt', name: 'ChatGPT', icon: '/assets/img/ai/chatgpt.svg' },
        { key: 'gemini', name: 'Gemini', icon: '/assets/img/ai/gemini.svg' }
      ]
    }
  },
  mounted() {
    document.addEventListener('click', this.closeAiMenu)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeAiMenu)
  },
  computed: {
    show() {
      const p = this.route.path
      return p !== '/' && p !== '/index.html'
    },
    rawMdUrl() {
      return '/raw/' + this.page.relativePath
    },
    rawMarkdown() {
      const b64 = this.page.rawMarkdownB64 || ''
      if (!b64) return ''
      return decodeURIComponent(escape(atob(b64))).replace(/^---[\s\S]*?---\s*/, '').trim()
    },
    aiPrompt() {
      const pageUrl = `https://developers.fluentcrm.com${this.route.path}`
      return `Summarize this FluentCRM developer documentation page and explain the key concepts: ${pageUrl}`
    }
  },
  methods: {
    toggleAiMenu(e) {
      e.stopPropagation()
      this.aiMenuOpen = !this.aiMenuOpen
    },
    closeAiMenu(e) {
      if (!e.target.closest('.llm-dropdown-wrap')) {
        this.aiMenuOpen = false
      }
    },
    getAiUrl(provider) {
      const prompt = this.aiPrompt
      switch (provider) {
        case 'claude':
          return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`
        case 'chatgpt':
          return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`
        case 'gemini':
          return `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`
        default:
          return '#'
      }
    },
    async copyForLlm() {
      if (typeof document === 'undefined') return
      const content = this.rawMarkdown
      if (!content) return
      try {
        await navigator.clipboard.writeText(content)
        this.copied = true
        setTimeout(() => { this.copied = false }, 2000)
      } catch (e) {
        const ta = document.createElement('textarea')
        ta.value = content
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        this.copied = true
        setTimeout(() => { this.copied = false }, 2000)
      }
    }
  }
}
</script>
