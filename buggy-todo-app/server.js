const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let todos = [
    { id: 1, text: "เรียนรู้การใช้ Local AI", completed: false },
    { id: 2, text: "เขียนโค้ด Node.js", completed: true }
];

const saveToDatabase = async (data) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Saved to DB!");
            resolve(true);
        }, 500);
    });
};

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    const newTodo = {
        id: todos.length + 1,
        text: text,
        completed: false
    };

    todos.push(newTodo);

    saveToDatabase(newTodo);

    res.json(resultData);
});

app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    todos = todos.filter(t => t.id !== id);
    console.log(`Deleted todo with ID: ${todoId}`);

    res.json({ success: true, message: "Deleted successfully" });
});

app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos.map(t => {
        if (t.id === id) {
            t.completed = !t.completed;
        }
        return t;
    });

    res.json({ success: true, message: "Updated successfully" });
});

app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🐞 Buggy Todo App is running on http://localhost:${PORT}`);
    console.log(`🤖 Send this to your Local AI to test its debugging skills!`);
    console.log(`=================================================`);
});
