import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const navigate = useNavigate();

    const saveNote = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://backend115-722144796089.us-central1.run.app/note', { judul, isi });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="box p-5">
                <h1 className="title">Buat Catatan Baru</h1>
                <form onSubmit={saveNote}>
                    <div className="field">
                        <label className="label">Judul Catatan</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input" 
                                value={judul} 
                                placeholder='Masukkan judul catatan' 
                                onChange={(e) => setJudul(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Isi Catatan</label>
                        <div className="control">
                            <textarea 
                                className="textarea" 
                                value={isi} 
                                placeholder='Tulis isi catatan...' 
                                onChange={(e) => setIsi(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="buttons mt-4">
                        <button type='submit' className="button is-success">Simpan</button>
                        <button type='button' className="button is-danger" onClick={() => navigate("/")}>Batal</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNote;
