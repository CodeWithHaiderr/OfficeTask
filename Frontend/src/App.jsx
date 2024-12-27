import { useEffect, useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/movies");
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleView = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = data.filter((movie) =>
      movie.movie.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-xl">Movies List</h1>

        <div className="my-4">
          <TextField
            label="Search Movie"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <p>Loading movies...</p>
        ) : (
          <div className="w-full">
            <table className="w-full border border-gray-200 border-collapse table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Rating</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((movie, key) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{movie.id}</td>
                    <td className="px-4 py-2 border">{movie.movie}</td>
                    <td className="px-4 py-2 border">{movie.rating}</td>
                    <td className="px-4 py-2 border">
                      <button
                        className="text-blue-500"
                        onClick={() => handleView(movie)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedMovie && (
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Movie Details</DialogTitle>
            <DialogContent>
              <p><strong>ID:</strong> {selectedMovie.id}</p>
              <p><strong>Name:</strong> {selectedMovie.movie}</p>
              <p><strong>Rating:</strong> {selectedMovie.rating}</p>
              <p>
                <strong>IMDB:</strong>{" "}
                <a
                  href={selectedMovie.imdb_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View on IMDB
                </a>
              </p>
              <img
                src={selectedMovie.image}
                alt={selectedMovie.movie}
                className="mt-4 w-full h-auto"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </>
  );
}

export default App;
