import React, {useRef} from 'react'
import {IoIosChatboxes} from 'react-icons/io';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import {useDispatch, useSelector} from 'react-redux';
import firebase from '../../../firebase';
import mime from 'mime-types';
import {setPhotoURL} from '../../../redux/actions/user_action';
function UserPanel() {
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const inputOpenImageRef = useRef();

    const handleLogout = () =>{
        firebase.auth().signOut();
    }
    
    const handleOpenImageRef = () =>{
        inputOpenImageRef.current.click();
    }

    const handleUploadImage =  async(event) =>{
        const file = event.target.files[0];
        const metadata = {contentType:mime.lookup(file.name)};
        try {
         //스토리지에 파일 저장하기
         let uploadTaskSnapshot = await firebase.storage().ref()
            .child(`user_image/${user.uid}`)
            .put(file,metadata);
        let downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

        //프로필 이미지 수정
        await firebase.auth().currentUser.updateProfile({
            photoURL:downloadURL
        })

        //리덕스 스토어 변경
        dispatch(setPhotoURL(downloadURL)); 

        //데이터베이스 유저이미지 수정
        await firebase.database().ref("users")
            .child(user.uid)
            .update({image:downloadURL});


            console.log('uploadTaskSnapshot',uploadTaskSnapshot);
        } catch (error) {
            alert(error);
        }

    }

    return (
        <div>
            {/* Logo */}
            <h3 style={{color:'white'}}>
            <IoIosChatboxes/>{" "} Red Chat App
            </h3>

            <div style={{display:'flex',marginBottom:'1rem'}}>
                <Image src={user && user.photoURL} 
                style={{width:'30px',height:'30px',marginTop:'3px'}}
                roundedCircle />

            <input 
                type="file" 
                style={{display:'none'}}
                ref={inputOpenImageRef}
                accept="image/jpeg, image/png"
                onChange={handleUploadImage}
            />
                <Dropdown>
                    <Dropdown.Toggle  
                        style={{background:'transparent',boder:'0px'}} //투명
                        id="dropdown-basic">
                        {user && user.displayName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick ={handleOpenImageRef}>
                            프로필사진 변경
                        </Dropdown.Item>
                        <Dropdown.Item onClick ={handleLogout}>
                            로그아웃
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default UserPanel
