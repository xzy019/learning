<template>
  <el-form
    style="
      width: 400px;
      padding-top: 40px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
    "
    :model="User"
    :label-position="labelPosition"
    label-width="80px"
  >
    <el-form-item label="用户ID">
      <el-input v-model="User.id"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="User.password"></el-input>
    </el-form-item>
    <el-form-item label="验证码">
      <el-input v-model="yzm" style="width: 50%"></el-input>
      <div id="checkCode" class="code" @click="getCode()">{{code}}</div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import swal from '../lib/swal';
import axios from 'axios';
export default {
  components: {},
  data() {
    return {
      labelPosition: "right",
      User: {
        id: "",
        password: "",
        type: "",
      },
      yzm: "",
      code: ''
    };
  },
  methods: {
    onSubmit() {
      if(this.yzm.toUpperCase === this.code.toUpperCase){
        axios({
          url: 'http://localhost:6060/api/Authoize/Login',
          method: 'post', // post、put、delete、
          params: {
            username: this.User.id,
            userpwd: this.User.password
          },
        })
        .then(function (response) {
          console.log(response.data);
          sessionStorage.setItem("token",response.data.data);
          this.$router.push({
            path: '/home'
          });
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });

      }else swal.Warning("输入的验证码有误");
    },
    getCode() {
      var code = "";
      //所有候选组成验证码的字符
      var codeChars = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      //循环组成验证码的字符串
      for (var i = 0; i < 4; i++) {
        //获取随机验证码下标
        var charNum = Math.floor(Math.random() * 62);
        //组合成指定字符验证码
        code += codeChars[charNum];
      }
      this.code = code;
    },
  },
  created(){
    this.getCode();
  }
};
</script>

<style scoped>
.code {
  font-family: Arial;
  font-style: italic;
  color: #409eff;
  font-size: 30px;
  letter-spacing: 3px;
  font-weight: bolder;
  cursor: pointer;
  text-align: center;
  background-color: #cecece;
  height: 40px;
  width: 50%;
  vertical-align: middle;
  display: inline-block;
}
</style>
