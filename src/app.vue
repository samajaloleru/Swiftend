<template >
    <section class="vh-100 cf w-100 overflow-auto">
        <router-view class="fl w-100 h-100 overflow-y-scroll"></router-view>
    </section>
</template>

<!-- App specific objects  -->
<script type="text/javascript">
    module.exports = {
        name: "app"
    }
</script>

<!-- App specific stylings  -->

<style lang="scss">
    @import "assets/tachyons/tachyons.scss";
</style>


<style media="screen">
    @import "assets/css/open-iconic.min.css";
    @import "assets/css/fontawesomepro.css";
    @import "assets/css/custom.min.css";
    @import "assets/css/fullcalendar.min.css";
</style>
