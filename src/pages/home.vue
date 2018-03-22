<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :offset="4" :span="16">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon
          :rules="rules">
          <el-form-item
            :label="form.testType.label"
            prop="testType">
            <el-select class="block"
              v-model="ruleForm.testType"
              placeholder="请选择考试题型" ref="testType">
              <el-option
                v-for="testType in form.testType.data"
                :label="testType.text"
                :value="testType.value"
                :key="testType.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div v-show="ruleForm.testType == 4">
            <el-form-item
              :label="form.passLevel.label"
              prop="passLevel">
              <el-select
                class="block"
                v-model="ruleForm.passLevel"
                placeholder="请选择及格等级">
                <el-option
                  v-for="passLevel in form.passLevel.data"
                  :label="passLevel.text"
                  :value="passLevel.value"
                  :key="passLevel.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="form.exit.label"
              prop="exit">
              <el-radio-group v-model="ruleForm.exit">
                <el-radio
                  v-for="exit in form.exit.data"
                  :label="exit.value"
                  :key="exit.value">
                  {{exit.text}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              :label="form.board.label"
              prop="board">
              <el-radio-group v-model="ruleForm.board">
                <el-radio
                  v-for="board in form.board.data"
                  :label="board.value"
                  :key="board.value">
                  {{board.text}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-show="ruleForm.board == 1">
              <el-form-item
                :label="form.boardResult.label"
                prop="boardResult">
                <el-select
                  class="block"
                  v-model="ruleForm.boardResult"
                  placeholder="请选择题板显示类型">
                  <el-option
                    v-for="boardResult in form.boardResult.data"
                    :label="boardResult.text"
                    :value="boardResult.value"
                    :key="boardResult.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item
              :label="form.answer.label"
              prop="answer">
              <el-radio-group v-model="ruleForm.answer">
                <el-radio
                  v-for="answer in form.answer.data"
                  :label="answer.value"
                  :key="answer.value">
                  {{answer.text}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <el-col :span="24">
            <el-form-item>
              <el-button
                class="block"
                type="primary"
                @click="creatExam('ruleForm')">
                生成试题
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
        <ul>
          <li v-for="(val,index) in ruleForm" :key="index"> {{typeof val}} {{val}} {{index}}</li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    // 如果题型是其他才显示之后选项
    var testTypeRule = (rule, value, callback, msg) => {
      if (this.ruleForm.testType === 4 && value === '') {
        callback(new Error())
      } else {
        callback()
      }
    }
    return {
      form: {
        testType: {
          val: '',
          label: '考试题型：',
          data: [
            {value: 1, text: '学法免分'},
            {value: 2, text: '驾考'},
            {value: 3, text: '中小学生考试'},
            {value: 4, text: '其他'}
          ]
        },
        passLevel: {
          val: '',
          label: '及格等级：',
          data: [
            {value: 60, text: '60'},
            {value: 90, text: '90'}
          ]
        },
        exit: {
          val: '',
          label: '能否回退重新选择：',
          data: [
            {value: 0, text: '不能'},
            {value: 1, text: '能'}
          ]
        },
        board: {
          val: '',
          label: '是否显示题板：',
          data: [
            {value: 0, text: '不显示'},
            {value: 1, text: '显示'}
          ]
        },
        boardResult: {
          val: '',
          label: '题板显示类型：',
          data: [
            {value: 1, text: '只显示已做未做'},
            {value: 2, text: '显示正误'}
          ]
        },
        answer: {
          val: '',
          label: '答完是否显示正确答案：',
          data: [
            {value: 0, text: '不显示'},
            {value: 1, text: '显示'}
          ]
        }
      },
      rules: {
        testType: [
          {required: true, message: '请选择考试题型', trigger: 'change'}
        ],
        passLevel: [
          {validator: testTypeRule, message: '请选择及格等级', trigger: 'change'}
        ],
        exit: [
          {validator: testTypeRule, message: '请选择能否回退重新选择', trigger: 'change'}
        ],
        board: [
          {validator: testTypeRule, message: '请选择是否选择题板', trigger: 'change'}
        ],
        boardResult: [{
          validator: (rule, value, callback) => {
            if (this.ruleForm.board === 1 && this.ruleForm.boardResult === '') {
              callback(new Error('请选择题板显示类型'))
            } else {
              callback()
            }
          },
          trigger: 'change'}
        ],
        answer: [
          {validator: testTypeRule, message: '请选择答完是否显示正确答案', trigger: 'change'}
        ]
      },
      ruleForm: {
        testType: '',
        passLevel: '',
        exit: '',
        board: '',
        boardResult: '',
        answer: ''
      }
    }
  },
  methods: {
    creatExam (formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('正在生成...submit!' + formName)
          // this.$router.push({name: 'examMain1'})
          this.$router.push({name: 'lawFreePoints'})
          sessionStorage.setItem('examCondition', JSON.stringify(this.ruleForm))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .home{
    .block{
      width: 100%;
    }
  }
</style>
