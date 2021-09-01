<template>
    <section>
        <div class="cf w-100 dt z-max vh-100 fixed top-0 left-0 right-0 bg-black-50">
            <div class="dtc v-mid vh-100 w-100 ph3 overflow-scroll">
                <div class="cf w5 center br2 bg-light-gray pv3 ph2 relative overflow-x-scroll" style="max-height:90vh"> 

                    <i class="f6 fr fas fa-times pointer" @click="updatePopupDocument"></i>

                    <p class="f5 tc tracked w-100"> NEW DOCUMENT </p>

                    
                        <div class="w4 center relative flex flex-column flex-grow-0 flex-shrink-0 pointer" @click="uploadDocument">
                            <div class="h4 tc br2 br--top flex items-center bg-mid-gray near-white"> 
                                
                                <i v-if="objDocument.Filepath==''" class="fas fa-upload f1 center near-white"/>
                                <a v-else class="pointer link center" :href="objDocument.Filepath" target="_blank">
                                    <i class="fas fa-download f1 center near-white"/>
                                </a>
                            </div>
                            <div class="bg-dark-gray pa1 near-white f7 tc relative"> 
                                    <span v-if="objDocument.Filepath==''">Upload</span>
                                    <span v-else>Download</span>
                                     Document
                            </div>
                            <input type="file" class="dn  f7" @change="uploadDocumentChanged" ref="upload" />
                        </div>
                        
                        <div class="fl pa1 mv1 w-100">
                            <label class="db fw4 lh-copy f6 black">Document Title:</label>
                            <input class="pa2 bn br2 w-100 bg-black-20 " type="text" placeholder="" v-model="objDocument.Title" />
                        </div>

                        <div class="fl pa1 mv1 w-50">
                            <label class="db fw4 lh-copy f6 black">Document Type:</label>
                            <input class="pa2 bn br2 w-100 bg-black-20 " type="text" placeholder="" v-model="objDocument.Doctype" />
                        </div>
                        
                        <div class="fl pa1 mv1 w-50">
                            <div class="fl dib pa2 br2 pointer fw6 tc bg-white dark-gray"  @click="updatePopupDocument">
                                <i class="fas fa-times"></i> CLOSE
                            </div>
                        </div>

                        <notify :notifications="notifications"></notify>
                    
                </div>
            </div>
        </div>

    </section>
</template>



<script type="text/javascript">
    import { HTTP, checkRedirect } from "@/common";
    import notify from "@/components/notify";

    
    export default {
        props: ["label"],
        data() {return {
            objDocument:{ ID:0, Title:"", Filepath:"", Doctype:""}, notifications: [],
        }},
        components: { notify },
        created() { },
        mounted() { },
        methods: {
            updatePopupDocument(){
                if (this.objDocument.Filepath !== "" && this.objDocument.Title == "" ) {
                    this.notifications = [{ Code: 0, Message: "Title is required" }] ;
                    return
                }
                
                if (this.objDocument.Filepath !== "" && this.objDocument.Doctype == "" ) {
                    this.notifications = [{ Code: 0, Message: "Document Type is required" }] ;
                    return
                }

                this.$emit('updatePopupDocument', this.objDocument );
                this.objDocument = { ID:0, Title:"", Filepath:"",}
            },
            uploadDocument() {
                this.$refs.upload.click();
            },
            uploadDocumentChanged() {
                const app = this;
                for( var index = 0; index < event.target.files.length; index++) {
                    if (app.objDocument.Filepath.length > 0) {
                        continue
                    }

                    var selectedFile = event.target.files[index];
                    var reader = new FileReader();
                    reader.readAsDataURL(selectedFile);
                    reader.onload = (function (oldFile) {
                        return function(e) {
                        if (oldFile.size > 1024000) {
                            app.notifications = [{ Code: 0, Message: "Document must be less than 1MB" }] ;
                        } else {
                            
                            switch (oldFile.type) {
                                default:
                                    app.objDocument.Filepath = this.result;
                                    app.objDocument.Filetype = oldFile.type;
                                    app.objDocument.Filename = oldFile.name;
                                    app.objDocument.Filesize = oldFile.size;

                                    if (app.objDocument.Title == ""){
                                        app.objDocument.Title = app.objDocument.Filename
                                    }
                                    break;

                                // case "application/zip":
                                // case "application/exe":
                                    // app.notifications = [{ Code: 0, Message: "File Must be a valid Document" }] ;
                                    // break;
                            }
                        }
                        // app.updateImageList()
                    }})(selectedFile);

                    reader.onerror = function (error) {
                        app.notifications = [{ Code: 0, Message: "Document Error:" + error }] ;
                    };
                }
            },
        }
    };
</script>
