<template>
    <div class="container">
        <div class="main">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{orderDetail.price}}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">
                        <!-- 二维码 -->
                        <canvas id="qrcode-stage"></canvas>
                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from "qrcode";
export default {
    data () {
        return {
            // 存放的订单的数据
            orderDetail: {},
            // 加一个存放的定时器,只有data里面的数据，在mounted和method里面才拿的到
            setIntervalTime: ''
        }
    },
    mounted () {
        // 解决刷新此页面的bug，结构渲染在store渲染前面，会导致报错
        // 利用定时器，将mounted里的方法在store渲染之后调用,不需要延迟多长时间，定时器的调用自动在渲染之后
        setTimeout(()=>{
            this.$axios({
                url: "airorders/" + this.$route.query.id,
                headers: {
                    Authorization: `Bearer ` + this.$store.state.user.userInfo.token
                }
            }).then(res=>{
                console.log(res)
                // 调用api获取订单数据
                this.orderDetail = res.data
                const {code_url} = this.orderDetail.payInfo;
                // 获取结构里面的dom元素
                const canvas = document.getElementById("qrcode-stage");
                // 调用插件的方法，生成二维码
                QRCode.toCanvas(canvas, code_url, {
                    width: 200
                });
                // 由于协议问题，我们需要不断去发起请求来判断用户是否已经支付成功
                // 需要用到定时器,每3s请求一次
                this.setIntervalTime = setInterval(() => {
                    this.isPay()
                }, 3000);
            })
        },0)
    },
    // 另一个生命周期的钩子，在页面单组件被销毁，退出该页面时，触发
    // 提升用户体验，为了避免用户未扫描二维码，定时器一直在进行的情况
    destroyed(){
        clearInterval(this.setIntervalTime)
    },
    methods: {
        // 调用接口，查询是否已经付款
        isPay(){
            // 将参数解构出来
            const {id, price, orderNo} = this.orderDetail
            this.$axios({
                url: '/airorders/checkpay',
                method: 'POST',
                data: {
                    id: id,
                    nonce_str: price,
                    out_trade_no: orderNo
                },
                headers: {
                    Authorization: `Bearer ` + this.$store.state.user.userInfo.token
                }
            }).then(res=>{
                console.log(res)
                if(res.data.statusTxt == "支付完成"){
                    // 当支付完成时，需要清除定时器
                    clearInterval(this.setIntervalTime)
                    this.$message.success('支付成功')
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>