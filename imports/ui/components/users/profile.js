import React, {useContext} from 'react';
import { NavLink} from 'react-router-dom';
import { AppContext } from '/imports/api/contexts/contexts';

export default Profile = (props)=>{

    const userLogout =() =>{
        Meteor.logout();
        props.history.replace('/auth/signin');
    }

    const context = useContext(AppContext);
    const currentUser = context.currentUser;

      if(!currentUser){
        return null;
      }
      let userData = currentUser;
      let firstName = (userData && userData.profile && userData.profile.fname)? userData.profile.fname:"Guest";
      let profileUrl = (userData && userData.profile && userData.profile.profileUrl)? userData.profile.profileUrl:"https://us.123rf.com/450wm/pikepicture/pikepicture1612/pikepicture161200524/68824656-male-default-placeholder-avatar-profile-gray-picture-isolated-on-white-background-for-your-design-ve.jpg?ver=6";

      return(
        <div className="card" style={{"width": "18rem"}}>
          <img className="card-img-top" src={profileUrl} alt=""/>
          <div className="card-body">
            <h5 className="card-title">{firstName}</h5>
            <p className="card-text"></p>
            <NavLink className="dropdown-item" to="/account/profile" activeClassName="nav-link">view and edit profile</NavLink>
            <NavLink className="dropdown-item" to="#" onClick={()=>userLogout()}>Log Out</NavLink>
          </div>
      </div>
      );
}