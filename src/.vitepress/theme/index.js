import DefaultTheme from 'vitepress/theme'
import ExplainBlock from '../components/ExplainBlock.vue'
import './vars.css'
import './custom.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('ExplainBlock', ExplainBlock)
    }
}
