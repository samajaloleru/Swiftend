<template>
    <section class="">
        <div class="cf w-100 h1"></div>

        <input type="file" multiple=true class="dn  f7" accept="image/png, image/jpeg, image/jpg, image/gif" @change="uploadImage" ref="uploadimage" />
        
        <div class="flex flex-row items-center w-100 cf center">
            <i class="fas fa-chevron-left mid-gray f4 pointer mr1" @click="goLeft" />

            <div ref="imagescroller" class="w-100 bg-transparent flex flex-nowrap items-center overflow-x-scroll">
                <div class="pl1 h4 relative flex flex-column flex-grow-0 flex-shrink-0"></div>
                <div class="relative flex flex-column flex-grow-0 flex-shrink-0" v-for="(gallery, index) in imageList" :key="index">
                    <img :src="gallery.Filepath" @error="$event.target.src=imageIcon" class="h4 w5 br2 br--top mr2" style="object-fit: cover;"/>
                     <div class="flex items-center justify-center w-100 pt1">
                        <div class="bg-near-white pa1 dark-gray tc" @click="uploadImageClick(index)"> 
                        <i  v-if="editable" class="mr2 fas fas fa-edit f6 tc" ></i>
                        </div>
                        <div class="bg-near-white pa1 dark-gray tc"> 
                        <i v-if="editable" @click="deleteImage(index)" class="pointer fas fa-trash red f6 pa1 tc"></i>
                        </div>
                     </div>
                </div>
                <div class="pl1 h4 relative flex flex-column flex-grow-0 flex-shrink-0"></div>
                <div v-if="editable" class="ma1 mr4 relative flex flex-column flex-grow-0 flex-shrink-0 pointer" @click="uploadImageClick(-1)">
                    <div class="w4 h4 tc br2 br--top flex items-center bg-white-10 black-20"> 
                        <i class="fas fa-camera f1 center"/>
                    </div>
                    <div class="bg-black-30 pa1 near-white f7 tc relative"> 
                        New Image
                    </div>
                </div>
                <div class="pl1 h4 relative flex flex-column flex-grow-0 flex-shrink-0"></div>
            </div>


            <i class="fas fa-chevron-right mid-gray f4 pointer ml1" @click="goRight" />
        </div>

        <div class="cf w-100 h1"></div>
        
    </section>
</template>


<script type="text/javascript">
   import imageIcon from "@/assets/img/profile.png";

    
    export default {
        props: ["editable"],
        data() {return {
            imageIcon,
            ilIndex: 0,
            imageList:[],
            imageUpload:[]
        }},
        components: {  },
        created() {  },
        mounted() { 
           this.$refs.imagescroller.scrollLeft = this.$refs.imagescroller.scrollWidth;
        },
        methods: {
            updateImageList(){
                this.$emit('updateImageList', this.imageUpload);
            },
            goLeft() {
                if (this.$refs.imagescroller.scrollLeft > 0) {
                    this.$refs.imagescroller.scrollLeft -= (130)
                }

                if (this.$refs.imagescroller.scrollLeft < 0){
                    this.$refs.imagescroller.scrollLeft = 0
                }
            },
            goRight() {
                if (this.$refs.imagescroller.scrollLeft <= this.$refs.imagescroller.scrollWidth) {
                    this.$refs.imagescroller.scrollLeft += (130)
                    
                } 
                
                if (this.$refs.imagescroller.scrollLeft > this.$refs.imagescroller.scrollWidth){
                    this.$refs.imagescroller.scrollLeft = this.$refs.imagescroller.scrollWidth
                }
            },
            deleteImage(index){
                this.$delete(this.imageList, index)
                this.updateImageList()
            },
            uploadImageClick(index) {
                if (this.editable) {
                    this.ilIndex = index
                    this.$refs.uploadimage.click();
                }
            },
            uploadImage() {
                const app = this;
                var quality = 70
                var maxWidth = 640

                for( var index = 0; index < event.target.files.length; index++) {
                    
                    var selectedFile = event.target.files[index];
    
                    var reader = new FileReader();
                    reader.readAsDataURL(selectedFile);
                    reader.onload = (function (oldFile) {
                        return function(e) {
                        // Here you can use `e.target.result` or `this.result`
                        // and `f.name`.
                        if (oldFile.size > 10240000) {
                            app.$parent.notifications = [{ Code: 0, Message: "Image File must be less than 10MB" }];
                        } else {
                            
                            switch (oldFile.type) {
                                default:
                                    app.$parent.notifications = [{ Code: 0, Message: "File Must be a valid Image" }];
                                    break;

                                case "image/gif":
                                case "image/png":
                                case "image/jpg":
                                case "image/jpeg":
                                    
                                    var imgObject = new Image()
                                    imgObject.src = this.result;

                                    imgObject.onload = (function() {
                                        
                                        // maxWidth = maxWidth || 1000;
                                        var natW = imgObject.naturalWidth;
                                        var natH = imgObject.naturalHeight;
                                        var ratio = natH / natW;
                                        if (natW > maxWidth) {
                                            natW = maxWidth;
                                            natH = ratio * maxWidth;
                                        }

                                        var cvs = document.createElement('canvas');
                                        cvs.width = natW;
                                        cvs.height = natH;
                                        
                                        var ctx = cvs.getContext("2d").drawImage(imgObject, 0, 0, natW, natH);
                                        var imgObjectCompressed = cvs.toDataURL(oldFile.type, quality/100);

                                        if ( app.ilIndex >= 0) {
                                            app.imageList[app.ilIndex].Filepath = imgObjectCompressed
                                            // app.imageList[app.ilIndex].Filetype = oldFile.type;
                                            // app.imageList[app.ilIndex].Filename = oldFile.name;
                                            // app.imageList[app.ilIndex].Filesize = oldFile.size;
                                            app.ilIndex = 0
                                        } else {
                                            app.imageList.push({
                                                Filepath: imgObjectCompressed,
                                                // Filetype: oldFile.type,
                                                // Filename: oldFile.name,
                                                // Filesize: oldFile.size
                                            }),
                                             app.imageUpload.push(
                                                 imgObjectCompressed,
                                                // Filetype: oldFile.type,
                                                // Filename: oldFile.name,
                                                // Filesize: oldFile.size
                                            )
                                        }

                                        app.updateImageList()
                                    });
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
