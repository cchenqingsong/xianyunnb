<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option v-for="(item,index) in data.options.airport" :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option v-for="(item,index) in data.options.flightTimes" :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option v-for="(item,index) in data.options.company" :key="index"
                    :label="`${item}航空`"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option v-for="(item,index) in airSizeOptions" :key="index"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
        <span>{{filter}}</span>
    </div>
</template>

<script>
export default {
    props: {
        // 数据
        data: {
            type: Object,  // 声明data属性的类型
            default: {}   // 如果组件调用时候不传data，采用默认值
        }
    },
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: '',        // 机型大小
            airSizeOptions:[            
                {label: '大',value: 'L'},
                {label: '中',value: 'M'},
                {label: '小',value: 'S'}
            ]
        }
    },
    computed:{
        filter(){
            let newData = this.data.flights.filter(item=>{
                let judge = true
                // 筛选起飞机场的数据
                if( this.airport && item.org_airport_name !== this.airport){
                    judge = false
                }
                // 筛选航空公司的数据
                if( this.company && item.airline_name !== this.company){
                    judge = false
                }
                // 筛选飞机大小的数据
                if( this.airSize && item.plane_size !== this.airSize){
                    judge = false
                }
                if(this.flightTimes){
                    // 当前选中的时间段
                    const airTime = this.flightTimes.split(',')
                    // 要筛选的机票的时间段
                    let hours = item.dep_time.split(':')[0]
                    // 筛选出发时间
                    if( +airTime[0] > hours || hours >= +airTime[1] ){
                        judge = false
                    }
                }
                
                return judge
            })
            this.$emit('newData',newData)
            // console.log(newData)
            return ''
        }
    },
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            // this.$emit('sendAirportNameData',value)
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            // this.$emit('sendTimeData',value)
        }, 

         // 选择航空公司时候触发
        handleCompany(value){
            // this.$emit('sendCompanyData',value)
        },

         // 选择机型时候触发
        handleAirSize(value){
        //    this.$emit('sendPlaneSizeData',value)
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.$emit('sendBack',{})
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>