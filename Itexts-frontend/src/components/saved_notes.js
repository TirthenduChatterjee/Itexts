import { useEffect, useState } from "react"
const SavedNote = (Props) => {
    // console.log("Saved Area Loaded .....")
    const [Notes, setNotes] = useState([])
    const DelClick = async (id) => {
        let selected_card = document.querySelector(`.card[data-id="${id}"]`);
        if (selected_card) {
            setTimeout(() => { selected_card.style.display = "none" }, 200)
            selected_card.classList.add("fade");
        }
        try {
            const delnote = await fetch(`http://localhost:5000/api/notes/deletenode/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Auth-token": Props.token
                }
            })
            await delnote.json()
            // console.log(res.success)
        } catch (error) {
            console.error("Problem in fetching user notes...", error)
        }
    }
    const UpdateClick = (note) => {
        console.log(note)
        Props.onUpdate(note)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const notes = await fetch("http://localhost:5000/api/notes/fetchallnotes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Auth-token": Props.token
                    },
                });
                if (!notes.ok) {
                    console.log(`Problem in Server network ${notes.statusText}`)
                }
                const notesdata = await notes.json()
                setNotes(notesdata)

            } catch (error) {
                console.error("Problem in fetching user notes...", error)
            }
        }
        fetchNotes()
    }, [Props.token, Props.reload]);
    return (
        <>
            <div className="d-flex justify-content-center gap-4 row-gap-5 p-3 m-0 flex-wrap">
                {Notes.map(note => (

                    <div key={note._id}>
                        <div className="card" data-id={note._id} style={{ width: "17rem", height: "20rem", cursor: "pointer" }}>
                            <div className="card-body pb-0" data-bs-toggle="modal" data-bs-target={`#modal-${note._id}`}>
                                <h5 className="card-title fs-4 mb-0">{note.title}</h5>
                                <h5 className="card-title fs-6 text-primary mb-1">{note.tag}</h5>
                                <p className="card-text mb-0">{note.description.slice(0, 180)} ......</p>
                                <hr className="mb-0 mt-1" />
                            </div>
                            <div className="d-flex flex-row justify-content-end">
                                <button href="/" className="btn btn-danger mb-2 me-2 mt-0" data-bs-toggle="modal" data-bs-target={`#delmodal-${note._id}`} >Delete</button>
                                <button href="/" className="btn btn-primary mb-2 me-2 mt-0" onClick={() => { UpdateClick(note); }}>Update</button>
                            </div>
                        </div>

                        {/* Delete Modal */}
                        <div className="modal fade" id={`delmodal-${note._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete this note ? </h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    {/* <div className="modal-body">
                                        ...
                                    </div> */}
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { DelClick(note._id); }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Note Modal */}

                        <div className="modal fade" id={`modal-${note._id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="NoteModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div className="modal-content">
                                    <div className="modal-header pb-0 border-bottom-0">
                                        <h1 className="modal-title fs-3" id="NoteModalLabel">{note.title}</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-header pt-0">
                                        <h1 className="modal-title fs-5 text-primary mb-1" id="exampleModalLabel">{note.tag}</h1>
                                    </div>
                                    <div className="modal-body">
                                        {note.description}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => { UpdateClick(note); }}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                ))}
            </div>
        </>
    )
}
export default SavedNote