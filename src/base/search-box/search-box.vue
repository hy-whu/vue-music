<template>
  <transition name="transitionRouter">

  <div class="search-box">
      <input v-model="query" type="text" class="box" :placeholder = "placeholder">
      <i class="iconfont delete" @click="clear"></i>
    </div>
  </transition>

</template>

<script>
import {debounce} from 'common/js/utl'

export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data () {
    return {
      query: '',
      clickInfo: '搜索'
    }
  },
  created () {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 300))
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~common/scss/variable";

.search-box {
  position: relative;
  box-sizing: border-box;
  .box {
    touch-action: none;
    box-sizing: border-box;
    width: 100%;
    border-radius: 10px;
    height: 28px;
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
    text-indent: 10px;
    color: rgba(255,255,255,0.6);
    font-size: 13px;
  }
  input::-webkit-input-placeholder {
    color: rgba(255,255,255,0.6);
    font-size: 13px;
  }
  .content {
    position: absolute;
    width: 250px;
    height: 28px;
    line-height: 28px;
    top: 50%;
    left: 50%;
    margin-top: -14px;
    margin-left: -125px;
    letter-spacing: 1px;
    .iconfont {
      font-size: 12px;
    }
  }
}
</style>
