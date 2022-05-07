const ls = window.localStorage;

document.getElementById('log-out-button').addEventListener('click', () => {
    ls.clear();
});

async function createGroup(className, groupName, type, meet_details,size) {
    await fetch(`/createGroup`, {
        method: 'POST',
        body: JSON.stringify(
            {   class: className, 
                name: groupName, 
                members: [{ email: ls.getItem("email"), name: ls.getItem("name"), cred_level: ls.getItem("cred_level") }, ],
                loc_and_time: meet_details,
                type: type,
                size: size                
            }
        ),
        headers: {'Content-Type': 'application/json'}
    });
    displayNotifications();
};

/*-----------------------------------------------------------------
    CRUD OPERATIONS
-----------------------------------------------------------------*/

const g_name = document.getElementById("g-name");
const c_name = document.getElementById("c-name");
const size = document.getElementById("c-size");
const meet_time = document.getElementById("meet-details");
const create = document.getElementById("create_button")

const invite_names = document.getElementById("add_id");
const invite_button = document.getElementById("invite_button");
const invited = document.getElementById("invited");

let invites = [];

function render_invite() {
    if (invites) {
        invited.style.border = "1px solid black"
    }
    invited.innerText = invites.join(", ");
}

function add_invites(e) {
    console.log("hell");
    console.log(invite_names.value);
    const invite = invite_names.value.split(',');
    console.log(invite);
    for (let i = 0; i < invite.length; i++) {
        const c_word = invite[i].trim().toLowerCase();

        if (!invites.includes(c_word)) {
            invites.push(c_word);
        }
    }
    console.log(invites);
    render_invite();

}

invite_button.addEventListener('click', add_invites);

create.addEventListener('click', async(e) => {
    await createGroup(c_name.value, g_name.value, 'public', meet_time.value, size.value);
});



