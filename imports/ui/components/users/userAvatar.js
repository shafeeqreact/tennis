import React from 'react';
import PropTypes from 'prop-types';

const UserAvatar = (props) =>{

    let userData = props.userData;
    if(!userData){
        return null;
    }
    const sizes = {
        small: "20px",
        medium: "30px",
        large: "50px",
        extralarge: "150px"
    }
    const imgStyle = {
        borderRadius: "100%",
        display: "inline-block",
        margin: '0',
        height: sizes[props.size],
        width: sizes[props.size]
    };
    let profileImage = userData.profile && userData.profile.avatarUrl;
    let firstLetter = "@";
    let avatarImage = profileImage?<img style={imgStyle} src={profileImage}/>:"";
    if(avatarImage == ""){
        let fname = userData.profile.fname;
        let lname = userData.profile.lname;
        let displayName = userData.profile.displayName;
        if(displayName){
            firstLetter = displayName.charAt(0).toUpperCase();
        }else if(fname){
            firstLetter = fname.charAt(0).toUpperCase();
        }else if(lname){
            firstLetter = lname.charAt(0).toUpperCase();
        }
        avatarImage = firstLetter;
    }
    return(
        <span>{avatarImage}</span>
    );
}
UserAvatar.propTypes = {
    userData: PropTypes.object.isRequired,
    size: PropTypes.string
}
  
UserAvatar.defaultProps = {
  size: "medium"
}
export default UserAvatar;