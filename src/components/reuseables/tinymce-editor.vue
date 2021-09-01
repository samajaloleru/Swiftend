<template>
    <textarea></textarea>
</template>
<script type="text/javascript">
    export default {
        props: ["editable"],
        data() {return {}},
        components: { },
        created() {  },
        mounted() { this.initTinymce() },
        methods: {
            initTinymce(){
                var app = this;
                tinymce.editors = [];
                tinymce.remove();
                tinymce.init({
                    height: 300,
                    menubar: false,
                    plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table contextmenu paste code"],
                    toolbar: "undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code",
                    selector: '#' + app.$el.id,
                    setup: function(editor) {
                        // If the Vue model is editable, we want to set the Tinymce readonly
                        editor.settings.readonly = !app.editable;
                        if (app.editable) {
                            editor.on('blur', function() {
                                app.updateTinymce(editor.getContent())
                            });
                        }
                    }
                });
            },
            setTinymce(richtext){
                tinymce.get(this.$el.id).setContent(richtext);;
            },
            updateTinymce(richtext){
                this.$emit('updateTinymce', richtext );
            },
        }
    };
</script>
