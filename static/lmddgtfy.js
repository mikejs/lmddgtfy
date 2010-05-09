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
                var str = $("#query").attr("value");
                type(str, 1); 
            });
        }, 100);
    })
}
  
function cursorToIcon() {
    var type = $("#search_type").attr("value");

    var icon;
    if (type === "d") {
        icon = $("#icon2");
    } else if (type === "s") {
        icon = $("#icon3");
    } else if (type === "i") {
        icon = $("#icon4");
    } else {
        icon = $("#icon1");
    }

    setTimeout(function() {
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
    var query = escape($("#query").attr("value"));
    var type = escape($("#search_type").attr("value"));
    window.location = "http://duckduckgo.com/?q=" + query + "&v=" + type;
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
  
google.setOnLoadCallback(function() {
    $("#hidden_input").focus();
    $("input[name='q']").attr("value", "").attr('readonly', true).focus(function() {
        this.blur();
    });
    setTimeout(cursorToInputField(), 200);
});
