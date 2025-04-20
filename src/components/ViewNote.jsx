import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById } from '../api';

const ViewNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await getNoteById(id);
                setNote(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    const truncateContent = (text, maxWords = 200) => {
        const words = text.trim().split(/\s+/);
        if (words.length <= maxWords) return text;
        return words.slice(0, maxWords).join(' ') + '...';
    };

    if (loading) return <div className="container mt-5"><p>Loading...</p></div>;
    if (!note) return <div className="container mt-5"><p>Catatan tidak ditemukan</p></div>;

    return (
        <div className="container mt-5">
            <div className="box p-5">
                <h1 className="title mb-4">{note.judul}</h1>

                <table className="table is-striped is-fullwidth">
                    <tbody>
                        <tr>
                            <th>Isi Catatan</th>
                            <td>{truncateContent(note.isi)}</td>
                        </tr>
                        <tr>
                            <th>Dibuat</th>
                            <td>{note.tanggal_dibuat}</td>
                        </tr>
                        <tr>
                            <th>Terakhir Diupdate</th>
                            <td>{note.tanggal_diupdate}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="buttons mt-4">
                    <button className="button is-link" onClick={() => navigate("/")}>Kembali</button>
                </div>
            </div>
        </div>
    );
};

export default ViewNote;
