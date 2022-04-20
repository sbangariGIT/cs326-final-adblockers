const myGroupsTableElement = document.getElementById('my-groups');
const myGroupsArray = await fetch('/myGroups', {
    method: 'GET'
});

function displayGroups() {
    myGroupsTableElement.innerHTML = `
        <tr>
        <th scope="col">Name </th>
        <th scope="col">Subject </th>
        <th scope="col">Class </th>
        <th scope="col"></th>
        </tr>
    `;
    myGroupsArray.forEach((obj) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(obj.name));
        const td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(obj.subject));
        const td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(obj.class));
        const td4 = document.createElement('td');
        td4.innerHTML = `<a href=${obj.url} class="search_button">Enter</a>`;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        myGroupsTableElement.appendChild(tr)
    });
};

window.onload = displayGroups();

const myNotificationsTableElement = document.getElementById('my-notis');
const myNotificationsArray = await fetch('/myNotis', {
    method: 'GET'
});

function displayNotifications () {
    myNotificationsTableElement.innerHTML = ``;
    myNotificationsArray.forEach((obj) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(obj.description));
        const td2 = document.createElement('td');
        const message_type = obj.type;
        if (message_type === 'notification') {
            td2.innerHTML = `<a class="search_button">Enter</a>`;
        }
        const td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(obj.subject));
        const td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(obj.class));
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        myGroupsTableElement.appendChild(tr)
    });
};

window.onload = displayNotifications();