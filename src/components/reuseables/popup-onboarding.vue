<template>
    <section>
        <div class="cf w-100 dt z-max vh-100 fixed top-0 left-0 right-0 bg-black-50">
            <div class="dtc v-mid vh-100 w-100 ph3 overflow-scroll">
                <div class="cf w-third-l w-50-m w-100 center-ns br2 bg-light-gray special special-font pa3-ns" style="max-height:90vh"> 

                    <p class="f4 tracked fw6 bebas-font tc ttu tracked w-100"> Let's build your dashboard </p>

                    <div class="cf w-100">
                        <div class="ph2 pb2 br3 br--bottom cf">
                            <div class="fl w-100" :class="{'':tabProps.usertypeShow,'dn':!tabProps.usertypeShow}">

                                <div class="f5 fw7 pv2">
                                    Hi, {{myprofile.data.profile.firstName}}
                                </div>
                                
                                <div class="f7 pv2">
                                   a. How will you be using this platform? 
                                </div>

                                <div class="cf mw6 center black">
                                    <div class="flex justify-between w-100 pv2">
                                        <div class="fl w-40 pointer tc pv3 br4 bg-dark-gray hover-bg-near-white white hover-dark-gray" :class="{'bg-near-white dark-gray':this.record.userType == 'Individual'}" @click="updateUserType('Individual')">
                                            <i class="fas f1 fa-user" :class="{'dark-gray':this.record.userType == 'Individual'}"></i>
                                            <div class="pt3 fw6" :class="{'dark-gray':this.record.userType == 'Individual'}">Individual</div>
                                        </div>

                                        <div class="fr w-40 pointer tc pv3 br4 bg-dark-gray hover-bg-near-white white hover-dark-gray" :class="{'bg-near-white dark-gray':this.record.userType == 'Business'}" @click="updateUserType('Business')">
                                            <i class="fas f1 fa-building" :class="{'dark-gray':this.record.userType == 'Business'}"></i>
                                            <div class="pt3 fw6" :class="{'dark-gray':this.record.userType == 'Business'}">Business</div>
                                        </div>
                                    </div>
                                </div>


                                <div class="fl f7 w-100 pv2" v-if="this.record.userType == 'Business' ">
                                    <div class="f7 pv2">
                                        b. Whats's your business name 
                                    </div>
                                   <input class="pa2 ba bg-white-60 b--black-20 bw1 w-100" type="text" v-model="record.businessName"/>
                                </div>

                                <div class="fl pa2 mv1 w-100">
                                    <div class="fr dib ph3 pv2 br2 pointer f6 items-center tc fw7 bg-yellow black" @click="toggleTab('plan')">
                                        NEXT
                                    </div>
                                </div>
                            </div>

                            <div class="cf w-100" :class="{'':tabProps.planShow,'dn':!tabProps.planShow}">

                                <div class="f7 fw6 pt2 pb3">
                                    Choose plan you interested in?
                                </div>

                                <planpicker ref="planpicker" @updatePlan="updatePlan" />

                                <div class="fl pa2 mt3 mb1 w-100">
                                    <div class="fl dib ph3 pv2 br2 pointer f6 items-center tc fw7 bg-yellow black" @click="toggleTab('')">
                                        BACK
                                    </div>
                                    <div class="fr dib ph3 pv2 br2 pointer f6 items-center tc fw7 bg-yellow black" @click="toggleTab('theme')">
                                        NEXT
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="fl w-100 pt3" :class="{'':tabProps.platformShow,'dn':!tabProps.platformShow}">
                                <div class="f7 pv2">
                                    Choose your top 3 things you will be using this platform for
                                </div>

                                <div class="fl f7 w-100 pt3 pb2 b">
                                    <div class="fl w-third tc">Business</div>
                                    <div class="fl w-third tc">Lifestyle</div>
                                    <div class="fl w-third tc">Networking</div>
                                </div>

                                <div class="fl pa2 mv1 w-100">
                                    <div class="fr dib ph3 pv2 br2 pointer f6 items-center tc fw7 bg-yellow black" @click="toggleTab('commute')">
                                        NEXT
                                    </div>
                                </div>
                            </div> -->

                            <!-- <div class="fl w-100 pt3" :class="{'':tabProps.commuteShow,'dn':!tabProps.commuteShow}">
                                <div class="f7 pb2">
                                    4/5
                                </div>

                                <div class="f7 pv2">
                                    On average, How do you intend to commute to a Workstation space? 
                                </div>

                                <div class="fl f7 w-100 pv2 b">
                                    <div class="fl w-20 pv2">Walk</div>
                                    <div class="fl w-20 pv2">Drive</div>
                                    <div class="fl w-20 pv2">Bus</div>
                                    <div class="fl w-20 pv2">Taxi</div>
                                    <div class="fl w-20 pv2">Other</div>
                                </div>

                                <div class="fl pa2 mv1 w-100">
                                    <div class="fr dib ph3 pv2 br2 pointer f6 items-center tc fw7 bg-yellow black" @click="toggleTab('theme')">
                                        NEXT
                                    </div>
                                </div>
                            </div> -->

                            <div class="fl w-100" :class="{'':tabProps.themeShow,'dn':!tabProps.themeShow}">
                                <div class="f7 pv2">
                                    What's your preferred theme
                                </div>

                                <div class="fl f7 w-100 pv2 b">
                                    <div class="fl tc w-100 ttu f5 fw7 mr3" @click="toggleTheme">
                                        Light<i class="ml1 mr1 fas pointer" :class="{'fa-toggle-on': theme, 'fa-toggle-off': !theme}" />Dark
                                    </div>
                                </div>

                                <div class="fl pa2 mv1 w-100">
                                    <div class="fl dib ph3 pv2 br2 pointer f6 items-center tc fw7 bg-yellow black" @click="toggleTab('plan')">
                                        BACK
                                    </div>
                                    <div class="fr dib ph3 pv2 br2 pointer f6 items-center tc fw7 bg-yellow black" @click="toggleTab('final')">
                                        FINISH
                                    </div>
                                </div>
                            </div>

                            <div class="fl w-100 pt3" :class="{'':tabProps.finalShow,'dn':!tabProps.finalShow}">
                                <div class="">
                                    <div class="fl w-100 tc pv2 f-subheadline"><i class="far fa-check-circle"></i></div>
                                    <div class="fl w-100 tc pv2 f6">You are all set. let's hop right in</div>
                                    <div class="fl w-100 tc pv2 f6 b pointer" @click="save" :class="{'bg-yellow':!save}">
                                        OPEN MY OFFICE
                                    </div>
                                </div>
                            </div>
                            
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
    import planpicker from '@/components/reuseables/picker-plan';
    export default {
        props: ["label","editable"],
        data() {return {
            url: "/user/profile",
            record: {id: "", userType:""},
            myprofile: { },
            theme: '',
            tabProps:{},
            isSave:true,
        }},
        components: { planpicker },
        computed: {
            themeCompute: function () {
                const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

                if (currentTheme) {
                    document.documentElement.setAttribute('data-theme', currentTheme);

                    // if (currentTheme === 'dark') {
                    //     toggleSwitch.checked = true;
                    // }
                }
                return currentTheme
            }
        },
        created() {
            this.toggleTab("");
            this.getMyProfile();
         },
        mounted() {},
        methods: {
            toggleTheme() {
                this.IsMenu = !this.IsMenu
                this.theme = this.theme == 'dark' ? '' : 'dark'; //toggles theme value
                document.documentElement.setAttribute('data-theme', this.theme); // updates the data-theme attribute

                localStorage.setItem('theme', this.theme); // stores theme value in local storage
            },
            updateUserType(UserType) {
                this.record.userType =  UserType
                console.log(this.record.userType);
            },
            updatePlan(PlanID) {
                this.record.userPlanId =  PlanID
                console.log(this.record.userPlanId);
            },
            getMyProfile(){
                let app = this
                let myprofile = localStorage.getItem("myprofile")
                if(myprofile !== null && myprofile !== undefined) {
                    app.myprofile = JSON.parse(myprofile)
                }

                if (app.myprofile.data.id == 0) {
                    app.$router.push({name: 'signin'})
                }
            },
            toggleTab(tabname) {
                switch(tabname) {
                default:
                    this.tabProps = {usertypeClass:" bb bw1 b--black-80",usertypeShow:true}
                    break;
                case "plan":
                    this.tabProps = {planClass:" bb bw1 b--black-80",planShow:true}
                    break;
                case "platform":
                    this.tabProps = {platformClass:" bb bw1 b--black-80",platformShow:true}
                    break;
                case "commute":
                    this.tabProps = {commuteClass:" bb bw1 b--black-80",commuteShow:true}
                    break;
                case "theme":
                    this.tabProps = {themeClass:" bb bw1 b--black-80",themeShow:true}
                    break;
                case "final":
                    this.tabProps = {finalClass:" bb bw1 b--black-80",finalShow:true}
                    break;
                }
            },
            resetProfile() {
                const app = this;
                HTTP.get("/user/profile").then((subresp) => {
                    let record =  (subresp.data == null) ? app.myprofile : subresp.data
                    console.log(record)
                    localStorage.setItem('myprofile', JSON.stringify(record));
                    app.$router.go({name:'dashboard'})
                }).catch((e) => {
                    console.log(e)
                })
            },
            save () {
                this.$emit('save');
                const app = this;
                app.isSave = false;
                //app.record.id = app.myprofile.data.id;

                console.log(app.record)

                HTTP.put(app.url, app.record).then((response) => {
                    app.notifications = [response.data]
                    setTimeout(checkRedirect, 250, response.data)
                    app.resetProfile();
                    app.isSave = true;
                })
                .catch((e) => {
                    console.log(e)
                })
            }, 
            closePopup(){this.$emit('save');},
        }
    };
</script>
