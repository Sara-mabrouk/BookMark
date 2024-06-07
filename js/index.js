// ^ HTML Element ==>
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var bookmarksList = document.getElementById("bookmarksList");
var bookmarks = [];

//& ==========local storage========== &
if (localStorage.getItem("sites") != null) {
    bookmarks = JSON.parse(localStorage.getItem("sites"));
    displayBookmarks();
}

//& ==========Validation========== &
function validateForm(name, url) {
    if (!name || !url) {
        alert("Both fields are required.");
        return false;
    }

    if (name.length < 3) {
        alert("Site name must be at least 3 characters long.");
        return false;
    }

    const urlPattern = new RegExp(
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    );

    if (!urlPattern.test(url)) {
        alert("Please enter a valid URL.");
        return false;
    }

    return true;
}

//& ==========Add========== &
function addBookmark() {
    var name = siteName.value.trim();
    var url = siteUrl.value.trim();

    if (!validateForm(name, url)) {
        return;
    }
    var bookmark = {
        name: name,
        url: url,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("sites", JSON.stringify(bookmarks));
    displayBookmarks();
    clearForm();
}

//& ==========Display========== &
function displayBookmarks() {
    bookmarksList.innerHTML = "";
    bookmarks.forEach((bookmark, index) => {
        var row = `
      <tr>
        <td class="table-row text-white">${index + 1}</td>
        <td class="table-row text-white">${bookmark.name}</td>
        <td><a href="${bookmark.url
            }" target="_blank" class="btn btn-primary">Visit</a></td>
        <td><button class="btn btn-danger" onclick="deleteBookmark(${index})">Delete</button></td>
      </tr>
    `;
        bookmarksList.innerHTML += row;
    });
}


//& ==========Delete========== &
function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem("sites", JSON.stringify(bookmarks));
    displayBookmarks();
}

//& ==========Clear Form========== &
function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
}
