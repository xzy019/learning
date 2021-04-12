<template>
  <div id="draw-border">
    <button>
      <i :class="icon"></i>
      <span v-show="msg">&nbsp;{{msg}}</span>
    </button>
  </div> 
</template>

<script>
export default {
  components: {

  },
  props:{
    msg:String,
    icon: String,
    bcolor: String
  },
  data(){
    return{
      btncolor:this.bcolor
    }
  }
}
</script>

<style scoped>
#neon-btn{
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  background-color: #031628;
}
#loading-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.btn{
  border: 1px solid;
  background-color: transparent;
  text-transform: uppercase;
  font-size: 14px;
  padding: 10px 20px;
  font-weight: 300;
}

.one{
  color: #4cc9f0;
}
.two{
  color: #f038ff;
}
.three{
  color: #b9e769;
}
.btn:hover{
  color: white;
  border: 0;
}
.one:hover{
  background-color: #4cc9f0;
  box-shadow: 10px 10px 99px 6px rgba(76, 201, 240, 1);
  -webkit-box-shadow: 10px 10px 99px 6px rgba(76, 201, 240, 1);
  -moz-box-shadow: 10px 10px 99px 6px rgba(76, 201, 240, 1);
}
.two:hover{
  background-color: #f038ff;
  box-shadow: 10px 10px 99px 6px rgba(240, 56, 255, 1);
  -webkit-box-shadow: 10px 10px 99px 6px rgba(240, 56, 255, 1);
  -moz-box-shadow: 10px 10px 99px 6px rgba(240, 56, 255, 1);
}
.three:hover{
  background-color: #b9e769;
  box-shadow: 10px 10px 99px 6px rgba(185, 231, 105, 1);
  -webkit-box-shadow: 10px 10px 99px 6px rgba(185, 231, 105, 1);
  -moz-box-shadow: 10px 10px 99px 6px rgba(185, 231, 105, 1);
}

#draw-border{
  display: inline-block;
}
#draw-border button{
  border: 0;
  background: none;
  text-transform: uppercase;
  color: v-bind(btncolor);
  font-weight: bold;
  position: relative;
  outline: none;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 16px;
}
#draw-border button::before,
#draw-border button::after{
  box-sizing: inherit;
  position: absolute;
  content: '';
  border: 2px solid transparent;
  width: 0;
  height: 0;
}
#draw-border button::after{
  bottom: 0;
  right: 0;
}
#draw-border button::before{
  top: 0;
  left: 0;
}
#draw-border button:hover{
  cursor: pointer;
}
#draw-border button:hover::after,
#draw-border button:hover::before{
  width: 100%;
  height: 100%;
}
#draw-border button:hover::before{
  border-top-color: v-bind(btncolor);
  border-right-color: v-bind(btncolor);
  transition: border-color 0s ease-out 0.6s,width 0.3s ease-out 0.6s,height 0.3s ease-out 1s;
}
#draw-border button:hover::after{
  border-bottom-color: v-bind(btncolor);
  border-left-color: v-bind(btncolor);
  transition: border-color 0s ease-out 0.6s,width 0.3s ease-out 0.6s,height 0.3s ease-out 1s;
}

#loading-btn button{
  background: transparent;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
  padding: 15px 50px;
  position: relative;
}

#loading-btn button::before{
  transition: all 0.8s cubic-bezier(0.7,-0.5,0.2,2);
  content: ' ';
  width: 1%;
  height: 100%;
  background-color: #ff5964;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
}
#loading-btn button span{
  mix-blend-mode: darken;
}
#loading-btn button:hover::before{
  width: 100%;
  background-color: #ff5964;
}
</style>
