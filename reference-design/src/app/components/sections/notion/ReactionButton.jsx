import {useState, useEffect} from 'react'
import React from 'react'

const emojis = ['✨', '🎨', '🎮', '🌍', '😎', '👻'];
const ReactionButton = () => {
    const [reactions, setReactions] = useState({
        '✨': 0, 
        '🎨': 0, 
        '🎮': 0, 
        '🌏': 0, 
        '😎': 0, 
        '👻': 0,
    });
    

    const [selected, setSelected] = useState(null);

    const handleReact = (emoji) => {
        if (selected === emoji) {
            setSelected(null); //unselect
            fetch('/api/reactions', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emoji }),
            })
                .then (res => res.json())
                .then (data => {
                    setReactions(data);
                })
                .catch (error => {
                    console.error('Error:', error);
                },[]);

        } else {
            setSelected(emoji); //select        
            fetch('/api/reactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emoji }),
            })
                .then (res => res.json())
                .then (data => {
                    setReactions(data);
                })
                .catch (error => {
                    console.error('Error:', error);
                },[]);
        }
    };

    useEffect(() => {
        const fetchReactions = async () => {
            const response = await fetch('/api/reactions');
            const data = await response.json();
            setReactions(data);
        };

        fetchReactions();
    }, []);

    return (
        <div className="flex-wrap flex gap-2">
            {emojis.map((emoji) => (
                <button
                    key={emoji}
                    className={`cursor-pointer border-1 border-[#979797] flex items-center gap-1 px-2 py-1 rounded-full transition 
                        ${selected === emoji ? "bg-[#555]" : "bg-[#2A2929] hover:bg-[#3A3939]"} 
                        text-white ${selected && selected !== emoji ? "opacity-50" : ""}`}
                      
                    onClick={() => handleReact(emoji)}
                >
                    <span>{emoji}</span>
                    <span>{reactions[emoji] || 0}</span>
                    
                </button>
            ))}
        </div>
    );
};
export default ReactionButton