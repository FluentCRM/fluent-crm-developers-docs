<template>
    <div class="hook_explain">
        <div @click="is_open = !is_open" class="hook_header">
            <slot name="header" />
        </div>
        <div class="hook_body" v-show="is_open">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
export default {
    name: 'HookExplain',
    data() {
        return {
            is_open: false
        }
    }
}
</script>
