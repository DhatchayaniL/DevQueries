import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../actions/users'

const EditProfileForm = ({ currentUser, setSwitch }) => {

    const [name, setName] = useState(currentUser?.result?.name)
    const [about, setAbout] = useState(currentUser?.result?.about)
    const [tags, setTags] = useState([])
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const dispatch = useDispatch()
    console.log(tags)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(tags[0]==='' || tags.length===0){
            alert("Update tags field")
        } else{
            dispatch(updateProfile( currentUser?.result?._id, { name, about, tags }))
        }
        setSwitch(false)
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setProfileImage(file); 
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      };

      const handleCancelImage = () => {
        setProfileImage(null);
        setImagePreview(null);
      };

    return (
        <div>
            <h1 className='edit-profile-title'>
                Edit Your Profile
            </h1>
            <h2 className="edit-profile-title-2">
                Public information
            </h2>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <h3>Display name</h3>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label htmlFor="about">
                    <h3>About me</h3>
                    <textarea id="about" cols="30" rows="10" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                </label>
                <label htmlFor="tags">
                    <h3>Watched tags</h3>
                    <p>Add tags separated by 1 space</p>
                    <input type="text" id='tags' onChange={(e) => setTags(e.target.value.split(' '))}/>
                </label>
                <label htmlFor="profile-image">
          <h3>Profile Image</h3>
          {profileImage ? (
            <>
          {imagePreview ? (
            <>
            <img src={imagePreview} alt="Profile" style={{ maxWidth: "200px", marginTop: "10px" }} />
            <button type="button" className="cancel-image-button" onClick={handleCancelImage}>
                    Cancel Image
                  </button>
                  </>):(<p>Loading image preview...</p>)}
                  </>):(
                  <>
                  <input 
                  type="file"
                id="ask-ques-image"
                accept="image/*"
                onChange={handleImageUpload}
                className="image-input"/>
                <p className="image-input-label">Accepted formats: JPEG, PNG, GIF. Max file size: 10MB.</p>
            </>
          )}
        </label>
        <br />
                <input type="submit" value='Save profile' className='user-submit-btn'/>
                <button type='button' className='user-cancel-btn' onClick={() => setSwitch(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default EditProfileForm