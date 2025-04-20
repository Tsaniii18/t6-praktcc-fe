import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById } from '../api';
import { ArrowLeft } from 'lucide-react'; // pastikan lucide-react sudah diinstall

const ViewNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showFullContent, setShowFullContent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await getNoteById(id);
                setNote(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    const truncateContent = (content) => {
        const words = content.split(" ");
        if (words.length <= 200) return content;
        return words.slice(0, 200).join(" ") + "...";
    };

    if (loading) {
        return (
            <div className="container mt-6 has-text-centered">
                <p className="is-size-5 has-text-grey">Loading catatan...</p>
            </div>
        );
    }

    if (!note) {
        return (
            <div className="container mt-6 has-text-centered">
                <p className="is-size-5 has-text-danger">Catatan tidak ditemukan.</p>
            </div>
        );
    }

    return (
        <div className="container mt-6" style={{ maxWidth: "800px" }}>
            <div
                className="box p-6"
                style={{
                    borderRadius: "16px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.07)",
                    backgroundColor: "#fff",
                }}
            >
                <button
                    className="button is-light mb-4"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Kembali
                </button>

                <h1 className="title is-2 has-text-weight-semibold has-text-dark mb-4">
                    {note.judul}
                </h1>

                <div
                    className="content is-size-5"
                    style={{
                        whiteSpace: 'pre-wrap',
                        lineHeight: "1.8",
                        color: "#333"
                    }}
                >
                    {showFullContent ? note.isi : truncateContent(note.isi)}
                    {note.isi.split(" ").length > 200 && (
                        <button
                            className="button is-small is-white has-text-link ml-2"
                            onClick={() => setShowFullContent(!showFullContent)}
                        >
                            {showFullContent ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}
                        </button>
                    )}
                </div>

                <hr />

                <div className="is-size-7 has-text-grey mt-3">
                    <p><strong>Dibuat:</strong> {note.tanggal_dibuat}</p>
                    <p><strong>Terakhir diupdate:</strong> {note.tanggal_diupdate}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewNote;
