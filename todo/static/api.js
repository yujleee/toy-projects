const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo');

const saveTodo = async () => {
    const todo = todoInput.value;
    if (todo.trim().length === 0) {
        alert('공백은 추가할 수 없어요!');
        return;
    }

    await fetch('/todo', {
        method: "POST",
        body: JSON.stringify({
            'todo_give': todo
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        if (res.ok) {
            console.log(res)
            window.location.reload();
        }
    })

}

const showTodo = async () => {
    const response = await fetch('/todo');

    if (!response.ok) {
        return;
    }

    const data = await response.json();
    for (const [idx, row] of Object.entries(data.todos)) {
        let temp = ``;

        if (row.done === 0) {
            temp = `<li data-num="${row.num}">
                        <h2>🍎 ${row.todo}</h2>
                        <button onclick="doneTodo(${row.num})" type="button" class="btn btn-outline-primary">완료</button>
                        <button onclick="deleteTodo(${row.num})" type="button" class="btn btn-outline-danger">삭제</button>
                    </li>`;
            todoList.insertAdjacentHTML('afterbegin', temp);
        } else {
            temp = `<li class="done">
                        <h2>🍏 ${row.todo}</h2>
                         <button onclick="deleteTodo(${row.num})" type="button" class="btn btn-outline-danger">삭제</button>
                   </li>`;
            todoList.insertAdjacentHTML('beforeend', temp);
        }


    }
}

const doneTodo = async (num) => {
    const response = await fetch('/todo/done', {
        method: "PUT",
        body: JSON.stringify({'num_give': num}),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        return;
    }

    alert('투두 완료!');
    window.location.reload();
}

const deleteTodo = async (num) => {
    const confirmDelete = confirm('투두를 삭제하시겠어요?');
    if (confirmDelete === true) {
        const response = await fetch('/todo/delete', {
            method: "DELETE",
            body: JSON.stringify({'num_give': num}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return;
        }

        window.location.reload();
    }
}

const updateTodo = async (currentText, num) => {
 const updatedText = prompt('수정할 내용을 입력해주세요', currentText);
    if (updatedText.trim().length !== 0) {
        const response = await fetch('/todo/update', {
            method: "PUT",
            body: JSON.stringify({'num_give': num, 'todo_give': updatedText}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return;
        }

        window.location.reload();
    }
}

window.onload = function () {
    showTodo();
    const btnSaveTodo = document.querySelector('.save');

    todoList.addEventListener('click',  (e) => {
        const list = e.target.closest('h2');
        if(!list) return;

        const li = list.parentNode;
        if(li.classList.contains('done')) return;

        const text = list.innerText.slice(2).trim();
        const num = li.dataset.num;

        updateTodo(text,num);
    });

    btnSaveTodo.addEventListener('click', () => {
      saveTodo();
    });

    todoInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter'){
            saveTodo();
        }
    })
}
