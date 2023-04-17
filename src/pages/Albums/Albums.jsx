import { Button, Divider, Image, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAlbum, getAlbums } from "../../reducers/Albums";
import { axiosRequest } from "../../utils/axiosRequest";
import { fileToBase64 } from "../../utils/fileToBase64";

const Albums = () => {
  const [showModal,setShowModal] = useState(false)
  const [picture,setPicture] = useState('')
  const albums = useSelector(state=>state.albums.album)
  const dispatch = useDispatch();

  // const addAlbum = async () => {
  //   try {
  //     const { data } = await axiosRequest.post("albums", {
  //       img: picture,
  //     });
  //   } catch (error) {}
  // };
  useEffect(() => {
    dispatch(getAlbums())
  }, []);
  return (
    <div>
      <div>
        <div>
        <h1 className="text-4xl font-bold text-center">Albums</h1>
          <Divider/>
          <Button className="my-2 bg-blue-600" type="primary" onClick={()=>setShowModal(!showModal)}>add</Button>
          <Divider/>
        <Image.PreviewGroup
    preview={{
      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
    }}
  >
    {albums.map(album =><Image width={200} src={album.link} />)}
  </Image.PreviewGroup>
        </div>
      </div>
<Modal title="Add todo" footer={false} open={showModal} onCancel={()=>setShowModal(!showModal)}>
        <input type={"file"} onChange={async (e) => {
          let file = await fileToBase64(e.target.files[0]);
          console.log(file);
          setPicture(file);
        }} />
        <Button className="my-2 bg-blue-600" type="primary" onClick={()=>{dispatch(addAlbum(picture))
        setPicture('')
        setShowModal(false)}}>add</Button>
      </Modal>
    </div>
  );
};

export default Albums;
