<template>
  <div class="board">
    <div v-for="index in count" :key="index" @click="changeToIndex(index)">{{index}}</div>
  </div>
</template>

<script>
export default {
  name: 'board',
  data () {
    return {
    }
  },
  props: ['allCount'],
  computed: {
    'count': function () {
      let countArr = []
      for (let i = 1; i <= this.allCount; i++) {
        countArr.push(i)
      }
      console.log(countArr)
      // let countArr = this.allCount
      return countArr
    }
  },
  methods: {
    changeToIndex (index) {
      this.$emit('boardIndex', index)
    }
  }
}
</script>

<style lang="less" scoped>
.board{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-grow: 1;
  div {
    flex-shrink: 0;
    border: 1px solid gray;
    border-radius: 50%;
    text-align: center;
    flex-basis: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    margin: .2rem;
  }
}
</style>
