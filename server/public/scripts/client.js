$(document).ready(readyNow);

function readyNow() {
    console.log('jq ready')
    getTasks();
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
        alert('There was an error updating your to do list!')
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
                    <td>${chore.act_time}</td>
                </tr>
            `);
        }
        else if (chore.status === false) {
            $('#undoneTarget').append(`
                <tr data-id="${chore.id}">
                    <td>${chore.task}</td>
                    <td>${chore.priority}</td>
                    <td>${chore.est_time}</td>
                    <td><button data-id="${chore.id}">Mark Complete</button></td>
                </tr>
            `)
        }
    }
}
