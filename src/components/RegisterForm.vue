<template>
  <el-form
    status-icon
    :model="writer"
    :rules="rule"
    ref="writer"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户昵称" prop="nickname">
      <el-input v-model="writer.nickname"></el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="writer.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input
        type="password"
        v-model="writer.pass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        type="password"
        v-model="writer.checkPass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="writer.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="联系电话" prop="telnumber">
      <el-input v-model="writer.telnumber"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('writer')">提交</el-button>
      <el-button @click="resetForm('writer')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'
import swal from '../lib/swal'
export default {
  components: {},
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.writer.checkPass !== '') {
            this.$refs.writer.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.writer.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      writer: {
        nickname:'',
        username: "",
        sex: "",
        telnumber: "",
        pass: "",
        checkPass: '',
      },
      rule: {
        nickname: [
          // { required: true, message: '请输入真实姓名', trigger: 'blur' },
          // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          // {
          //   required: true,
          //   pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
          //   message: '姓名不支持特殊字符',
          //   trigger: 'blur'
          // }
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        username:[{ required: true, message: '请输入用户名', trigger: 'blur' }],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        telnumber:[
          { required: true, message: '请输入电话号码', trigger: 'blur' }, 
          { required: true, pattern: /^((13|14|15|16|17|18)[0-9]{1}\d{8})|((166|199|198)[0-9]{1}\d{7})$/, message: '请输入正确的电话号码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            url:"http://localhost:5000/api/Writer/Create",
            method: 'post',
            params:{
              username: this.writer.username,
              userpwd: this.writer.pass,
              nickname: this.writer.nickname,
              sex: this.writer.sex,
              telnumber: this.writer.telnumber
            }
          }).then(function(res){
            if(res.data.code ===200){
              swal.Success("注册成功");
              this.$router.go(0)
            }
          }.bind(this)).catch(err=>{
            console.log(err)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
</style>