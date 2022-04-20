const myGroupsTableElement = document.getElementById('my-groups');
// const myGroupsArray = await fetch('/myGroups', {
//     method: 'GET'
// });

const myGroupsArray = [{
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

function displayGroups() {
    console.log('hello');
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
// const myNotificationsArray = await fetch('/myNotis', {
//     method: 'GET'
// });

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
        const td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(obj.class));
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        myGroupsTableElement.appendChild(tr)
    });
};

window.onload = displayNotifications();