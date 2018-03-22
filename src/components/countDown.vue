<template>
  <canvas
    ref="canv"
    class="countDown"
    width="80px"
    height="80px"></canvas>
</template>
<script>
export default {
  name: 'countDown',
  data () {
    return {
      X: 0,
      Y: 0,
      radius: 30,
      font: '16px Arial', // 中间时间字体大小
      strokeStyle: '#00C4AC',
      counterClockwise: true, // 圆形生成方向
      progressLineWidth: 5, // 进度条宽度
      commonLineWidth: 1, // 外边界圆形宽度
      fontLineWidth: 2,
      startAngle: 0, // 开始角度
      endAngle: Math.PI * 2, // 结束角度
      timer: '' // 倒计时
    }
  },
  props: ['alltime'],
  watch: {
    /* 因为alltime的数据在接口返回之后才能够得到，所以需要对alltime进行监听。alltime的值不为0再进行canvas渲染 */
    alltime (newVal, oldVal) {
      // console.log(newVal, oldVal)
      let canv = this.$refs.canv
      // 清空旧图形，绘制进度条
      if (newVal) {
        if (this.timer) {
          // 当重新给alltime赋值的时候，定时器并没结束时，清除定时器，开始新的定时器
          clearInterval(this.timer)
          this.countDownTimer(this, newVal, canv)
        } else {
          this.countDownTimer(this, newVal, canv)
        }
      }
    }
  },
  mounted: function () {
    let canv = this.$refs.canv
    this.X = canv.width / 2// 横坐标
    this.Y = canv.height / 2// 纵坐标
    // console.log(this.$refs.canv)
    this.drawCircle(this, canv, this.X, this.Y, this.radius, this.startAngle, this.endAngle, this.counterClockwise, this.progressLineWidth)
  },
  methods: {
    /* 倒计时 */
    countDownTimer: (self, value, ctx) => {
      let currentTime = value
      self.timer = setInterval(() => {
        if (currentTime <= 0) {
          currentTime = 0
          clearInterval(self.timer)
        } else {
          currentTime--
          let timeAngle = (1 - currentTime / self.alltime) * 2 * Math.PI
          // console.log(currentTime)
          // 重绘进度条
          self.progressCircle(self, currentTime, ctx, self.X, self.Y, self.radius, self.startAngle, timeAngle - Math.PI / 2, self.counterClockwise, self.progressLineWidth)
        }
      }, 1000)
    },
    /* 画圆环 */
    drawCircle: (vueThis, ctx, positionX, positionY, radius, startAngle, endAngle, couterClockwise, lineWidth) => {
      let cycle = ctx.getContext('2d')
      cycle.lineWidth = lineWidth
      cycle.strokeStyle = vueThis.strokeStyle
      cycle.beginPath()
      cycle.arc(positionX, positionY, radius, startAngle, endAngle, couterClockwise)
      cycle.stroke()
    },
    /* 倒计时画图 */
    progressCircle: (self, time, ctx, positionX, positionY, radius, startAngle, endAngle, counterClockwise, lineWidth) => {
      // 清空旧图像
      let clearRECT = ctx.getContext('2d')
      clearRECT.clearRect(positionX - radius - self.progressLineWidth, positionY - radius - self.progressLineWidth, radius * 2 + self.progressLineWidth * 2, radius * 2 + self.progressLineWidth * 2)
      // 中间数字
      let cycle = ctx.getContext('2d')
      cycle.font = self.font
      cycle.lineWidth = self.commonLineWidth
      cycle.textBaseline = 'middle'
      let contextTime = self.times(time)
      cycle.strokeText(contextTime.minute + ':' + contextTime.second, positionX - 20, positionY)
      // 根据输入值绘制进度条
      self.drawCircle(self, ctx, self.X, self.Y, self.radius, self.startAngle - Math.PI / 2, endAngle, counterClockwise, lineWidth)
      self.$emit('currentTime', time)
    },
    /* 时间格式化 */
    times: (testAllTime) => {
      var day = 0
      var hour = 0
      var minute = 0
      var second = 0// 时间默认值
      if (testAllTime > 0) {
        day = Math.floor(testAllTime / (60 * 60 * 24))
        hour = Math.floor(testAllTime / (60 * 60)) - (day * 24)
        minute = Math.floor(testAllTime / 60) - (day * 24 * 60) - (hour * 60)
        second = Math.floor(testAllTime) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
      }
      if (hour <= 9) hour = '0' + hour
      if (minute <= 9) minute = '0' + minute
      if (second <= 9) second = '0' + second
      return {'time': testAllTime, 'hour': hour, 'minute': minute, 'second': second}
    }
  }
}
</script>
<style scoped>
  canvas {
    display: block;
    margin: 0 auto -40px;
    background-color: white;
    border-radius: 50%;
  }
</style>
