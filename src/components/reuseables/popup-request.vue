<template>
    <section>
        <div class="cf w-100 dt z-max vh-100 fixed top-0 left-0 right-0 bg-black-50">
            <div class="dtc v-mid vh-100 w-100 ph3 overflow-scroll">
                <div class="cf mw6 center br2 bg-light-gray pa3 relative overflow-x-scroll" style="max-height:90vh"> 

                    <i class="f6 fr fas fa-times pointer" @click="closePopup"></i>

                    <p class="f2-l f4 tracked fw6 bebas-font tc ttu tracked w-100"> Update Request </p>

                     <div class="fl w-100">
                <div class="w-100 fl">
                    <div class="fl w-50 pa1">
                        <label class="db fw4 lh-copy f6 ">Name of Employee</label>
                        <input class="pa2 ba bg-white-60 b--black-40 bw1 w-100" type="text" v-model="record.employeeName"/>
                    </div>
                    
                     <div class="fl w-50-ns w-100 pa1">
                        <label class="db fw4 lh-copy f6 ">Request Type</label>
                         <input class="pa2 ba bg-white-60 b--black-40 bw1 w-100" type="text" v-model="record.type"/>
                    </div>
                    
                    <div class="fl w-50-ns w-100 pa1">
                        <label class="db fw4 lh-copy f6 ">Start Date</label>
                        <input class="pa2 ba bg-white-60 b--black-40 bw1 w-100 f7" type="date" v-model="record.startDate"/>
                    </div>

                    
                   <div class="fl w-50-ns w-100 pa1">
                        <label class="db fw4 lh-copy f6 ">End Date</label>
                        <input class="pa2 ba bg-white-60 b--black-40 bw1 w-100 f7" type="date" v-model="record.endDate"/>
                    </div>
                    <div class="fl w-100 pa1">
                        <label class="db fw4 lh-copy f6 ">Reason</label>
                        <textarea class="pa2 ba bg-white-60 b--black-40 bw1 w-100" type="text" v-model="record.reason"></textarea>
                    </div>
                    <div class="fl w-100 pa1">
                        <label class="db fw4 lh-copy f6 ">Decision Note</label>
                        <textarea class="pa2 ba bg-white-60 b--black-40 bw1 w-100" type="text" v-model="record.decisionNote"></textarea>
                    </div>
                    <div class="fl w-100 pa1">
                        <label class="db fw4 lh-copy f6 ">Status</label>
                        <select class="pa2 ba bg-white-60 b--black-40 bw1 w-100" id="status" name="status"  v-model="record.status">
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Not Approved">Not Approved</option>
                        </select>
                    </div>

                </div>
                
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
        props: ["label","editable", "request"],
        watch: {
            request: function( oldReq, newReq ) {
                if(newReq){
                    this.record = this.request;
                }else {
                    this.record = oldReq; 
                }
            }
        },
        data() {return {
            url: "/api/admin/request/",
            record: { },
            myprofile: { },
            isSave:true,
            
        }},
        components: { },
        
        created() {
            this.record = this.request
        },
        methods: {
            save () {
                this.$emit('save');
                const app = this;
                app.isSave = false;
                HTTP.put(app.url + app.record.id, app.record).then((response) => {
                    app.notifications = [response.data]
                    setTimeout(checkRedirect, 250, response.data)
                    app.isSave = true;                   
                }).catch((e) => {
                    console.log(e)
                })
            }, 
            closePopup(){this.$emit('save');
            this.record = {}
            },
        }
    };
</script>
