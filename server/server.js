const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors({
    origin : "http://localhost:3000"
}));
app.use(express.json());

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

// API Route
app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.json([]);
  }

  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API}?q=${query}`);
    const books = response.data.items.map(item => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.join(", ") || "Unknown",
      description: item.volumeInfo.description || "No description available.",
      image: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150",
      link: item.volumeInfo.infoLink
    }));
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
