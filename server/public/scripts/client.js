$(document).ready(readyNow);

function readyNow() {
    console.log('jq ready')
    getTasks();
    $(document).on('click', '.completeButton', updateTasks);
    $(document).on('click', '#submitButton', addTask);
    $(document).on('click', '.deleteButton', deleteValidation)
    $(document).on('click', '#toggleButton', toggleVisibility)
    $(document).on('click', '#sortSubmit', sortTables)
}

//checks value in dropdown, goes to specific URL to sort data
//reappends DOM with data sorted per user's preference
function sortTables() {
    const sort = $('#sortBy').val();
    console.log(sort)
    switch (sort) {
        case 'priority':
            sortPriority()
            break;
        case 'priorityRev':
            sortPriorityRev()
            break;
        case 'estTime':
            sortTime();
            break;
        case 'estTimeRev':
            sortTimeRev();
            break;
        case 'alphDesc':
            sortAlph()
            break;
        case 'alphAsc':
            sortRevAlph();
            break;
        default:
            console.log('no value')
            return;
    }
}

//sorts short to long
function sortPriority() {
    console.log('priority sort')
    $.ajax({
        type: 'GET',
        url: '/tasks/priority',
    }).then(function (response) {
        renderTasksOnDom(response)
    }).catch(function (error) {
        console.log(error);
        alert('There was an error sorting your data!')
    })
}

//sorts long to short
function sortPriorityRev() {
    console.log('priority sort rev')
    $.ajax({
        type: 'GET',
        url: '/tasks/priorityRev',
    }).then(function (response) {
        renderTasksOnDom(response)
    }).catch(function (error) {
        console.log(error);
        alert('There was an error sorting your data!')
    })
}
//sorts shortest to longest
function sortTime() {
    console.log('time sort')
    $.ajax({
        type: 'GET',
        url: '/tasks/time',
    }).then(function (response) {
        renderTasksOnDom(response)
    }).catch(function (error) {
        console.log(error);
        alert('There was an error sorting your data!')
    })
}
//sorts longest to shortest
function sortTimeRev() {
    console.log('time sort')
    $.ajax({
        type: 'GET',
        url: '/tasks/timeRev',
    }).then(function (response) {
        renderTasksOnDom(response)
    }).catch(function (error) {
        console.log(error);
        alert('There was an error sorting your data!')
    })
}
//sorts a-z
function sortAlph() {
    console.log('alph sort')
    $.ajax({
        type: 'GET',
        url: '/tasks/alph',
    }).then(function (response) {
        renderTasksOnDom(response)
    }).catch(function (error) {
        console.log(error);
        alert('There was an error sorting your data!')
    })
}
//sorts z-a
function sortRevAlph() {
    console.log('rev sort')
    $.ajax({
        type: 'GET',
        url: '/tasks/rev',
    }).then(function (response) {
        renderTasksOnDom(response)
    }).catch(function (error) {
        console.log(error);
        alert('There was an error sorting your data!')
    })
}





//checks with the user before deleting anything from the database
//requires user type 'yes' or 'no' in a prompt
function deleteValidation() {
    let id = $(this).data('id');
    alert('Once deleted, this task will be completly removed')
    const confirmation = prompt('Type \'yes\' to delete, type \'no\' to keep');
    if (confirmation === 'yes') {
        deleteTask(id)
    }
    else {
        return;
    }
}
//changes the way things appear in the DOM depending
//on which table you're viewing

function toggleVisibility() {
    $('#undoneTable').toggleClass('invisible')
    $('#doneTable').toggleClass('invisible')
    $('#toggleButton').toggleClass('complete')
    $('#toggleButton').toggleClass('incomplete')
    $('header').toggleClass('reflectComplete')
    $('header').toggleClass('reflectIncomplete')
}
//DELETE object from database
//append updated DOM
function deleteTask(data) {
    const id = data;
    console.log('in DELETE at:', id);
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${id}`
    }).then(function (response) {
        console.log(response);
        getTasks();
    }).catch(function (error) {
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
            let diff = chore.est_time - chore.act_time;
            $('#doneTarget').append(`
                <tr data-id="${chore.id}">
                    <td>${chore.task}</td>
                    <td>${chore.est_time}</td>
                    <td>${chore.act_time}</td>
                    <td>${diff}</td>
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
