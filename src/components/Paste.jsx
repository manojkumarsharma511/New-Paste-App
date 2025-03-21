import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Style.css'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

    const pastes = useSelector((state) => state.paste.pastes);

    const [searchTerm, setsearchTerm] = useState('');

    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste) => paste.title.
            toLowerCase().
            includes(searchTerm.toLowerCase())
    )

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId))
    }


    const handleShare = async (title, content) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `${title}\n\n${content}`,
                });

            } catch (error) {
                console.error('Error sharing content:', error);
            }
        } else {
            alert('Web Share API is not supported in this browser.');
        }
    }



    return (
        <div>
            <input
                className='search'
                type="search"
                placeholder='Search Here'
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
            />
            <div className='cards-div'>
                {
                    filteredData.length > 0 &&
                    filteredData.map(
                        (paste) => {
                            return (
                                <div className='card' key={paste?.content}>
                                    < div >
                                        <h2>{paste.title}</h2>
                                    </div>
                                    <div >
                                        {paste.content}
                                    </div>
                                    <div className='btn-paste'>
                                        <button>
                                            <a href={`/?pasteId=${paste?._id}`}>
                                                Edit
                                            </a>
                                        </button >
                                        <button>
                                            <a href={`/pastes/${paste?._id}`}>
                                                View
                                            </a>
                                        </button>
                                        <button onClick={() =>
                                            handleDelete(
                                                paste?._id
                                            )}>
                                            Delete
                                        </button>
                                        <button onClick={() => {
                                            navigator.clipboard.writeText(paste?.content)
                                            toast.success("Copied to clipboard")
                                        }
                                        }>
                                            Copy
                                        </button>
                                        <button onClick={() => handleShare(paste.title, paste.content)}>
                                            Share
                                        </button>
                                    </div>
                                    <div>
                                        {paste.createAt}
                                    </div>


                                </div>
                            )
                        }
                    )
                }

            </div >
        </div >
    )
}


export default Paste
