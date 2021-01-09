$(document).ready(readyNow);

function readyNow() {
    console.log('jq ready')
    getTasks();
    $(document).on('click', '.completeButton', updateTasks);
    $(document).on('click', '#submitButton', addTask);
    $(document).on('click', '.deleteButton', deleteTask)
}

//DELETE object from database
//append updated DOM
function deleteTask(){
    const id = $(this).data('id');
    console.log('in DELETE at:', id);
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${id}`
    }).then(function(response){
        console.log(response);
        getTasks();
    }).catch(function(error){
        console.log(error);
        alert('There was a problem deleting your task!')
    })
}

//package all data in object
//POSTto database
//update DOM
function addTask() {
    console.log('in add');
    let sendData = {
        task: $('#taskIn').val(),
        priority: $('#priorityIn').val(),
        est: $('#estTimeIn').val()
    };
    console.log(sendData);
    let readyData = validate(sendData);
    if (readyData) {
        console.log("all inputs entered")
        $.ajax({
            type: 'POST',
            url: '/tasks',
            data: sendData
        }).then(function (response) {
            console.log(response);
            getTasks();
        }).catch(function (error) {
            console.log(error);
            alert('There was an error submitting your information')
        })
    }
}
//form validation, requires that all fields be entered in
//the form before data is sent to the database
function validate(obj) {
    if (!obj.task || (!obj.priority || !obj.est)) {
        alert('Please information in all fields');
        return false;
    }
    else {
        return true;
    }
}
//Will contain PUT request
//go to database
//update boolean from false to true
//repopulate DOM with new data
function updateTasks() {
    let id = $(this).data('id');
    console.log('in update, id:', id);
    let completeTime = prompt('How many minutes did this take?');
    if (!parseInt(completeTime)) {
        completeTime = 0;
    }
    const sendData = { time: parseInt(completeTime) }
    console.log(sendData)
    $.ajax({
        type: 'PUT',
        url: `/tasks/${id}`,
        data: sendData
    }).then(function (response) {
        console.log(response);
        getTasks()
    }).catch(function (error) {
        console.log(error);
        alert('There was an error updating your list!')
    })

}
//AJAX GET request, goes to /tasks and populates DOM
function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response);
        renderTasksOnDom(response);
    }).catch(function (error) {
        console.log(error);
        alert('There was an error updating your list!')
    });
}

//this will populate one of two tables
//if the task is yet to be completed, it will append one table
//if the task is complete, it will render to a different table
function renderTasksOnDom(tasks) {
    $('#undoneTarget').empty();
    $('#doneTarget').empty();
    for (chore of tasks) {
        if (chore.status === true) {
            $('#doneTarget').append(`
                <tr data-id="${chore.id}">
                    <td>${chore.task}</td>
                    <td>${chore.est_time}</td>
                    <td>${chore.act_time}</td>
                    <td><button data-id="${chore.id}" class="deleteButton">DELETE</button></td>
                </tr>
            `);
        }
        else if (chore.status === false) {
            $('#undoneTarget').append(`
                <tr data-id="${chore.id}">
                    <td>${chore.task}</td>
                    <td>${chore.priority}</td>
                    <td>${chore.est_time}</td>
                    <td><button data-id="${chore.id}" class="completeButton">Mark Complete</button></td>
                    <td><button data-id="${chore.id}" class="deleteButton">DELETE</button></td>
                </tr>
            `)
        }
    }
    $('input').val('');
    $('select').val('');

}
