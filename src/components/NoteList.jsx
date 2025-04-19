import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getAllNotes, deleteNote } from './api';

const NoteList = () => {
    const [note, setNote] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await getAllNotes();
            setNote(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteNote(id);
            fetchNotes();
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <div className="container mt-5"><p>Loading...</p></div>;
    }

    return (
        <div className="container mt-5">
            <div className="box">
                <h1 className="title has-text-centered">Daftar Catatan</h1>
                <div className="buttons is-right">
                    <Link to={`add`} className='button is-success'>+ Buat Catatan Baru</Link>
                </div>
                <table className='table is-striped is-fullwidth'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Judul</th>
                            <th>Isi Pesan</th>
                            <th>Tanggal dibuat</th>
                            <th>Terakhir dirubah</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {note.map((note, index) => (
                            <tr key={note.id}>
                                <td>{index + 1}</td>
                                <td><strong>{note.judul}</strong></td>
                                <td>{note.isi.substring(0, 50)}...</td>
                                <td>{note.tanggal_dibuat}</td>
                                <td>{note.tanggal_diupdate}</td>
                                <td>
                                    <div className="buttons">
                                        <Link to={`view/${note.id}`} className='button is-small is-primary'>Lihat</Link>
                                        <Link to={`edit/${note.id}`} className='button is-small is-info'>Edit</Link>
                                        <button onClick={() => handleDelete(note.id)} className='button is-small is-danger'>Hapus</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NoteList;
