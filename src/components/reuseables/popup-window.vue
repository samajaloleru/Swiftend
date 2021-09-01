<template>
    
        <div class="absolute bottom-2 right-2">
           
                <div class="cf center br2 bg-transparent pa3 relative"> 

                    <i class="f6 fr fas fa-times pointer" @click="closePopup"></i>
                    
                    <div v-if="label == 'Daily Report'" class="fl pa1 mv1 w-100">
                        <div class="w-100 center dib pa2 br2 pointer fw6 tc bg-dark-gray near-white"  @click="closePopup">
                            <i class="f7 fas fa-check"></i>
                        </div>
                        <div class="w-100 center dib pa2 br2 pointer fw6 tc dark-gray bg-near-white"  @click="save">
                            <i class="f7 fas fa-eye"></i>
                        </div>
                    </div>

                    <div v-if="label == 'Request'" class="fl pa1 mv1 w-100">
                        <div class="w-100 center dib pa2 br2 pointer fw6 tc bg-dark-gray near-white">
                            <i class="f7 fas fa-check"></i>
                        </div>
                        <div class="w-100 center dib pa2 br2 pointer fw6 tc dark-gray bg-near-white"  @click="saveRequest">
                            <i class="f7 fas fa-eye"></i>
                        </div>
                    </div>

                     <div v-if="label == 'Park'" class="fl pa1 mv1 w-100">
                        <div class="w-100 center dib pa2 br2 pointer fw6 tc bg-dark-gray near-white"  @click="saveParking">
                            <i class="f7 fas fa-eye"></i>
                        </div>
                        <div class="w-100 center dib pa2 br2 pointer fw6 tc dark-gray bg-near-white"  @click="popupClockIn">
                            <i class="f7 fas fa-clock"></i>
                        </div>
                        <div class="w-100 center dib pa2 br2 pointer fw6 tc gold bg-near-white"  @click="closePopup">
                            <i class="f7 fas fa-question"></i>
                        </div>
                    </div>

                </div>
            
        </div>

   
</template>



<script type="text/javascript">
    import { HTTP } from "@/common";
    import {checkRedirect} from "@/common"
    
    export default {
        props: ["label","editable", "id"],
        data() {return { 
        }},
        components: { },
        created() {
        },
        mounted() {},
        methods: {
            save () {
                this.$emit('save');
            }, 
             saveRequest () {
                this.$emit('save');
            },
            saveParking () {
                this.$emit('parkingList');
            },
            closePopup(){
                this.$emit('close');
            },
            popupClockIn(){this.$emit('clockIn');},
        },
    };
</script>
