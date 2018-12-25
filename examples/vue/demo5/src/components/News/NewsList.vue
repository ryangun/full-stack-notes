<template>
    <div id="news">
      <ul class="news-list">
          <li v-for="(item, i) in newsList" :key="i">
              <a :href="item.url">
                    <div class="pic">
                        <img :src="item.src" :alt="item.des" />
                    </div>
                    <div class="content">
                        <p class="des">{{item.des}}</p>
                        <p class="discuss">点赞数：{{item.discuss}}</p>
                        <p class="time">发布时间：{{item.time}}</p>
                    </div>
              </a>
          </li>
      </ul>
    </div>
  </template>
<script>
    export default {
        name: 'newsList',
        data() {
            return {
                newsList: [{
                    des: '小乔丹重回故地 老里：愿他能在此退役球衣',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/222/1/2301/149623002.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010595#nbacate=index_news',
                    discuss: 99999,
                    time: '2018-12-21 17:01'
                }, {
                    des: '保罗左腿筋拉伤 哈登：伤病是比赛的一部分',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/161/254/2300/149622431.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010156#nbacate=index_news',
                    discuss: 89999,
                    time: '2018-12-21 16:28'
                }, {
                    des: '小乔丹重回故地 老里：愿他能在此退役球衣',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/222/1/2301/149623002.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010595#nbacate=index_news',
                    discuss: 99999,
                    time: '2018-12-21 17:01'
                }, {
                    des: '保罗左腿筋拉伤 哈登：伤病是比赛的一部分',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/161/254/2300/149622431.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010156#nbacate=index_news',
                    discuss: 89999,
                    time: '2018-12-21 16:28'
                }, {
                    des: '小乔丹重回故地 老里：愿他能在此退役球衣',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/222/1/2301/149623002.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010595#nbacate=index_news',
                    discuss: 99999,
                    time: '2018-12-21 17:01'
                }, {
                    des: '保罗左腿筋拉伤 哈登：伤病是比赛的一部分',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/161/254/2300/149622431.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010156#nbacate=index_news',
                    discuss: 89999,
                    time: '2018-12-21 16:28'
                }, {
                    des: '小乔丹重回故地 老里：愿他能在此退役球衣',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/222/1/2301/149623002.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010595#nbacate=index_news',
                    discuss: 99999,
                    time: '2018-12-21 17:01'
                }, {
                    des: '保罗左腿筋拉伤 哈登：伤病是比赛的一部分',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/161/254/2300/149622431.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010156#nbacate=index_news',
                    discuss: 89999,
                    time: '2018-12-21 16:28'
                }, {
                    des: '小乔丹重回故地 老里：愿他能在此退役球衣',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/222/1/2301/149623002.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010595#nbacate=index_news',
                    discuss: 99999,
                    time: '2018-12-21 17:01'
                }, {
                    des: '保罗左腿筋拉伤 哈登：伤病是比赛的一部分',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/161/254/2300/149622431.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010156#nbacate=index_news',
                    discuss: 89999,
                    time: '2018-12-21 16:28'
                }, {
                    des: '小乔丹重回故地 老里：愿他能在此退役球衣',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/222/1/2301/149623002.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010595#nbacate=index_news',
                    discuss: 99999,
                    time: '2018-12-21 17:01'
                }, {
                    des: '保罗左腿筋拉伤 哈登：伤病是比赛的一部分',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/161/254/2300/149622431.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010156#nbacate=index_news',
                    discuss: 89999,
                    time: '2018-12-21 16:28'
                }, {
                    des: '小乔丹重回故地 老里：愿他能在此退役球衣',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/222/1/2301/149623002.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010595#nbacate=index_news',
                    discuss: 99999,
                    time: '2018-12-21 17:01'
                }, {
                    des: '保罗左腿筋拉伤 哈登：伤病是比赛的一部分',
                    src: 'http://img1.gtimg.com/chinanba/pics/hv1/161/254/2300/149622431.jpg',
                    url: 'http://xw.qq.com/chinanba/20181221010156#nbacate=index_news',
                    discuss: 89999,
                    time: '2018-12-21 16:28'
                }]
            }
        }
    }
</script>

<style lang="scss" scoped>
    $vm_base: 750;
    @function vw($px) {
        @return $px / $vm_base * 100vw;
    }
    
    .news-list {
        margin-bottom: vw(130);
        li {
            height: vw(178);
            margin: vw(20);
            overflow: hidden;
            zoom: 1;
            &::after {
                display: block;
                content: '';
                height: 0;
                font-size: 0;
                float: none;
                clear: both;
            }
            .pic {
                float: left;
                width: vw(250);
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .content {
                float: right;
                width: vw(430);
                height: 100%;
                text-align: left;
                .des {
                    margin: vw(10) 0 vw(18) 0;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    color: #333;
                    font-size: vw(28);
                }
                .discuss {
                    color: #666;
                    font-size: vw(24);
                }
                .time {
                    color: #666;
                    font-size: vw(24);
                }
            }
        }
    }
</style>