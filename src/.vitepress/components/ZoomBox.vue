<template>
  <div ref="root" class="zoombox" :class="{ full: isFull }">
    <div class="zb-bar">
      <button type="button" title="Zoom out" aria-label="Zoom out" @click="zoomBy(1 / 1.25)">−</button>
      <span class="zb-level">{{ Math.round(scale * 100) }}%</span>
      <button type="button" title="Zoom in" aria-label="Zoom in" @click="zoomBy(1.25)">+</button>
      <button type="button" title="Fit to width" @click="fit">Fit</button>
      <button type="button" title="Actual size" @click="actual">100%</button>
      <button type="button" :title="isFull ? 'Exit full screen' : 'Full screen'" @click="toggleFull">{{ isFull ? 'Exit' : 'Full screen' }}</button>
      <span class="zb-hint">Drag to pan · Ctrl/⌘ + scroll to zoom</span>
    </div>
    <div ref="view" class="zb-view" :style="viewH && !isFull ? { height: viewH + 'px' } : null" @wheel="onWheel" @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp" @pointercancel="onUp">
      <div ref="content" class="zb-content" :style="{ transform: `translate(${x}px, ${y}px) scale(${scale})` }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Wraps any slot content (used for Mermaid diagrams) in a zoomable, pannable viewport.
 * Zoom: buttons or Ctrl/⌘ + wheel (plain wheel keeps scrolling the page). Pan: drag.
 * "Fit" scales the content to the viewport width and runs once, when the diagram first gets a size.
 */
export default {
  name: 'ZoomBox',
  data() {
    return { scale: 1, x: 0, y: 0, isFull: false, drag: null, viewH: 0, fitted: false, observer: null }
  },
  mounted() {
    // Mermaid renders asynchronously, so fit as soon as the content first reports a real size.
    this.observer = new ResizeObserver(() => {
      if (!this.fitted && this.$refs.content.offsetWidth > 0) {
        this.fitted = true
        this.fit()
      }
    })
    this.observer.observe(this.$refs.content)
    document.addEventListener('fullscreenchange', this.onFullChange)
  },
  beforeUnmount() {
    this.observer && this.observer.disconnect()
    document.removeEventListener('fullscreenchange', this.onFullChange)
  },
  methods: {
    clamp(v) {
      return Math.min(4, Math.max(0.1, v))
    },
    // Zoom around a point of the viewport (defaults to its centre) so that point stays put.
    zoomAt(factor, px, py) {
      const next = this.clamp(this.scale * factor)
      const k = next / this.scale
      this.x = px - (px - this.x) * k
      this.y = py - (py - this.y) * k
      this.scale = next
    },
    zoomBy(factor) {
      const v = this.$refs.view
      this.zoomAt(factor, v.clientWidth / 2, v.clientHeight / 2)
    },
    fit() {
      const v = this.$refs.view
      const c = this.$refs.content
      if (!c.offsetWidth) return
      // Contain the diagram on both axes. In the page the box is capped at MAX_H and shrinks to the
      // fitted height; in full screen it fills the screen.
      const availH = this.isFull ? v.clientHeight : 560
      const byW = (v.clientWidth - 24) / c.offsetWidth
      const byH = (availH - 24) / c.offsetHeight
      this.scale = this.clamp(Math.min(byW, byH, 1.5))
      this.viewH = Math.max(220, Math.round(c.offsetHeight * this.scale + 24))
      this.x = (v.clientWidth - c.offsetWidth * this.scale) / 2
      this.y = this.isFull ? (v.clientHeight - c.offsetHeight * this.scale) / 2 : 12
    },
    actual() {
      this.scale = 1
      this.x = 12
      this.y = 12
    },
    onWheel(e) {
      if (!e.ctrlKey && !e.metaKey) return
      e.preventDefault()
      const r = this.$refs.view.getBoundingClientRect()
      this.zoomAt(e.deltaY < 0 ? 1.1 : 1 / 1.1, e.clientX - r.left, e.clientY - r.top)
    },
    onDown(e) {
      this.drag = { px: e.clientX, py: e.clientY, x: this.x, y: this.y }
      this.$refs.view.setPointerCapture(e.pointerId)
    },
    onMove(e) {
      if (!this.drag) return
      this.x = this.drag.x + e.clientX - this.drag.px
      this.y = this.drag.y + e.clientY - this.drag.py
    },
    onUp() {
      this.drag = null
    },
    toggleFull() {
      if (document.fullscreenElement) document.exitFullscreen()
      else this.$refs.root.requestFullscreen && this.$refs.root.requestFullscreen()
    },
    onFullChange() {
      this.isFull = document.fullscreenElement === this.$refs.root
      this.$nextTick(this.fit)
    }
  }
}
</script>

<style scoped>
.zoombox {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}
.zoombox.full {
  display: flex;
  flex-direction: column;
  margin: 0;
  border-radius: 0;
  background: var(--vp-c-bg);
}
.zb-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 13px;
}
.zb-bar button {
  min-width: 30px;
  padding: 2px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}
.zb-bar button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.zb-level {
  min-width: 44px;
  text-align: center;
  color: var(--vp-c-text-2);
}
.zb-hint {
  margin-left: auto;
  color: var(--vp-c-text-3);
}
.zb-view {
  position: relative;
  height: 520px;
  overflow: hidden;
  cursor: grab;
  touch-action: none;
  user-select: none;
}
.zb-view:active {
  cursor: grabbing;
}
.full .zb-view {
  flex: 1;
  height: auto;
}
.zb-content {
  position: absolute;
  top: 0;
  left: 0;
  width: max-content;
  transform-origin: 0 0;
}
/* Mermaid wrapper adds its own margins; keep the diagram at natural size inside the pan area */
.zb-content :deep(.mermaid) {
  margin: 0;
}
.zb-content :deep(svg) {
  max-width: none !important;
}
@media (max-width: 640px) {
  .zb-hint {
    display: none;
  }
}
</style>
