<template>
    <span>
        <label v-if="label!==''" class="db fw4 lh-copy f6"> {{label}}</label>
        <input class="pa2 ba bg-white-60 b--black-40 bw1 w-100 " placeholder="" @click="searchFilter" @keyup="searchFilter" type="text" v-model="Filter">

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

    import {countryFilter} from "@/country"

    export default {
        props: ["label"],
        data() {return {
            Filter:"",
            filterList: [],
            lSearching: false,
            searchTimeout:{},
        }},
        components: {},
        created() { 
            this.searchFilter()
        },
        methods: {
            searchFilter() {
                const app = this;
                app.filterList = []
            
                for (var pair in countryFilter) {
                    console.log(countryFilter[pair])
                //     if (this.Filter !=="") {
                //         if (countryFilter[pair].includes(this.Filter.toUpperCase())) {
                //             app.filterList.push(countryFilter[pair])
                //         }
                //     } else {
                //         app.filterList.push(countryFilter[pair])
                //     }
                }
            },
            updateFilter(){
                this.$emit('updateFilter', this.Filter);
            }
        }
    };
</script>
