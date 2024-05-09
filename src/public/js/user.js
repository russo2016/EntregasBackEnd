const deleteUserForm = document.getElementById('deleteUserForm');
const setRoleForm = document.getElementById('setRoleForm');

deleteUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try{
        const id = document.getElementById('deleteUserId').value;
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.success) {
            alert(data.message);
        } else {
            alert(data.message);
        }
    }catch (error) {
        console.log(error);
    }
});

setRoleForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try{
        const id = document.getElementById('userId').value;
        const role = document.getElementById('role').value;
        const response = await fetch(`/api/users/${id}/${role}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.success) {
            alert(data.message);
        } else {
            alert(data.message);
        }
    }catch (error) {
        console.log(error);
    }
});
