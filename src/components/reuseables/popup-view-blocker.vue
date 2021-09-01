<template>
    <section>
        <div class="cf w-100 dt z-max vh-100 fixed top-0 left-0 right-0 bg-black-50">
            <div class="dtc v-mid vh-100 w-100 ph3 overflow-scroll">
                <div class="cf mw6 center br2 bg-light-gray pa3 relative overflow-x-scroll" style="max-height:90vh"> 

                    <i class="f6 fr fas fa-times pointer" @click="closePopup"></i>

                    <p class="f2-l f4 tracked fw6 bebas-font tc ttu tracked w-100"> Task's Blocker </p>

                    <div class="fl pa1 mv1 w-100">
                        <label class="db fw4 lh-copy f6 black">Description</label>
                        <textarea class="pa2 bn br2 w-100 bg-white" type="text" v-model="recordList.description" ></textarea>
                    </div>
                    <div class="fl pa1 mv1 w-100">
                        <label class="db fw4 lh-copy f6 black">Status</label>
                        <select class="pa2 bn br2 w-100 bg-white" id="status" name="status"  v-model="recordList.status">
                            <option value="Pending">Pending</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>

                    <div class="fl pa1 mv1 w-100">
                        <label class="db fw4 lh-copy f6 black">Resolution</label>
                        <textarea class="pa2 bn br2 w-100 bg-white" type="text" v-model="recordList.resolution" ></textarea>
                    </div>

                    <div class="fl pa1 mv1 w-100">
                        <div class="w-100 center dib pa2 br2 pointer fw6 tc bg-dark-gray near-white"  @click="save">
                            <i class="f7 fas fa-check"></i> UPDATE
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
        props: ["label","editable", 'reportid'],
        data() {return {
            url: "/api/admin//task-blocker/",
            id: 0,
            record: { },
            recordList: {},
            myprofile: { },
            isSave:true,
            
        }},
        components: { },
         watch: {
            reportid: function( oldReq, newReq ) {
                if(newReq){
                    this.record = this.reportid
                    if (this.record.blocker == null){
                         this.recordList = {}
                    } else {
                      this.recordList = this.reportid.blocker
                    }    
                }else {
                   this.record = {};  
                }
            }
        },
        created() {
           
        },
        mounted() {},
        methods: {
            save () {
                this.$emit('save');
                const app = this;
                app.id = this.record.id
                app.isSave = false;
                console.log(app.record)
                HTTP.post(app.url + app.id, app.recordList).then((response) => {
                    app.notifications = [response.data]
                    setTimeout(checkRedirect, 250, response.data)
                    app.isSave = true;  
                    this.recordList = {}               
                }).catch((e) => {
                    console.log(e)
                })
            }, 
            closePopup(){
                this.$emit('save');
                this.recordList = {}   
                },
        }
    };
</script>
