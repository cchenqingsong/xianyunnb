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
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
                <el-autocomplete
                v-model="form.destCity"
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
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
            departData :[],
            destData:[]
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            
        },
        // 出发城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDepartSearch(value, callback){
            if(!value){
                return;
            }
            // 调用axios根据输入的城市获取城市的信息
            this.$axios({
                url:'/airs/city',
                params:{
                    name: this.form.departCity
                }
            }).then(res=>{
                // 返回的数据没有所要的value：数据的格式，所以，数据改造
                const newData = res.data.data.map(item=>{
                        // replace方法将字符串里面的 ‘市’，替换为空，目标是去掉市
                        item.value = item.name.replace('市','')
                        return item
                    })
                // 将newData存起来
                this.departData = newData
                // 这个callback是组件自带的传参，目的是让获得的数据展示在下拉列表中
                callback(newData);
            })
            
        },
        // 目标城市输入框获得焦点时触发
        // value 是选中的值，callback是回调函数，接收要展示的列表
        queryDestSearch(value, callback){
                    // 目标城市一样的，和起始城市一样
                if(!value){
                    return;
                }
                // 调用axios根据输入的城市获取城市的信息
                this.$axios({
                    url:'/airs/city',
                    params:{
                        name: this.form.destCity
                    }
                }).then(res=>{
                    // 返回的数据没有所要的value：数据的格式，所以，数据改造
                    const newData = res.data.data.map(item=>{
                            item.value = item.name.replace('市','')
                            return item
                        })
                    // 将newData存起来
                    this.destData = newData
                    // 这个callback是组件自带的传参，目的是让获得的数据展示在下拉列表中
                    callback(newData);
                })
        },
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            
        },
        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            
        },
        // 确认选择日期时触发
        handleDate(value){
        //    引入插件moment
        },
        // 触发和目标城市切换时触发
        handleReverse(){
            
        },
        // 提交表单是触发
        handleSubmit(){
           
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