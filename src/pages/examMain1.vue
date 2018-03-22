<template>
  <div class="examMain1">
    <el-row>
      <el-col class="centerCol">
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
            <el-col :span="24">
              <el-button
                class="blockBtn"
                type="primary"
                @click="checkboxGoNext()">
                确定
              </el-button>
            </el-col>
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import '@/assets/styles/less/main.less'
export default {
  name: 'examMain1',
  data: function () {
    return {
      msg: 'examMain1',
      examList: [],
      currentExam: {},
      currentIndex: 0,
      time: 0,
      isExplain: false
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
      console.log(self.examList)
      for (let index in self.examList.data) {
        if (self.examList.data[index].type === 'single') {
          self.examList.data[index].checked = 'N'
        }
        if (self.examList.data[index].type === 'multiple') {
          self.examList.data[index].checked = ['N']
        }
      }
      self.time = self.examList.time// 总时间
      self.currentExam = response.data.data.data[0]// 当前题目
    })
  },
  computed: {
    'alltime': function () {
      return this.time * 1000
    }
  },
  watch: {
    'currentExam.checked': {
      handler (curVal, oldVal) {
        // 注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
        if (this.currentExam.type === 'single' && curVal !== 'N') {
          // console.log(curVal, oldVal)
          let self = this
          // 500ms后进入下一题
          setTimeout(function () {
            self.currentIndex++
            self.currentExam = self.examList.data[self.currentIndex]
          }, 500)
          // console.log(this.currentIndex)
        }
      }
    }
  },
  methods: {
    // 排序多选答案
    sortCurrentChecked (value) {
      this.currentExam.checked = value.sort()
    },
    // 多选题“确认”
    checkboxGoNext () {
      let checked = this.currentExam.checked
      let length = this.currentExam.checked.length
      if (length > 1 && checked[length - 1] === 'N') {
        checked.splice(checked.indexOf('N'), 1)
        // console.log('确认', this.currentExam.checked)
      }
      console.log(checked.join(''))
      this.currentIndex++// 题号加一
      this.currentExam = this.examList.data[this.currentIndex]// 下一题
    }
  }
}
</script>
