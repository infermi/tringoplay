//declering elements, E stands for Element
var displayE = document.getElementById("display");
LogE = document.getElementById("Log");
okfailE = document.getElementById("ok-fail");
RoundE = document.getElementById("Round");
jsonE = document.getElementById("json");
PostBE = document.getElementById("POST-Button");






PostBE.onclick = function() {
    var game = document.getElementById("game").value;
    session = document.getElementById("session").value;
    code = document.getElementById("code").value;
    if (game == "" || session == "" || code == "") {
        alert("Please fill all the inputs");
    } else {
        scrape(`http://606b158af8678400172e58d5.mockapi.io/api/Expose1`, "POST");
    };
}


// `http://606b158af8678400172e58d5.mockapi.io/api/Expose?gameID=${game}&sessionID=${session}?CODE=${code}`
// displayAns = function(e) {
//     if (e.target.src != 'http://weil-law.com/wp-content/plugins/gallery-images/assets/images/admin_images/No-image-found.jpg') {
//         ansDivE.style.display = "flex"
//         ansE.value = ""
//         ansE.style.display = "inline"
//         ansBE.style.display = "inline"
//     }
//     document.getElementById("Qimg").removeEventListener('load', displayAns);
// }
var scrape = function(URL, mathod) {
    var xhr = new XMLHttpRequest();
    okfailE.innerHTML = ""
    RoundE.innerHTML = ""
    jsonE.innerHTML = ""
    LogE.innerHTML = ""
    displayE.innerHTML = ""
    xhr.responseType = "json";
    xhr.open(mathod, URL, true);
    xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 201) {
            window.jsonResponse = xhr.response;
            console.log(jsonResponse)
            if (jsonResponse._children.result._value === "ok") {
                okfailE.innerHTML = jsonResponse._children.result._value;
                RoundE.innerHTML = jsonResponse._children.round._value
                if (jsonResponse._children.question._value.question.replace(/ /g, '').slice(0, 5) === "link:") {
                    displayE.innerHTML = `<img id="Qimg" src="${"link:https://drive.google.com/file/d/1yiSWoH-NzLRccsUhVS_tD95jeW4bAfRI/view?usp=sharing".replace(/ /g, '').slice(5)}" onerror="this.src='http://weil-law.com/wp-content/plugins/gallery-images/assets/images/admin_images/No-image-found.jpg';this.onerror=null">`
                } else {
                    displayE.innerHTML = `<h2 id="QA">${jsonResponse._children.question._value.question}</h2>`
                }

                jsonE.innerHTML = `<p>${jsonResponse._children.status._value}</p>`
            } else {
                okfailE.innerHTML = "fail"
                LogE.innerHTML = `<p>${jsonResponse._children.result._value}</p>`
            }

        } else {
            okfailE.innerHTML = "fail"
            LogE.innerHTML = `<p>${xhr.statusText}</p>`
        }

    }
    xhr.onerror = function() {
        okfailE.innerHTML = "fail"
        LogE.innerHTML = `<p>${xhr.statusText}</p>`

    }
    xhr.send();
}

// var xhr = new XMLHttpRequest();