<template>
    <section>
        <label v-if="label!==''" class="fw4 lh-copy f6 black"> {{label}}:</label>
        <div class="w-100 inline-flex items-center light-gray">
            <input class="pa2 ba b--silver br2 br--left bn bg-black-20 w-100 fw2" placeholder="" @focus="stockList=[]" type="text" @click="searchStock" @keyup="searchUpdate" v-model="Stock">
            <span v-if="lSearching" class="pa2 bg-dark-gray near-white br2 br--right pointer">
                <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else :class="{'bg-red':StockID!==0, 'bg-dark-gray':StockID==0}" class="pa2 near-white br2 br--right pointer">
                <span v-if="StockID==0&&stockList.length==0" @click="searchStock">
                    <i class="fas fa-search"></i>
                </span>
                <span v-else @click=" stockList=[],Stock='',StockID=0, objStock = {}, updateStock()">
                    <i class="fas fa-times"></i>
                </span>
            </span>
        </div>

        <div class="relative w-100">
            <ul v-if="stockList.length>0" class="bg-dark-gray near-white z-3 absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:10em">
                <li class="ph2 pv3 bt b--white-10 f6" @click="objStock = stock, StockWarehouseID = stock.WarehouseID, StockID = stock.ID, Stock=stock.Item, stockList = [], updateStock()" v-for="(stock, index) in stockList" :key="index">
                    <span class="f7">#{{index+1}}.</span> {{stock.Item}}
                </li>
            </ul>
        </div>        
    </section>
</template>

<script type="text/javascript">
    import { HTTP } from "@/common";
    import {checkRedirect} from "@/common"

    export default {
        props:["label", "warehouseid"],
        data() {return {
            Stock:"",
            StockID:0,
            objStock: {},
            stockList:[],
            StockWarehouseID:0,
            lSearching: false,
            searchTimeout:{},
        }},
        components: {},
        created() { },
        methods: {
            checkWarehouseID(newid) {
                if(newid !== this.StockWarehouseID) {
                    this.Stock = "";
                    this.StockID = 0;
                    this.StockList = [];
                    this.StockWarehouseID = 0;
                    this.updateStock()
                }
            },
            searchStock() {
                const app = this;
                // app.stockList = []
                clearTimeout(app.searchTimeout);
                app.lSearching = true
                var delay = (app.Stock.length == 0) ? 0 : 750;
                app.searchTimeout = setTimeout(function(app){
                    const url = "/api/stocks/search";
                    const search = {text: app.Stock, field: "Title", limit: 20, skip: 0, RefID:app.warehouseid, RefField:"WarehouseID"};
                    HTTP.post(url, search).then((response) => {
                        if (response.data.Code != undefined) {
                            switch(response.data.Code){
                                case 200:
                                    app.stockList = (response.data.Body != null) ? response.data.Body : []
                                break;
                            }
                        }
                        setTimeout(checkRedirect, 250, response.data);
                        app.lSearching = false
                    }).catch((e) => { console.log(e); app.lSearching = false })
                },delay, app)
            },
            updateStock(){
                this.$emit('updateStock', this.Stock, this.StockID, this.objStock);
            },
            searchUpdate(){
                this.updateStock()
                this.searchStock()
            }
        }
    };
</script>
