<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"> </el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password" >
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="checkPassword" >
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"> </el-input>
    </el-form-item>
    <el-button class="submit" type="primary" @click="handleRegSubmit">
      注册
    </el-button>
  </el-form>
</template>
<script>
export default {
  data() {
      var validateName =(rule, value, callback)=>{
          if(value === ''){
              callback(new Error('请输入用户名'))
          }else if(/^1[3-9][0-9]{9}$/.test(value) == false){
            callback(new Error('请输入正确的用户名'))
          }else{
              callback()
          }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPassword !== '') {
            this.$refs.form.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      // 表单数据
      form: {
          username: '',
          captcha: '',
          nickname: '',
          password: '',
          checkPassword: ''
      },
      // 表单规则
      rules: {
          username: [{ validator: validateName, trigger: 'blur' }],
          captcha: [{ required: true, message: '请输入你的名字', trigger: 'blur' }],
          nickname: [{ required: true, message: '请输入你的名字', trigger: 'blur' }],
          password: [{ validator: validatePass, trigger: 'blur' }],
          checkPassword : [{ validator: validatePass2, trigger: 'blur' }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
        this.$store.dispatch('user/captcha',this.form.username).then(res=>{
            console.log(res)
            this.$message.success('模拟的验证码是' + res.data.code)
        })
    },
     // 注册
    handleRegSubmit() {
         
    }
   
    }
}
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
