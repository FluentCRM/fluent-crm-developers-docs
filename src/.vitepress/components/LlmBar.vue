<template>
  <!-- Markdown view mode -->
  <div v-if="isMdMode && show" class="md-view">
    <div class="md-view-toolbar">
      <a :href="pageUrl" class="md-view-back" @click.prevent="exitMdMode">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to page
      </a>
      <button class="llm-btn" @click="copyMdContent" :class="{ copied: mdCopied }">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        {{ mdCopied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <pre class="md-view-content">{{ markdownContent }}</pre>
  </div>

  <!-- Normal bar -->
  <div v-else-if="show" class="llm-bar">
    <button class="llm-btn" @click="copyForLlm" :class="{ copied }">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      {{ copied ? 'Copied!' : 'Copy for LLM' }}
    </button>
    <span class="llm-sep"></span>
    <a class="llm-btn" :href="mdViewUrl" @click.prevent="enterMdMode">
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
import { useRoute } from 'vitepress'

export default {
  data() {
    return {
      copied: false,
      mdCopied: false,
      isMdMode: false,
      markdownContent: '',
      aiMenuOpen: false,
      aiProviders: [
        {
          key: 'claude',
          name: 'Claude',
          icon: '/assets/img/ai/claude.svg'
        },
        {
          key: 'chatgpt',
          name: 'ChatGPT',
          icon: '/assets/img/ai/chatgpt.svg'
        },
        {
          key: 'gemini',
          name: 'Gemini',
          icon: '/assets/img/ai/gemini.svg'
        }
      ]
    }
  },
  mounted() {
    this.checkMdMode()
    window.addEventListener('popstate', this.checkMdMode)
    document.addEventListener('click', this.closeAiMenu)
  },
  beforeUnmount() {
    window.removeEventListener('popstate', this.checkMdMode)
    document.removeEventListener('click', this.closeAiMenu)
  },
  watch: {
    '$route.path'() {
      this.isMdMode = false
      this.markdownContent = ''
      this.aiMenuOpen = false
      this.toggleDocContent(true)
    }
  },
  computed: {
    show() {
      const route = useRoute()
      const path = route.path
      if (path === '/' || path === '/index.html') return false
      return true
    },
    pageUrl() {
      if (typeof window === 'undefined') return ''
      return window.location.pathname
    },
    mdViewUrl() {
      if (typeof window === 'undefined') return '?md'
      return window.location.pathname + '?md'
    },
    aiPrompt() {
      const route = useRoute()
      const pageUrl = `https://developers.fluentcrm.com${route.path}`
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
    checkMdMode() {
      if (typeof window === 'undefined') return
      const params = new URLSearchParams(window.location.search)
      if (params.has('md')) {
        this.enterMdMode()
      }
    },
    enterMdMode() {
      if (typeof window === 'undefined') return
      this.markdownContent = this.getPageContent()
      this.isMdMode = true
      this.toggleDocContent(false)
      const url = window.location.pathname + '?md'
      window.history.pushState({}, '', url)
    },
    exitMdMode() {
      this.isMdMode = false
      this.markdownContent = ''
      this.toggleDocContent(true)
      window.history.pushState({}, '', window.location.pathname)
    },
    toggleDocContent(visible) {
      if (typeof document === 'undefined') return
      const doc = document.querySelector('.vp-doc')
      if (!doc) return
      const children = doc.children
      for (let i = 0; i < children.length; i++) {
        const el = children[i]
        if (el.classList.contains('llm-bar') || el.classList.contains('md-view')) continue
        el.style.display = visible ? '' : 'none'
      }
    },
    async copyMdContent() {
      try {
        await navigator.clipboard.writeText(this.markdownContent)
        this.mdCopied = true
        setTimeout(() => { this.mdCopied = false }, 2000)
      } catch (e) {
        // fallback
      }
    },
    async copyForLlm() {
      if (typeof document === 'undefined') return
      const content = this.getPageContent()
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
    },
    getPageContent() {
      const el = document.querySelector('.vp-doc')
      if (!el) return ''

      const clone = el.cloneNode(true)

      clone.querySelectorAll('.llm-bar, .md-view, .header-anchor, style, script').forEach(n => n.remove())

      clone.querySelectorAll('div[class*="language-"]').forEach(block => {
        const lang = (block.className.match(/language-(\S+)/) || [])[1] || ''
        const code = block.querySelector('code')?.textContent || ''
        const replacement = document.createElement('pre')
        replacement.textContent = '```' + lang + '\n' + code.trimEnd() + '\n```'
        block.replaceWith(replacement)
      })

      clone.querySelectorAll('table').forEach(table => {
        const rows = []
        table.querySelectorAll('tr').forEach((tr, i) => {
          const cells = Array.from(tr.querySelectorAll('th, td')).map(c => c.textContent.trim())
          rows.push('| ' + cells.join(' | ') + ' |')
          if (i === 0) {
            rows.push('| ' + cells.map(() => '---').join(' | ') + ' |')
          }
        })
        const replacement = document.createElement('pre')
        replacement.textContent = rows.join('\n')
        table.replaceWith(replacement)
      })

      let text = ''
      const walk = (node) => {
        if (node.nodeType === 3) {
          text += node.textContent
          return
        }
        if (node.nodeType !== 1) return

        const tag = node.tagName
        if (tag === 'H1') { text += '\n# ' }
        else if (tag === 'H2') { text += '\n## ' }
        else if (tag === 'H3') { text += '\n### ' }
        else if (tag === 'H4') { text += '\n#### ' }
        else if (tag === 'PRE') {
          text += '\n' + node.textContent + '\n'
          return
        }
        else if (tag === 'LI') { text += '\n- ' }
        else if (tag === 'P') { text += '\n' }
        else if (tag === 'BR') { text += '\n' }
        else if (tag === 'CODE' && node.parentElement?.tagName !== 'PRE') {
          text += '`' + node.textContent + '`'
          return
        }
        else if (tag === 'STRONG' || tag === 'B') {
          text += '**'
          for (const child of node.childNodes) walk(child)
          text += '**'
          return
        }

        for (const child of node.childNodes) walk(child)

        if (['H1','H2','H3','H4','P','LI','DIV','BLOCKQUOTE'].includes(tag)) {
          text += '\n'
        }
      }

      walk(clone)

      return text.replace(/\n{3,}/g, '\n\n').trim()
    }
  }
}
</script>
