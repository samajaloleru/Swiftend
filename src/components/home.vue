<template>
    <section class=" bg-near-white">
        <div class="fl w-100">
            <div class="flex cf w-90-ns pt4 center items-center ph3">
                <div class="w4-l w1">
                    <div class="nr7 relative">
                        <div class="cf w-90-ns w-100 black bg-white shadow-1 pa4-l pa3">
                            <div class="fl w-100 pt2-l">
                                <div class="bebas-font f2 ttu pb1-l">Welcome To</div>
                                <span class="bebas-font f2 ttu">Access Facepay</span>
                            </div>
                            
                            <div class="fl w-100 pt2">
                                <div class="f6 measure lh-copy overpass-font b">
                                    Fill the form Below
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="w-90">
                    <div class="cf w-100 vh-75-l vh-50" :style="{backgroundImage: 'url('+require('@/assets/img/payment.jpg')+')' , backgroundPosition: 'center', backgroundRepeat:'no-repeat'}">
                       
                    </div>
                </div>
                
            </div>
        </div>
        
        <div class="fl w-100">
            <div class="cf w-90-l w-100 center pa3-l mt0-l mt4">
                <div class="fl w-100 pa2 pr5">
                    <div class="cf w-60 center" :class="{'dn':!(formLevel == 1),}">
                        <div class="f3 black tc mv2">Take Selfie</div>
                        <smart-camera-web capture-id="back"></smart-camera-web>
                        <div class="pointer ph5 pv2 fr bg-yellow" @click="formLevel = 2">
                            Next
                        </div>
                    </div>
                    <div class="cf w-60 center" :class="{'dn':!(formLevel == 2),}">
                        <div class="f3 black tc mv2">Add your Phone Number or BVN</div>
                        <div class="cf center w-60 mv4">
                            <input class="inputfield mv3 pa3 bg-transparent fl w-100" type="number" placeholder="Phone Number" />
                            <input class="inputfield mv3 pa3 bg-transparent fl w-100" type="text" placeholder="BVN" />
                        </div>
                        <div class="pointer ph5 pv2 fl white bg-black" @click="formLevel = 1">
                            Back
                        </div>
                        <div class="pointer ph5 pv2 fr bg-yellow" @click="formLevel = 3">
                            Next
                        </div>
                    </div>
                    <div class="cf w-60 center" :class="{ 'dn':!(formLevel == 3),}">
                        <div class="f3 black tc mv2">Consent</div>
                        <div class="f6 black tc mv2">Permit us to use the info provided</div>
                        <div class="cf center w-30 mv4">
                            <div class="fl w-100 f8 b pointer" @click="ifConsent">
                                <div v-if="isConsent" class="br-pill fr pl4 pv2 mb5 dt w-100 black bg-yellow">
                                    <span class="dtc v-mid f2">Yes</span>
                                    <span class="dtc v-mid f5">
                                        <i class="fa fa-circle f1 white"/>
                                    </span>
                                </div>
                                <div v-if="!isConsent" class="br-pill fr pl4 mb5 pv2 dt w-100 black bg-white">
                                    <span class="dtc v-mid f5">
                                        <i class="fa fa-circle f1 black"/>
                                    </span>
                                    <span class="dtc v-mid f2">No</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="pointer ph5 pv2 fl white bg-black" @click="formLevel = 2">
                            Back
                        </div>
                        <div class="pointer ph5 pv2 fr bg-yellow" @click="confirm()">
                            Next
                        </div>
                    </div>
                    <div class="cf w-90 center white" :class="{'dn': formLevel != 4}">
                        <div class="cf center w-30 mv4">
                            <div class="fl w-100">
                                <article class="dt w-100 bg-black mv4 tc" v-if="elementVisible">
                                    <div class="fl w-100 mt2">
                                        <img src="@/assets/img/success.svg" class="dib w-100 ttu">
                                    </div>
                                    <div class="fl w-100 ph1 overpass-font mt3 mb2">
                                        <div class="f2 b pb2" style="color : #FFCC33">Woohoo!</div>
                                        <div class="f6 b pb2">You are verified succesfully!</div>
                                    </div>
                                </article>                                  
                                <article class="dt w-100 mt4 tc" v-if="!elementVisible">
                                    <div class="fl w-100 ph1 overpass-font mt3 mb2">
                                        <div class="f6 black tc mv2">Select Service</div>
                                        <select class="f7 black-60 bg-transparent overflow-hidden select w-100 pv2 ph1 bw1 b--black-60">
                                            <option value="business">Pay Bills</option>
                                            <option value="individual">An Individual </option>
                                            <option value="business">An Agent/ A Broker </option>
                                        </select>
                                    </div>
                                </article>                                   
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fl w-100 h3"></div>
            </div>
        </div>
     
    </section>

</template>
<script type="text/javascript">
    export default {
        data() {return { 
            notifications:[],
            formLevel: 1,
            isConsent: false, lSubmit: true,
            elementVisible:true
            
        }},
        components: {
        },
        computed: {
            
        },
        watch : {
            
        },
        mounted() {
            //scrolls the image slider left
        },
        methods: {
           ifConsent(){
                this.isConsent = !this.isConsent
            },
            confirmHandler(){
                this.formLevel = 4
                setTimeout(() => this.elementVisible = false, 2000)
                console.log(this.record);
            },
            confirm(){
                var app = this;

                app.lSubmit = false;
    
                this.confirmHandler()
            
            },
        }
    };
</script>