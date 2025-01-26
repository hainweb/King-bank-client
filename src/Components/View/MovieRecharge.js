import React, { useState } from "react";
import Confirm from "./ConfirmRecharge";
import "./ChannelRecharge.css";

function MovieRecharge({ user, setUser }) {
    const priceOptions = [60, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

    const [status, setStatus] = useState("");
    const [loadingChannel, setLoadingChannel] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [channelName, setChannelName] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");

    const handleBuy = async () => {
        if (!channelName || !selectedPrice) {
            setStatus("Please fill in all fields.");
            return;
        }

        setIsConfirm(true);
        setLoadingChannel(true);

        // Add necessary logic for the confirmation step here

        setLoadingChannel(false);
    };

    if (isConfirm) {
        return (
            <Confirm 
                selectedUser={{ name: channelName ,id:'679645ee47c0c6db867f05cb' , price: selectedPrice }}
                user={user}
                setUser={setUser}
            />
        );
    }

    return (
        <div className="channel-container">
            <h1 className="channel-title">Movie Recharge</h1>
            <div className="input-group">
                <label htmlFor="channel-name">Movie Name:</label>
                <input
                className="channel-name-input"
                    type="text"
                    id="channel-name"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="Enter channel name"
                />
            </div>
            <div className="input-group">
                <label htmlFor="price">Select Price:</label>
                <select
                className="channel-name-input"
                    id="price"
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                >
                    <option value="">--Select Price--</option>
                    {priceOptions.map((price) => (
                        <option key={price} value={price}>
                            ₹{price}
                        </option>
                    ))}
                </select>
            </div>
            {loadingChannel ? (
                <div className="loading-animation">
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                </div>
            ) : (
                <button onClick={handleBuy} className="buy-button">
                    Buy
                </button>
            )}
            {status && <p className="status-message">{status}</p>}
        </div>
    );
}

export default MovieRecharge;
