<template>
  <div id="home">
      <mt-swipe class="slider" :auto="4000">
        <mt-swipe-item v-for="(item, i) in sliderData" :key="i">
          <a :href="item.url"><img :src="item.img" /></a>
        </mt-swipe-item>
      </mt-swipe>

      <div class="grids">
        <ul>
          <li v-for="(grid,i) in grids" :key="i">
            <router-link :to="grid.router">
                <img :src="grid.src" :alt="grid.title" />
                <p>{{grid.title}}</p>
            </router-link>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
    import gridsIcon0 from '../../assets/icon_news.png';
    import gridsIcon1 from '../../assets/icon_share.png';
    import gridsIcon2 from '../../assets/icon_board.png';
    import gridsIcon3 from '../../assets/icon_message.png';
    import gridsIcon4 from '../../assets/icon_feedback.png';
    import gridsIcon5 from '../../assets/icon_contact.png';
    const grids = [{
        src: gridsIcon0,
        title: '新闻资讯',
        router: {
            name: 'newsList'
        }
    }, {
        src: gridsIcon1,
        title: '图文分享',
        router: {
            name: 'newsList'
        }
    }, {
        src: gridsIcon2,
        title: '商品展示',
        router: {
            name: 'newsList'
        }
    }, {
        src: gridsIcon3,
        title: '我的消息',
        router: {
            name: 'newsList'
        }
    }, {
        src: gridsIcon4,
        title: '留言反馈',
        router: {
            name: 'newsList'
        }
    }, {
        src: gridsIcon5,
        title: '联系我们',
        router: {
            name: 'newsList'
        }
    }];
    export default {
        name: 'Home',
        data() {
            return {
                sliderData: [{
                    img: '//m.360buyimg.com/babel/s869x347_jfs/t1/25526/11/2437/168741/5c1c83c6E2b20a76d/8bf1a05fba200b0c.jpg!q70.dpg',
                    url: '//pro.m.jd.com/mall/active/2hqsQcyM5bEUVSStkN3BwrBHqVLd/index.html'
                }, {
                    img: '//m.360buyimg.com/babel/s869x347_jfs/t1/11244/21/2884/83450/5c18b7e4Ee9c4d901/d03795c4260f33ce.jpg!q70.dpg',
                    url: '//pro.m.jd.com/mall/active/4G5xap7fUEzJkqP4ZqmpEc7xtV7v/index.html'
                }],
                grids: grids
            }
        },
        created() {
            this.$axios.get('/getlunbo')
                .then(res => {
                    // this.sliderData = res.data.message;
                    console.log(this.sliderData)
                }).catch(err => {
                    console.log('轮播图数据异常')
                })
        }
    }
</script>

<style lang="scss" scoped>
    $vm_base: 750;
    @function vw($px) {
        @return $px / $vm_base * 100vw;
    }
    
    #home {
        .slider {
            height: vw(300);
            img {
                width: 100%;
                height: auto;
            }
        }
        .grids {
            ul {
                display: flex;
                flex-wrap: wrap;
                height: vw(340);
                justify-content: flex-start;
                align-items: center;
            }
            li {
                width: vw(250);
                height: vw(140);
                list-style: none;
                text-align: center;
                font-size: 0;
                img {
                    width: vw(80);
                    height: vw(80);
                }
                p {
                    height: vw(60);
                    line-height: vw(60);
                    font-size: vw(26);
                    color: #333;
                }
            }
        }
    }
</style>