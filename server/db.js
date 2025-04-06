const mongoose = require('mongoose');
const Search = require('./models/searchModel.js');

mongoose.connect('mongodb+srv://iamvsanup:3raLvtJYwOZ0FTVG@driveready.0udnccc.mongodb.net/DriveReady?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const seedData = [
    {
        title: "React.js",
        description: "A JavaScript library for building user interfaces.",
        url: "https://reactjs.org",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        keywords: ["JavaScript", "Frontend", "UI"]
    },
    {
        title: "MongoDB",
        description: "A NoSQL database that stores data in JSON-like documents.",
        url: "https://www.mongodb.com/",
        imageUrl: "https://webimages.mongodb.com/_com_assets/cms/kekn6za00mgm2xym8-MongoDB-logo.jpg",
        keywords: ["Database", "NoSQL", "Big Data"]
    },
    {
        title: "Node.js",
        description: "A JavaScript runtime built on Chrome's V8 engine.",
        url: "https://nodejs.org/",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
        keywords: ["Backend", "JavaScript", "API"]
    }
];

Search.insertMany(seedData)
    .then(() => console.log("Data seeded successfully"))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
