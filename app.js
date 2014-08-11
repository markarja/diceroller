$(document).ready(function() {
	
	document.addEventListener("deviceready", onDeviceReady, false);
	window.addEventListener("resize", onOrientationChanged, false);
	
	setDiceLayout();
	
	$("#roll").click(roll);

	$("#add").click(function() {
		setDiceLayout();
		if($("#dice").val() < 3) {
			var id = "die" + (($("#dice").val() * 1) + 1);
			document.getElementById(id).style.display = "inline";
			$("#dice").val($("#dice").val() * 1 + 1);
			document.getElementById("remove").src = "res/minus.png";
			if($("#dice").val() == 3) {
				document.getElementById("add").src = "res/plus_gray.png";
			}
		}
	});

	$("#remove").click(function() {
		setDiceLayout();
		if($("#dice").val() > 1) {
			var id = "die" + (($("#dice").val() * 1));
			document.getElementById(id).style.display = "none";
			$("#dice").val($("#dice").val() * 1 - 1);
			document.getElementById("add").src = "res/plus.png";
			if($("#dice").val() == 1) {
				document.getElementById("remove").src = "res/minus_gray.png";
			}
		}
	});

	$("#toggleaudio").click(function() {
		setDiceLayout();
		if($("#audio").val() == 1) {
			document.getElementById("toggleaudio").src = "res/speaker_off.png";
			document.getElementById("toggleaudiolabel").innerHTML = "audio off";
			$("#audio").val(0);
		} else {
			document.getElementById("toggleaudio").src = "res/speaker_on.png";
			document.getElementById("toggleaudiolabel").innerHTML = "audio on";
			$("#audio").val(1);
		}			                                            
	});
});

function roll() {
	
	var start = new Date().getTime();
	
	playAudio("roll.mp3", ($("#audio").val() == 1));
	
	var dice = $("#dice").val() * 1;
	
	for(var i = 1;i < dice + 1;i++) {
		document.getElementById("die" + i).style.marginLeft = Math.floor(Math.random() * 4) + 1 + "0%";
		if(!portrait()) {
			$("#die" + i).effect("shake", {times: 10, direction: "up"}, 2000);
		} else {
			$("#die" + i).effect("shake", {times: 10}, 2000);
		}
	}
	
	var timer = setInterval(function() {
		var now = new Date().getTime();
		var n;
		for(var i = 1;i < dice + 1;i++) {
			n = Math.floor(Math.random() * 6) + 1;
			document.getElementById("die" + i).src = "res/" + n + ".png";
		}
		if(now - start >= 2500) {
			window.clearInterval(timer);
			for(var i = 1;i < dice + 1;i++) {
				document.getElementById("die" + i).style.marginLeft = "0";
			}
		};
	}, 100);
}

function portrait() {
	if(window.innerHeight > window.innerWidth) {
		return true;
	} else {
		return false;
	}
}

function setDiceLayout() {
	if(portrait()) {
		document.getElementById("placeholder1").innerHTML = "<br />";
		document.getElementById("placeholder2").innerHTML = "<br />";
		document.getElementById("buttons").style.visibility = "visible";
	} else {
		document.getElementById("placeholder1").innerHTML = "";
		document.getElementById("placeholder2").innerHTML = "";
		document.getElementById("buttons").style.visibility = "hidden";
	}
}

function onDeviceReady() {
	shake.startWatch(roll);	
}

function playAudio(audioSource, audio) {
	if(audio) {
		document.getElementById("audioplayer").src = audioSource;
		var audio = document.getElementById("audioplayer");
		if(typeof device != "undefined") {
			if(device.platform == "Android") {
				audioSource = "/android_asset/www/" + audioSource;
				audio = new Media(audioSource, function() { audio.release(); }, onAudioError);
			} else if(device.platform == "WinCE") {
				audioSource = "/app/www/" + audioSource;
				audio = new Media(audioSource, function() {  }, onAudioError);
			} else {
				audio = new Media(audioSource, function() {  }, onAudioError);	
			}
			audio.play();	
		} else {
			audio.play();
		}
	}
}

function onAudioError() {
	alert("code: " + error.code + "\n" + 
          "message: " + error.message + "\n");
}

function onOrientationChanged() {
	setDiceLayout();
}
