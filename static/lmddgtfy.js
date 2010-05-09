google.load("jquery", "1.4.1");
  
function px(i) {
    return i.toString() + "px";
}
  
function cursorToInputField() {
    var input = $("input[name='q']");
    $("#cursor").animate({
        top: px(input.position().top + 15),
        left: px(input.position().left + 15)
    }, 1500, 'swing', function() {
        input.focus();
        setTimeout(function() {
            input.attr('readonly', false).focus();
            $("#cursor").animate({
                top: px(input.position().top + 35)
            }, 500, 'swing', function() {
                var str = window.location.search.substring(3).replace(/\+/g, " ");
                type(str, 1); 
            });
        }, 100);
    })
}
  
function cursorToSubmit() {
    var submit = $("#icon1");
    $("#cursor").animate({
        top: px(submit.position().top + 15),
        left: px(submit.position().left + 15)
    }, 1500, 'swing', function() {
      submit.focus();
      setTimeout(go, 300);
    });
}

function go() {
    window.location = "http://duckduckgo.com/?q=" + window.location.search.substring(3);
}
  
function type(str, index) {
    $("input[name='q']").focus().attr("value", str.substring(0, index));
    if (index < str.length) {
        setTimeout(function() {
        type(str, index + 1);
      }, 100);
    } else {
      setTimeout(cursorToSubmit, 100);
    }
  }
  
google.setOnLoadCallback(function() {
    $("#hidden_input").focus();
    $("input[name='q']").attr("value", "").attr('readonly', true).focus(function() {
        this.blur();
    });
    setTimeout(cursorToInputField(), 200);
});