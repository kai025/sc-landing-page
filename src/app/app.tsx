import React, { useState, useEffect } from "react";
import useUnsplashImages from "hooks/getImages";
import Card from "components/common/Card";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("nature");
  const { images, loading, error } = useUnsplashImages(searchTerm);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  useEffect(() => {
    if (images.length > 0) {
      setBackgroundImage(images[0].urls.full);
    }
  }, [images]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <form
          onSubmit={handleSearchSubmit}
          className="flex justify-center mb-10 pt-16"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for images..."
            className="p-2 w-full max-w-lg text-xl rounded-l-lg"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white text-xl rounded-r-lg"
          >
            Search
          </button>
        </form>
        {loading && <p className="text-white text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
          {images.slice(1).map((image) => (
            <Card key={image.id} image={image} />
          ))}
        </div>
      </header>
    </main>
  );
};

export default App;