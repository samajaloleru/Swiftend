<template>
    <section>
        <label v-if="label!==''" class="fw4 lh-copy f6 black"> {{label}}:</label>
        <div class="w-100 inline-flex items-center light-gray">
            <input class="pa2 ba b--silver br2 br--left bw1 w-100 fw2" placeholder="" @focus="customerList=[]" type="text" @click="searchCustomer" @keyup="searchUpdate" v-model="Customer">
            <span v-if="lSearching" class="pa2 bg-dark-gray near-white br2 br--right pointer">
                <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else :class="{'bg-red':CustomerID!==0, 'bg-dark-gray':CustomerID==0}" class="pa2 near-white br2 br--right pointer">
                <span v-if="CustomerID==0&&customerList.length==0" @click="searchCustomer">
                    <i class="fas fa-search"></i>
                </span>
                <span v-else @click=" customerList=[],Customer='',CustomerID=0, objCustomer = {}, updateCustomer()">
                    <i class="fas fa-times"></i>
                </span>
            </span>
        </div>

        <div class="relative w-100">
            <ul v-if="customerList.length>0" class="bg-dark-gray near-white z-3 absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:10em">
                <li class="ph2 pv3 bt b--white-10 f6" @click=" objCustomer = customer, CustomerID = customer.ID, Customer=customer.Fullname, customerList = [], updateCustomer()" v-for="(customer, index) in customerList" :key="index">
                    <span class="f7">#{{index+1}}.</span> {{customer.Fullname}} <span v-if="showMobile"> - [{{customer.Mobile}}] </span>
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
            showMobile: false,
            Customer:"",
            CustomerID:0,
            objCustomer: {},
            customerList:[],
            lSearching: false,
            searchTimeout:{},
        }},
        components: {},
        created() {
            const app = this;
            const field = (app.label.toLowerCase().indexOf("mobile") != -1) ? "Mobile" : "Fullname"
            if (field == "Mobile") {
                this.showMobile = true
            }
         },
        methods: {
            searchCustomer() {
                const app = this;
                // app.customerList = []
                clearTimeout(app.searchTimeout);
                app.lSearching = true
                var delay = (app.Customer.length == 0) ? 0 : 750;
                app.searchTimeout = setTimeout(function(app){
                    const url = "/api/admin/members";
                    const field = (app.label.toLowerCase().indexOf("mobile") != -1) ? "Mobile" : "Fullname"

                    const search = {text: app.Customer, field: field, limit: 20, skip: 0,};
                    HTTP.get(url).then((response) => {
                        if (response.data.Code != undefined) {
                            switch(response.data.Code){
                                case 200:
                                    app.customerList = (response.data.Body != null) ? response.data.Body : []
                                break;
                            }
                        }
                        setTimeout(checkRedirect, 250, response.data);
                        app.lSearching = false
                    }).catch((e) => { console.log(e); app.lSearching = false })
                },delay, app)
            },
            updateCustomer(){
                this.$emit('updateCustomer', this.Customer, this.CustomerID, this.objCustomer);
            },
            searchUpdate(){
                this.updateCustomer()
                this.searchCustomer()
            }
        }
    };
</script>
