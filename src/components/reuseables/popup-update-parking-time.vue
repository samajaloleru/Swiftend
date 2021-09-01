<template>
    <section>
        <div class="cf w-100 dt z-max vh-100 fixed top-0 left-0 right-0 bg-black-50">
            <div class="dtc v-mid vh-100 w-100 ph3 overflow-scroll">
                <div class="cf mw6 center br2 bg-light-gray pa3 relative overflow-x-scroll" style="max-height:90vh"> 

                    <i class="f6 fr fas fa-times pointer" @click="closePopup"></i>

                    <p class="f2-l f4 tracked fw6 bebas-font tc ttu tracked w-100"> ClockIn Information </p>
                    <div class="fl pa1 mv1 w-100">
                        <div class="fl pa1 w-70">
                            <article class="justify-between w-100">
                                <div class="db f3 fw7 bebas-font tl">{{record.fullName}}</div>
                            </article>
                            <div class="fl w-100">
                                <div class="db tl fw5 f6">Current Plan:{{record.plan}}</div>
                                <div class="db tl fw5 f6">Expiry Date:{{dateConvert(record.createdAt)}}</div>
                            </div>
                        </div>

                    </div>
                    <div class="fl w-100 black">
                        <div class="cf w-100 center bg-near-white mt4 pa3">
                            <div class="fl w-50-ns w-100 pa1">
                                <label class="db fw4 lh-copy f6 ">Vehicle Name</label>
                                <input class="pa2 ba bg-white-60 b--black-40 bw1 w-100 f7" type="text" v-model="record.vehicleName"/>
                            </div>
                            
                            <div class="fl  w-50-ns w-100 pa1">
                                <label class="db fw4 lh-copy f6 ">Model</label>
                                <input class="pa2 ba bg-white-60 b--black-40 bw1 w-100 f7" type="text" v-model="record.model"/>
                            </div>
                             <div class="fl w-50-ns w-100 pa1">
                                <label class="db fw4 lh-copy f6 ">Plate Number</label>
                                <input class="pa2 ba bg-white-60 b--black-40 bw1 w-100 f7" type="text" v-model="record.plateNo"/>
                            </div>
                            
                            <div class="fl  w-50-ns w-100 pa1">
                                <label class="db fw4 lh-copy f6 ">Colour</label>
                                <input class="pa2 ba bg-white-60 b--black-40 bw1 w-100 f7" type="text" v-model="record.colour"/>
                            </div>
                             <div class="fl w-50-ns w-100 pa1">
                                <label class="db fw4 lh-copy f6 ">Clock In</label>
                                <input class="pa2 ba bg-white-60 b--black-40 bw1 w-100 f7" type="time" v-model="record.clockInDate"/>
                            </div>
                            
                            <div class="fl  w-50-ns w-100 pa1">
                                <label class="db fw4 lh-copy f6 ">Clock Out</label>
                                <input class="pa2 ba bg-white-60 b--black-40 bw1 w-100 f7" type="time" v-model="record.clockOutDate"/>
                            </div>
                        </div>
                    </div>

                
                   <div class="fl pa1 mv1 w-100">
                        <div v-if="!record.parking" class="w-100 center dib pa2 br2 pointer fw6 tc bg-dark-gray near-white"  @click="save">
                            <i class="f7 fas fa-check"></i> CREATE
                        </div>
                         <div v-else class="w-100 center dib pa2 br2 pointer fw6 tc bg-dark-gray near-white"  @click="edit">
                            <i class="f7 fas fa-check"></i> UPDATE
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </section>
</template>



<script type="text/javascript">
    import { HTTP, dateConvert } from "@/common";
    import {checkRedirect} from "@/common"
    export default {
        props: ["label","editable", "parking"],
        data() {return {
            url: "/api/parking/createParkingTime/",
            url2: "/api/parking/editParkingTime/",
            record: {},
            myprofile: {},
            isSave:true,
            
        }},
         watch: {
            parking: function( oldReq, newReq ) {
                if(newReq){
                    this.record = this.parking;
                }else {
                    this.record = oldReq; 
                }
            }
        },
        components: { },
        created() {  
        },
       mounted() {
        }, 
        methods: {
            dateConvert,
            save () {
                this.$emit('save');
                const app = this;
                app.isSave = false;
                HTTP.post(app.url + app.record.id, app.record).then((response) => {
                    app.notifications = [response.data]
                    setTimeout(checkRedirect, 250, response.data)
                    app.$router.push({name: 'parking-search'})
                    app.isSave = true;                   
                }).catch((e) => {
                    console.log(e)
                })
            }, 
            edit () {
                this.$emit('save');
                const app = this;
                app.isSave = false;
                HTTP.put(app.url2 + app.record.id, app.record).then((response) => {
                    app.notifications = [response.data]
                    setTimeout(checkRedirect, 250, response.data)
                    app.$router.push({name: 'parking-search'})
                    app.isSave = true;                   
                }).catch((e) => {
                    console.log(e)
                })
            }, 
            closePopup(){
                this.record= {}
                this.$emit('save');},
        }
    };
</script>
