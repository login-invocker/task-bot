var app = new Vue({
  el: '#app',
  data: {
    message: 'Server of task bot! Athor: dangtung789.td@gmail.com',
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