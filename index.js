// popup - signup - Hieu

    function openSignupForm() {
        const element = document.getElementById("signupForm");
        if (element) element.style.display = "block";
    }

    function closeSignupForm() {
        const element = document.getElementById("signupForm");
        if (element) element.style.display = "none";
    }

// popup - signup - Hieu - END

//start thuc:signup update data validation

    function validate(obj) {
        removeValidatingNotification(obj);

        if (obj.value.trim() == "") {
        const notificationElement = document.createElement('p');
        notificationElement.innerText = "Please enter your " + obj.name + ".";
        notificationElement.style.color = 'red';
        notificationElement.id = obj.name + '-validating-notification';
        obj.parentNode.append(notificationElement);
        return false;
        }

        return true;
    }

    function removeValidatingNotification(obj) {
    const x = document.getElementById(obj.name + '-validating-notification');
    if(x) x.remove();
    }

    function validatePasswordMatch(){
    const pw = document.forms.signupForm["password"];
    const pw2 = document.forms.signupForm["password2"];

    removeValidatingNotification(pw2);

    if (pw2.value != pw.value){
        const notificationElement = document.createElement('p');
        notificationElement.innerText = "Your password does not match. Please try again.";
        notificationElement.style.color = 'red';
        notificationElement.id = pw2.name + '-validating-notification';
        pw2.parentNode.append(notificationElement);
        return false;
    }

    return true;
    }

    function validateForm2() {
    return validate(document.forms.signupForm["name"])
        && validate(document.forms.signupForm["email"])
        && validate(document.forms.signupForm["password"])
        && validatePasswordMatch();
    }

//end thuc:signup update data validation


//profile pages

    function toggleEdit() {
        let editMyProfileButton = document.getElementById('edit-my-profile');

        if (editMyProfileButton.innerText == 'Edit my profile'){  //contentEditable == false
            editMyProfileButton.innerText = 'Done editing';
        } else {
            editMyProfileButton.innerText = 'Edit my profile';
        }
        
        for (let element of document.getElementsByName('profile-info-to-edit')){
            element.onkeypress = (event) => {
                if (event.key == 'Enter') {
                    event.preventDefault();
                }
            }

                if (element.isContentEditable == false){
                element.contentEditable = true;
                element.classList.remove('non-editable');
                element.classList.add('editable');
                } else {
                element.contentEditable = false;
                element.classList.remove('editable');
                element.classList.add('non-editable');
                }
        }
    }

    const element = document.getElementById('edit-my-profile');
    if (element) element.onclick=toggleEdit;

    var current_page = 1;
    var records_per_page = 4;

    var objJson = [
        { Book: "Book 1"},
        { Book: "Book 2"},
        { Book: "Book 3"},
        { Book: "Book 4"},
        { Book: "Book 5"},
        { Book: "Book 6"},
        { Book: "Book 7"},
        { Book: "Book 8"},
        { Book: "Book 9"},
        { Book: "Book 10"}
    ]; // Can be obtained from another source, such as your objJson variable

    function prevPage()
    {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    }

    function nextPage()
    {
        if (current_page < numPages()) {
            current_page++;
            changePage(current_page);
        }
    }
        
    function changePage(page)
    {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        var listing_table = document.getElementsByClassName("t-book-listing")[0];
        var page_span = document.getElementById("page_span");

        btn_next.onclick = nextPage;
        btn_prev.onclick = prevPage;
     
        // Validate page
        if (page < 1) page = 1;
        if (page > numPages()) page = numPages();

        listing_table.innerHTML = "";

        for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
            if (i >= objJson.length) break;  //last page may not have enough items like previous pages
            listing_table.innerHTML += objJson[i].Book + "<br>";
        }
        page_span.innerHTML = 'Current page: ' + page;

        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }

        if (page == numPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }
    }

    function numPages()
    {
        return Math.ceil(objJson.length / records_per_page);
    }

    window.onload = function() {
        changePage(1);
    };

// end of profile page