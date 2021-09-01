<template>
    <section>
        <label v-if="label!==''" class="fw4 lh-copy f6 black"> {{label}}:</label>
        <div class="w-100 inline-flex items-center light-gray">
            <input class="pa2 ba b--silver br2 br--left bn bg-black-20 w-100 fw2" placeholder="" @focus="gradeList=[]" type="text" @click="searchGrade" @keyup="searchUpdate" v-model="Grade">
            <span v-if="lSearching" class="pa2 bg-dark-gray near-white br2 br--right pointer">
                <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else :class="{'bg-red':GradeID!==0, 'bg-dark-gray':GradeID==0}" class="pa2 near-white br2 br--right pointer">
                <span v-if="GradeID==0&&gradeList.length==0" @click="searchGrade">
                    <i class="fas fa-search"></i>
                </span>
                <span v-else @click=" gradeList=[],Grade='',GradeID=0, objGrade = {}, updateGrade()">
                    <i class="fas fa-times"></i>
                </span>
            </span>
        </div>

        <div class="relative w-100">
            <ul v-if="gradeList.length>0" class="bg-dark-gray near-white z-3 absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:10em">
                <li class="ph2 pv3 bt b--white-10 f6" @click="objGrade = grade, GradeID = grade.ID, Grade=grade.name, gradeList = [], updateGrade()" v-for="(grade, index) in gradeList" :key="index">
                    <span class="f7">#{{index+1}}.</span> {{grade.name}}
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
            Grade:"",
            GradeID:0,
            objGrade:{},
            gradeList:[],
            lSearching: false,
            searchTimeout:{},
        }},
        components: {},
        created() { },
        methods: {
            searchGrade() {
                const app = this;
                // app.warehouseList = []
                clearTimeout(app.searchTimeout);
                app.lSearching = true
                var delay = (app.Grade.length == 0) ? 0 : 750;
                app.searchTimeout = setTimeout(function(app){
                    const url = "/api/jobs/salaries";
                    const search = {text: app.Grade, field: "name", limit: 20, skip: 0};
                    HTTP.get(url, search).then((response) => {
                        if (response.data.status != undefined) {
                            switch(response.data.status){
                                case "Success":
                                    app.gradeList = (response.data.data != null) ? response.data.data : []
                                break;
                            }
                        }
                        setTimeout(checkRedirect, 250, response.data);
                        app.lSearching = false
                    }).catch((e) => { console.log(e); app.lSearching = false })
                },delay, app)
            },
            updateGrade(){
                this.$emit('updateGrade', this.Grade, this.GradeID, this.objGrade);
            },
            searchUpdate(){
                this.updateGrade()
                this.searchGrade()
            }
        }
    };
</script>
