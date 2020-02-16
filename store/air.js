export const state = ()=>{
    return {
        history:[],
        planeData:{
            seat_infos:{}
        }
    }
}

export const mutations = {
    setHistory(state,data){
        state.history.unshift({...data})
        // 将数据的长度固定，数据将自动截取五个
        state.history.length = 5
    },
    setPlaneData(state,data){
        state.planeData = data
    }
}