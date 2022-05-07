const ls = window.localStorage;

document.getElementById('log-out-button').addEventListener('click', () => {
    ls.clear();
  });
  
const pName = document.getElementById('p-name');
const major = document.getElementById('p-major');
const year = document.getElementById('p-year');

const save = document.getElementById('save');

function loadProfile(){
  console.log('here');
  pName.value = ls.getItem('name');
  major.value = ls.getItem('major');
}

async function putProfile(){
  console.log('sent');
  await fetch(`/updateProfile?email=${ls.getItem('email')}&name=${pName.value}&major=${major.value}&cred_level=${year.value}`, {
    method: 'POST'
  });

  ls.setItem('name', pName.value);
  ls.setItem('major', major.value);
  ls.setItem('cred_level', year.value);

}

save.addEventListener('click', putProfile);

loadProfile();

