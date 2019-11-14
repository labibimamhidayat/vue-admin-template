<template>
    <div class="d-flex flex-column">
        <div id="quill-editor" ref="richTextEditor"></div>
        <error-message-component :message-error="errorMessage"></error-message-component>
    </div>
</template>
<script>
import quill from '@/plugins/quill';
import debounce from '@/mixins/debounce.mixins';

const errorMessageComponent = () => import('@/components/reuseable/errorMessage');
export default {
    name: 'richText',
    components: {
        errorMessageComponent,
    },
    mixins: [debounce],
    data: () => ({
        editor: null,
    }),
    props: {
        value: {
            type: String,
            default: '',
        },
        errorMessage: {
            type: String,
            default: '',
        },
        preDefinedText: {
            type: String,
            default: '',
        },
    },
    watch: {
        preDefinedText: {
            immediate: true,
            handler(val) {
                if (val.length) this.mapPreDefinedText();
            },
        },
    },
    mounted() {
        this.initRichText();
        this.listenOnChangeEditorText();
    },
    methods: {
        setValue(value) {
            this.$emit('input', value);
        },
        initRichText() {
            this.editor = quill(this.$refs.richTextEditor);
            if (this.preDefinedText) {
                this.editor.root.innerHTML = this.preDefinedText;
                this.setValue(this.editor.root.innerHTML);
            }
        },
        listenOnChangeEditorText() {
            this.editor.on('editor-change', () => {
                const html = this.editor.root.innerHTML;
                this.debounce(() => {
                    this.setValue(html);
                });
            });
        },
        reset() {
            this.editor.root.innerHTML = '';
            this.setValue(this.editor.root.innerHTML);
        },
        mapPreDefinedText() {
            if (this.editor) {
                this.editor.root.innerHTML = this.preDefinedText;
                this.setValue(this.editor.root.innerHTML);
            }
        },
    },
};
</script>
<style lang="scss">
    @import url('https://cdn.quilljs.com/1.1.6/quill.snow.css');
    .ql-editor{
        min-height: 150px;
    }
</style>
