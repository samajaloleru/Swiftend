<template>
    <section>
        <label v-if="label!==''" class="fw4 lh-copy f6 black"> {{label}}:</label>
        <div class="w-100 inline-flex items-center light-gray">
            <input class="pa2 ba b--silver br2 br--left bw1 w-100 fw2" placeholder="" @focus="saleList=[]" type="text" @click="searchSale" @keyup="searchUpdate" v-model="Sale">
            <span v-if="lSearching" class="pa2 bg-dark-gray near-white br2 br--right pointer">
                <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else :class="{'bg-red':SaleID!==0, 'bg-dark-gray':SaleID==0}" class="pa2 near-white br2 br--right pointer">
                <span v-if="SaleID==0&&saleList.length==0" @click="searchSale">
                    <i class="fas fa-search"></i>
                </span>
                <span v-else @click=" saleList=[],Sale='',SaleID=0, objSale = {}, updateSale()">
                    <i class="fas fa-times"></i>
                </span>
            </span>
        </div>

        <div class="relative w-100">
            <ul v-if="saleList.length>0" class="bg-dark-gray near-white z-3 absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:10em">
                <li class="ph2 pv3 bt b--white-10 f6" @click=" objSale = sale, SaleID = sale.ID, Sale=sale.Code, saleList = [], updateSale()" v-for="(sale, index) in saleList" :key="index">
                    <span class="db f7 i">#{{index+1}}. - {{sale.Code}}</span> 
                    {{sale.Customer}}
                    <small class="db i">{{sale.Docdate}} {{sale.Doctime}}</small>
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
            showPending: false,
            Sale:"",
            SaleID:0,
            objSale: {},
            saleList:[],
            lSearching: false,
            searchTimeout:{},
        }},
        components: {},
        created() { 
            const app = this;
            app.showPending = (app.label.toLowerCase().indexOf("shopping") != -1) 
        },
        methods: {
            searchSale() {
                const app = this;
                // app.saleList = []
                clearTimeout(app.searchTimeout);
                app.lSearching = true
                var delay = (app.Sale.length == 0) ? 0 : 750;
                app.searchTimeout = setTimeout(function(app){
                    const url = "/api/sales/search";
                    const search = {text: app.Sale, field: "Code", limit: 20, skip: 0};

                    if (app.showPending) {
                        search.Workflow = "pending"
                        if (app.$parent.user !== undefined) {
                            search.reffield = "outletid"
                            search.refid = app.$parent.user.OutletID
                            search.userid = app.$parent.user.ID
                        }
                    }

                    HTTP.post(url, search).then((response) => {
                        if (response.data.Code != undefined) {
                            switch(response.data.Code){
                                case 200:
                                    app.saleList = (response.data.Body != null) ? response.data.Body : []
                                break;
                            }
                        }
                        setTimeout(checkRedirect, 250, response.data);
                        app.lSearching = false
                    }).catch((e) => { console.log(e); app.lSearching = false })
                },delay, app)
            },
            updateSale(){
                this.$emit('updateSale', this.Sale, this.SaleID, this.objSale);
            },
            searchUpdate(){
                this.updateSale()
                this.searchSale()
            }
        }
    };
</script>
