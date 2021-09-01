<template>
    <section>
        <label v-if="label!==''" class="fw4 lh-copy f6 black"> {{label}}:</label>
        <div class="w-100 inline-flex items-center light-gray">
            <input class="pa1 ba b--silver br2 br--left bn bg-black-20 w-100 fw2" placeholder="" @focus="outletList=[]" type="text" @click="searchOutlet" @keyup="searchUpdate" v-model="Outlet">
            <span v-if="lSearching" class="pa2 bg-dark-gray near-white br2 br--right pointer">
                <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else :class="{'bg-red':OutletID!==0, 'bg-dark-gray':OutletID==0}" class="pa2 near-white br2 br--right pointer">
                <span v-if="OutletID==0&&outletList.length==0" @click="searchOutlet">
                    <i class="fas fa-search"></i>
                </span>
                <span v-else @click=" outletList=[],Outlet='',OutletID=0, objOutlet = {}, updateOutlet()">
                    <i class="fas fa-times"></i>
                </span>
            </span>
        </div>

        <div class="relative w-100">
            <ul v-if="outletList.length>0" class="bg-dark-gray near-white z-3 absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:10em">
                <li class="ph2 pv3 bt b--white-10 f6" @click=" objOutlet = outlet, OutletID = outlet.ID, Outlet=outlet.Title, outletList = [], updateOutlet()" v-for="(outlet, index) in outletList" :key="index">
                    <span class="f7">#{{index+1}}.</span> {{outlet.Title}}
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
            Outlet:"",
            OutletID:0,
            objOutlet: {},
            outletList:[],
            lSearching: false,
            searchTimeout:{},
        }},
        components: {},
        created() { },
        methods: {
            searchOutlet() {
                const app = this;
                // app.outletList = []
                clearTimeout(app.searchTimeout);
                app.lSearching = true
                var delay = (app.Outlet.length == 0) ? 0 : 750;
                app.searchTimeout = setTimeout(function(app){
                    const url = "/api/outlets/search";
                    const search = {text: app.Outlet, field: "Title", limit: 20, skip: 0};
                    HTTP.post(url, search).then((response) => {
                        if (response.data.Code != undefined) {
                            switch(response.data.Code){
                                case 200:
                                    app.outletList = (response.data.Body != null) ? response.data.Body : []
                                break;
                            }
                        }
                        setTimeout(checkRedirect, 250, response.data);
                        app.lSearching = false
                    }).catch((e) => { console.log(e); app.lSearching = false })
                },delay, app)
            },
            setOutlet(outlet, outletid) {
                this.Outlet = outlet
                this.OutletID = outletid
                alert();
            },
            updateOutlet(){
                this.$emit('updateOutlet', this.Outlet, this.OutletID, this.objOutlet);
            },
            searchUpdate(){
                this.updateOutlet()
                this.searchOutlet()
            }
        }
    };
</script>
