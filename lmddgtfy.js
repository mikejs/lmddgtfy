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
                var str = $.query.get("q");
                type(str, 1); 
            });
        }, 100);
    });
}
  
function cursorToIcon() {
    var icon = $("#search_button");

    setTimeout(
        function() {
            icon.mouseover();
        }, 500);
    
    $("#cursor").animate({
        top: px(icon.position().top + 15),
        left: px(icon.position().left + 20)
    }, 1000, 'swing', function() {
        setTimeout(go, 300);
    });
}

function go() {
    var qstring = $.query.empty().set("q", $.query.get("q")).toString();
    window.location = "http://duckduckgo.com/" + qstring;
}
  
function type(str, index) {
    $("input[name='q']").focus().attr("value", str.substring(0, index));
    if (index < str.length) {
        setTimeout(function() {
        type(str, index + 1);
      }, 100);
    } else {
      setTimeout(cursorToIcon, 100);
    }
}

$("body").ready(
    function() {
        var q = $.query.get("q");
        if (q != "") {
            $("#cursor").show();
            $("#hidden_input").focus();
            $("input[name='q']").attr("value", "").attr('readonly', true).focus(
                function() {
                    this.blur();
                });
            setTimeout(cursorToInputField(), 200);
        }
    });