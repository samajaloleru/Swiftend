<template>
    <div class="flex  z-max">
        <div class="fl w-100 h-50 tr pl4 pr2 pointer">
            <div class="ph2 mv2 dim  dn-l" @click="$parent.lShow=false,toggleMenu()" >
                <p class="tc fw6 f6">
                    CLOSE
                </p>
            </div>

            <div v-if="myprofile.data.dashboardType === 'Super Adminsssss' " class="tl pt4 f7 fl w-100 bg-ligt-gray pointer">
                <img src="@/assets/logo_wyt.svg" class="h2" />
                <div class="fl pv3 w-100 "  @click="$router.push({ name: 'dashboard'})"> <i class="fa fa-folder-open pr2" /> DASHBOARD </div>
                <div class="fl pv3 w-100 " @click="toggleSubMenu('pos')"> <i class="fa fa-circle pr2" />  MEMBERS </div>
                <div class="fl pv3 w-100 " @click="toggleSubMenu('webstore')"> <i class="fa fa-briefcase pr2" />  WORKFLOW </div>
                <div class="fl pv3 w-100 " @click="$router.push({name:'employees-search'})"> <i class="fa fa-users pr2" />  EMPLOYEES </div>
                <div class="fl pv3 w-100 " @click="$router.push({name:'report-search'})"> <i class="fa fa-server pr2" />  REPORTS </div>
                <div class="fl pv3 w-100 " @click="$router.push({name:'profile'})"> <i class="fa fa-user pr2" />  PROFILE </div>
                <div class="fl m-auto pv3 mt6 black tc b br2 w-90 " style="background : #FFCC33" @click="logout()">  LOGOUT </div>
            </div>
            <div v-if="myprofile.data.dashboardType === 'Human Resource' " class="tl pt4 f7 fl w-100 bg-ligt-gray pointer">
                <img src="@/assets/logo_wyt.svg" class="h2" />
                <div class="fl pv3 w-100 click-gold link" style="active : #FFCC33"  @click="$router.push({ name: 'dashboard'})"> <i class="fa fa-folder-open pr2" /> DASHBOARD </div>
                <div class="fl pv3 w-100 " @click="toggleSubMenu('hr')"> <i class="fa fa-briefcase pr2" />  WORKFLOW </div>
                <div class="fl pv3 w-100 " @click="$router.push({name:'employees-search'})"> <i class="fa fa-users pr2" />  EMPLOYEES </div>
                <div class="fl pv3 w-100 " @click="$router.push({name:'report-search'})"> <i class="fa fa-server pr2" />  REPORTS </div>
                <div class="fl pv3 w-100 " @click="$router.push({name:'profile'})"> <i class="fa fa-user pr2" />  PROFILE </div>
                <div class="fl m-auto pv3 mt6 black tc b br2 w-90 " style="background : #FFCC33" @click="logout()">  LOGOUT </div>
            </div>
            <div v-if="myprofile.data.dashboardType === 'Information Technology' " class="tl pt4 f7 fl w-100 bg-ligt-gray pointer">
                <img src="@/assets/logo_wyt.svg" class="h2" />
                <div class="fl pv3 w-100 "  @click="$router.push({ name: 'dashboard'})"> <i class="fa fa-folder-open pr2" /> DASHBOARD </div>
                <div class="fl pv3 w-100 " @click="toggleSubMenu('it')"> <i class="fa fa-circle pr2" />  WORKFLOW </div>
                <div class="fl pv3 w-100 " @click="$router.push({name:'employees-search'})"> <i class="fa fa-users pr2" />  EMPLOYEES </div>
                <div class="fl pv3 w-100 " @click="$router.push({name:'profile'})"> <i class="fa fa-user pr2" />  PROFILE </div>
                <div class="fl m-auto pv3 mt6 black tc b br2 w-90 " style="background : #FFCC33" @click="logout()">  LOGOUT </div>
            </div>
            <div class="tl pt4 f7 fl w-100 bg-ligt-gray pointer">
                <img src="@/assets/logo_wyt.svg" class="h2" />
                <div class="fl pv3 w-100 "  @click="$router.push({ name: 'dashboard'})"> <i class="fa fa-folder-open pr2" /> DASHBOARD </div>
                <!-- <div class="fl pv3 w-100 " @click="toggleSubMenu('am')"> <i class="fa fa-briefcase pr2" />  PROFILES </div> -->
                <div class="fl pv3 w-100 " @click="toggleSubMenu('am3')"> <i class="fa fa-user pr2" />  WORKFLOW </div>
                <div class="fl pv3 w-100 " @click="toggleSubMenu('am2')"> <i class="fa fa-users pr2" />  ACCOUNTS </div>
                <div class="fl pv3 w-100 " @click="toggleSubMenu('am4')"> <i class="fa fa-briefcase pr2" />  SETTINGS </div>
                <div class="fl m-auto pv3 mt6 black tc b br2 w-90 " style="background : #FFCC33" @click="logout()">  LOGOUT </div>
            </div>
            <div v-if="myprofile.data.dashboardType === 'Community Operation Associate' " class="tl pt4 f7 fl w-100 bg-ligt-gray pointer">
                <img src="@/assets/logo_wyt.svg" class="h2" />
                <div class="fl pv3 w-100 "  @click="$router.push({ name: 'dashboard'})"> <i class="fa fa-folder-open pr2" /> DASHBOARD </div>
                <div class="fl pv3 w-100 " @click="toggleSubMenu('coa')"> <i class="fa fa-briefcase pr2" />  WORKFLOW </div>
                <div class="fl pv3 w-100 " @click="$router.push({name:'report-search'})"> <i class="fa fa-server pr2" />  REPORTS </div>
                <div class="fl pv3 w-100 " @click="$router.push({name:'profile'})"> <i class="fa fa-user pr2" />  PROFILE </div>
                <div class="fl m-auto pv3 mt6 black tc b br2 w-90 " style="background : #FFCC33" @click="logout()">  LOGOUT </div>
            </div>
            <div v-if="myprofile.data.dashboardType === 'Facility Manager' " class="tl pt4 f7 fl w-100 bg-ligt-gray pointer">
                <img src="@/assets/logo_wyt.svg" class="h2" />
                <div class="fl pv3 w-100 "  @click="$router.push({ name: 'dashboard'})"> <i class="fa fa-folder-open pr2" /> DASHBOARD </div>
                <div class="fl pv3 w-100 " @click="toggleSubMenu('fm')"> <i class="fa fa-briefcase pr2" />  WORKFLOW </div>
                <div class="fl pv3 w-100 " @click="$router.push({name:'report-search'})"> <i class="fa fa-server pr2" />  REPORTS </div>
                <div class="fl pv3 w-100 " @click="$router.push({name:'profile'})"> <i class="fa fa-user pr2" />  PROFILE </div>
                <div class="fl m-auto pv3 mt6 black tc b br2 w-90 " style="background : #FFCC33" @click="logout()">  LOGOUT </div>
            </div>
            <div v-if="myprofile.data.dashboardType === 'Sales Representative' " class="tl pt4 f7 fl w-100 bg-ligt-gray pointer">
                <img src="@/assets/logo_wyt.svg" class="h2" />
                <div class="fl pv3 w-100 "  @click="$router.push({ name: 'dashboard'})"> <i class="fa fa-folder-open pr2" /> DASHBOARD </div>
                <div class="fl pv3 w-100 " @click="toggleSubMenu('sales')"> <i class="fa fa-briefcase pr2" />  WORKFLOW </div>
                <div class="fl pv3 w-100 " @click="$router.push({name:'profile'})"> <i class="fa fa-user pr2" />  PROFILE </div>
                <div class="fl m-auto pv3 mt6 black tc b br2 w-90 " style="background : #FFCC33" @click="logout()">  LOGOUT </div>
            </div>
        </div>
        <div class="dn" :class="{'fixed db w-100 vh-100':lShow}" @click="toggleSubMenu">
            <div style="width:12rem" class="fl vh-100 bg-transparent white"> </div>
             <div class="fl vh-100 ph3 pr4 bg-dark-gray white"> 
                <div class="pt5 overpass-font">
                    <div class="pt3 w-100 yellow f3 b bebas_font">  {{submenu_header}} </div>
                    <div class="w-20 bt bw1 pb3"></div>
                    <div class="pv2" v-for="(sub, index) in submenu_temp" :key="index">
                        <div v-if="submenu_temp !== undefined">
                            <router-link :to="{ name: sub.to}" class="f7 white no-underline">
                                <i :class="{'fa': sub.icon}"></i> {{sub.title}}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script type="text/javascript">

    const submenu = {
        hr : [
            {to:"daily-report-search",icon:"fa-robot",title:"DAILY REPORTS"}, 
            {to:"request-search",icon:"fa-robot",title:"REQUESTS"}, 
            {to:"jobs-search",icon:"fa-shopping-basket",title:"MANAGE JOBS"},
        ],
        sales : [
            {to:"daily-report-search",icon:"fa-robot",title:"DAILY REPORTS"}, 
            {to:"request-search",icon:"fa-robot",title:"REQUESTS"}, 
            {to:"campaigns-search",icon:"fa-shopping-basket",title:"MANAGE CAMPAIGNS"},
        ],
        it : [
            {to:"members-search",icon:"fa-shopping-basket",title:"MANAGE MEMBERS"},
            {to:"daily-report-search",icon:"fa-robot",title:"DAILY REPORTS"},
            {to:"request-search",icon:"fa-robot",title:"REQUESTS"},  
        ],
         am : [
             {to:"members-search",icon:"fa-users",title:"MEMBERS"},
             {to:"vendors-search",icon:"fa-shopping-basket",title:"VENDORS"},
        ],
         am2 : [
             {to:"invoices-search",icon:"fa-robot",title:"INVOICES"}, 
             {to:"payments-search",icon:"fa-bullhorn",title:"PAYMENTS"}
        ],
         am3 : [
             {to:"booking-search",icon:"fa-robot",title:"BOOKINGS"}, 
             {to:"plan-search",icon:"fa-barcode",title:"PLANS"},
             {to:"event-search",icon:"fa-barcode",title:"EVENTS"},
        ],
        am4 : [
             {to:"add-on-search",icon:"fa-barcode",title:"ADD-ONS"},
             {to:"space-search",icon:"fa-barcode",title:"SPACES"},
             {to:"location-search",icon:"fa-barcode",title:"LOCATIONS"},
              {to:"employees-search",icon:"fa-users",title:"EMPLOYEES"},
        ],
        coa : [
            {to:"members-search",icon:"fa-shopping-basket",title:"MANAGE MEMBERS"},
            {to:"daily-report-search",icon:"fa-robot",title:"DAILY REPORTS"},
            {to:"request-search",icon:"fa-robot",title:"REQUESTS"},  
            {to:"event-search",icon:"fa-shopping-basket",title:"MANAGE EVENTS"},
            {to:"invoices-search",icon:"fa-barcode",title:"MANAGE INVOICES"},
            {to:"quotes-search",icon:"fa-barcode",title:"MANAGE QUOTES"},
            {to:"receipts-search",icon:"fa-barcode",title:"MANAGE RECEIPTS"},
        ],
         fm : [
            {to:"daily-report-search",icon:"fa-robot",title:"DAILY REPORTS"}, 
            {to:"request-search",icon:"fa-robot",title:"REQUESTS"}, 
            {to:"maintenance-search",icon:"fa-shopping-basket",title:"MAINTENANCE"},
            {to:"parking-search",icon:"fa-shopping-basket",title:"PARKING"},
        ],
        pos : [
            {to:"members-search",icon:"fa-shopping-basket",title:"MANAGE MEMBERS"},
            {to:"daily-report-search",icon:"fa-robot",title:"DAILY REPORTS"}, 
            {to:"request-search",icon:"fa-robot",title:"REQUESTS"}, 
            {to:"campaigns-search",icon:"fa-cash-register",title:"CAMPAIGNS"},
            {to:"quotes-search",icon:"fa-barcode",title:"QUOTES"},
            {to:"invoices-search",icon:"fa-barcode",title:"INVOICES"},
            {to:"enquiries-search",icon:"fa-barcode",title:"ENQUIRIES"},
        ],
        
        webstore : [
            {to:"daily-report-search",icon:"fa-robot",title:"DAILY REPORTS"},  
            {to:"request-search",icon:"fa-robot",title:"REQUESTS"},   
            {to:"rota-search",icon:"fa-bullhorn",title:"STAFF ROTA"},
            {to:"event-search",icon:"fa-barcode",title:"EVENT MANAGER"},
        ],
        
    }

    import profileImage from "@/assets/img/profile.png"
    
    export default {
        name: "dashboard",
        data() {return{
            submenu,
            submenu_temp: {},
            submenu_header: '',
            lShow:false,
            lMenu:false,
            IsMenu: false,
            menuIcon: "",
            myprofile: {}, 
            profileImage,
            headertitle: "DASHBOARD",
            lDashboard: true,
        }},
        watch : {
            headertitle: function(oldValue, newValue) {
                if (newValue == "DASHBOARD") {
                    this.lDashboard = true
                } else {
                    this.lDashboard = false
                }
            }
        },
        props: [ ],
        components: { },
        created() {
            this.menuIcon = this.menuIconCompute
            this.getMyProfile()
        },
        computed: {
            menuIconCompute: function () {
                if (this.icon !== undefined && this.icon !== "") {
                    return this.icon
                }
                return "fas fa-circle"
            }
        },
        
        methods: {
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
            toggleMenu() {
                this.lMenu = !this.lMenu
            },
            toggleSubMenu(tabname) {
                this.lShow = !this.lShow
                this.menuIcon = (this.lShow) ? "far fa-circle" : this.menuIconCompute
                 
                  switch(tabname) {
                    default:
                        this.submenu_temp = this.submenu.pos
                         this.submenu_header = "WORKFLOW"
                        break;
                        case "hr":
                        this.submenu_temp = this.submenu.hr
                        this.submenu_header = "WORKFLOW"
                        break;
                    case "it":
                        this.submenu_temp = this.submenu.it
                        this.submenu_header = "WORKFLOW"
                        break;
                    case "am":
                        this.submenu_temp = this.submenu.am
                        this.submenu_header = "PROFILES"
                    break;
                        case "fm":
                        this.submenu_temp = this.submenu.fm
                        this.submenu_header = "WORKFLOW"
                        break;
                    case "coa":
                        this.submenu_temp = this.submenu.coa
                        this.submenu_header = "WORKFLOW"
                        break;
                    case "sales":
                        this.submenu_temp = this.submenu.sales
                        this.submenu_header = "WORKFLOW"
                        break;
                    case "am2":
                        this.submenu_temp = this.submenu.am2
                        this.submenu_header = "ACCOUNTS"
                        break;
                    case "am3":
                        this.submenu_temp = this.submenu.am3
                        this.submenu_header = "SETUP"
                        break;
                     case "am4":
                        this.submenu_temp = this.submenu.am4
                        this.submenu_header = "SETTINGS"
                        break;
                  }
            },
            logout() {
                localStorage.removeItem("myprofile");
                localStorage.removeItem("mytoken");
                var app = this
                app.$router.push( '/signin')
        }
        },
    }
</script>
