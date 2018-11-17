//#region Insert pages when the page is loaded
function outFromLocal() {timeDoct
    var taskSaved = localStorage.getItem('jsonFile');
    var jsonFile = JSON.parse(taskSaved);
    return jsonFile;
}
//Templet of task pages that have fade in
function tenpTask() {
    var tempContent = `<div style="opacity: 1; transition:opacity 1s; ">
                        <div style=" width:100%;  transition:width 1s;">
                            <div id="{{replaceid}}" class="notedg col-xs-10 col-xs-offset-1 col-sm-5 col-sm-offset-1 col-md-4 col-md-offset-0 col-lg-3 col-lg-offset-0">
                                <p onclick="deleteDom(this.id)" id="{{replaceid}}" class="butenDelite">
                                    <span id="deleteTask" style="font-size: 25px; " class="glyphicon glyphicon-remove-circle" </span>
                                </p>
                                    <div style="border:1px solid black ; border-radius:25px;" ; id="contentDoc">{{replaceContentTask}}</div>
                                    <div id="dateDoc">
                                        <strong id='dateDocSt'>{{replaceDeta}}</strong>
                                    </div>
                                    <div id="timeDoc">
                                        <strong id=''>{{replaceTime}}</strong>
                                    </div></div></div></div>`;
    return tempContent;
}

function loadTask() {
    document.getElementById("row").innerHTML = " ";
    var jsonFile = outFromLocal();
    for (i = 0; i < jsonFile.theTask.length; i++) {
        var tempContent = tenpTask();
        tempContent = tempContent.replace('{{replaceid}}', jsonFile.theTask[i].dataId);
        tempContent = tempContent.replace('{{replaceid}}', jsonFile.theTask[i].dataId);
        tempContent = tempContent.replace('{{replaceContentTask}}', jsonFile.theTask[i].dataContentTask);
        tempContent = tempContent.replace('{{replaceDeta}}', jsonFile.theTask[i].dataDeta);
        tempContent = tempContent.replace('{{replaceTime}}', jsonFile.theTask[i].dataTime);
        document.getElementById('row').innerHTML += tempContent;
    }
}
//#endregion

var arrTask = [];
//Add page to page and check regex for time and date
function eddTask(e) {
    e.preventDefault(e);
    var idCount = arrTask.length;
    const time = document.getElementById('time').value;
    var testTime = regexForTime(time);
    const date = document.getElementById('date').value;
    var testDate = regexForDate(date);
    const contentTask = document.getElementById('contentTask').value;
    if (enterErorWindowTime(testTime) && enterErorWindowDate(testDate)) {
        var newTask = new enterToArrTasK(time, date, contentTask, idCount);
        arrTask.push(newTask);
        claarOlErors()
        fadeOut()
        setTimeout(function () {
        loadTask();
        }, 500)}}

function claarOlErors() {
    document.getElementById('eror').innerHTML = " ";
    document.getElementById('time').style.border = '1px solid black ';
    document.getElementById('date').style.border = '1px solid black ';
}
//Updating local in addition
function pushLocal() {
    var localCheck = localStorage.getItem('jsonFile');
    if (localCheck == null) {
        var json = { "theTask": arrTask };
        var jsonStr = JSON.stringify(json);
        localStorage.setItem("jsonFile", jsonStr);
    } else {
        var arryfromLocal = outFromLocal()
        newArryTask(arryfromLocal);
        var json = { "theTask": arrTask };
        var jsonStr = JSON.stringify(json);
        localStorage.setItem("jsonFile", jsonStr);
    }
}
//Updating local to remove
function outFromLocal() {
    var taskSaved = localStorage.getItem('jsonFile');
    var jsonFile = JSON.parse(taskSaved);
    return jsonFile;
}
//Updating an array after adding or deleting a note to update the local
function newArryTask(x) {
    for (i = 0; i < x.theTask.length; i++) {
        const idDiv = arrTask.length;
        const time = x.theTask[i].dataTime;
        const date = x.theTask[i].dataDeta;
        const contentTask = x.theTask[i].dataContentTask;
        var newTask = new enterToArrTasK(time, date, contentTask, idDiv);
        arrTask.push(newTask);
    }
}

function enterToArrTasK(x, y, z, k) {
    this.dataId = k;
    this.dataTime = x;
    this.dataDeta = y;
    this.dataContentTask = z;
}

function clearForm() {
    document.getElementById('time').value = '';
    document.getElementById('date').value = '';
    document.getElementById('contentTask').value = '';
}

function regexForTime(x) {
    var regexTime = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/mg;;
    if (regexTime.test(x)) {
        return true;
    } else {
        return false
    }
}

function regexForDate(x) {
    var regexTime = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)([2][0][1-3][0-9])$/mg;
    if (regexTime.test(x)) {
        return true;
    } else {
        return false
    }
}

function enterErorWindowTime(x) {
    if (x) {
        return true;
    } else {
        document.getElementById('time').style.border = '2px solid red';
        document.getElementById('eror').innerHTML = '<div style="border: 2px solid red; border-radius:15px; color:red;">There is a mistake in time</div>';
    }
}

function enterErorWindowDate(x) {
    if (x) {
        return true;
    } else {
        document.getElementById('date').style.border = '2px solid red';
        document.getElementById('eror').innerHTML = '<div style="border: 2px solid red; border-radius:15px;">There is a mistake in the date</div>';
    }
}
//#region for fade out
//Temp for the fade out that enters a second before the page is updated
function tempFadeOut() {
    var tempFadeOut =
        `<div id="0" style="opacity: 0; animation: fadein 1s;">
                        <div id="" style=" width:100%;  transition:width 1s;">
                            <div  class="notedg col-xs-10 col-xs-offset-1 col-sm-5 col-sm-offset-1 col-md-4 col-md-offset-0 col-lg-3 col-lg-offset-0" id="1" >
                                    <div style="border:1px solid black; border-radius: 10%;" ; id="contentDoc">${document.getElementById('contentTask').value}</div>
                                    <div id="dateDoc">
                                        <strong id='dateDocSt'>${document.getElementById('date').value}</strong>
                                    </div>
                                    <div id="timeDoc">
                                        <strong id='timeDoct'>${document.getElementById('time').value}</strong>
                                    </div>
                            </div>
                        </div>
                     </div>`;
    document.getElementById('row').innerHTML += tempFadeOut;
}

function fadeOut() {
    document.getElementById("row").innerHTML = " ";
    tempFadeOut();
    pushLocal();
    clearForm();
    arrTask = [];
    var jsonFile = outFromLocal();
    for (i = 1; i < jsonFile.theTask.length; i++) {
        var tempContent = tenpTask();
        tempContent = tempContent.replace('{{replaceid}}', jsonFile.theTask[i].dataId);
        tempContent = tempContent.replace('{{replaceid}}', jsonFile.theTask[i].dataId);
        tempContent = tempContent.replace('{{replaceContentTask}}', jsonFile.theTask[i].dataContentTask);
        tempContent = tempContent.replace('{{replaceDeta}}', jsonFile.theTask[i].dataDeta);
        tempContent = tempContent.replace('{{replaceTime}}', jsonFile.theTask[i].dataTime);
        document.getElementById('row').innerHTML += tempContent;
    }
}
//#endregion
//#region
//Makes a fade in and updates the page after a second to update the id so that more pages can be deleted
function deleteDom(id) {
    document.getElementById(id).parentElement.parentElement.style.opacity = "0";
    setTimeout(function () {
        document.getElementById(id).parentElement.innerHTML = " ";
        var a = Number(id);
        deleteFromArr(a)
    }, 400)
}

function deleteFromArr(x) {
    var taskSaved = localStorage.getItem('jsonFile');
    localStorage.clear();
    var jsonFile = JSON.parse(taskSaved);
    jsonFile.theTask.splice(x, 1);
    console.log(jsonFile.theTask);
    if (jsonFile.theTask.length != 0) {
        newArryTask(jsonFile);
        pushLocal()
    } else {
        localStorage.clear();
        arrTask=[];
    }
}
//#endregion



