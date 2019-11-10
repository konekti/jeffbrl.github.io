$(function () {
  $('#submitBtn').click(function (event) {
    event.preventDefault();
    let input_text = $('#input_text').val();
    validate(input_text);
  });
});
function validate(input_text) {
  $.ajax({
    url: "https://qs1c6q6sc1.execute-api.us-east-1.amazonaws.com/api/validate", data: input_text,
    contentType: "text/plain", type: "POST", success: update_page
  });
}
function update_page(result) {
  let output = $('#output');
  output.addClass('alert');
  if (result.validity === "true") {
    output
    .removeClass("alert-danger", true)
    .addClass("alert-success", true)
    .html("You entered valid AWS CloudFormation YAML");
  }
  else {
    output
    .removeClass("alert-success", true)
    .addClass("alert-danger", true)
    .html(result['message']);
  }
}
