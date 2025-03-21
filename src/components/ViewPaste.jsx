
import React, { useEffect, useState } from 'react'
import './Style.css'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'

const ViewPaste = () => {

    const { id } = useParams();

    const allPastes = useSelector(
        (state) => state.paste.pastes
    );

    const paste = allPastes.filter(
        (p) => p._id === id)[0];



    return (
        <div>
            <div className='tittle-div'>
                <input
                    className='input-field'
                    type="text"
                    placeholder='Enter tittle here'
                    value={paste.title}
                    disabled
                    onChange={(e) => setTittle(e.target.value)}
                />

                {/* <button
                    className='btn-field'
                    onClick={createPaste}
                >
                    {
                        pasteId ? 'Update My Paste' : 'Create Paste'
                    }
                </button> */}
            </div>

            <div>
                <textarea
                    className='content'
                    value={paste.content}
                    disabled
                    placeholder='Enter Content here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={30}
                />
            </div>

        </div>
    )
}

export default ViewPaste
