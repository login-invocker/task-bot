var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    questions: [
      {text: "hi doctor"},
      {text: "alo DOctor"}
    ]
  },
  methods: {
    xoaKhoangCach: function () {
      console.log(this.message)
      this.message = this.message.replace(" ", '')
    }
  }
})