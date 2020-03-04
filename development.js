function submitSkill() {}

function enter_form() {
  var formDiv = document.getElementsByClassName("form")[0];
  formDiv.setAttribute("style", "display: block;");
  var button = document.getElementsByClassName("enter_button")[0];
  button.setAttribute("style", "display:none;");
  var button = document.getElementsByClassName("exit_button")[0];
  button.setAttribute("style", "display:block;");
}

function exit_form() {
  var formDiv = document.getElementsByClassName("form")[0];
  formDiv.setAttribute("style", "display: none;");
  var button = document.getElementsByClassName("enter_button")[0];
  button.setAttribute("style", "display:block;");
  var button = document.getElementsByClassName("exit_button")[0];
  button.setAttribute("style", "display:none;");
}
