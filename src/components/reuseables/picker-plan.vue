<template>
    <section>
        <label v-if="label!==''" class="db fw4 lh-copy f6 "> {{label}}</label>
        <div class="w-100 inline-flex items-center light-gray">
            <input class="pa2 ba bg-white-60 b--black-40 bw1 w-100 black" placeholder="" @focus="planList=[]" type="text" @click="searchPlan" @keyup="searchUpdate" v-model="Plan">
            <span v-if="lSearching" class="pa2 bg-dark-gray near-white br2 br--right pointer">
                <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else  class="pa2 near-white br2 br--right pointer bg-dark-gray">
                <span v-if="planList.length==0" @click="searchPlan">
                    <i class="fas fa-search"></i>
                </span>
                <span v-else  @click=" planList=[], PlanID=0, updatePlan(PlanID)">
                    <i class="fas fa-times"></i>
                </span>
            </span>
        </div>

        <div class="relative w-100">
            <ul v-if="planList.length>0" class="bg-dark-gray near-white z-3 absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:10em">
                <li class="ph2 pv3 bt b--white-10 f6" @click="objPlan = plan, PlanID = plan.id, Plan=plan.name, planList = [], updatePlan(PlanID)" v-for="(plan, index) in planList" :key="index">
                    <span class="f7">#{{index+1}}.</span> {{plan.name}}
                </li>
            </ul>
        </div>        
    </section>
</template>

<script type="text/javascript">
    import { HTTP } from "@/common";

    export default {
        props: ["label"],
        data() {return {
            Plan: "",
            PlanID:0,
            objPlan: {},
            planList:[],
            lSearching: false,
            searchTimeout:{},

        }},
        components: {},
        created() { },
        methods: {
            searchPlan(){
                const app = this
                app.lSearching = true
                if (app.Plan === undefined) {
                    app.Plan = ""
                }
                HTTP.get('/api/admin/plans').then(response => {
                    if(response.data.data !== undefined ){
                        app.planList = (response.data.data != null) ? response.data.data : []
                    }
                    app.lSearching = false
                }).catch(e => {
                    console.log(e.message)
                    app.lSearching = false
                })
                
            },
            updatePlan(Plan){
                this.$emit('updatePlan', Plan, this.PlanID, this.objPlan);
            },
            searchUpdate(){
                this.updatePlan()
                this.searchPlan()
            }
        }
    };
</script>
