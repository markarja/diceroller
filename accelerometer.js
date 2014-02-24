var shake = (function () {
	
	var shake = {},
		watchId = null,
		options = { frequency: 300 },
		previousAcceleration = { x: null, y: null, z: null },
		shakeCallBack = null;

	shake.startWatch = function (onShake) {
		if (onShake) {
			shakeCallBack = onShake;
		}
		watchId = navigator.accelerometer.watchAcceleration(getAccelerationSnapshot, handleError, options);
	};
	
	shake.stopWatch = function () {
		if (watchId !== null) {
			navigator.accelerometer.clearWatch(watchId);
			watchId = null;
		}
	};
	
	function getAccelerationSnapshot() {
		navigator.accelerometer.getCurrentAcceleration(assessCurrentAcceleration, handleError);
	}
	
	function assessCurrentAcceleration(acceleration) {
		
		var accelerationChange = {};
		
		if (previousAcceleration.x !== null) {
			accelerationChange.x = Math.abs(previousAcceleration.x - acceleration.x);
			accelerationChange.y = Math.abs(previousAcceleration.y - acceleration.y);
			accelerationChange.z = Math.abs(previousAcceleration.z - acceleration.z);
		}

		if (accelerationChange.x + accelerationChange.y + accelerationChange.z > 30) {

			if (typeof (shakeCallBack) === "function") {
				shakeCallBack();
			}
			shake.stopWatch();
			setTimeout(shake.startWatch, 3000);
			previousAcceleration = { 
				x: null, 
				y: null, 
				z: null
			};
		} else {
			previousAcceleration = {
				x: acceleration.x,
				y: acceleration.y,
				z: acceleration.z
			};
		}
	}
 
	function handleError() { }
	
	return shake;
	
})();