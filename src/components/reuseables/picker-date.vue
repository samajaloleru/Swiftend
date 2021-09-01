<template>
    <section>
        <label class=" fw4 lh-copy f6"> {{label}}:</label>
        <div class="w-100 inline-flex items-center light-gray relative">
            <input ref="pickdate" class="z-4 absolute pa2 bw1 w-100 " placeholder="" type="date" v-model="date" @change="updateDate">
            <input class="z-3 pa2 ba b--black-40 bw1 w-100 " placeholder="" readonly="readonly" type="text">
        </div>    
    </section>
</template>

<script type="text/javascript">
    import { HTTP } from "@/common";
    import {checkRedirect} from "@/common"

    export default {
        props: ["label"],
        data() {return {
            date: "",
        }},
        components: {},
        created() { },
        methods: {
            updateDate(){
                this.$emit('updateDate', this.date);
            }
        }
    };
</script>
