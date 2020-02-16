export const state = ()=>{
    return {
        history:[],
        planeData:{
            seat_infos:{}
        },
        price: 0
    }
}

export const mutations = {
    // 保存历史搜索记录
    setHistory(state,data){
        state.history.unshift({...data})
        // 将数据的长度固定，数据将自动截取五个
        state.history.length = 5
    },
    // 保存订单信息
    setPlaneData(state,data){
        state.planeData = data
    },
    // 保存价格
    price(state,data){
        state.price = data
    }
}