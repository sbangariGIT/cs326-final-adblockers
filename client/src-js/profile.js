const ls = window.localStorage;

const myGroupsTableElement = document.getElementById('my-groups');

document.getElementById('log-out-button').addEventListener('click', () => {
    ls.clear();
});

async function displayGroups() {
    const response = await fetch(`/myGroups?email=${ls.getItem('email')}`, {
        method: 'GET',
    });
    const myGroupsArray = await response.json();
    myGroupsTableElement.innerHTML = `
        <tr>
        <th scope="col">Group ID </th>
        <th scope="col">Name </th>
        <th scope="col">Class </th>
        <th scope="col"></th>
        </tr>
    `;
    myGroupsArray.forEach((obj) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(obj.group_id));
        const td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(obj.name));
        const td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(obj['class']));
        const td4 = document.createElement('td');
        td4.innerHTML = `<a href="group_page.html" class="search_button">Enter</a>`;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        myGroupsTableElement.appendChild(tr)
    });
};

window.onload = displayGroups();

const myNotificationsTableElement = document.getElementById('my-notis');

async function displayNotifications () {
    const response = await fetch(`/myNotis?email=${ls.getItem('email')}`, {
        method: 'GET'
    });
    const myNotificationsArray = await response.json();

    myNotificationsTableElement.innerHTML = `
        <tr>
            <th scope="col">Notification</th>
        </tr>
    `;
    myNotificationsArray.forEach((obj) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(obj.message));
        const td2 = document.createElement('td');
        td2.innerHTML = `<a class="btn btn-danger" id="deleteNoti${obj.id}">X</a>`;
        tr.appendChild(td1);
        tr.appendChild(td2);
        myNotificationsTableElement.appendChild(tr)
        document.getElementById(`deleteNoti${obj.id}`).addEventListener('click', () => {
            deleteNoti(obj.id);
        });
    });
};

async function deleteNoti(id) {
    const data = {
        sent_by_id: id
    };
    await fetch(`/deleteNoti?email=${ls.getItem('email')}&id=${id}`, {
        method: 'DELETE'
    });
    displayNotifications();
};

window.onload = displayNotifications();