<template>
    <section>
        <label v-if="label!==''" class="fw4 lh-copy f6 black"> {{label}}:</label>
        <div class="w-100 inline-flex items-center light-gray">
            <input class="pa2 ba b--silver br2 br--left bn bg-black-20 w-100 fw2" placeholder="" @focus="purchaseList=[]" type="text" @click="searchPurchase" @keyup="searchUpdate" v-model="Purchase">
            <span v-if="lSearching" class="pa2 bg-dark-gray near-white br2 br--right pointer">
                <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else :class="{'bg-red':PurchaseID!==0, 'bg-dark-gray':PurchaseID==0}" class="pa2 near-white br2 br--right pointer">
                <span v-if="PurchaseID==0&&purchaseList.length==0" @click="searchPurchase">
                    <i class="fas fa-search"></i>
                </span>
                <span v-else @click=" purchaseList=[],Purchase='',PurchaseID=0, objPurchase = {}, updatePurchase()">
                    <i class="fas fa-times"></i>
                </span>
            </span>
        </div>

        <div class="relative w-100">
            <ul v-if="purchaseList.length>0" class="bg-dark-gray near-white z-3 absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:10em">
                <li class="ph2 pv3 bt b--white-10 f6" @click=" objPurchase = purchase, PurchaseID = purchase.ID, Purchase=purchase.Code, purchaseList = [], updatePurchase()" v-for="(purchase, index) in purchaseList" :key="index">
                    <span class="f7">#{{index+1}}.</span> {{purchase.Code}} - <small class="db i">{{purchase.Supplier}}</small>
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
            Purchase:"",
            PurchaseID:0,
            objPurchase: {},
            purchaseList:[],
            lSearching: false,
            searchTimeout:{},
        }},
        components: {},
        created() { },
        methods: {
            searchPurchase() {
                const app = this;
                // app.purchaseList = []
                clearTimeout(app.searchTimeout);
                app.lSearching = true
                var delay = (app.Purchase.length == 0) ? 0 : 750;
                app.searchTimeout = setTimeout(function(app){
                    const url = "/api/purchases/search";
                    const search = {text: app.Purchase, field: "Code", limit: 20, skip: 0};
                    HTTP.post(url, search).then((response) => {
                        if (response.data.Code != undefined) {
                            switch(response.data.Code){
                                case 200:
                                    app.purchaseList = (response.data.Body != null) ? response.data.Body : []
                                break;
                            }
                        }
                        setTimeout(checkRedirect, 250, response.data);
                        app.lSearching = false
                    }).catch((e) => { console.log(e); app.lSearching = false })
                },delay, app)
            },
            updatePurchase(){
                this.$emit('updatePurchase', this.Purchase, this.PurchaseID, this.objPurchase);
            },
            searchUpdate(){
                this.updatePurchase()
                this.searchPurchase()
            }
        }
    };
</script>
