<template>
  <div class="lawFreePoints">
    <el-row>
      <!-- 倒计时 -->
      <countDown :alltime="time" @currentTime="stopQuestionTime"></countDown>
      <el-col>
        <div class="centerCol lawFreePointsExam">
          <div class="stepDiv">
            <a class="last" @click="last()"><span></span></a>
            <a class="next" @click="next()"><span></span></a>
          </div>
          <div class="examDiv">
            <div class="question">
              <el-tag size="mini" v-show="currentExam.type == 'multiple'">多选题</el-tag>
              {{currentIndex + 1}}、 {{currentExam.question}}
            </div>
            <div class="questionImg">
              <img
                v-show="currentExam.url"
                :src="currentExam.url"
                alt="题目图片">
            </div>
            <div v-show="isShowChoose">
        <!-- 单选 -->
              <ul v-show="currentExam.type == 'single'">
                <li v-show="currentExam.item1">
                  <el-radio
                    class="block"
                    v-model="currentExam.checked"
                    label="1"
                  >A、{{currentExam.item1}}</el-radio>
                  <i class="el-icon-circle-close"></i>
                  <i class="el-icon-circle-check"></i>
                </li>
                <li v-show="currentExam.item2">
                  <el-radio
                    class="block"
                    v-model="currentExam.checked"
                    label="2"
                  >B、{{currentExam.item2}}</el-radio>
                  <i class="el-icon-circle-close"></i>
                  <i class="el-icon-circle-check"></i>
                </li>
                <li v-show="currentExam.item3">
                  <el-radio
                    class="block"
                    v-model="currentExam.checked"
                    label="3"
                  >C、{{currentExam.item3}}</el-radio>
                  <i class="el-icon-circle-close"></i>
                  <i class="el-icon-circle-check"></i>
                </li>
                <li v-show="currentExam.item4">
                  <el-radio
                    class="block"
                    v-model="currentExam.checked"
                    label="4"
                  >D、{{currentExam.item4}}</el-radio>
                  <i class="el-icon-circle-close"></i>
                  <i class="el-icon-circle-check"></i>
                </li>
              </ul>
        <!-- 多选 -->
              <div v-show="currentExam.type == 'multiple'">
                <el-checkbox-group
                  v-model="currentExam.checked"
                  @change="sortCurrentChecked">
                  <ul>
                    <li v-show="currentExam.item1">
                      <el-checkbox class="block" :label="1">{{currentExam.item1}}</el-checkbox>
                    </li>
                    <li v-show="currentExam.item2">
                      <el-checkbox class="block" :label="2">{{currentExam.item2}}</el-checkbox>
                    </li>
                    <li v-show="currentExam.item3">
                      <el-checkbox class="block" :label="3">{{currentExam.item3}}</el-checkbox>
                    </li>
                    <li v-show="currentExam.item4">
                      <el-checkbox class="block" :label="4">{{currentExam.item4}}</el-checkbox>
                    </li>
                  </ul>
                </el-checkbox-group>
                <div>
                  <el-col :span="24"
                    :style="{margin:'0 auto 20px', float: 'none'}">
                    <el-button
                      class="blockBtn"
                      type="primary"
                      @click="goNext()">
                      确定
                    </el-button>
                  </el-col>
                </div>
              </div>
            </div>
            <div class="explainDiv" v-show="isExplain">
              <el-card class="box-card">
                <el-tag size="mini" type="success">解析</el-tag><small>&nbsp;&nbsp;{{currentExam.explains}}</small>
              </el-card>
            </div>
          </div>
          <!-- <ul>
            <li>{{typeof currentExam.checked}}{{currentExam.checked}}</li>
          </ul> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countDown from '@/components/countDown'
import board from '@/components/board'
import '@/assets/styles/less/main.less'
export default {
  name: 'lawFreePoints',
  data: function () {
    return {
      examList: [], // 所有题目
      allCount: 0, // 所有题目数量
      currentExam: {}, // 当前题目
      currentIndex: 0, // 当前题目序列号号
      time: 0, // 倒计时时间
      currentTime: 0, // 当前剩余时间
      timeForQuestion: 10, // 看题倒计时时间
      timeForAnswer: 5, // 做题倒计时时间
      timeType: 'question', // 倒计时类型 question ｜ answer
      isShowChoose: false, // 是否显示选项（一开始不显示）
      isExplain: false, // 是否显示解析
      loading: true
    }
  },
  created: function () {
    var self = this
    this.$ajax({
      method: 'get',
      url: 'https://www.easy-mock.com/mock/5a27aaf27f2b435f137d08a5/example/user'
    }).then(function (response) {
      // console.log(response)
      self.examList = response.data.data// 所有的题目
      // console.log(self.examList)
      for (let index in self.examList.data) {
        if (self.examList.data[index].type === 'single') {
          self.examList.data[index].checked = 'N'
        }
        if (self.examList.data[index].type === 'multiple') {
          self.examList.data[index].checked = ['N']
        }
      }
      self.allCount = self.examList.data.length
      self.currentExam = response.data.data.data[0]// 当前题目
      self.time = self.timeForQuestion
    })
  },
  watch: {
    'currentExam.checked': {
      handler (curVal, oldVal) {
        // 注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
        if (this.currentExam.type === 'single' && curVal !== 'N') {
          // console.log(curVal, oldVal)
          this.goNext()
        }
      }
    }
  },
  components: {countDown, board},
  methods: {
    /* 抢答，重启下一题计时 */
    afterTimeAnswer () {
      this.time = this.timeForQuestion// 看题时间倒计时
      this.isShowChoose = false// 不展示选项
      this.timeType = 'question'
    },
    /* 保存答案进入下一题 */
    goNext () {
      // console.log(this.currentExam.checked)
      this.afterTimeAnswer()
      // console.log('timeType', this.timeType, 'time', this.time)
      if (this.currentExam.type === 'single') {
        this.radioGoNext()
      }
      if (this.currentExam.type === 'multiple') {
        this.checkboxGoNext()
      }
    },
    /* 单选题 下一题 */
    radioGoNext () {
      let self = this
      // 500ms后进入下一题
      setTimeout(function () {
        self.currentIndex++
        self.currentExam = self.examList.data[self.currentIndex]
      }, 500)
    },
    /* 多选题 排序答案 */
    sortCurrentChecked (value) {
      this.currentExam.checked = value.sort()
    },
    /* 多选题 "确认"进入下一题 */
    checkboxGoNext () {
      let checked = this.currentExam.checked
      let length = this.currentExam.checked.length
      if (length > 1 && checked[length - 1] === 'N') {
        checked.splice(checked.indexOf('N'), 1)
        // console.log('确认', this.currentExam.checked)
      }
      // console.log(checked.join(''))
      this.currentExam.checked = checked.join('')
      this.currentIndex++// 题号加一
      this.currentExam = this.examList.data[this.currentIndex]// 下一题
    },
    /* 题板跳转 */
    boardIndex (index) {
      this.currentIndex = index - 1
      this.currentExam = this.examList.data[this.currentIndex]
    },
    /* 题目倒计时结束，选项显隐 */
    stopQuestionTime (currentTime) {
      this.currentTime = currentTime
      // console.log(this.currentTime)
      if (this.currentTime === 0) {
        if (this.timeType === 'question') {
          this.isShowChoose = true// 展示选项
          this.time = this.timeForAnswer// 做题时间倒计时
          this.timeType = 'answer'
          return
        }
        if (this.timeType === 'answer') {
          this.isShowChoose = false// 不展示选项
          this.goNext()
          this.timeType = 'question'
          this.time = this.timeForQuestion// 看题时间倒计时
        }
      }
    }
  }
}
</script>

<style>
  .lawFreePoints {
    height: 100%;
  }
  .lawFreePointsExam {
    margin: auto;
    min-width: 280px;
    max-width: 500px;
    padding:60px 5%;
    background-color: lightblue;
  }
</style>
