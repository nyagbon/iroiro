/* https://aakira.app/blog/2018/12/code-block-title/ */
/* add filename to codecblock */
(function () {
    var list = document.body.getElementsByClassName("highlight");
    for (i=0; i <= list.length-1; i++) {
        var code = list[i];
        var name = code.getAttribute("name");
        if (name) {
            var div = document.createElement('div');
            div.textContent = name;
            div.classList.add('code-name');
            code.classList.add('with-code-name');
            code.parentNode.insertBefore(div, code);
        }
    }
})()
