module.exports = function(tasks, cb){
	var semaphore = Object.keys(tasks).length;
	var results = {};
	var hasError = false;

	Object.keys(tasks).forEach(function(taskKey){
		tasks[taskKey](function(error, data){
			console.log("Running task",taskKey);
			if(error && !hasError){
				hasError = true;
				console.error(error);
				cb(error, results);
				return;
			}
			results[taskKey] = data;

			checkSemaphore();
		})
	});

	function checkSemaphore(){
		console.log("Decreasing semaphore:",semaphore);
		semaphore--;
		if (semaphore == 0){
			cb(null, results);
		}
	};
}