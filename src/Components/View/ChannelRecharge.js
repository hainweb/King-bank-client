import React, { useState } from "react";
import axios from "axios";
import Confirm from "./ConfirmRecharge";
import "./ChannelRecharge.css";
import { BASE_URL } from "../../Url/Url";

function ChannelRecharge({ user, setUser }) {
    const channelId='6796468d47c0c6db867f05cc'
    const channels = [
        { id: channelId, name: "Asinet", price: 299, image: "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/7199/597199-h" },
        { id: channelId , name: "Flowers", price: 500, image: "https://play-lh.googleusercontent.com/rcpnu_rUZhWHvged9zd2ZEoEoLQFb6uAOYqxKl4qTNGuxeGPEGwMqvaRISYlMJDBZhA" },
        { id: channelId, name: "Mazhavil manorama", price: 399, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA7um7_iUmNiDkr2NC3EaFbCXFP1m4YY9ATw&s" },
        { id: channelId, name: "Asinet Plus", price: 399, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdhuw7iVGwSnB6s1cHLEQ6etqu9jAS6rUNpg&s" },
        { id: channelId, name: "Kochu TV", price: 299, image: "https://yt3.googleusercontent.com/ytc/AIdro_mB3wkbCL4O953ORJ5sXqhV0q7xTwTQ_vhhUyyDKMwUWg=s900-c-k-c0x00ffffff-no-rj" },
    ];

    const [status, setStatus] = useState("");
    const [loadingChannel, setLoadingChannel] = useState(null);
    const [isConfirm, setIsConfirm] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState(null);

    const handleBuy = async (channel) => {
        setIsConfirm(true);
        setSelectedChannel(channel);
        setLoadingChannel(channel.id);
      
    };

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
            <h1 className="channel-title">Available Channels</h1>
            <div className="channel-grid">
                {channels && channels.length > 0 ? (
                    channels.map((channel) => (
                        <div key={channel.id} className="channel-card">
                            <img
                                src={`${channel.image}`}
                                alt={channel.name}
                                className="channel-image"
                            />
                            <h2 className="channel-name">{channel.name}</h2>
                            <p className="channel-price">Price: ₹{channel.price}</p>
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
                    <p>No channels available.</p>
                )}
            </div>
            {status && <p className="status-message">{status}</p>}
        </div>
    );
}

export default ChannelRecharge;
