const ls = window.localStorage;

const myGroupsTableElement = document.getElementById('my-groups');

const myGroupsArray2 = [{
    "group_id": "0913",
    "class": "CS-58",
    "name": "Transcof",
    "members": [
      {
        "id": 9,
        "email": "rcolvine8@liveinternet.ru",
        "name": "Y-find",
        "cred_level": "Freshmen"
      }
    ],
    "type": "public",
    "max": 10
  }, {
    "group_id": "7713",
    "class": "OIM-16",
    "name": "Temp",
    "members": [
      {
      },
      {
        "id": 9,
        "email": "rcolvine8@liveinternet.ru",
        "name": "Y-find",
        "cred_level": "Freshmen"
      }
    ],
    "type": "public",
    "max": 10
  }, {
    "group_id": "7711",
    "class": "MATH-66",
    "name": "Matsoft",
    "members": [
      {
        "id": 9,
        "email": "rcolvine8@liveinternet.ru",
        "name": "Y-find",
        "cred_level": "Freshmen"
      }
    ],
    "type": "public",
    "max": 10
  }, {
    "group_id": "7254",
    "class": "CS-81",
    "name": "Tres-Zap",
    "members": [
      {
        "id": 9,
        "email": "rcolvine8@liveinternet.ru",
        "name": "Y-find",
        "cred_level": "Freshmen"
      },
      {
        "id": 10,
        "email": "mklaves9@economist.com",
        "name": "Bytecard",
        "cred_level": "Sophomore"
      }
    ],
    "type": "public",
    "max": 10
  }, {
    "group_id": "3423",
    "class": "PUBHEL-91",
    "name": "Trippledex",
    "members": [
      {
        "id": 7,
        "email": "mmantha6@house.gov",
        "name": "Greenlam",
        "cred_level": "Sophomore"
      },
      {
        "id": 2,
        "email": "zruncieman1@live.com",
        "name": "Bytecard",
        "cred_level": "Junior"
      }
    ],
    "type": "public",
    "max": 10
  }, {
    "group_id": "8788",
    "class": "FIN-84",
    "name": "Flexidy",
    "members": [
      {
        "id": 7,
        "email": "mmantha6@house.gov",
        "name": "Greenlam",
        "cred_level": "Sophomore"
      },
      {
        "id": 2,
        "email": "zruncieman1@live.com",
        "name": "Bytecard",
        "cred_level": "Junior"
      },
      {
        "id": 9,
        "email": "rcolvine8@liveinternet.ru",
        "name": "Y-find",
        "cred_level": "Freshmen"
      }
    ],
    "type": "public",
    "max": 10
  }, {
    "group_id": "5369",
    "class": "CS-43",
    "name": "Asoka",
    "members": [
      {
        "id": 9,
        "email": "rcolvine8@liveinternet.ru",
        "name": "Y-find",
        "cred_level": "Freshmen"
      }
    ],
    "type": "public",
    "max": 10
  }, {
    "group_id": "4052",
    "class": "BIO-89",
    "name": "Trippledex",
    "members": [
        {
            "id": 2,
            "email": "zruncieman1@live.com",
            "name": "Bytecard",
            "cred_level": "Junior"
          }
    ],
    "type": "public",
    "max": 10
  }, {
    "group_id": "2862",
    "class": "CHEM-13",
    "name": "Mat Lam Tam",
    "members": [
      {
        "id": 7,
        "email": "mmantha6@house.gov",
        "name": "Greenlam",
        "cred_level": "Sophomore"
      }
    ],
    "type": "public",
    "max": 10
  }, {
    "group_id": "2046",
    "class": "PHY-44",
    "name": "Sonsing",
    "members": [
      {
        "id": 4,
        "email": "atownson3@purevolume.com",
        "name": "Tempsoft",
        "cred_level": "Sophomore"
      },
      {
        "id": 9,
        "email": "rcolvine8@liveinternet.ru",
        "name": "Y-find",
        "cred_level": "Freshmen"
      }
    ],
    "type": "public",
    "max": 10
  }, {
    "group_id": "2813",
    "class": "MATH-07",
    "name": "Gembucket",
    "members": [
      {
        "id": 1,
        "email": "wcalcott0@soup.io",
        "name": "Zontrax",
        "cred_level": "Freshmen"
      },
      {
        "id": 2,
        "email": "zruncieman1@live.com",
        "name": "Bytecard",
        "cred_level": "Junior"
      }
    ],
    "type": "public",
    "max": 10
  }];

async function displayGroups() {
    const myGroupsArray = await fetch(`myGroups`, {
        method: 'GET'
    });
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
        td1.appendChild(document.createTextNode(obj.group_id));
        const td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(obj.name));
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

const myNotificationsArray = [
    {
        "message": "Matibura joined the group",
        "sent_by_id": 1,
        "group_name": "Trippledex"
    },
    {
        "message": "Trudermax sent you a message",
        "sent_by_id": 2,
        "group_name": "Trippledex"
    }
];

async function displayNotifications () {
    // const myNotificationsArray = await fetch(`/myNotis?email=${ls.getItem('email')}`, {
    //     method: 'GET'
    // });
    myNotificationsTableElement.innerHTML = `
        <tr>
            <th scope="col">Notification</th>
        </tr>
    `;
    myNotificationsArray.forEach((obj) => {
        const tr = document.createElement('tr');
        tr.id = 'noti' + obj.sent_by_id
        const td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(obj.message));
        const td2 = document.createElement('td');
        td2.innerHTML = `<button class="btn btn-danger" id="deleteNoti${obj.sent_by_id}">X</button>`;
        tr.appendChild(td1);
        tr.appendChild(td2);
        myNotificationsTableElement.appendChild(tr)
        document.getElementById(`deleteNoti${obj.sent_by_id}`).addEventListener('click', () => {
            deleteNoti(obj.sent_by_id);
        });
    });
};

async function deleteNoti(id) {
    const data = {
        sent_by_id: id
    };
    await fetch(`deleteNoti?sent_by_id=${id}`, {
        method: 'DELETE',
        body: JSON.stringify(data)
    });
    displayNotifications();
};

window.onload = displayNotifications();