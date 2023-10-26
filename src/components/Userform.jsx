import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { AiFillCamera, AiOutlineUpload, AiOutlineEdit } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../hook/useAuth";

const Userform = () => {
  const { user } = useAuthContext();
  const { updateUser, setUserData, userData, setLoading, getUser } =
    useAuth();

  const formInput = [
    { label: "UserID", name: "displayName" },
    { label: "Email", name: "email" },
    { label: "Address", name: "address" },
  ];

  const [edit, setEdit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleUpdatUserSubmit = (e) => {
    e.preventDefault();
    updateUser(userData);
    setEdit(false);
  };
  //檔案
  const [file, setFile] = useState(null);
  const [filepath, setFilepath] = useState("");

  //選取檔案
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = ["image/jpg", "image/jpeg", "image/png"];
    if (selectedFile && allowedExtensions.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      setFile(null);
      alert("請選擇有效的 jpg 或 png 文件。");
    }
  };
  //上傳檔案
  const handleUpload = async () => {
    if (file) {
      const filetype = file.name.split(".").pop();
      const fileName = `profile.${filetype}`;

      //連結至firebase跟設定檔案名稱
      const storageRef = ref(storage, `/projectFiles/${fileName}`);
      //根據檔案連結上傳檔案
      const uploadTask = uploadBytesResumable(storageRef, file);
      await uploadTask;

      const photoURL = await getDownloadURL(storageRef);
      setUserData({ ...userData, photoName: fileName, photoURL });
    }
  };
  //從firebase中找到圖片
  const fetchUserAvatar = async () => {
    try {
      const storageRef = ref(storage, `/projectFiles/profile.png`);
      const url = await getDownloadURL(storageRef);
      setFilepath(url);
    } catch (error) {
      console.error("獲取用戶圖片出現錯誤：", error);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      setUserData({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      setLoading(false);
    }
    //網頁加載如有用戶圖片則下載到網頁中
    fetchUserAvatar();
    getUser();
  }, [user]);

  return (
    <div>
      {user ? (
        <div className="col  d-flex flex-column  justify-content-center gap-2   ">
          <h6>Profile Information</h6>
          <div className="d-flex flex-column  flex-md-row align-items-center align-items-md-start   justify-content-center gap-5 ">
            {/* 使用者頭貼 */}
            <div
              aria-label="img"
              className=" d-flex flex-column align-items-center justify-content-center "
            >
              <div
                className=" position-relative  overflow-hidden "
                style={{
                  width: "200px",
                  height: "200px",
                }}
              >
                <img
                  className="p-3 bg-light rounded-3 w-100 h-100"
                  src={filepath}
                  alt=""
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
                <span className=" position-absolute top-0  start-0 px-2 fs-5 ">
                  <AiFillCamera />
                </span>
              </div>
              {edit && (
                <div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    id="custom-file-input"
                    className="d-none"
                  />
                  <label
                    htmlFor="custom-file-input"
                    className="btn  btn-outline-black rounded-5  font-sm me-1"
                  >
                    選擇檔案
                  </label>
                  <button
                    htmlFor="custom-file-input"
                    className="btn btn-success  rounded-5  font-sm pb-1 py-0  "
                    onClick={handleUpload}
                  >
                    <span className="fs-5 ms-1 ">
                      <AiOutlineUpload />
                    </span>
                    <span> 確認上傳</span>
                  </button>
                </div>
              )}
            </div>
            {/* input form */}
            <div
              aria-label="userinput"
              className=" d-flex flex-column justify-content-center gap-3  "
            >
              <span className="fs-6 ">
                <FaRegAddressCard />
              </span>
              <form
                className="d-flex flex-column gap-3 font-sm"
                onSubmit={handleUpdatUserSubmit}
              >
                {formInput.map((field, index) => (
                  <div key={index}>
                    <label className="fw-semibold">{field.label}：</label>
                    {edit ? (
                      <input
                        type="text"
                        className=" py-2 px-3 border border-secondary  rounded-5  "
                        name={field.name}
                        value={userData[field.name] || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      userData[field.name]
                    )}
                  </div>
                ))}

                {/* btns */}
                <div className="">
                  {!edit && (
                    <button
                      className="btn btn-outline-success  font-sm pb-1 py-0 rounded-5   "
                      onClick={() => setEdit(!edit)}
                    >
                      <span className="fs-5 me-1  ">
                        <AiOutlineEdit />
                      </span>
                      編輯
                    </button>
                  )}
                  {edit && (
                    <div className="d-flex flex-column  gap-3">
                      <button
                        className="btn btn-success font-sm rounded-5"
                        type="submit"
                      >
                        確認編輯
                      </button>
                      <button
                        className="btn btn-outline-secondary font-sm rounded-5"
                        onClick={() => {
                          setEdit(!edit);
                          setUserData({
                            displayName: user.displayName,
                            email: user.email,
                            photoURL: user.photoURL,
                          });
                        }}
                      >
                        取消
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        // Placeholders
        <div className="col  d-flex flex-column  justify-content-center gap-2">
          <div className="d-flex flex-column  flex-md-row align-items-center align-items-md-start   justify-content-center gap-5">
            <div
              className="card-img-top bg-secondary "
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userform;
