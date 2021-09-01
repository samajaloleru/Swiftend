<template>
    <section class="fl w-100 pa1">
        <input type="file" class="dn" accept="image/gif, image/png, image/jpg, image/jpeg" @change="uploadFile" ref="uploadFileRef" />
        
        <div class="relative flex flex-column flex-grow-0 flex-shrink-0 pointer">
            <div v-if="editable" @click="uploadFileClick" class="bg-dark-gray pa1 near-white f7 tc relative"> 
                <span v-if="uploadedFile==''"><i class="fas fa-upload center"/> Upload {{filelabel}}</span>
                <span v-else> <i class="fas fa-times red center"/> Uploaded {{filelabel}}</span>
            </div>

            <div v-else class="bg-dark-gray pa1 near-white f7 tc relative"> 
                <a target="_blank" :href="uploadedFile" class="white link"><i class="fas fa-download center"/> Download {{filelabel}}</a>
            </div>
        </div>

    </section>
</template>


<script type="text/javascript">
    export default {
        props: ["editable", "label", "height"],
        data() {return {
            filelabel:"",
            uploadedFile:""
        }},
        components: {  },
        created() { 
            if (this.label == "" || this.label == undefined) {
                this.filelabel = "Upload File"
            } else {
                this.filelabel = this.label
            }
        },
        mounted() { },
        methods: {
            uploadPickedFile(){
                this.$emit('uploadPickedFile', this.uploadedFile);
            },
            uploadFileClick() {
                if (this.editable) {
                    this.$refs.uploadFileRef.click();
                } else {
                    if (this.$parent.record.ID !== undefined && this.$parent.record.ID > 0) {
                        this.$parent.notifications = [{ Code:200,Message:"click edit button to change file" }];
                    }
                }
            },
            uploadFile() {
                const app = this;
                var quality = 70
                var maxWidth = 640

                if(event.target.files == undefined) {
                    return
                }

                for( var index = 0; index < event.target.files.length; index++) {
                    
                    var selectedFile = event.target.files[index];
                    var reader = new FileReader();
                    
                    reader.readAsDataURL(selectedFile);
                    reader.onload = (function (oldFile) {
                        return function(e) {
                        
                        // Here you can use `e.target.result` or `this.result`
                        // and `f.name`.
                        if (oldFile.size > 10240000) {
                            app.$parent.notifications = [{ Code: 0, Message: "Uploaded File must be less than 10MB" }];
                        } else {
                             switch (oldFile.type) {
                                case "application/zip":
                                case "multipart/x-zip":
                                case "application/octet-stream":
                                case "application/zip-compressed":
                                case "application/x-zip-compressed":
                                    app.uploadedFile = this.result;
                                    app.uploadPickedFile();
                                    break;

                                default:
                                    app.$parent.notifications = [{ Code: 0, Message: "File Must be a valid Image" }];
                                    break;
                            }
                        }
                        
                    }})(selectedFile);

                    reader.onerror = function (error) {
                        app.$parent.notifications = [{ Code: 0, Message: "Image Error:" + error }];
                    };

                }
            },
        }
    };
</script>
