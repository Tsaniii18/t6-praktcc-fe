import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById, updateNote } from '../Api';

const EditNote = () => {
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await getNoteById(id);
                setJudul(response.data.judul);
                setIsi(response.data.isi);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateNote(id, { judul, isi });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <div className="container mt-5"><p>Loading...</p></div>;
    }

    return (
        <div className="container mt-5">
            <div className="box p-5">
                <h1 className="title">Edit Catatan</h1>
                <form onSubmit={handleUpdate}>
                    <div className="field">
                        <label className="label">Judul Catatan</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input" 
                                value={judul} 
                                onChange={(e) => setJudul(e.target.value)} 
                                placeholder='Masukkan judul catatan'
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Isi Catatan</label>
                        <div className="control">
                            <textarea 
                                className="textarea" 
                                value={isi} 
                                onChange={(e) => setIsi(e.target.value)} 
                                placeholder='Tulis isi catatan...'
                            />
                        </div>
                    </div>
                    <div className="buttons mt-4">
                        <button type="submit" className="button is-success">Update</button>
                        <button type="button" className="button is-danger" onClick={() => navigate("/")}>Batal</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNote;
