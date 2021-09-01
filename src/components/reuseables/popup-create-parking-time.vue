<template>
    <section>
        <div class="cf w-100 dt z-max vh-100 fixed top-0 left-0 right-0 bg-black-50">
            <div class="dtc v-mid vh-100 w-100 ph3 overflow-scroll">
                <div class="cf mw6 center br2 bg-light-gray pa3 relative overflow-x-scroll" style="max-height:90vh"> 

                    <i class="f6 fr fas fa-times pointer" @click="closePopup"></i>

                    <p class="f2-l f4 tracked fw6 bebas-font tc ttu tracked w-100"> Create Parking ClockIn and ClockOut </p>

                    <div class="fl pa1 mv1 w-70">
                        <label class="db fw4 lh-copy f6 black">Vechicle Name</label>
                        <input class="pa2 bn br2 w-100 bg-black-20 " type="text" v-model="record.vehicleName" />
                    </div>

                    <div class="fl pa1 mv1 w-30">
                        <label class="db fw4 lh-copy f6 black">Color</label>
                        <input class="pa2 bn br2 w-100 bg-black-20 " type="text" v-model="record.colour" />
                    </div>

                    <div class="fl pa1 mv1 w-50">
                        <label class="db fw4 lh-copy f6 black">Model</label>
                        <input class="pa2 bn br2 w-100 bg-black-20 " type="text" v-model="record.model" />
                    </div>

                    <div class="fl pa1 mv1 w-50">
                        <label class="db fw4 lh-copy f6 black">Plate Number</label>
                        <input class="pa2 bn br2 w-100 bg-black-20 " type="text" v-model="record.plateNo" />
                    </div>

                    <div class="fl pa1 mv1 w-50">
                        <label class="db fw4 lh-copy f6 black">ClockIn</label>
                        <input class="pa2 bn br2 w-100 bg-black-20 " type="time" v-model="record.clockInDate" />
                    </div>

                    <div class="fl pa1 mv1 w-50">
                        <label class="db fw4 lh-copy f6 black">ClockOut</label>
                        <input class="pa2 bn br2 w-100 bg-black-20" type="time" v-model="record.clockOutDate" />
                    </div>

                    <div class="fl pa1 mv1 w-100">
                        <label class="db fw4 lh-copy f6 black">Description</label>
                        <textarea class="pa2 bn br2 w-100 bg-black-20 " type="text" v-model="record.description" ></textarea>
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
            url: "/api/admin/createParkingTime/",
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
                app.id = this.$route.params.id
                app.isSave = false;
                console.log(app.record)
                HTTP.post(app.url + app.id, app.record).then((response) => {
                    app.notifications = [response.data]
                    setTimeout(checkRedirect, 250, response.data)
                    app.$router.push({name: 'parking-edit', params:{id:parking.id}})
                    app.isSave = true;                   
                }).catch((e) => {
                    console.log(e)
                })
            }, 
            closePopup(){this.$emit('save');},
        }
    };
</script>
