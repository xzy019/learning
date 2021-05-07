<template>
  <div class="all">
    <div class="channel">你访问的页面不存在</div>
    <div class="container">
      <span>4</span>
      <span class="middle"></span>
      <span>4</span>
    </div>
  </div>
  
</template>

<style scoped>

.all {
  width: 100vw;
  height: 100vh;
  background-color: #2c3e50!important;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif, Arial, "Microsoft Yahei";
}

.channel {
  position: absolute;
  width: 80%;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -200px);
  font-size: 30px;
  font-weight: bold;
  color: #fff;
}

.container {
  width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container span {
  display: inline-block;
  width: 200px;
  font-size: 240px;
  /* background-color: blueviolet; */
  text-align: center;
  font-weight: 800;
  font-family: Arial, Helvetica, sans-serif;
}

.container span.middle {
  position: relative;
  width: 200px;
  height: 200px;
  /* background-color: #0984e3; */
}

.container span.middle::before,
.container span.middle::after {
  position: absolute;
  content: "";
  width: 200px;
  height: 200px;
  top: 0;
  left: 0;
  /* background-color: #e056fd; */
  /* 重点
    四个内阴影
    四种颜色
    透明度66（16进制）
    */
  box-shadow: /* 左侧 */ inset 30px 0 0 #fd79a866,
    /* 上方 */ inset 0 30px 0 #0984e366, /* 右侧 */ inset -30px 0 0 #00b89466,
    /* 下方 */ inset 0 -30px 0 #fdcb6e66;
  border-radius: 50%;
  animation: animate_before 4s linear infinite;
}

.container span.middle::after {
  transform: rotate(-45deg);
}

/* 制作动画 */

/* 分四次顺时针切换四个阴影的颜色 */

@keyframes animate_before {
  0% {
    box-shadow: /* 左侧 */ inset 30px 0 0 #fd79a866,
      /* 上方 */ inset 0 30px 0 #0984e366, /* 右侧 */ inset -30px 0 0 #00b89466,
      /* 下方 */ inset 0 -30px 0 #fdcb6e66;
  }
  25% {
    box-shadow: /* 左侧 */ inset 30px 0 0 #fdcb6e66,
      /* 上方 */ inset 0 30px 0 #fd79a866, /* 右侧 */ inset -30px 0 0 #0984e366,
      /* 下方 */ inset 0 -30px 0 #00b89466;
  }
  50% {
    box-shadow: /* 左侧 */ inset 30px 0 0 #00b89466,
      /* 上方 */ inset 0 30px 0 #fdcb6e66, /* 右侧 */ inset -30px 0 0 #fd79a866,
      /* 下方 */ inset 0 -30px 0 #0984e366;
  }
  75% {
    box-shadow: /* 左侧 */ inset 30px 0 0 #0984e366,
      /* 上方 */ inset 0 30px 0 #00b89466, /* 右侧 */ inset -30px 0 0 #fdcb6e66,
      /* 下方 */ inset 0 -30px 0 #fd79a866;
  }
  100% {
    box-shadow: /* 左侧 */ inset 30px 0 0 #fd79a866,
      /* 上方 */ inset 0 30px 0 #0984e366, /* 右侧 */ inset -30px 0 0 #00b89466,
      /* 下方 */ inset 0 -30px 0 #fdcb6e66;
  }
}

/* 左侧文字效果 */

/* 同样分四次将当前文字颜色变换为 左侧内阴影的颜色 */

.container span:nth-child(1) {
  animation: animate_span_1 4s linear infinite;
}

/* 创建一个动画 */

@keyframes animate_span_1 {
  0% {
    color: #fd79a8;
  }
  25% {
    color: #fdcb6e;
  }
  50% {
    color: #00b894;
  }
  75% {
    color: #0984e3;
  }
  100% {
    color: #fd79a8;
  }
}

/* 右侧文字效果 */

/* 同样分四次将当前文字颜色变换为 右侧内阴影的颜色 */

.container span:nth-child(3) {
  animation: animate_span_3 4s linear infinite;
}

/* 创建一个动画 */

@keyframes animate_span_3 {
  0% {
    color: #00b894;
  }
  25% {
    color: #0984e3;
  }
  50% {
    color: #fd79a8;
  }
  75% {
    color: #fdcb6e;
  }
  100% {
    color: #00b894;
  }
}
</style>