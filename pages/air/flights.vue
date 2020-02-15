<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <flightsFilters :data='ectypeFlightsData' 
                @newData = 'newData'
                @sendCompanyData= 'getCompanyData' 
                @sendPlaneSizeData= 'sendPlaneSizeData' 
                @sendAirportNameData= 'sendAirportNameData' 
                @sendBack= 'sendBack' 
                @sendTimeData= 'sendTimeData'/>
                
                <!-- 航班头部布局 -->
                <flightsListHead/>
                
                
                <!-- 航班信息 -->
                <flightsItem v-for="(item,index) in dataList" :key="index" :data='item'/>

                <!-- 分页组件 -->
                    <el-row type="flex" justify="center" style="margin-top:10px;">
                        <!-- size-change：切换条数时候触发 -->
                        <!-- current-change：选择页数时候触发 -->
                        <!-- current-page: 当前页数 -->
                        <!-- page-size：当前条数 -->
                        <!-- total：总条数 -->
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </el-row>
            </div>
            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <flightsAside/>
            </div>
        </el-row>
    </section>
</template>

<script>

import moment from "moment"
import flightsFilters from '@/components/air/flightsFilters'
import flightsListHead from '@/components/air/flightsListHead'
import flightsItem from '@/components/air/flightsItem'
import flightsAside from '@/components/air/flightsAside'
export default {
    data(){
        return {
            // 机票数据,是一个对象
            flightsData: {
                info:{},
                options:{},
                flights:[]
            },
            ectypeFlightsData: {
                info:{},
                options:{},
                flights:[]
            },
            // 当前页数
            pageIndex: 1,
            // 当前的条数
            pageSize: 5,
            // 总条数
            total: 0
        }
    },
    components: {
        flightsListHead,flightsItem,flightsFilters,flightsAside
    },
    methods: {
        // 切换条数
        // 默认参数value的值就是当前切换的条数
        handleSizeChange(value){
            this.pageSize = value
        },
        // 切换当前页数
        // 默认参数value的值就是当前页数
        handleCurrentChange(value){
            this.pageIndex = value
            
        },
        // 子组件传递筛选的数据
        newData(value){
            // console.log(value)
            this.flightsData.flights = value
            this.total = value.length
        },
        // 接受来自于子组件的筛选起飞机场的数据
        sendAirportNameData(value){
            // this.flightsData.flights = this.ectypeFlightsData.flights.filter(item=>{
            //     return item.org_airport_name === value
            // })
            // this.total = this.flightsData.flights.length
        },
        // 接受来自于子组件的筛选航空公司的数据
        getCompanyData(value){
            // this.flightsData.flights = this.ectypeFlightsData.flights.filter(item=>{
            //     return item.airline_name === value
            // })
            // this.total = this.flightsData.flights.length
        },
        // 接受来自于子组件的筛选飞机大小的数据
        sendPlaneSizeData(value){
            // this.flightsData.flights = this.ectypeFlightsData.flights.filter(item=>{
            //     return item.plane_size === value
            // })
            // this.total = this.flightsData.flights.length
        },
        // 出发时间
        sendTimeData(value){
            // const arr = value.split(',')
            // this.flightsData.flights = this.ectypeFlightsData.flights.filter(item=>{
            //     let hours = item.dep_time.split(':')[0]
            //     return +arr[0] <= hours && hours < +arr[1]
            // })
            // this.total = this.flightsData.flights.length
        },
        // 撤销按钮
        sendBack(){
            this.flightsData = this.ectypeFlightsData
            this.total = this.flightsData.flights.length
        },
        getDateList(){
            // 获取服务器的数据
            // console.log(this.$route.query)
            this.$axios({
                url: '/airs',
                params: this.$route.query
            }).then(res=>{
                // console.log(res)
                this.flightsData = res.data
                // 将获得的数据复制一份
                this.ectypeFlightsData = {...res.data}
                this.total = res.data.total
                // console.log(this.flightsData)
            })
        }
    },
    computed: {
        // 计算属性，为了在前端实现数据的分页    
        dataList(){
            // 判断flightsData有没有值
            if(!this.flightsData.flights){
                return [] ;
            }
            // 0-5   5-10  10-15    
            // 通过自己切割数组，展示部分数据来达到分页的效果
            return this.flightsData.flights.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.getDateList()
        console.log('111')
        next()
    },
    mounted () {
        this.getDateList()
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