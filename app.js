$(document).ready(function() {
	
	document.addEventListener("deviceready", onDeviceReady, false);
	window.addEventListener("resize", onOrientationChanged, false);
	
	setDiceLayout();
	
	$("#roll").click(roll);

	$("#add").click(function() {
		if($("#dice").val() < 5) {
			var id = "die" + (($("#dice").val() * 1) + 1);
			document.getElementById(id).style.display = "inline";
			$("#dice").val($("#dice").val() * 1 + 1);
			document.getElementById("remove").src = "res/minus.png";
		
			calculateSumAndDisplayIt();
			
			if($("#dice").val() == 5) {
				document.getElementById("add").src = "res/plus_gray.png";
			}
			if($("#dice").val() == 4) {
				for(i = 0;i < 5;i++) {
					$("#die" + (i + 1)).css("width", "60px");
				} 
			} 
		}
		setDiceLayout();
	});

	$("#remove").click(function() {
		if($("#dice").val() > 1) {
			var id = "die" + (($("#dice").val() * 1));
			document.getElementById(id).style.display = "none";
			$("#dice").val($("#dice").val() * 1 - 1);
			document.getElementById("add").src = "res/plus.png";
			if($("#dice").val() == 1) {
				document.getElementById("remove").src = "res/minus_gray.png";
			}
			if($("#dice").val() == 3) {
				for(i = 0;i < 5;i++) {
					$("#die" + (i + 1)).css("width", "75px");
				} 
			}
			
			calculateSumAndDisplayIt();
		}
		setDiceLayout();
	});

	$("#toggleaudio").click(function() {
		setDiceLayout();
		if($("#audio").val() == 1) {
			document.getElementById("audioicon").innerHTML = "volume_off";
			document.getElementById("toggleaudiolabel").innerHTML = "audio off";
			$("#audio").val(0);
		} else {
			document.getElementById("audioicon").innerHTML = "volume_up";
			document.getElementById("toggleaudiolabel").innerHTML = "audio on";
			$("#audio").val(1);
		}			                                            
	});
	
	$("#moreapps").click(function() {
		$("#applist").css("visibility", "visible");
	});
	
	$("#help").fadeOut(3000);

});

function calculateSumAndDisplayIt() {
	if($("#dice").val() >= 2) {
		var sum = 0;
		for(i = 0;i < 5;i++) {
			if($("#die" + (i + 1)).css("display") == "inline") {
				var src = $("#die" + (i + 1)).attr("src");
				var parts = src.split("/")[1].split(".");
				sum = sum + 1 * parts[0];
			}
		}
		$("#sum").html(sum);
		$("#sum").css("display", "block");
	} else {
		$("#sum").css("display", "none");
	}
}

function roll() {
	
	var start = new Date().getTime();
	
	playAudio("res/roll.mp3", ($("#audio").val() == 1));
	
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
		
		calculateSumAndDisplayIt();
		
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
	if($("#dice").val() <= 3) {
		if(portrait()) {
			$("#placeholder1").html("<br />");
			$("#placeholder2").html("<br />");
			$("#placeholder3").html("<br />");
			$("#placeholder4").html("<br />");
			$("#buttons").css("visibility", "visible");	
			$("#sum").css("top", "50px");
		} else {
			$("#placeholder1").html("");
			$("#placeholder2").html("");
			$("#placeholder3").html("");
			$("#placeholder4").html("");	
			$("#buttons").css("visibility", "hidden");
			$("#sum").css("top", "180px");
		}
	} else if($("#dice").val() == 4) {
		if(portrait()) {
			$("#placeholder1").html("");
			$("#placeholder2").html("<br />");
			$("#placeholder3").html("");
			$("#placeholder4").html("<br />");
			$("#buttons").css("visibility", "visible");	
			$("#sum").css("top", "50px");
		} else {
			$("#placeholder1").html("");
			$("#placeholder2").html("");
			$("#placeholder3").html("");
			$("#placeholder4").html("");
			$("#buttons").css("visibility", "hidden");
			$("#sum").css("top", "180px");
		}
	} else if($("#dice").val() == 5) {
		if(portrait()) {
			$("#placeholder1").html("<br />");
			$("#placeholder2").html("");
			$("#placeholder3").html("");
			$("#placeholder4").html("<br />");
			$("#buttons").css("visibility", "visible");
			$("#sum").css("top", "50px");
		} else {
			$("#placeholder1").html("");
			$("#placeholder2").html("");
			$("#placeholder3").html("");
			$("#placeholder4").html("");
			$("#buttons").css("visibility", "hidden");
			$("#sum").css("top", "180px");
		}
	} 
	$("#content").css("height", (window.innerHeight - 90) + "px");
	$("#sum").css("top", Math.ceil(window.innerHeight / 8) + "px");
}

function onDeviceReady() {
	admob.createBannerView({
		publisherId: "ca-app-pub-1309397168819129/8255754892",
		isTesting: true,
		offsetStatusBar: false,
		bannerAtTop: true
	});	
	shake.startWatch(roll);	
}

function playAudio(audioSource, audio) {
	if(audio) {
		document.getElementById("audioplayer").src = audioSource;
		var audioObject = document.getElementById("audioplayer");
		if(typeof device != "undefined") {
			if(device.platform == "Android") {
				audioSource = "/android_asset/www/" + audioSource;
				audioObject = new Media(audioSource, function() { audioObject.release(); }, onAudioError);
			} else if(device.platform == "WinCE") {
				audioSource = "/app/www/" + audioSource;
				audioObject = new Media(audioSource, function() {  }, onAudioError);
			} else {
				audioObject = new Media(audioSource, function() {  }, onAudioError);	
			}
			audioObject.play();	
		} else {
			audioObject.play();
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
