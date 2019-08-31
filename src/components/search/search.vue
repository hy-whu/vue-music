<template>
<!--  <transition name="search">-->
    <div class="search" ref="searchWrapper">
      <div class="search-box-wrapper">
        <search-box @query="onQueryChange" ref="searchBox" class="seBox"></search-box>
        <span @click="back" class="return">取消</span>
      </div>
      <scroll class="search-scroll-wrapper" ref="scroll" :pullup="pullup" @scrollToEnd="searchMore">
        <div ref="search">
          <div class="shortcut-wrapper" v-show="!query">
            <div class="search-history" v-show="searchHistory.length">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span class="clear" @click="showConfirm">
<!--                  <i class="iconfont iconlajitong"></i>-->
                  <span class="clear-all">清空</span>
                </span>
              </h1>
              <search-list @select=addQuery @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
            </div>
          </div>
          <div class="search-hots" v-show="!query">
            <p class="title">热搜榜</p>
            <song-list class="search-hots-item"  @click="addQuery(item.first)" :songs ="hots">
\            </song-list>
          </div>
          <div class="search-result">
            <suggest @select="saveSearch" @refresh="refresh" :query="query" ref="suggest"></suggest>
          </div>
        </div>
      </scroll>
      <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空历史记录？" confirmBtnText="清空" class="confirm"></confirm>
      <router-view></router-view>
    </div>
<!--  </transition>-->
</template>

<script>
import Scroll from 'base/scroll/scroll'
import SearchBox from 'base/search-box/search-box'
import Suggest from 'cpnts/suggest/suggest'
import Confirm from 'base/confirm/confirm'
import SearchList from 'base/search-list/search-list'
import {searchMixin, playlistMixin} from 'common/js/mixin'
import {getSearchHot} from 'api/search'
import SongList from '../../base/song-list/song-list'

export default {
  mixins: [searchMixin, playlistMixin],
  data () {
    return {
      pullup: true,
      hots: []
    }
  },
  created () {
    this._getSearchHot()
  },
  methods: {
    back () {
      this.$router.back()
      this.$refs.searchBox.clear()
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    _getSearchHot () {
      getSearchHot().then((res) => {
        this.hots = res.data.result.hots
        // console.log(this.hots)
      })
    },
    onQueryChange (query) {
      this.query = query
    },
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch () {
      this.saveSearchHistory(this.query)
    },
    searchMore () {
      this.$refs.suggest.searchMore()
    },
    refresh () {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 20)
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.searchWrapper.style.bottom = bottom
      this.refresh()
    }
  },
  components: {
    SongList,
    Scroll,
    SearchBox,
    Suggest,
    SearchList,
    Confirm
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

// .search-enter-active, .search-leave-active {
//   transition: all 0.3s;
// }
// .search-enter, .search-leave-to {
//   transform: translate3d(50%, 0, 0);
//   opacity: 0;
// }
.search {
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
  bottom: 0;
  background: $color-background;
  .search-box-wrapper {
    position: relative;
    padding: 10px 40px 10px 20px;
    // margin-bottom: 15px;
    background: $color-theme;
    .seBox {
      width: 280px;
    }
    .return {
      height: 20px;
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -10px;
      margin-right: 10px;
      font-size: 14px;
      color: rgba(255,255,255,0.7);
      line-height: 20px;
    }
    /*.fa {*/
    /*  position: absolute;*/
    /*  left: 5px;*/
    /*  top: 3px;*/
    /*  padding: 3px 10px;*/
    /*  font-size: 30px;*/
    /*  color: #fff;*/
    /*}*/
  }
  .search-scroll-wrapper {
    height: 100%;
    overflow: hidden;
    .search-hots {
      margin: 0 20px;
      .title {
        padding: 15px 5px 0 5px;
        height: 30px;
        line-height: 30px;
        font-size:$font-size-small-x;
        color: $color-text-g;
      }
      span {
        display: inline-block;
        padding: 3px 5px;
        margin: 4px 4px;
        border: 0.8px solid $color-text-ggg;
        border-radius: 5px;
        line-height: 20px;
        color: $color-text;
        font-size: $font-size-medium;
      }
    }
    .shortcut-wrapper {
      position: relative;
      // top: 178px
      // bottom: 0
      // width: 90%
      margin: 0 auto;
      .shortcut {
        height: 100%;
        overflow: hidden;
        .hot-key {
          margin: 0 20px 20px 20px;
          .title {
            margin-bottom: 20px;
            font-size: $font-size-medium;
            color: $color-text;
          }
          .item {
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: $color-highlight-background;
            font-size: $font-size-medium;
            color: $color-text;
          }
        }
      }
      .search-history {
        position: relative;
        margin: 10px 25px;
        .title {
          display: flex;
          align-items: center;
          height: 30px;
          font-size: $font-size-small-x;
          color: $color-text-g;
          .text {
            // font-size: 13px;
            flex: 1;
          }
          .clear {
            @include extend-click();
            .clear-all {
              font-size: $font-size-small;
              color: rgba(0,0,0,0.2);
            }
          }
        }
      }
    }
    .search-result {
      position: relative;
      width: 100%;
      top: 10px;
      bottom: 0;
    }
  }
}
.router-view {
  z-index: 1000;
}
</style>
