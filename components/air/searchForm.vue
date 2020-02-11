<template>
    <div class="search-form">
        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>
        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                <el-autocomplete
                v-model="form.departCity"
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                @blur="handleDepartBlur"
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
                <el-autocomplete
                v-model="form.destCity"
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                @blur="handleDestBlur"
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                v-model="form.departDate"
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>
<script>
import moment from 'moment'
export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
            form:{
                departCity:'',
                departCode:'',
                destCity:'',
                destCode:'',
                departDate:'',
            },
            // departData :[],
            // destData:[]
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            if(index === 1){
                this.$alert('目前暂不支持往返，请使用单程选票！', '温馨提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                })
            }
        },
        // 出发城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDepartSearch(value, callback){
            if(!value){
                return;
            }
            // 封装筛选城市的方法在store里面
            this.$store.dispatch('user/searchCity',this.form.departCity).then(res=>{
                // console.log(res)
                if(res.length == 1){
                    this.form.departCode = res[0].sort
                }
                callback(res)
            })
            // })
            // // 调用axios根据输入的城市获取城市的信息
            // this.$axios({
            //     url:'/airs/city',
            //     params:{
            //         name: this.form.departCity
            //     }
            // }).then(res=>{
            //     // 返回的数据没有所要的value：数据的格式，所以，数据改造
            //     const newData = res.data.data.map(item=>{
            //             // replace方法将字符串里面的 ‘市’，替换为空，目标是去掉市
            //             item.value = item.name.replace('市','')
            //             return item
            //         })
            //     if(newData.length == 1){
            //         this.form.departCode = newData[0].sort
            //     }
            //     // 这个callback是组件自带的传参，目的是让获得的数据展示在下拉列表中
            //     callback(newData);
            // })
        },
        // 目标城市输入框获得焦点时触发
        // value 是选中的值，callback是回调函数，接收要展示的列表
        queryDestSearch(value, callback){
                // 目标城市一样的，和起始城市一样
            if(!value){
                return;
            }
            // 封装筛选城市的方法在store里面
            this.$store.dispatch('user/searchCity',this.form.destCity).then(res=>{
                // console.log(res)
                if(res.length == 1){
                    this.form.destCode = res[0].sort
                }
                callback(res)
            })
            // // 调用axios根据输入的城市获取城市的信息
            // this.$axios({
            //     url:'/airs/city',
            //     params:{
            //         name: this.form.destCity
            //     }
            // }).then(res=>{
            //     // 返回的数据没有所要的value：数据的格式，所以，数据改造
            //     const newData = res.data.data.map(item=>{
            //             item.value = item.name.replace('市','')
            //             return item
            //         })
            //     // 将newData存起来
            //     // this.destData = newData
            //     if(newData.length == 1){
            //         this.form.destCode = newData[0].sort
            //     }
            //     // 这个callback是组件自带的传参，目的是让获得的数据展示在下拉列表中
            //     callback(newData);
            // })
        },
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            // console.log(this.form.departCity)
            // console.log(item)
            this.form.departCode = item.sort
        },
        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            this.form.destCode = item.sort
        },
        // 出发城市失去焦点时触发
        handleDepartBlur(){
            // 当用户直接输入全名时，不是点击了下拉框的数据，此时应补上数据departCode
        },
        // 出发城市失去焦点时触发
        handleDestBlur(){
            // 当用户直接输入全名时，不是点击了下拉框的数据，此时应补上数据departCode
        },
        // 确认选择日期时触发
        handleDate(value){
        //    引入插件moment
            // console.log(value)
            this.form.departDate = moment(value).format('YYYY-MM-DD')
            // console.log(this.form.departDate)
        },
        // 触发和目标城市切换时触发
        handleReverse(){
            // 将数据全部结构出来
            const {departCity,departCode,destCity,destCode} = this.form
            // 重新赋值达到城市切换的效果
            this.form.departCity = destCity
            this.form.departCode = destCode
            this.form.destCity = departCity
            this.form.destCode = departCode
        },
        // 提交表单是触发
        handleSubmit(){
            if(!this.form.departCity){
                this.$message.error("请输入出发城市");
                return;
            }
            if(!this.form.destCity){
                this.$message.error("请输入到达城市");
                return;
            }
            if(!this.form.departDate){
                this.$message.error("请选择时间");
                return;
            }
        //    这里需要先跳转页面，传值
            console.log(this.form)
            this.$router.push({
                path: "/air/flights",
                query: this.form
            })
        }
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>