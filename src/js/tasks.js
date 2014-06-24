var Tasks = (function() {
    var tasksList = JSON.parse(localStorage.getItem('tasks')) || [];

	var createTask = function(newTask) {
		var items = tasksList;
        if(items.length > 0)
            newTask.id = Number(items[items.length - 1].id) + 1;
        else
            newTask.id = 1;
		items.push(newTask);
		localStorage.setItem('tasks', JSON.stringify(items));
		window.location.href = 'home.html';
	};

	var updateTask = function(currentTask) {
		var updatedTask = _.find(tasksList, function(obj) {
			return obj.id === currentTask.id;
		});
		var taskIndex = tasksList.indexOf(updatedTask);
		updatedTask.title = $('#title').val();
		updatedTask.priority = $('#priority').val();
		updatedTask.dueDate = $('#dueDate').val();
		updatedTask.description = $('#description').val();
		tasksList[taskIndex] = updatedTask;
		localStorage.setItem('tasks', JSON.stringify(tasksList));
		window.location.href = 'home.html';
	};

	var deleteTask = function(currentTask) {
		var confirmMessage = confirm('Please confirm that do you wish to delete this task?');
        if (confirmMessage) {
            var deletedTask = _.find(tasksList, function(obj) {
                return obj.id === currentTask.id;
            });
			tasksList.splice(tasksList.indexOf(deletedTask), 1);
			localStorage.setItem('tasks', JSON.stringify(tasksList));
			window.location.href = 'home.html';
        }
	};

	return {
		create: createTask,
		read: tasksList,
		update: updateTask,
		delete: deleteTask
	};
})();
