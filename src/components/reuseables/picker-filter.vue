<template>
    <span>
        <label v-if="label!==''" class="fw4 lh-copy f6 black"> {{label}}:</label>
        <div class="w-100 inline-flex items-center light-gray">
            <input class="pa2 ba b--silver br2 br--left bw1 w-100 fw2" placeholder="" @keyup="Filter=''" @click="searchFilter" type="text" v-model="Filter">
            <span v-if="lSearching" class="pa2 bg-dark-gray near-white br2 br--right pointer">
                <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else :class="{'bg-red':Filter!=='', 'bg-dark-gray':Filter==''}" class="pa2 near-white br2 br--right pointer">
                <span v-if="Filter==''&&filterList.length==0" @click="searchFilter">
                    <i class="fas fa-search"></i>
                </span>
                <span v-else @click=" filterList=[],Filter='', updateFilter()">
                    <i class="fas fa-times"></i>
                </span>
            </span>
        </div>

        <div class="relative w-100">
            <ul v-if="filterList.length>0" class="bg-dark-gray near-white z-3 absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:10em">
                <li class="ph2 pv3 bt b--white-10 f7 f6-ns" @click="Filter=filter, filterList = [], updateFilter()" v-for="(filter, index) in filterList" :key="index">
                    <span class="f7">#{{index+1}}.</span> {{filter}}
                </li>
            </ul>
        </div>        
    </span>
</template>

<script type="text/javascript">
    import { HTTP } from "@/common";
    import {checkRedirect} from "@/common"

    export default {
        props: ["label", "filters"],
        data() {return {
            Filter:"",
            filterList:[],
            lSearching: false,
            searchTimeout:{},
        }},
        components: {},
        created() { },
        methods: {
            searchFilter() {
                const app = this;
                app.filterList = []
                app.filterList = app.filters
            },
            updateFilter(){
                this.$emit('updateFilter', this.Filter);
            }
        }
    };
</script>
