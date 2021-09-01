<template>
    <section>
        <label v-if="label!==''" class="fw4 lh-copy f6 black"> {{label}}:</label>
        <div class="w-100 inline-flex items-center light-gray">
            <input class="pa2 ba b--silver br2 br--left bn bg-black-20 w-100 fw2" placeholder="" @focus="pricelistlineList=[]" type="text" @click="searchPricelistline" @keyup="searchUpdate" v-model="Pricelistline">
            <span v-if="lSearching" class="pa2 bg-dark-gray near-white br2 br--right pointer">
                <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else :class="{'bg-red':PricelistlineID!==0, 'bg-dark-gray':PricelistlineID==0}" class="pa2 near-white br2 br--right pointer">
                <span v-if="PricelistlineID==0&&pricelistlineList.length==0" @click="searchPricelistline">
                    <i class="fas fa-search"></i>
                </span>
                <span v-else @click=" pricelistlineList=[],Pricelistline='',PricelistlineID=0, objPricelistline = {}, updatePricelistline()">
                    <i class="fas fa-times"></i>
                </span>
            </span>
        </div>

        <div class="relative w-100">
            <ul v-if="pricelistlineList.length>0" class="bg-dark-gray near-white z-3 absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:10em">
                <li class="ph2 pv3 bt b--white-10 f6" @click=" objPricelistline = pricelistline, PricelistlineID = pricelistline.ID, Pricelistline=pricelistline.Item, pricelistlineList = [], updatePricelistline()" v-for="(pricelistline, index) in pricelistlineList" :key="index">
                    <span class="f7">#{{index+1}}.</span> {{pricelistline.Title}}
                </li>
            </ul>
        </div>        
    </section>
</template>

<script type="text/javascript">
    import { HTTP } from "@/common";
    import {checkRedirect} from "@/common"

    export default {
        props: ["label", "pricelistid"],
        data() {return {
            Pricelistline:"",
            PricelistlineID:0,
            objPricelistline: {},
            pricelistlineList:[],
            lSearching: false,
            searchTimeout:{},
        }},
        components: {},
        created() { },
        methods: {
            searchPricelistline() {
                const app = this;
                // app.pricelistlineList = []
                clearTimeout(app.searchTimeout);
                app.lSearching = true
                var delay = (app.Pricelistline.length == 0) ? 0 : 750;
                app.searchTimeout = setTimeout(function(app){
                    const url = "/api/pricelistlines/search";
                    const search = {text: app.Pricelistline, field: "Title", limit: 20, skip: 0, reffield:"pricelistid", refid: app.pricelistid};

                    HTTP.post(url, search).then((response) => {
                        if (response.data.Code != undefined) {
                            switch(response.data.Code){
                                case 200:
                                    app.pricelistlineList = (response.data.Body != null) ? response.data.Body : []
                                    // if (app.pricelistlineList.length == 1) {
                                    //     var pricelistline = app.pricelistlineList[0]
                                    //     app.objPricelistline = pricelistline
                                    //     app.PricelistlineID = pricelistline.ID
                                    //     app.Pricelistline = pricelistline.Title
                                    //     app.pricelistlineList = []
                                    //     app.updatePricelistline()
                                    // }
                                break;
                            }
                        }
                        setTimeout(checkRedirect, 250, response.data);
                        app.lSearching = false
                    }).catch((e) => { console.log(e); app.lSearching = false })
                },delay, app)
            },
            updatePricelistline(){
                this.$emit('updatePricelistline', this.Pricelistline, this.PricelistlineID, this.objPricelistline);
            },
            searchUpdate(){
                this.updatePricelistline()
                this.searchPricelistline()
            }
        }
    };
</script>
