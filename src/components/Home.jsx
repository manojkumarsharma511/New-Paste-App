import React, { useEffect, useState } from 'react'
import './Style.css'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'

const Home = () => {
    const [title, setTittle] = useState('')
    const [value, setValue] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();

    const pasteId = searchParams.get("pasteId")

    const dispatch = useDispatch();

    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.
                find((p) =>
                    p._id === pasteId);
            setTittle(paste.title)
            setValue(paste.content)
        }
    }, [pasteId])

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId ||
                Date.now().toString(36),
            createAt: new Date().toISOString(),
        }

        if (pasteId) {
            //update
            dispatch(updateToPastes(paste))

        }
        else {
            //create
            dispatch(addToPastes(paste))
        }

        //after creation or updation
        setTittle('')
        setValue('')
        setSearchParams({})
    }



    return (
        <div>
            <div className='tittle-div'>
                <input
                    className='input-field'
                    type="text"
                    placeholder='Enter tittle here'
                    value={title}
                    onChange={(e) => setTittle(e.target.value)}
                />

                <button
                    className='btn-field'
                    onClick={createPaste}
                >
                    {
                        pasteId ? 'Update My Paste' : 'Create Paste'
                    }
                </button>
            </div>

            <div>
                <textarea
                    className='content'
                    value={value}
                    placeholder='Enter Content here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={30}
                />

            </div>

        </div>
    )
}

export default Home
