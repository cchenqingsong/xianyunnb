// 引入el的message弹窗
import { Message } from 'element-ui'
export default ({$axios})=>{
    $axios.onError(err=>{
        const {statusCode,message} = err.response.data
        if(statusCode === 400){
            // 这里要用到el的弹窗，所以必须引入局部组件
            Message.error(message)
        }

    })
}