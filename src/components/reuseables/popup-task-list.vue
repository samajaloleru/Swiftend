<template>
    <section>
        <div class="cf w-100 dt z-max vh-100 fixed top-0 left-0 right-0 bg-black-50">
            <div class="dtc v-mid vh-100 w-100 ph3 overflow-scroll">
                <div class="cf mw6 center br2 bg-light-gray pa3 relative overflow-x-scroll" style="max-height:90vh"> 
                    <popupBlocker :reportid="popupObject" @save="closePopupBlocker" :class="{'dn':!showPopupBlockers}"/>
                    <i class="f6 fr fas fa-times pointer" @click="closePopup"></i>

                    <p class="f2-l f4 tracked fw6 bebas-font tc ttu tracked w-100"> My Task </p>
                    <div class="fl pa1 mv1 w-100">
                        <div class="fl pa1 w-70">
                            <article class="justify-between w-100">
                                <div class="db f3 fw7 bebas-font tl">{{record.employeeName}}</div>
                            </article>
                            <div class="fl w-100">
                                <div class="db tl fw5 f6">Report Name:{{record.reportName}}</div>
                                <div class="db tl fw5 f6">Date:{{dateConvert(record.createdAt)}}</div>
                            </div>
                        </div>

                    </div>
                    <div class="fl w-100 pa1">
                         <section class="pv2 pv3-l ph1 ph2-l">
                            <table-display class="fl w-100 overflow-y-scroll" style="max-height:150px">
                                <template slot="tableHead" class="fixed">
                                    <tr class="tl white w-100 bg-dark-gray" >
                                        <td class="w2 pa1 f7 tc">
                                            <input type="checkbox" class="f1" v-model="isChecked" @click="checkAll"/>
                                        </td>
                                       <td class="pa2 w-60">Task</td>
                                       <td class="pa2 w-30">Status</td>
                                       <td class="pa2 w3">Blocker</td>
                                    </tr>
                                </template>
                                 <template slot="tableBody">
                                    <tr class="" v-for="(line, index) in recordList" :key="index">
                                        <td class="w2 ph1 tc f7">
                                            <input type="checkbox" class="f1" v-model="line.Checked" />
                                        </td>
                                        <td class="ph1 w-60 f7">
                                            <input class="pa1 ba b--silver br2 bg-white w-100" type="text"  v-model="line.task" >
                                        </td> 
                                        <td class="ph1 w-20 f7">
                                            <input class="pa1 ba b--silver br2 bg-white w-100" type="text"  v-model="line.status" >
                                        </td> 
                                         <td class="flex justify-content ph1 w-20 f7"> 
                                             <span  class="fr w-100 f7 fw7 pa2 pointer" @click="popupCreateBlocker(line)"> <i class="f7 fas fa-eye"></i></span>
                                        </td>                                      
                                    </tr>
                                    <tr class="h2"></tr>
                                </template>
                            </table-display>
                        
                            <div class="w-100 fl">
                               
                                <div class="fl w-80 black f6 tc"> &nbsp; 
                                    <span v-if="recordList.length < 1">
                                        There are currently no Tasks
                                    </span>
                                </div>
                              
                            </div>

                        </section>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>



<script type="text/javascript">
    import { HTTP, dateConvert } from "@/common";
    import {checkRedirect} from "@/common"
    import tableDisplay from "@/components/dashboard/tableDisplayMini"
     import popupBlocker from '@/components/reuseables/popup-create-blocker';
    export default {
        props: ["reportid"],
        data() {return {
            url: "api/admin/dailyReport/",
            url2: "api/admin/report-task/",
            record: { },
            myprofile: { },
            isSave:true,
            recordList: [],
            isChecked: false,
            popupObject: {},
            showPopupBlockers: false,
        }},
        watch: {
            reportid: function( oldReq, newReq ) {
                if(newReq){
                    this.record = this.reportid
                    this.recordList = this.reportid.tasks;
                }else {
                   this.record = oldReq;  
                }
            }
        },
        components: {tableDisplay, popupBlocker },
        created() { },
        mounted() {
        },
        methods: {
            dateConvert,
            addItem(){
                const app = this
                var curLine = {task:"",}
                app.recordList.push(curLine)
            },
            checkAll(){
                const app = this
                for (var index = 0, len = app.recordList.length; index < len; index++) {
                    app.recordList[index].Checked = !app.isChecked
                }
            },
            delItem(){
                const app = this
                app.isChecked = false
                var curRecordList = app.recordList
                app.recordList = []
                for (var index = 0, len = curRecordList.length; index < len; index++) {
                    var curLine = curRecordList[index];
                    if (!curLine.Checked) {
                        curLine.deadline = app.recordList.length+1
                        app.recordList.push(curLine)
                    }
                }
            },
             popupCreateBlocker(line){
                this.popupObject = line
                this.showPopupBlockers = !this.showPopupBlockers
            },
             popupViewBlocker(line){
                this.popupObject = line
                this.showPopupBlockers = !this.showPopupBlockers
            },
            closePopupBlocker(){
                this.showPopupBlockers = !this.showPopupBlockers
            },
            save () {
                this.$emit('save');
                const app = this;
                app.isSave = false;
                HTTP.post(app.url2 + app.record.id, app.recordList).then((response) => {
                    app.notifications = [response.data]
                    setTimeout(checkRedirect, 250, response.data)
                    app.$router.push({name: 'daily-report-search'})
                    app.isSave = true;                   
                }).catch((e) => {
                    console.log(e)
                })
            }, 
            closePopup(){this.$emit('save');},
        }
    };
</script>
