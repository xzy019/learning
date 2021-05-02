<template>
  <el-form
    status-icon
    :model="writer"
    :rules="rule"
    ref="Counsellor"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户昵称" prop="nickname">
      <el-input v-model="writer.name"></el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="writer.name"></el-input>
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
export default {
  components: {},
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.Counsellor.checkPass !== '') {
            this.$refs.Counsellor.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.Counsellor.pass) {
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
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '姓名不支持特殊字符',
            trigger: 'blur'
          }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        phoneNumber:[
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
          console.log(this.Counsellor);
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