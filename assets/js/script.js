// Variables for information needed from the form
let form = document.getElementById('form');
let form_block = document.getElementById('table_block');
let table_body = document.querySelector('.table_body');

// Important variables for updating localStorage, and assigning unique ID
let usersArr = [];
let userID = 1;

// Event listeners
form.addEventListener('submit', saveData);
table_body.addEventListener('click', removeUser);

// Collects inputs and stores data in the localStorage
function saveData(e) {
    e.preventDefault();

    let firstname = document.querySelector(".firstname").value;
    let surname = document.querySelector(".surname").value;
    let age = document.querySelector(".age").value;
    let level = document.querySelector(".level").value;
    let club = document.querySelector(".club").value;

    if( !firstname || !surname || !age || !level || !club ) {
        alert("All panes are required! Please fill them.");
    } else {
        usersArr.push({
            userID,
            firstname,
            surname,
            age,
            level,
            club
        })
    
        let usersJson = JSON.stringify(usersArr);
    
        localStorage.setItem("users", usersJson);
    
        userID++;
    
        form.reset();

        alert("Welcome! Registration completed.");
    
        return updateTable();
    }
}

// Fetches data from localStorage, and populates UI table based on data
function updateTable() {
    var jsonData = JSON.parse(localStorage.getItem("users"));

    table_body.innerHTML = "";

    return jsonData.forEach(obj => {
        
        let tr = document.createElement('tr');
        tr.setAttribute('id', obj.userID);

        tr.innerHTML = `
            <td>${obj.firstname}</td>
            <td>${obj.surname}</td>
            <td>${obj.age}</td>
            <td>${obj.level}</td>
            <td>${obj.club} <span class="tab_span">x</span></td>
        `
        table_body.appendChild(tr);

        form_block.style.display = "flex";
    })
}

// Clears the entire table row from the localStorage, the re-renders the table
function removeUser(e) {
    if(e.target.classList.contains('tab_span')) {

        let response = confirm("Mean to delete member from list?");

        if(response) {
            let data = JSON.parse(localStorage.getItem("users"));

            let tr = e.target.parentNode.parentNode.id;

            data.forEach((obj, index) => {
                if(obj.userID === (+tr)) {
                    data.splice(index, 1);
                }
            })

            if(data.length === 0) {
                localStorage.removeItem("users");
            
                form_block.style.display = "none";

                return ( userID = 1, usersArr = [] );
            } else {
                usersArr = [...data];

                localStorage.setItem("users", JSON.stringify(data));

                return updateTable();
            }
        }   
    }
}



