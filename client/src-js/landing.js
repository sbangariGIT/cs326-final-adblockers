//const dummy_data = await getAllGroup();

const dummy_data = [];
async function getAllGroup() {
    const response = await fetch(`/getAllGroup`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }

const ls = window.localStorage;

// document.getElementById('log-out-button').addEventListener('click', () => {
//   ls.clear();
// });

const login = document.getElementById('login-button');
const register = document.getElementById('register-button');



register.addEventListener('click', register_a_user);
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
const clear_button = document.getElementById("clear_button");

search_button.addEventListener("click", search);
clear_button.addEventListener("click", load_data);


function search(){
    const group_code = document.getElementById("group_code").value.trim();
    let res = dummy_data.filter(elem => elem.group_id === group_code);
    console.log(res);
    if( res.length !== 0 ){
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
            table.appendChild(tr);
          });
    }else{
        const class_name = document.getElementById("name_of_class").value.trim();
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

async function register_a_user(){
  ls.clear();
  const name = document.getElementById("sign_up_name").value;
  const major = document.getElementById("sign_up_major").value;
  const credit = document.getElementById("sign_up_cred_level").value;
  const email = document.getElementById("sign_up_email").value;
  const new_user = {
    id: (100000 + Math.floor(Math.random() * 900000)),
    email: email,
    name: name,
    major: major,
    cred_level: credit,
    profile_url: " "
  }

  let data = await put_user(new_user);
  if(data["status"] === "success"){
    ls.setItem('email', new_user.email);
    ls.setItem('name', new_user.name);
    ls.setItem('major', new_user.major);
    ls.setItem('cred_level', new_user.credit);
    ls.setItem('id', new_user.id);
    window.location.href = "profile.html";
  }else{
    alert("Error to register! For testing use:")
  }
}

async function put_user(new_user){
  const response = await fetch(`/register`, {
    method: 'POST',
    body: JSON.stringify(new_user),
    headers: {
    'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}


login.addEventListener('click', async () => {
  const email_value = document.getElementById('email-input').value.trim();
  const data = await check_user(email_value);
  if(data["status"] === "success"){
    ls.setItem('email', email_value);
    ls.setItem('name', data["name"]);
    ls.setItem('major', data["major"]);
    ls.setItem('cred_level', data["cred_level"]);
    ls.setItem('email', data["email"]);
    ls.setItem('id', data["id"]);
    window.location.href = "profile.html";
  }else{
    alert("Please create an account!");
  }
});

async function check_user(new_user){
  const response = await fetch(`/login?email=${new_user}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}
