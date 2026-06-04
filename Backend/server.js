require('dotenv').config()
const express = require('express')
const cors = require('cors');
const { default: mongoose } = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000


app.use(cors)
app.use(express.json)


async function connectDB() {
  try {
    // Database name is "myDatabase" here
    await mongoose.connect(process.env.MONGO_DB_URI, {
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

connectDB();


const itemSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    taskD: { type: String, default: '' },
    dueD: { type: Date, required: true },
    status: { type: Boolean, required: false }
})

const Item = mongoose.model('Item', itemSchema,'task_list')

app.get = ('/', (req, res) => {
    res.send('Hello from express!');
})

app.get = ('/api/list', async (req, res) => {
    try {
        const taskList = await Item.find()
        res.json(taskList)
    } catch (err) {
        res.status(500).json({ message: 'Error:Cant Fetch Data', err });
    }
});

app.get = ('/api/deleteTask', (req, res) => {
    res.send('Hello from express!');
})

app.post = ('/api/createTask', (req, res) => {
    try {
        const newTask = new Item({
            taskName: req.body.taskName,
            taskD: req.body.taskD,
            dueD: req.body.dueD,
            status: req.body.status
        })
    } catch (err) {
        res.status(500).json({message:'Error: Cannot post Data',err})
    }
})

app.listen(PORT, () => {
    console.log("Express server is live")
})
