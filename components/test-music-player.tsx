export const TestMusicPlayer = () => {
  return (
    <div className={`music-player-container`}>
      <div className="music-player h-370px pr-250px w-460px z-3 absolute bg-white px-40 py-40 text-right">
        <div className="player-content-container relative top-1/2 -translate-y-1/2 transform">
          <h1 className="artist-name text-28 mb-3 font-normal">Incubus</h1>
          <h2 className="album-title text-24 mb-7 font-light">Make Yourself</h2>
          <h3 className="song-title text-18 mb-6 font-light">Stellar</h3>
          <div className="music-player-controls">
            <div className="control-back"></div>
            <div className="control-play"></div>
            <div className="control-forwards"></div>
          </div>
        </div>
      </div>

      <div className="album shadow-3xl h-315px w-315px top-27px left-250px absolute z-10">
        <div className="album-art h-315px w-315px bg-white"></div>
        <div className="vinyl top-5px w-300px h-300px z-5 absolute left-0 animate-spin bg-cover bg-center bg-no-repeat transition-all duration-500"></div>
      </div>
    </div>
  );
};
