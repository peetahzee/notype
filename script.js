/*
 * Injects inbox_embed.js in quora.com/inbox
 */

new function($) {
  $.fn.setCursorPosition = function(posStart, posEnd) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(posStart, posEnd);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', posEnd);
      range.moveStart('character', posStart);
      range.select();
    }
  }
}(jQuery);

var cans = [
	{name: "compile error", content: "Your PAx submission did not successfully compile on the [course VM](https://github.com/usc-csci102-spring2013/programming_assignments/wiki/Course-VM), therefore, we are unable to fully grade your submission.\n\nAfter grading the non-coding part of you PAx submission, you earned **[notype_placeholder] points**.\n\n>Any and all discussions pertaining to this problem **must** be done via comments on this issue. No emails are accepted. You are expected to follow the _Grading Disputes_ policies outlined in the [course syllabus](http://www-scf.usc.edu/~csci102/syllabus.html)."},
	{name: "deduction applied", content: "PAx Submission did not successfully fulfill all the requirements for this issue. The following error(s) were encountered:\n  + [notype_placeholder]\n\nA deduction of **[notype_placeholder] points** was applied.\n\n>Any and all discussions pertaining to this deduction **must** be done via comments on this issue. No emails are accepted. You are expected to follow the _Grading Disputes_ policies outlined in the [course syllabus](http://www-scf.usc.edu/~csci102/syllabus.html).\n\n>You have two weeks from the time of this posting to dispute this deduction. Please allow up to 72 hours for a response to a regrade request."},
	{name: "success", content: "PAx submission successfully fulfilled the requirements for this issue."}
]

$(document).ready(function() {
	var prompting = false;
	var div = $("<div id=\"notype_prompt\"></div>").hide();
	div.append("<ul>");
	for(var i = 0; i < cans.length; i++) {
		div.find("ul").append("<li><span>" + i + "</span>" + cans[i].name + "</li>");
	}
	div.append("<div class=\"clear\"></div>");
	$("body").append(div);
	$("textarea").keypress(function(e) {
		if (prompting) {
			if(e.which >= 48 && e.which <= 57) {
				if(cans[e.which-48] != null) {
					var c = cans[e.which-48];
					$(this).val(c.content);
					var placeholder_index = c.content.indexOf("[notype_placeholder]");
					if(placeholder_index != -1) {
						$(this).setCursorPosition(placeholder_index, placeholder_index + 20);
					}

					// don't let the selection get to the textarea
					e.preventDefault();
				}
			}
			prompting = false;
			div.hide(300);
		} else if ((e.ctrlKey || e.metaKey) && e.altKey && e.which == 11) {
			//cmd + alt + k (up)
			var currentCursor = $(this).get(0).selectionStart;
			var placeholder_index = $(this).val().indexOf("[notype_placeholder]", currentCursor + 1);
			if(placeholder_index != -1) {
				$(this).setCursorPosition(placeholder_index, placeholder_index + 20);
			}
			e.preventDefault();
		} else if ((e.ctrlKey || e.metaKey) && e.altKey && e.which == 10) {
			//cmd + alt + j (down)
			var currentCursor = $(this).get(0).selectionStart;
			var placeholder_index = $(this).val().lastIndexOf("[notype_placeholder]", currentCursor - 1);
			if(placeholder_index != -1) {
				$(this).setCursorPosition(placeholder_index, placeholder_index + 20);
			}
			e.preventDefault();
		} else if ((e.ctrlKey || e.metaKey) && e.altKey && e.which == 9) {
			//cmd + alt + i (for insert)
			prompting = true;
			div.show(300);
		}
	});
});