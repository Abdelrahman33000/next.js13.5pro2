import { useEffect, useState } from 'react';
import axios from 'axios';

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    };

    fetchData();
  }, []);

  const handleSort = () => {
    if (isSorted) {
      setSortedPosts([]);
      setIsSorted(false);
    } else {
      const sorted = [...posts].sort((a, b) => a.title.localeCompare(b.title));
      setSortedPosts(sorted);
      setIsSorted(true);
    }
  };

  const renderPosts = isSorted ? sortedPosts : posts;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleSort}
      >
        {isSorted ? 'Cancel Sort' : 'Sort by Title'}
      </button>
      {renderPosts.map((post) => (
        <div key={post.id} className="border rounded p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default IndexPage;