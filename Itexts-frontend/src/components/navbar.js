import { useNavigate } from 'react-router-dom';
const Navbar = (Props) => {
  const navigate = useNavigate()  
  const dateformat =(dt)=>{
    const date = new Date(dt);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formatdate= date.toLocaleString('en-US', options);
    return formatdate;
  }
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate(`/`,{replace:true});
  }
  return (
    <>
      <nav className="navbar bg-dark p-1 navbar-expand-lg" data-bs-theme="dark" style={{ color: "#212529" }}>
        <div className="container-fluid">
          <span className="navbar-brand ms-2 fw-bold fs-2">Itexts</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex ms-auto justify-content-center border-top border-1">
              <div className="me-3 p-2" data-bs-toggle="modal" data-bs-target="#Profile" style={{ cursor: "pointer" }}>
                <i className="fa-solid fa-user fa-2xl d-none d-lg-block" style={{ color: "#fcfcfd" }}></i>
                <span className="fw-medium fs-4 d-lg-none d-md-block d-sm-block text-light">Profile</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="modal fade" tabIndex="-1" id="Profile" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0 p-0">
              <button type="button" className="btn-close me-1 mt-1" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-header">
            <div className="modal-title mx-auto fw-bold fs-3" id="ProfileLabel">Profile</div>
            </div>
            <div className="modal-body p-4">
              <div className="row g-3 mx-auto mb-4 align-items-center">
                <div className="col-auto">
                  <div className="fw-bold fs-4">Name : </div>
                </div>
                <div className="col-auto fs-4 fw-medium">
                  {Props.name}
                </div>
              </div>
              <div className="row g-3 mx-auto mb-4 align-items-center">
                <div className="col-auto">
                  <div className="fw-bold fs-4">Email : </div>
                </div>
                <div className="col-auto fs-4 fw-medium">
                  {Props.email}
                </div>
              </div>
              <div className="row g-3 mx-auto mb-4 align-items-center">
                <div className="col-auto">
                  <div className="fw-bold fs-4">Date of Activation : </div>
                </div>
                <div className="col-auto fs-4 fw-medium">
                  {dateformat(Props.date)}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className=" mx-auto btn btn-warning fw-bold" data-bs-dismiss="modal" onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
export default Navbar;