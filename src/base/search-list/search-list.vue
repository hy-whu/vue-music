<template>
  <div class="search-list" v-show="searches.length">
    <transition-group name="list" tag="ul">
      <li :key="item" class="search-item" @click="selectItem(item)" v-for="item in searches">
        <span class="text">{{item}}</span>
        <div class="icon" @click.stop="deleteOne(item)">
          <i class="iconfont iconlajitong"></i>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    searches: {
      type: Array
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },
    deleteOne (item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.search-list {
  margin: 5px auto;
  .search-item {
    box-sizing: border-box;
    display: inline-block;
    background: rgba(0,0,0,0.1);
    height: 30px;
    padding-left: 10px;
    line-height: 30px;
    border-radius: 10px;
    &.list-enter-active, &.list-leave-active {
      transition: all 0.1s;
    }
    &.list-enter, &.list-leave-to {
      height: 0;
    }
    .text {
      overflow: hidden;
      /*vertical-align: top;*/
      display: inline-block;
      color: rgba(0,0,0,0.8);
      font-size: 12px;
      /*letter-spacing: 1px;*/
      line-height: 30px;
    }
    .icon {
      overflow: hidden;
      display: inline-block;
      padding-right: 10px;
      @include extend-click();
      .icon-delete {
        font-size: 12px;
        color: $color-text;
        line-height: 30px;
      }
    }
  }
}
</style>
