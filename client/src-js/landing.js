const dummy_data = [{
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

const table = document.getElementById("all_groups");

load_data();

function load_data(){
    table.innerHTML = `
    <tr>
        <th scope="col">Class Name </th>
        <th scope="col">Group Name </th>
        <th scope="col">Group Code </th>
        <th scope="col"></th>
    </tr>   
    `
  dummy_data.forEach(element => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.appendChild(document.createTextNode(element.class));
    const td2 = document.createElement('td');
    td2.appendChild(document.createTextNode(element.name));
    const td3 = document.createElement('td');
    td3.appendChild(document.createTextNode(element.group_id));
    const td4 = document.createElement('td');
    td4.innerHTML = `<button class="search_button" data-toggle="modal" data-target="#signUpModalLabel">Join</button>`;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    table.appendChild(tr)
  });
}
const search_button = document.getElementById("search");

search_button.addEventListener("click", search());

function search(){
    console.log("Hi");
    const group_code = document.getElementById("group_code").value;
    console.log(group_code);
    let res = dummy_data.filter(elem => elem.group_id === group_code);
    if(res.length !== 0){
        console.log("Hi friends");
        table.innerHTML = '';
        res.forEach(element => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.appendChild(document.createTextNode(element.class));
            const td2 = document.createElement('td');
            td2.appendChild(document.createTextNode(element.name));
            const td3 = document.createElement('td');
            td3.appendChild(document.createTextNode(element.group_id));
            const td4 = document.createElement('td');
            td4.innerHTML = `<button class="search_button" data-toggle="modal" data-target="#signUpModalLabel">Join</button>`;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            table.appendChild(tr)
          });
    }else{
        const class_name = document.getElementById("name_of_class").value;
        res = dummy_data.filter(elem => elem.class === class_name);
        if(res.length !== 0){
            table.innerHTML = '';
            res.forEach(element => {
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                td1.appendChild(document.createTextNode(element.class));
                const td2 = document.createElement('td');
                td2.appendChild(document.createTextNode(element.name));
                const td3 = document.createElement('td');
                td3.appendChild(document.createTextNode(element.group_id));
                const td4 = document.createElement('td');
                td4.innerHTML = `<button class="search_button" data-toggle="modal" data-target="#signUpModalLabel">Join</button>`;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                table.appendChild(tr)
              });
        }else{
            alert("No match");
        }
    }
  }