// 引入el的message弹窗
import { Message } from 'element-ui'
export default (data)=>{
    // data参数是插件里面本来就有的，
    // 插件是每次都会自动运行
    data.$axios.onError(err=>{
        const {statusCode,message} = err.response.data
        if(statusCode === 400){
            // 这里要用到el的弹窗，所以必须引入局部组件
            Message.error(message)
        }
        if(statusCode === 401 || statusCode === 403){
            Message.error('请登录账户')
            // console.log(data)
            // data对象里面自带redirect方法，重定向页面的跳转
            data.redirect('/user/login',{
                // data对象里面有个route，里面有fullPath参数就是此时还未跳转的页面的路由的路径参数
                // 将路径参数传递过去
                returnUrl: data.route.fullPath
            })
        }

    })
}