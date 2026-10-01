<template>
  <div v-if="show" class="api-site-bar">
    <label class="api-site-label" for="api-site-input">Try it on your website</label>
    <input
      id="api-site-input"
      v-model="draft"
      class="api-site-input"
      type="text"
      inputmode="url"
      autocomplete="off"
      spellcheck="false"
      placeholder="example.com or http://localhost:10010"
      @keydown.enter="save"
      @blur="save"
    />
    <span class="api-site-hint" :class="{ ok: saved }">
      <template v-if="saved">Requests go to <code>{{ saved }}{{ apiPath }}</code></template>
      <template v-else>Enter your site to enable <strong>Send</strong>. Requests are sent from your browser, so the site must allow cross-origin calls (CORS).</template>
    </span>
  </div>
</template>

<script>
import { useRoute } from 'vitepress'
import { getSite, setSite } from '../theme/apiSite.js'

export default {
  setup() {
    return { route: useRoute() }
  },
  data() {
    return { draft: '', saved: '', apiPath: '/wp-json/fluent-crm/v2' }
  },
  computed: {
    show() {
      return this.route.path.startsWith('/rest-api/operations/')
    }
  },
  mounted() {
    this.saved = getSite()
    this.draft = this.saved
  },
  methods: {
    save() {
      this.saved = setSite(this.draft)
      this.draft = this.saved
    }
  }
}
</script>

<style scoped>
.api-site-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin: 0 0 16px;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
}
.api-site-label { font-weight: 600; color: var(--vp-c-text-1); }
.api-site-input {
  flex: 1 1 260px;
  min-width: 0;
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}
.api-site-input:focus { outline: 2px solid var(--vp-c-brand-1); outline-offset: -1px; }
.api-site-hint { flex-basis: 100%; color: var(--vp-c-text-2); }
.api-site-hint.ok { color: var(--vp-c-green-1, #18794e); }
.api-site-hint code { word-break: break-all; }
</style>
