<template>
    <section>
        <label v-if="label!==''" class="fw4 lh-copy f6 black"> {{label}}:</label>
        <div class="w-100 inline-flex items-center light-gray">
            <input class="pa2 ba b--silver br2 br--left bw1 w-100 fw2" placeholder="" @focus="locationList=[]" type="text" @click="searchLocation" @keyup="searchUpdate" v-model="Location">
            <span v-if="lSearching" class="pa2 bg-dark-gray near-white br2 br--right pointer">
                <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else :class="{'bg-red':LocationID!==0, 'bg-dark-gray':LocationID==0}" class="pa2 near-white br2 br--right pointer">
                <span v-if="LocationID==0&&locationList.length==0" @click="searchLocation">
                    <i class="fas fa-search"></i>
                </span>
                <span v-else @click=" locationList=[],Location='',LocationID=0, objLocation = {}, updateLocation()">
                    <i class="fas fa-times"></i>
                </span>
            </span>
        </div>

        <div class="relative w-100">
            <ul v-if="locationList.length>0" class="bg-dark-gray near-white z-3 absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:10em">
                <li class="ph2 pv3 bt b--white-10 f6" @click="objLocation = location, LocationID = location.id, Location=location.name, locationList = [], updateLocation()" v-for="(location, index) in locationList" :key="index">
                    <span class="f7">#{{index+1}}.</span> {{location.name}}
                </li>
            </ul>
        </div>        
    </section>
</template>

<script type="text/javascript">
    import { HTTP } from "@/common";
    import {checkRedirect} from "@/common"

    export default {
        props: ["label"],
        data() {return {
            Location:"",
            LocationID:0,
            objLocation:{},
            locationList:[],
            lSearching: false,
            searchTimeout:{},
        }},
        components: {},
        created() { },
        methods: {
            searchLocation() {
                const app = this;
                // app.warehouseList = []
                clearTimeout(app.searchTimeout);
                app.lSearching = true
                var delay = (app.Location.length == 0) ? 0 : 750;
                app.searchTimeout = setTimeout(function(app){
                    const url = "/api/admin/locations";
                    const search = {text: app.Location, field: "name", limit: 20, skip: 0};
                    HTTP.get(url, search).then((response) => {
                        if (response.data.status != undefined) {
                            switch(response.data.status){
                                case "Success":
                                    app.locationList = (response.data.data != null) ? response.data.data : []
                                break;
                            }
                        }
                        setTimeout(checkRedirect, 250, response.data);
                        app.lSearching = false
                    }).catch((e) => { console.log(e); app.lSearching = false })
                },delay, app)
            },
            updateLocation(){
                this.$emit('updateLocation', this.Location, this.LocationID, this.objLocation);
            },
            searchUpdate(){
                this.updateLocation()
                this.searchLocation()
            }
        }
    };
</script>
