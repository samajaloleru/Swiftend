<template>
    <section>
        <div class="cf w-100 dt z-max vh-100 fixed top-0 left-0 right-0 bg-black-50">
            <div class="dtc v-mid vh-100 w-100 ph3 overflow-scroll">
                <div class="cf mw6 center br2 bg-light-gray pa3 relative overflow-x-scroll" style="max-height:90vh"> 

                    <i class="f6 fr fas fa-times pointer" @click="closePopup"></i>

                    <p class="f2-l f4 tracked fw6 bebas-font tc ttu tracked w-100"> Parking Information </p>
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
                            <article class="fl w-100">
                                <div class="fl w-100 pt3 overflow-auto">
                                    <table class="f6-l w-100 mw9 center" cellspacing="0">
                                        <thead class="f5">
                                            <tr>
                                                <th class="fw6 bb b--yellow bw1 tl pb1 pr3"></th>
                                                <th class="fw6 bb b--yellow bw1 tl pb1 pr3">Vehicle</th>
                                                <th class="fw6 bb b--yellow bw1 tl pb1 pr3">Plate Number</th>
                                                <th class="fw6 bb b--yellow bw1 tl pb1 pr3">Model</th>
                                                <th class="fw6 bb b--yellow bw1 tl pb1 pr3">Colour</th>
                                                 <th class="fw6 bb b--yellow bw1 tl pb1 pr3">Date</th>
                                                  <th class="fw6 bb b--yellow bw1 tl pb1 pr3">Time In</th>
                                                   <th class="fw6 bb b--yellow bw1 tl pb1 pr3">Time Out</th>
                                                <th class="fw6 bb b--yellow bw1 tl pb1 pr3"></th>
                                            </tr>
                                        </thead>
                                        <tbody class="lh-copy pointer" v-for="(parking, index) in record.parking" :key="index">
                                            <tr>
                                                <td class= "pv3 bb b--black-20">
                                                    <span><input type="checkbox" class="mt3 bb b--black-20"/></span>
                                                </td>
                                                <td class= "pv3 pr3 bb b--black-20">{{parking.vehicleName}}
                                                <td class= "pv3 pr3 bb b--black-20">{{parking.plateNo}}</td>
                                                <td class= "pv3 pr3 bb b--black-20">{{parking.model}}</td>
                                                <td class= "pv3 pr3 bb b--black-20">{{parking.colour}}</td>
                                                <td class= "pv3 pr3 bb b--black-20">{{dateConvert(parking.createdAt)}}</td>
                                                <td class= "pv3 pr3 bb b--black-20">{{parking.clockInDate}}</td>
                                                <td class= "pv3 pr3 bb b--black-20">{{parking.clockOutDate}}</td>
                                                <td class= "pv3 bb b--black-20">
                                                    <span  class="w-60 f5 fw7 pa2 tc black bg-yellow fl bb b--black-20"><i class="fas fa-ellipsis-v" /></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </article>
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
            url: "/api/admin/editParkingTime/",
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
            closePopup(){
                this.record= {}
                this.$emit('save');},
        }
    };
</script>
