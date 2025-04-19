import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ViewNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNoteById();
    }, []);

    const getNoteById = async () => {
        try {
            const response = await axios.get(`https://backend115-722144796089.us-central1.run.app/note/${id}`);
            setNote(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="container mt-5"><p>Loading...</p></div>;
    }

    return (
        <div className="container mt-5">
            <div className="box p-5">
                <h1 className="title">{note.judul || "(Tidak ada judul)"}</h1>
                <div className="mb-4">
                    <p className="is-size-6 has-text-grey">Tanggal Dibuat: {note.tanggal_dibuat}</p>
                    <p className="is-size-6 has-text-grey">Terakhir Diubah: {note.tanggal_diupdate}</p>
                </div>
                <div className="content p-3 box has-background">
                    <p>{note.isi || "(Tidak ada isi catatan)"}</p>
                </div>
                <div className="buttons mt-4">
                    <Link to="/" className="button is-primary">Kembali</Link>
                    <Link to={`/edit/${note.id}`} className="button is-info">Edit</Link>
                </div>
            </div>
        </div>
    );
}

export default ViewNote;