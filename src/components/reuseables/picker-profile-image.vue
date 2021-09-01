<template>
    <section class="fl w-100 pa1 absolute nt4">
        <input type="file" class="dn" accept="image/png, image/jpeg, image/jpg, image/gif" @change="uploadImage" ref="uploadProfileImage" />                

        <div v-if="profileImage !== ''" class="relative flex flex-column flex-grow-0 flex-shrink-0 pointer">
            <i v-if="editable" @click="uploadImageClick" class="pointer absolute right-0 fas fa-pencil f7 bg-dark-gray near-white pa1 br2 br--top br--right "></i>
            <img :src="profileImage" @error="$event.target.src=imageIcon" class="h4 br2 br--top " style="object-fit: cover;"/>
            <div class="bg-dark-gray pa1 near-white f7 tc relative"> 
                {{imagelabel}}
            </div>
        </div>
        
        <div v-else class="relative flex flex-column flex-grow-0 flex-shrink-0 pointer" @click="uploadImageClick">
            <div class="h4 tc br2 br--top flex items-center bg-mid-gray near-white"> 
                <i class="fas fa-camera f1 center"/>
            </div>
            <div class="bg-dark-gray pa1 near-white f7 tc relative"> 
                Upload Image
            </div>
        </div>
        
    
    
    </section>
</template>


<script type="text/javascript">
    import imageIcon from "@/assets/img/profile.png";
    
    export default {
        props: ["editable", "label", "height"],
        data() {return {
            imageIcon,
            imagelabel:"",
            profileImage:""
        }},
        components: {  },
        created() { 
            if (this.label == "" || this.label == undefined) {
                this.imagelabel = "Profile Image"
            } else {
                this.imagelabel = this.label
            }
        },
        mounted() { },
        methods: {
            updateProfileImage(){
                this.$emit('updateProfileImage', this.profileImage);
            },
            uploadImageClick() {
                if (this.editable) {
                    this.$refs.uploadProfileImage.click();
                } else {
                    if (this.$parent.record.ID !== undefined && this.$parent.record.ID > 0) {
                        this.$parent.notifications = [{ Code:200,Message:"click edit button to change profile image" }];
                    }
                }
            },
            uploadImage() {
                const app = this;
                var quality = 70
                var maxWidth = 640
                var imgObject = new Image()

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
                                case "image/gif":
                                case "image/png":
                                case "image/jpg":
                                case "image/jpeg":
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

                                        app.profileImage = imgObjectCompressed
                                        app.updateProfileImage()
                                    });
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
