var app = new Vue({
  el: '#app',
  data: {
    message: 'Server of task bot! Author: dangtung789.td@gmail.com',
    questions: [
      {text: "hi doctor"},
      {text: "alo DOctor"}
    ]
  },
  methods: {
    xoaKhoangCach: function () {
      this.message = this.message.replace(" ", '')
    }
  }
})