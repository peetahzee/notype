/*
 * Injects inbox_embed.js in quora.com/inbox
 */

new function($) {
  $.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }
}(jQuery);

var cans = [
	{name: "compile error", content: "Your PAx submission did not successfully compile on the [course VM](https://github.com/usc-csci102-spring2013/programming_assignments/wiki/Course-VM), therefore, we are unable to fully grade your submission.\n\nAfter grading the non-coding part of you PAx submission, you earned ** points**.\n\n>Any and all discussions pertaining to this problem **must** be done via comments on this issue. No emails are accepted. You are expected to follow the _Grading Disputes_ policies outlined in the [course syllabus](http://www-scf.usc.edu/~csci102/syllabus.html).", cursorAt: 279},
	{name: "deduction applied", content: "PAx Submission did not successfully fulfill all the requirements for this issue. The following error(s) were encountered:\n  + \n\nA deduction of **N points** was applied.\n\n>Any and all discussions pertaining to this deduction **must** be done via comments on this issue. No emails are accepted. You are expected to follow the _Grading Disputes_ policies outlined in the [course syllabus](http://www-scf.usc.edu/~csci102/syllabus.html).\n\n>You have two weeks from the time of this posting to dispute this deduction. Please allow up to 72 hours for a response to a regrade request.", cursorAt: 126},
	{name: "success", content: "PAx submission successfully fulfilled the requirements for this issue.", cursorAt: -1}
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
		//cmd + alt + t
		if(prompting) {
			if(e.which >= 48 && e.which <= 57) {
				if(cans[e.which-48] != null) {
					var c = cans[e.which-48];
					$(this).val(c.content);
					e.preventDefault();
					if(c.cursorAt != -1) {
						$(this).setCursorPosition(c.cursorAt);
					}
				}
			}
			prompting = false;
			div.hide(300);
		} else if((e.ctrlKey || e.metaKey) && e.altKey && e.which == 20) {
			prompting = true;
			div.show(300);
		}
	});
});