---
layout: default
permalink: /aws-cf-validator/
menu: dark
---

<div class="container">
  <h1>AWS CloudFormation YAML Validator</h1>
  <p>Enter your CloudFormation template and click "Validate".</p>
  <div class="row">
    <div class="form-group">
      <form action="POST">
        <textarea class="form-control" rows="20" id="input_text"></textarea><br>
        <button type="button" id="submitBtn" class="btn btn-primary">Validate</button>
      </form>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-8">
      <p id="output" class="none"></p>
    </div>
    <div class="col-sm-4"></div>
  </div>
</div>
<script>
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
    if (result.validity === "true") {
        $('#output').removeClass("alert alert-danger", true);
        $('#output').addClass("alert alert-success", true);
        $("#output").html("You entered valid AWS CloudFormation YAML");
    }
    else {
        $('#output').removeClass("alert alert-success", true);
        $('#output').addClass("alert alert-danger", true);
        $("#output").html(result['message']);
    }
  }
</script>