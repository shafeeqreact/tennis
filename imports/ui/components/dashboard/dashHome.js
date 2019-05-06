import React, { useContext } from 'react';
import { AppContext } from '/imports/api/contexts/contexts';
//import  CoursesContainer  from '/imports/api/containers/getCourses';
//import Test from '/imports/ui/components/dashboard/test';
//import '/imports/ui/stylesheets/dashboard/dashHome.scss';

export default DashHome = (props) => {
  const context = useContext(AppContext);
  let userData = context.currentUser;
  let firstName = (userData && userData.profile && userData.profile.fname) ? userData.profile.fname : "Guest";
  let profileUrl = (userData && userData.profile && userData.profile.profileUrl) ? userData.profile.profileUrl : "https://us.123rf.com/450wm/pikepicture/pikepicture1612/pikepicture161200524/68824656-male-default-placeholder-avatar-profile-gray-picture-isolated-on-white-background-for-your-design-ve.jpg?ver=6";
  return (
    <div>
      <div className="columns is-centered">
        <div className="column is-12">
          <div className="dash-header">
            <div className="level">
              <div className="level-left">
                <div className="profile-header">
                  <div className="profile-image">
                    <div className="profile-image__src">
                      <img src={profileUrl} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="dash-stats">
                <p className="is-size-4 has-text-white">{firstName}</p>
              </div>
              <div className="dash-stats">
                <p className="is-size-4 has-text-white">Any Information</p>
                <p className="is-size-6 has-text-white">link</p>
              </div>
              <div className="dash-stats">
                <p className="is-size-4 has-text-white">0</p>
                <p className="is-size-6 has-text-white">Info</p>
              </div>
              <div className="dash-stats">
                <button onClick={() => { Meteor.logout(() => { props.history.push('/') }) }}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section container">
        <div className="columns">

          <div className="column is-12">
            {/*<CoursesContainer component={Test} domainName={hostName}/>*/}
          </div>
        </div>
      </section>
    </div>
  );
}