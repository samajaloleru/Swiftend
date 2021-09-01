import homeComponent from "@/components/home"

import Vue from "vue"
import Router from "vue-router"



Vue.use(Router);
export const router =  new Router({
    mode: "hash",
    routes: [
        { path: '', component: homeComponent },
        
        { path: '*', redirect: '/' }
    ]
  });

router.beforeResolve((to, from, next) => {
    // alert(document.cookie)
    // if (to.path.startsWith("/dashboard")) {
    //     checkPermissions();
    // } else {
    //     removeCookies();
    // }
    // setTimeout(function () {
        next();
    // }, 150);
})

function removeCookies() {
    var res = document.cookie;
    var multiple = res.split(";");
    for (var i = 0; i < multiple.length; i++) {
        var key = multiple[i].split("=");
        document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
}
