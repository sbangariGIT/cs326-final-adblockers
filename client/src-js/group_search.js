const ls = window.localStorage;

const group_data = await getAllGroup();

document.getElementById('log-out-button').addEventListener('click', () => {
  ls.clear();
});

async function getAllGroup() {
    const response = await fetch(`/getAllGroup`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }


const table = document.getElementById("all_groups");

load_data();

function load_data(){
  const eID = ls.getItem("email");
  table.innerText = "";
  table.innerHTML = `
  <tr>
      <th scope="col">Class Name </th>
      <th scope="col">Group Name </th>
      <th scope="col">Group Code </th>
      <th scope="col"></th>
  </tr>   
  `
  group_data.forEach(element => {
    if(element.members.filter(e => e.email === eID).length === 0){
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      td1.appendChild(document.createTextNode(element.class));
      const td2 = document.createElement('td');
      td2.appendChild(document.createTextNode(element.name));
      const td3 = document.createElement('td');
      td3.appendChild(document.createTextNode(element._id));
      const td4 = document.createElement('td');
      td4.innerHTML = `<button class="search_button" id="group_join${element._id}">Join</button>`;
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      table.appendChild(tr)
      document.getElementById(`group_join${element._id}`).addEventListener('click', () => {
        const data = {
          "message": `${ls.getItem('email')} has joined the group ${element.name}`,
          "sent_by_id": 2,
          "group_name": `${element.name}`,
          "noti_id": Math.floor(Math.random() * 1000),
          "user_email": ls.getItem('email'),
          "name": ls.getItem('name'),
          "cred_level": ls.getItem('cred_level'),
          "user_id": ls.getItem('id')
        }
        sendNotification(data);
        ls.removeItem('group_id');
        ls.setItem('group_id', element._id);
        window.location.href = "group_page.html";
      });
    }
  });
}

async function sendNotification(data) {
  await fetch(`/sendNoti`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  });
}

//Trigering of notification
const search_button = document.getElementById("search");
const clear_button = document.getElementById("clear_button");

search_button.addEventListener("click", search);
clear_button.addEventListener("click", load_data);


function search(){
    const group_code = document.getElementById("group_code").value.trim();
    let res = group_data.filter(elem => elem._id === group_code);
    if( res.length !== 0 ){
        table.innerHTML = '';
        res.forEach(element => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.appendChild(document.createTextNode(element.class));
            const td2 = document.createElement('td');
            td2.appendChild(document.createTextNode(element.name));
            const td3 = document.createElement('td');
            td3.appendChild(document.createTextNode(element._id));
            const td4 = document.createElement('td');
            td4.innerHTML = `<button class="search_button" id="group_join${element._id}">Join</button>`;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            table.appendChild(tr)
          });
    }else{
        const class_name = document.getElementById("name_of_class").value.trim();
        res = group_data.filter(elem => elem.class === class_name);
        if(res.length !== 0){
            table.innerHTML = '';
            res.forEach(element => {
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                td1.appendChild(document.createTextNode(element.class));
                const td2 = document.createElement('td');
                td2.appendChild(document.createTextNode(element.name));
                const td3 = document.createElement('td');
                td3.appendChild(document.createTextNode(element._id));
                const td4 = document.createElement('td');
                td4.innerHTML = `<button class="search_button">Join</button>`;
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
      load_data();
  }