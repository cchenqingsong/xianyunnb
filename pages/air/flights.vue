<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
                <flightsListHead/>
                
                
                <!-- 航班信息 -->
                <flightsItem v-for="(item,index) in flightsData" :key="index" :data='item'/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>

import moment from "moment";
import flightsListHead from '@/components/air/flightsListHead'
import flightsItem from '@/components/air/flightsItem'
export default {
    data(){
        return {
            // 机票总数据 （有info, flights, total, options这些属性）
            flightsData: {},
            // 当前页数
            pageIndex: 1,
            // 当前的条数
            pageSize: 5,
            // 总条数
            total: 0
        }
    },
    components: {
        flightsListHead,flightsItem
    },
    mounted () {
        // 获取服务器的数据
        // console.log(this.$route.query)
        this.$axios({
            url: '/airs',
            params: this.$route.query
        }).then(res=>{
            // console.log(res)
            this.flightsData = res.data.flights
            console.log(this.flightsData)
        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>