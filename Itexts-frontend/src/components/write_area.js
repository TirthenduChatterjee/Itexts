import React, { useState,useEffect } from "react"
const WriteArea = (Props) => {
    const [text, setText] = useState("")
    const [name, setName] = useState("")
    const [tag, setTag] = useState("Personal")
    const capBtn = () => {
        const txt = text
        setText(txt.toUpperCase())
    }
    const smallBtn = () => {
        const txt = text
        setText(txt.toLowerCase())
    }
    const onChangeText = (e) => {
        setText(e.target.value)
    }
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeTag = (e) => {
        setTag(e.target.value)
    }
    const clearBtn = () => {
        setText("")
    }
    const copyBtn = () => {
        navigator.clipboard.writeText(text)
    }
    const xtraspaceBtn = () => {
        const txt = text.replace(/[^\S\n]+/g, " ")
        setText(txt)
    }
    const noteUpSave=async (e)=>{
        e.preventDefault()
        if(!Props.update){
            try {
                const saveNote = await fetch("http://localhost:5000/api/notes/addnotes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Auth-token": Props.token
                    },
                    body: JSON.stringify({
                        title: name,
                        description: text,
                        tag: tag
                    })
                });
    
                setName("");
                setText("");
                setTag("Personal");
                
                if (!saveNote.ok) {
                    throw new Error('Failed to save the note');
                }
    
                const saveres = await saveNote.json();
                document.querySelector("#modal-close").click();
                if(saveres.success){
                    Props.handleReload();
                }
            } catch (error) {
                console.error('Error:', error);
            }
    
        }else{
            try {
                console.log(Props.note.id)
                const upNote = await fetch(`http://localhost:5000/api/notes/updatenote/${Props.note._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Auth-token": Props.token
                    },
                    body: JSON.stringify({
                        title: name,
                        description: text,
                        tag: tag
                    })
                });
    
                setName("");
                setText("");
                setTag("Personal");
                
                if (!upNote.ok) {
                    throw new Error('Failed to update the note');
                }
    
                const upres = await upNote.json();
                if(upres.success){
                    Props.selfLoad()
                    Props.handleReload();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
    useEffect(() => {
        if (Props.update) {
            setText(Props.note.description);
            setName(Props.note.title);
        }
    }, [Props.update, Props.note]);
    return (
        <>
            <div className="form-floating w-100 pt-2 pb-2 pe-5 ps-5 " >
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 fw-bold" id="staticBackdropLabel">Save with</h1>
                                <button type="button" className="btn-close" id="modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={noteUpSave}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label fw-semibold">Name:</label>
                                        <input type="text" className="form-control border border-black" value={name} onChange={onChangeName} id="recipient-name" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag-text" className="col-form-label fw-semibold">Tag:</label>
                                        {/* <textarea className="form-control border border-black" id="tag-text" rows={2} value={tag} onChange={onChangeTag} style={{ resize: "none" }} required></textarea> */}
                                        <select className="form-select" aria-label="Default select example" id="tag-text" value={tag} onChange={onChangeTag}>
                                            <option value="Personal">Personal</option>
                                            <option value="Professional">Professional</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success" data-bs-dismiss="modal">{Props.update?"Update":"Save"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="d-flex">
                    <div><h1 className={`text-dark d-none d-lg-block d-md-block`}>{Props.update?Props.note.title:"Welcome "+Props.name}</h1></div>
                    <div className="ms-auto fw-bold" style={{ paddingTop: 20 }}>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words || {text.length} characters</div>
                </div>
                <textarea className="form-control mx-auto mb-3" placeholder="Write Your Note Here" id="floatingTextarea2" style={{ height: "485px" }} value={text} onChange={onChangeText}></textarea>
                <div className="d-flex flex-wrap row-gap-2">
                    <div className="btn-group mx-2 d-none d-lg-block" role="group" aria-label="Text-Case">
                        <button type="button" className="btn btn-primary " onClick={capBtn}>Cap</button>
                        <button type="button" className="btn btn-warning " onClick={smallBtn}>Small</button>
                    </div>
                    <div className="btn-group mx-2 d-none d-lg-block" role="group">
                        <button type="button" className="btn btn-secondary" onClick={clearBtn}>Clear</button>
                        <button type="button" className="btn btn-secondary" onClick={copyBtn}>Copy</button>
                    </div>

                    <button type="button" className="btn btn-info mx-2 d-none d-lg-block" onClick={xtraspaceBtn}>Remove Extra Spaces</button>
                    <button type="button" className="btn btn-success ms-auto" data-bs-toggle="modal" data-bs-target="#staticBackdrop">{Props.update?"Update":"Save"}</button>
                </div>
                <hr className="border border-dark border-2 opacity-100" />

            </div>
        </>)
}
export default WriteArea