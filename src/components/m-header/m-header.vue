<template>
  <div class="m-header">
    <router-link to="/user" class="mine" tag="div">
      <i class="iconfont icon-list"></i>
    </router-link>
      <router-link to="/search" class="search" tag="div">
          <search-box :placeholder = "inputStr" class="seaBox"></search-box>
      </router-link>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'

export default {
  data () {
    return {
      inputStr: '搜索'
    }
  },
  components: {
    SearchBox
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable.scss";
.transitionRouter-enter-active,
.transitionRouter-leave-active {
  transition: all 2s;
}

.transitionRouter-enter,
.transitionRouter-leave{
  /*transform: translate3d(100%, 0, 0);*/
}
.m-header {
  position: relative;
  height: 44px;
  width: 100%;
  text-align: center;
  background: $color-theme;
  .mine {
    position: absolute;
    top: 0;
    left: 10px;
    .iconfont {
      line-height: 44px;
      display: block;
      /*padding: 11px;*/
      font-size: 22px;
      color: $color-theme-l;
    }
  }
  .search {
    width: 280px;
    height: 44px;
    line-height: 44px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -140px;
    margin-top: -22px;
    .seaBox {
      width: 100%;
      height: 28px;
      line-height: 28px;
      margin-top: 8px;
    }
  }

}
</style>
