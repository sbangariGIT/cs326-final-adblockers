const ls = window.localStorage;

document.getElementById('log-out-button').addEventListener('click', () => {
    ls.clear();
});

let group_name;
window.onload = async () => {
    let group_id = ls.getItem('group_id');
    const response = await fetch(`/myGroups?email=${ls.getItem('email')}`, {
        method: 'GET',
    });
    const myGroupsArray = await response.json();
    let grouparray;
    myGroupsArray.forEach((obj) => {
        if (obj._id.toString() === group_id) {
            document.getElementById('name_of_group').innerHTML = obj.name;
            document.getElementById('loc_and_time').innerHTML = 'Meeting details: ' + obj.loc_and_time;
            grouparray = obj.members; 
        }
    });
    console.log('groupsss' + myGroupsArray);
    console.log(grouparray);
    document.getElementById('group_page_members').innerHTML = `
    <tr>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Level</th>
    </tr>`;
    grouparray.forEach((obj) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(obj.name));
        const td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(obj.email));
        const td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(obj['cred_level']));
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        document.getElementById('group_page_members').appendChild(tr)
    });
}


document.getElementById('exit').addEventListener('click', async ()=> {

    await fetch(`/exitGroup?email=${ls.getItem('email')}&id=${ls.getItem('group_id')}`,{
        method: 'DELETE',
    });

    ls.removeItem('group_id');

    window.location.href = "profile.html";

});

