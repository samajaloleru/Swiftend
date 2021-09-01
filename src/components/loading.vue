<template>
  <div class="bg-white-10 w-100 center fixed top-0 left-0 right-0 z-max loading" :class="{'db':loading,'dn':!loading}">
    <div class="center w-100 vh-100">
      <article class="dt center vh-75 w-100">
        <div class="dtc v-mid f6 tc fw3 white overflow-hidden">

          <img src="@/assets/logo.png" class="dn" />
          <div class="intro-preloader intro-div">
            <span class="intro-line intro-line-1"></span>
            <span class="intro-line intro-line-2"></span>
            <span class="intro-line intro-line-3"></span>
            <span class="intro-line intro-line-4"></span>
            <span class="intro-line intro-line-5"></span>
            <span class="intro-line intro-line-6"></span>
            <span class="intro-line intro-line-7"></span>
            <span class="intro-line intro-line-8"></span>
            <span class="intro-line intro-line-9"></span>
            <div>Loading</div>
          </div>
        
        </div>
      </article>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {return{
      loading:true
    }},
    created(){
      const that = this  
      setTimeout(function () {
        that.loading = !that.loading
      }, 50);
    }
  }
</script>
