<template>
    <section>
        <div class="cf w-100 dt z-max vh-100 fixed top-0 left-0 right-0 bg-black-50 dark-gray">
            <div class="dtc v-mid vh-100 w-100 ph3 overflow-scroll">
                <div class="cf mw5 center br2 bg-light-gray pa3 relative overflow-x-scroll" style="max-height:90vh"> 

                    <i class="f6 fr fas fa-times pointer" @click="closePopup"></i>

                    <p class="f5 tc tracked w-100"> 
                        <span v-if="editable"> ADD NEW </span>
                        <span v-else> VIEW </span>
                        INVOICE LINE 
                    </p>
                    
            
                    <!-- <span :class="{'dn':!editable}">
                        <div :class="{'dn':invoicetype=='Supplier Invoice'}" class="fl pa1 mv1 w-100">
                            <pricelistlinepicker ref="pricelistline" :pricelistid="pricelistid" label="Pricelist Item" @updatePricelistline="updatePricelistline" />
                        </div>

                        <div :class="{'dn':invoicetype!=='Supplier Invoice'}" class="fl pa1 mv1 w-100">
                            <stockpicker ref="stock" :warehouseid="warehouseid" label="Stock Item" @updateStock="updateStock" />
                        </div>
                    </span> -->

                    <div class="fl pa1 mv1 w-100">
                        <label class="db fw4 lh-copy f6 black">Item:</label>
                        <input class="pa2 bn br2 w-100 bg-black-20 " type="text" placeholder="" :disabled="!editable" :value="objInvoiceline.Title" />
                    </div>


                    <div class="fl pa1 mv1 w-30">
                        <label class="db fw4 lh-copy f6 black">Quantity:</label>
                        <input class="pa2 bn br2 w-100 bg-black-20 " type="number" placeholder="" :disabled="!editable" v-model.number="objInvoiceline.Quantity" />
                    </div>

                    <div class="fl pa1 mv1 w-30">
                        <label class="db fw4 lh-copy f6 black">Tax:</label>
                        <input class="pa2 bn br2 w-100 bg-black-20 " type="number" placeholder="" :disabled="!editable" v-model.number="objInvoiceline.Taxpercent" />
                    </div>
                    
                    <div class="fl pa1 mv1 w-40">
                        <label class="db fw4 lh-copy f6 black">Amount:</label>
                        <input class="pa2 bn br2 w-100 bg-black-20 " type="number" placeholder="" :disabled="!editable" v-model.number="objInvoiceline.Amount" />
                    </div>
                    
                    
                    <div v-if="editable" class="fr pa1 mv1 w-40">
                        <label class="db fw4 lh-copy f6 black">&nbsp;</label>
                        <div class="fr dib pa2 br2 pointer fw6 tc bg-dark-gray near-white"  @click="closePopup">
                            <i class="f7 fas fa-check"></i> SAVE
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
    import stockpicker from '@/components/reuseables/picker-stock'; 
    import pricelistlinepicker from '@/components/reuseables/picker-pricelistline'; 
    
    export default {
        props: ["label","editable","invoicetype","pricelistid","warehouseid"],
        data() {return {
            objInvoiceline: {ID:0, Lineno:0, ItemID:0, Title:"", Amount:0, Quantity:0, Taxpercent:0, Taxamount:0, Totalexcltax:0, Totalincltax:0, StockID:0, PricelistlineID:0 }
        }},
        components: { stockpicker, pricelistlinepicker },
        created() { },
        mounted() {},
        methods: {
            updateInvoiceline(){
                this.$emit('updateInvoiceline', this.objInvoiceline );
                this.objInvoiceline = {ID:0, Lineno:0, ItemID:0, Title:"", Amount:0, Quantity:0, Taxpercent:0, Taxamount:0, Totalexcltax:0, Totalincltax:0, StockID:0, PricelistlineID:0 }
                this.setPricelistline()
                this.setStock()
            },
            closePopup(){
                this.updateInvoiceline()
            },
            setStock(){
                this.$refs.stock.Stock = this.objInvoiceline.Title
                this.$refs.stock.StockID =  this.objInvoiceline.StockID
            },
            updateStock(stock, stockid, objStock){
                this.$delete(objStock,"ID")
                this.$delete(objStock,"Docdate")
                this.$delete(objStock,"Validfrom")
                this.$delete(objStock,"Validtill")
                this.$delete(objStock,"Createdate")
                this.$delete(objStock,"Updatedate")
                this.$delete(objStock,"Createdby")
                this.$delete(objStock,"Updatedby")

                this.objInvoiceline = objStock
                this.objInvoiceline.Title = objStock.Item
                this.objInvoiceline.Stock = objStock.Item
                this.objInvoiceline.StockID = stockid
                this.objInvoiceline.Amount = objStock.Price
                // this.objInvoiceline.Taxpercent = 0
                this.objInvoiceline.Quantity = objStock.ReorderQty
            },
            setPricelistline(){
                this.$refs.pricelistline.Pricelistline = this.objInvoiceline.Title
                this.$refs.pricelistline.PricelistlineID =  this.objInvoiceline.PricelistlineID
            },
            updatePricelistline(pricelistline, pricelistlineid, objPricelistline){
                this.$delete(objPricelistline,"ID")
                this.$delete(objPricelistline,"Docdate")
                this.$delete(objPricelistline,"Validfrom")
                this.$delete(objPricelistline,"Validtill")
                this.$delete(objPricelistline,"Createdate")
                this.$delete(objPricelistline,"Updatedate")
                this.$delete(objPricelistline,"Createdby")
                this.$delete(objPricelistline,"Updatedby")

                this.objInvoiceline = objPricelistline
                this.objInvoiceline.Pricelistline = pricelistline
                this.objInvoiceline.PricelistlineID = pricelistlineid
                this.objInvoiceline.Amount = objPricelistline.Amount
                this.objInvoiceline.Taxpercent = objPricelistline.Tax
                this.objInvoiceline.Quantity = 0
            },
        }
    };
</script>
