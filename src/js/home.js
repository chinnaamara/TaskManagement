var tasks = Tasks.read,
    currentTask = {};

$(document).ready(function(){
    // dashboard content template binding
    var content = $('#content-template').html(),
      contentTemplate = Handlebars.compile(content);
    $('#content').html(contentTemplate);

    // paging
    var tasksPerPage = 5;

    var noOfPages = Math.ceil(tasks.length/tasksPerPage);
    if(noOfPages > 1){
        $('.pagination').show();
        createPaging(noOfPages);
    }
    showFirstPage(tasks.slice(), tasksPerPage);

    $('.ui-page-item').on('click', function() {
        var _tasks = tasks.slice();
        var pageTasks = _tasks.splice(($(this).text() - 1) * tasksPerPage, tasksPerPage);
        createDashboard(pageTasks);
    });

    // add new task page template binding
    $('#cteateTask').on('click', function(){
        var content = $('#addTask-template').html(),
        contentTemplate = Handlebars.compile(content);
        $('#content').html(contentTemplate);
    });

    // binding selected task template by clicking on task
    $(document).on('click', '#tasksList.list-group li', function(){
        var _title = $(this).text();
        var task = $('#task-template').html(),
            taskTemplate = Handlebars.compile(task);
        $('#content').html(taskTemplate());
        $('#task-title').text(_title);
        displayTask($(this).attr('id'));
    });
});


var addUpdateTask = function() {
    if($('#btnAddTask').text() === 'Create'){
        var newTask = {
            title: $('#title').val(),
            priority: $('#priority').val(),
            dueDate: $('#dueDate').val(),
            description: $('#description').val()
        };
        Tasks.create(newTask);
    } else
        Tasks.update(currentTask);
};

var editTask = function() {
    var content = $('#addTask-template').html(),
        contentTemplate = Handlebars.compile(content);
    $('#content').html(contentTemplate);
    $('#heading').text('Edit Task');
    $('#btnAddTask').text('Update');
    $('#title').val(currentTask.title);
    $('#priority').val(currentTask.priority);
    $('#dueDate').val(currentTask.dueDate);
    $('#description').val(currentTask.description);
};

var displayTask = function(taskId){
    var task = _.find(tasks, function(obj){
        return obj.id === Number(taskId);
    });
    currentTask = task;
    $('<li><span>Title:</span> &nbsp;' + task.title + '</li>')
    .appendTo('#taskView');
    $('<li><span>Priority:</span> &nbsp;' + task.priority + '</li>')
    .appendTo('#taskView');
    $('<li><span>Due Date:</span> &nbsp;' + task.dueDate + '</li>')
    .appendTo('#taskView');
    $('<li><span>Description:</span> &nbsp;' + task.description + '</li>')
    .appendTo('#taskView');
};

var deleteTask = function() {
    var confirmMessage = confirm('! Are you sure?');
    if(confirmMessage)
        Tasks.delete(currentTask);
};

var startTask = function() {
    console.log(currentTask);
};

var resolveTask = function() {
    console.log(currentTask);
};

var createPaging = function(num) {
    for(i = 1; i <= num; ++i){
        $('<li>' + i + '</li>')
        .addClass('ui-page-item')
        .appendTo('#pager');
    }
};

var createDashboard = function(data) {
    $('#tasksList').empty();
    _.forEach(data, function(obj){
        $('<li>' + obj.title + '</li>')
        .addClass('ui-menu-item')
        .attr('id', obj.id)
        .appendTo('#tasksList');
    });
};

var showFirstPage = function(data, num) {
    var _tasks = data;
    var pageTasks = _tasks.splice(0, num);
    createDashboard(pageTasks);
};
