function submitSkill() {}

// function enter_form() {
//   var formDiv = document.getElementsByClassName("form")[0];
//   formDiv.setAttribute("style", "display: block;");
//   var button = document.getElementsByClassName("enter_button")[0];
//   button.setAttribute("style", "display:none;");
//   var button = document.getElementsByClassName("exit_button")[0];
//   button.setAttribute("style", "display:block;");
// }

// function exit_form() {
//   var formDiv = document.getElementsByClassName("form")[0];
//   formDiv.setAttribute("style", "display: none;");
//   var button = document.getElementsByClassName("enter_button")[0];
//   button.setAttribute("style", "display:block;");
//   var button = document.getElementsByClassName("exit_button")[0];
//   button.setAttribute("style", "display:none;");
// }

// var httpRequest = new XMLHttpRequest();
// httpRequest.open('GET', 'https://freemdict.com', true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
// httpRequest.send();//第三步：发送请求  将请求参数写在URL中
// /**
//  * 获取数据后的处理程序
//  */
// httpRequest.onreadystatechange = function () {
//     if (httpRequest.readyState == 4 && httpRequest.status == 200) {
//         var json = httpRequest.responseText;//获取到json字符串，还需解析
//         console.log(json);
//     }
// };

var app1 = new Vue({
  el: "#app",
  data: {
    formisShow: false,
    openButtonisShow: true,
    closeButtonisShow: false,

  },
  methods: {
    openForm: function() {
      this.formisShow = true;
      this.openButtonisShow = false;
      this.closeButtonisShow = true;
    },
    closeForm: function() {
      this.formisShow = false;
      this.openButtonisShow = true;
      this.closeButtonisShow = false;
    }
  }
});
