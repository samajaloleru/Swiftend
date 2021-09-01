<template>
    <section>
        <div class="cf w-100 dt z-max vh-100 fixed top-0 left-0 right-0 bg-black-50">
            <div class="dtc v-mid vh-100 w-100 ph3 overflow-scroll">
                <div class="cf mw6 center br2 bg-light-gray pa3 relative overflow-x-scroll" style="max-height:90vh"> 

                    <i class="f6 fr fas fa-times pointer" @click="closePopup"></i>

                    <p class="f2-l f4 tracked fw6 bebas-font tc ttu tracked w-100"> Create Department </p>

                    <div class="fl pa1 mv1 w-100">
                        <label class="db fw4 lh-copy f6 black">Name:</label>
                        <input class="pa2 bn br2 w-100 bg-black-20 " type="text" v-model="record.name" />
                    </div>

                    <div class="fl pa1 mv1 w-100">
                        <label class="db fw4 lh-copy f6 black">Description:</label>
                        <textarea class="pa2 bn h4 br2 w-100 bg-black-20" v-model="record.description"></textarea>
                    </div>
                    
                   <div class="fl pa1 mv1 w-100">
                        <div class="w-100 center dib pa2 br2 pointer fw6 tc bg-dark-gray near-white"  @click="save">
                            <i class="f7 fas fa-check"></i> CREATE
                        </div>
                        <div class="w-100 center dib pa2 br2 pointer fw6 tc dark-gray bg-near-white"  @click="closePopup">
                            <i class="f7 fas fa-times"></i> CANCEL
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </section>
</template>



<script type="text/javascript">
    import { HTTP } from "@/common";
    import {checkRedirect} from "@/common"
    export default {
        props: ["label","editable"],
        data() {return {
            url: "/api/jobs/createDepartment",
            record: { },
            myprofile: { },
            isSave:true,
        }},
        components: { },
        created() {
            
         },
        mounted() {},
        methods: {
            save () {
                this.$emit('save');
                const app = this;
                app.isSave = false;
                HTTP.post(app.url, app.record).then((response) => {
                    app.notifications = [response.data]
                    setTimeout(checkRedirect, 250, response.data)
                    app.$router.go({name: 'jobs-search'})
                    app.isSave = true;                   
                }).catch((e) => {
                    console.log(e)
                })
            }, 
            closePopup(){this.$emit('save');},
        }
    };
</script>
