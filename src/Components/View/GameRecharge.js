import React, { useState } from "react";
import Confirm from "./ConfirmRecharge";
import "./ChannelRecharge.css";

function GameRecharge({ user, setUser }) {
  const gameId='67321e9277fb87c6e1610f92'
  const channels = [
    { id: gameId, name: "The Legend of Zelda: Breath of the Wild", price: 199, image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/220px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg" },
    { id: gameId, name: "Block Puzzle Guardian", price: 99, image: "https://play-lh.googleusercontent.com/mBpKOJBdmZLHFEfIMT0s27O-jX4MyAXqX-vhugHlTE0FKj188WmFCRElxY-inKX1tMA" },
    { id: gameId, name: "Minecraft", price: 89, image: "https://store-images.s-microsoft.com/image/apps.60323.13950084616086229.56d90257-df96-4000-bf85-a64704b3b019.d4ae0460-e24a-41ce-9e09-a92dc478362f?mode=scale&q=90&h=720&w=1280&format=jpg" },
    { id: gameId, name: "Grand Theft Auto V", price: 69, image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Grand_Theft_Auto_V.png/220px-Grand_Theft_Auto_V.png" },
    { id: gameId, name: "Bubble shooter and friends", price: 99, image: "https://m.media-amazon.com/images/I/71Thi8bf+KL._h1_.png" },
    { id: gameId, name: "Word trip", price: 89, image: "https://play-lh.googleusercontent.com/XiGhJg-KFYr-gnKh1YmZjRozQzAHiTWZJTYNOKZB3yaljvx3cY1tP9QyCGsDVznMz5Vo" },
    { id: gameId, name: "Snake zonie.io", price: 109, image: "https://play-lh.googleusercontent.com/lZg6e4KhEUskeXz-0tbHL8Dd9Us6ijv9083_YOfZdS22ui6oNQouKvU_lmMNAocXNYdn" },
    { id: gameId, name: "subway surfers", price: 119, image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=314,height=314,fit=cover,f=auto/add54be7b315c201ac7764c24d3036a9.png" },
    { id: gameId, name: "Temple run", price:159, image: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=314,height=314,fit=cover,f=auto/49cd11d149a763c01cc6cc117fe57a00.png" },
    { id: gameId, name: "Angry birds", price: 129, image: "https://upload.wikimedia.org/wikipedia/en/2/2d/Angry_Birds_promo_art.png" },
  ];

  const [status, setStatus] = useState("");
  const [loadingChannel, setLoadingChannel] = useState(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const handleBuy = async (channel) => {
    setIsConfirm(true);
    setSelectedChannel(channel);
    setLoadingChannel(channel.id);
  };

  // Filter channels based on the search term
  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isConfirm) {
    return (
      <Confirm
        selectedUser={selectedChannel}
        user={user}
        setUser={setUser}
      />
    );
  }

  return (
    <div className="channel-container">
      <h1 className="channel-title">Available Games</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search for a game..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        className="search-input"
      />

      <div className="channel-grid">
        {filteredChannels && filteredChannels.length > 0 ? (
          filteredChannels.map((channel) => (
            <div key={channel.id} className="channel-card">
              <img
                src={`${channel.image}`}
                alt={channel.name}
                className="channel-image"
              />
              <h2 className="channel-name">{channel.name}</h2>
              <p className="channel-price">Price: ₹{channel.price}</p>
              <p style={{fontSize:12}} className="channel-price">5 days</p>
              {loadingChannel === channel.id ? (
                <div className="loading-animation">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
              ) : (
                <button
                  onClick={() => handleBuy(channel)}
                  className="buy-button"
                >
                  Buy
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No Game available.</p>
        )}
      </div>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default GameRecharge;
