<template>
  <div id="app">
      <!--顶部栏-->
      <mt-header fixed title="信息管理系统">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      
      <router-view />

      <mt-tabbar v-model="selected" fixed>
          <mt-tab-item id="home">
            <img slot="icon" src="./assets/icon_home.png">
            首页
          </mt-tab-item>
          <mt-tab-item id="vip">
            <img slot="icon" src="./assets/icon_vip.png">
            会员
          </mt-tab-item>
          <mt-tab-item id="cart">
            <img slot="icon" src="./assets/icon_cart.png">
            购物车
          </mt-tab-item>
          <mt-tab-item id="search">
            <img slot="icon" src="./assets/icon_search.png">
            查找
          </mt-tab-item>
        </mt-tabbar>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                selected: 'home'
            }
        },
        watch: {
            selected(newV, oldV) {
                this.$router.push({
                    name: this.selected
                })
            }
        },
    }
</script>