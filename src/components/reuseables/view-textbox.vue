<template>
    <section>
        <label class=" fw4 lh-copy f6 black"> {{label}}:</label>
        <div class="w-100 inline-flex items-center light-gray">
            <input class="pa2 bn br2 w-100 bg-black-20" :class="{'br--left':route!==undefined}" type="text" disabled="disabled" :value="text">
            <span v-if="route!==undefined" class="pa2 bg-dark-gray near-white br2 br--right pointer" @click="goTo">
                <i class="fas fa-eye"></i>
            </span>
        </div>
    </section>
</template>

<script type="text/javascript">
    import { HTTP } from "@/common";
    import {checkRedirect} from "@/common"

    export default {
        props: ["label", "text", "route", "id"],
        data() {return {}},
        components: {},
        created() { },
        methods: {
            goTo(){
                var router = {}
                if (this.route !== undefined){
                    router.name = this.route
                }

                if (this.id !== undefined){
                    router.params = {id: this.id}
                }

                if (router.name !== undefined){
                    this.$router.push(router)
                }
            },
        }
    };
</script>
