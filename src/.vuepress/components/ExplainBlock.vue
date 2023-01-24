<template>
    <div class="hook_explain">
        <h3 @click="is_open = !is_open" class="explain_header" :id="titleId">
            <a class="header-anchor" :href="'#'+titleId">#</a> {{ title }}
            <span class="hook_dir">
                <template v-if="is_open">
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.46967 8.96967C6.76256 8.67678 7.23744 8.67678 7.53033 8.96967L12 13.4393L16.4697 8.96967C16.7626 8.67678 17.2374 8.67678 17.5303 8.96967C17.8232 9.26256 17.8232 9.73744 17.5303 10.0303L12.5303 15.0303C12.3897 15.171 12.1989 15.25 12 15.25C11.8011 15.25 11.6103 15.171 11.4697 15.0303L6.46967 10.0303C6.17678 9.73744 6.17678 9.26256 6.46967 8.96967Z" fill="#363853"/> </g></svg>
                </template>
                <template v-else>
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(270)"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.46967 8.96967C6.76256 8.67678 7.23744 8.67678 7.53033 8.96967L12 13.4393L16.4697 8.96967C16.7626 8.67678 17.2374 8.67678 17.5303 8.96967C17.8232 9.26256 17.8232 9.73744 17.5303 10.0303L12.5303 15.0303C12.3897 15.171 12.1989 15.25 12 15.25C11.8011 15.25 11.6103 15.171 11.4697 15.0303L6.46967 10.0303C6.17678 9.73744 6.17678 9.26256 6.46967 8.96967Z" fill="#363853"></path> </g></svg>
                </template>
            </span>
        </h3>
        <div class="hook_body" v-show="is_open">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
export default {
    name: 'ExplainBlock',
    props: ['title'],
    data() {
        return {
            is_open: false
        }
    },
    computed: {
        titleId() {
            return this.title.replace(/[^a-zA-Z0-9_]/g, "_");
        }
    },
    mounted() {
        if(this.$route.hash == '#'+this.titleId) {
            this.is_open = true;
        }
    }
}
</script>
