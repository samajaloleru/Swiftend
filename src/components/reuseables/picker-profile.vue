<template>
    <section>
        <label v-if="label!==''" class="db fw4 lh-copy f6 "> {{label}}</label>
        <div class="w-100 inline-flex items-center light-gray">
            <input class="pa2 ba bg-white-60 b--black-40 bw1 w-100 black" placeholder="" @focus="profileList=[]" type="text" @click="searchProfile" @keyup="searchUpdate" v-model="Profile">
            <span v-if="lSearching" class="pa2 bg-dark-gray near-white br2 br--right pointer">
                <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span v-else  class="pa2 near-white br2 br--right pointer bg-dark-gray">
                <span v-if="profileList.length==0" @click="searchProfile">
                    <i class="fas fa-search"></i>
                </span>
                <span v-else  @click=" profileList=[], Profile='', updateProfile(Profile)">
                    <i class="fas fa-times"></i>
                </span>
            </span>
        </div>

        <div class="relative w-100">
            <ul v-if="profileList.length>0" class="bg-dark-gray near-white z-3 absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:10em">
                <li class="ph2 pv3 bt b--white-10 f6" @click="objProfile = profile, Profile=profile.profile.firstName+' '+profile.profile.lastName, profileList = [], updateProfile(Profile)" v-for="(profile, index) in profileList" :key="index">
                    <span class="f7">#{{index+1}}.</span> {{profile.profile.firstName}}  {{profile.profile.lastName}}
                </li>
            </ul>
        </div>        
    </section>
</template>

<script type="text/javascript">
    import { HTTP } from "@/common";
    import {checkRedirect} from "@/common"

    export default {
        props: ["label", "url"],
        data() {return {
            Profile: "",
            ProfileID:0,
            objProfile: {},
            profileList:[],
            lSearching: false,
            searchTimeout:{},

        }},
        components: {},
        created() { },
        methods: {
            searchProfile(){
                const app = this
                app.lSearching = true
                if (app.Profile === undefined) {
                    app.Profile = ""
                }
                if (this.url == 'Staff'){
                      HTTP.get('/api/admin/user').then(response => {
                    if(response.data.data !== undefined ){
                        app.profileList = (response.data.data != null) ? response.data.data : []
                    }
                    app.lSearching = false
                }).catch(e => {
                    console.log(e.message)
                    app.lSearching = false
                })
                } else{
                    HTTP.get('/api/admin/members').then(response => {
                    if(response.data.data !== undefined ){
                        app.profileList = (response.data.data != null) ? response.data.data : []
                    }
                    app.lSearching = false
                }).catch(e => {
                    console.log(e.message)
                    app.lSearching = false
                })
                }
                
            },
            updateProfile(Profile){
                this.$emit('updateProfile', Profile, this.ProfileID, this.objProfile);
            },
            searchUpdate(){
                this.updateProfile()
                this.searchProfile()
            }
        }
    };
</script>
