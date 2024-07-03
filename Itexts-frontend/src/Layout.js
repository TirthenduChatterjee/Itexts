import WriteArea from './components/write_area'
import SavedNote from './components/saved_notes';
import Navbar from './components/navbar'
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const Layout = () => {
  const [User, setUser] = useState(null)
  const { token } = useParams()
  const [writeAreaProps,serWriteAreaProps]=useState({
    token:token,
    update:false
  })
  const [reloadOnSave, setReloadOnSave] = useState(false);
  // const [Selfreload, setSelfReload] = useState(false);
  const handleReload = () => {
    setReloadOnSave((prev) => !prev); // Toggle the state to trigger reload
  };
  const selfLoad=()=>{
    // setSelfReload((prev) => !prev); // Toggle the state to trigger reload
    serWriteAreaProps((prevProps)=>({
      ...prevProps,
      update:false,
      note:null
    }))
  }
  const onUpdate= useCallback((note)=>{
      serWriteAreaProps((prevProps)=>({
        ...prevProps,
        update:true,
        note:note
      }))
  },[])
  useEffect(() => {
    const bodystyle = () => {
      document.body.style.display = "block";
    }
    const userFetch = async () => {
      const user = await fetch("http://localhost:5000/api/auth/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Auth-token": token
        },
      });
      // console.log(user)
      const userData = await user.json();
      setUser(userData);
    }
    bodystyle()
    userFetch()
  }, [token]);
  return (
    <div className="h-100 w-100" style={{ background: "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)" }}>
      <Navbar {...User} />
      <WriteArea {...User} {...writeAreaProps}  handleReload={handleReload} selfLoad={selfLoad}/>
      <SavedNote token={token} onUpdate={onUpdate} reload={reloadOnSave}/>
    </div>
  );
}

export default Layout;
