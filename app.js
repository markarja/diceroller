$(document).ready(function() {
	$("#roll").click(function() {
		var start = new Date().getTime();
		if($("#audio").val() == 1) {
			document.getElementById('audioplayer').play();
		}
		var dice = $("#dice").val() * 1;
		for(var i = 1;i < dice + 1;i++) {
			document.getElementById('die' + i).style.marginLeft = Math.floor(Math.random() * 4) + 1 + '0%';
			$("#die" + i).effect("shake", {times: 10}, 2000);
		}
		var timer = setInterval(function() {
			var now = new Date().getTime();
			var n;
			for(var i = 1;i < dice + 1;i++) {
				n = Math.floor(Math.random() * 6) + 1;
				document.getElementById('die' + i).src = 'res/' + n + '.png';
			}
			if(now - start >= 2500) {
				window.clearInterval(timer);
				for(var i = 1;i < dice + 1;i++) {
					document.getElementById('die' + i).style.marginLeft = '0';
				}
			};
		}, 100);
	});

	$("#add").click(function() {
		if($("#dice").val() < 3) {
			var id = "die" + (($("#dice").val() * 1) + 1);
			document.getElementById(id).style.display = 'inline';
			$("#dice").val($("#dice").val() * 1 + 1);
			document.getElementById('remove').src = 'res/minus.png';
			if($("#dice").val() == 3) {
				document.getElementById('add').src = 'res/plus_gray.png';
			}
		}
	});

	$("#remove").click(function() {
		if($("#dice").val() > 1) {
			var id = "die" + (($("#dice").val() * 1));
			document.getElementById(id).style.display = 'none';
			$("#dice").val($("#dice").val() * 1 - 1);
			document.getElementById('add').src = 'res/plus.png';
			if($("#dice").val() == 1) {
				document.getElementById('remove').src = 'res/minus_gray.png';
			}
		}
	});

	$("#toggleaudio").click(function() {
		if($("#audio").val() == 1) {
			document.getElementById("toggleaudio").src = 'res/speaker_off.png';
			$("#audio").val(0);
		} else {
			document.getElementById("toggleaudio").src = 'res/speaker_on.png';
			$("#audio").val(1);
		}			                                            
	});
});