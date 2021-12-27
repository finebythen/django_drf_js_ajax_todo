"use strict"

document.addEventListener('DOMContentLoaded', e => {
    // variables
    const url_base = 'http://127.0.0.1:8000/';
    let btn = document.getElementById('btn-create-todo');
    let input = document.getElementById('input-todo');
    let ul = document.getElementById('ulist-todo');

    const get_tasks = () => {
        let url = `${url_base}api/task/list/`;

        fetch(url)
        .then(response => response.json())
        .then(function(data) {
            let list = data;

            while (ul.hasChildNodes()) {
                ul.removeChild(ul.firstChild);
            };

            let fragment = document.createDocumentFragment();
            for (let i=0; i < list.length; i++) {
                let li = document.createElement('li');
                let p = document.createElement('p');
                let btn = document.createElement('button');
                let btn_symbol = document.createElement('i');

                btn_symbol.setAttribute('class', 'bi bi-dash-circle');
                btn.setAttribute('class', 'btn btn-danger btn-sm btn-delete-task');
                btn.setAttribute('value', list[i].id);
                btn.appendChild(btn_symbol);

                p.setAttribute('class', 'p-todo-tasks');
                p.setAttribute('id', list[i].id);
                p.setAttribute('value', list[i].id);
                p.style.cursor = 'pointer';
                if (list[i].status) {
                    p.style.textDecoration = 'line-through';
                }
                p.textContent = list[i].description;


                li.appendChild(p);
                li.appendChild(btn);

                fragment.append(li);
            };
            ul.append(fragment);

            for (let i in list) {
                let btn_delete = document.getElementsByClassName('btn-delete-task')[i];
                let para = document.getElementsByClassName('p-todo-tasks')[i];

                btn_delete.addEventListener('click', e => {
                    e.preventDefault();
                    delete_task(parseInt(btn_delete.value));
                });
                para.addEventListener('click', e => {
                    e.preventDefault();
                    update_task(parseInt(para.id));
                });
            };
        })
    };

    const create_task = () => {
        let url = `${url_base}api/task/create/`;
        let csrftoken = getCookie('csrftoken');
        let form = document.getElementById('form-todo');

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                description: input.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success: ', data);
        })
        .then(function() {
            form.reset();
            get_tasks();
        })
        .catch((error) => {
            console.log('Error: ', error);
        })
    };

    const delete_task = pk => {
        let url = `${url_base}api/task/delete/${pk}/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        })
        .then(response => {
            console.log('Delete: ', response)
            get_tasks();
        });
    };

    const update_task = pk => {
        let url = `${url_base}api/task/update/${pk}/`;
        let csrftoken = getCookie('csrftoken');

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        })
        .then(response => {
            console.log('Update: ', response);
            get_tasks();
        })
        .catch((error) => {
            console.log('Error: ', error);
        })
    };

    const getCookie = name => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    // initial functions
    get_tasks();

    // add event listeners
    btn.addEventListener('click', e => {
        e.preventDefault();
        create_task();
    });
});
