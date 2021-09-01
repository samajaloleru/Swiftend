<template>
    <section>
        <label v-if="label!==''" class="fw4 lh-copy f6 black"> {{label}}:</label>
        <div class="w-100 inline-flex items-center light-gray">
            <input class="pa2 ba b--silver br2 br--left bn bg-black-20 w-100 fw2" placeholder="" @focus="functionsList=[]" type="text" @click="searchFunctions" @keyup="searchUpdate" v-model="Functions">
            <span v-if="lSearching" class="pa2 bg-dark-gray near-white br2 br--right pointer">
                <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else :class="{'bg-red':FunctionsID!==0, 'bg-dark-gray':FunctionsID==0}" class="pa2 near-white br2 br--right pointer">
                <span v-if="FunctionsID==0&&functionsList.length==0" @click="searchFunctions">
                    <i class="fas fa-search"></i>
                </span>
                <span v-else @click=" functionsList=[],Functions='',FunctionsID=0, objFunctions = {}, updateFunctions()">
                    <i class="fas fa-times"></i>
                </span>
            </span>
        </div>

        <div class="relative w-100">
            <ul v-if="functionsList.length>0" class="bg-dark-gray near-white z-3 absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:10em">
                <li class="ph2 pv3 bt b--white-10 f6" @click="objFunctions = functions, FunctionsID = functions.ID, Functions=functions.name, functionsList = [], updateFunctions()" v-for="(functions, index) in functionsList" :key="index">
                    <span class="f7">#{{index+1}}.</span> {{functions.name}}
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
            Functions:"",
            FunctionsID:0,
            objFunctions:{},
            functionsList:[],
            lSearching: false,
            searchTimeout:{},
        }},
        components: {},
        created() { },
        methods: {
            searchFunctions() {
                const app = this;
                // app.warehouseList = []
                clearTimeout(app.searchTimeout);
                app.lSearching = true
                var delay = (app.Functions.length == 0) ? 0 : 750;
                app.searchTimeout = setTimeout(function(app){
                    const url = "/api/jobs/functions";
                    const search = {text: app.Functions, field: "name", limit: 20, skip: 0};
                    HTTP.get(url, search).then((response) => {
                        if (response.data.status != undefined) {
                            switch(response.data.status){
                                case "Success":
                                    app.functionsList = (response.data.data != null) ? response.data.data : []
                                break;
                            }
                        }
                        setTimeout(checkRedirect, 250, response.data);
                        app.lSearching = false
                    }).catch((e) => { console.log(e); app.lSearching = false })
                },delay, app)
            },
            updateFunctions(){
                this.$emit('updateFunctions', this.Functions, this.FunctionsID, this.objFunctions);
            },
            searchUpdate(){
                this.updateFunctions()
                this.searchFunctions()
            }
        }
    };
</script>
