import React, { Component } from 'react';
import _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import { categoriesData } from '../../../api/collections';
import SignupDetails from '../signup/signupDetails';
import ChooseAccount from '../signup/chooseAccount';
import PersonalRelationship from '../signup/personalRelationship';
import Roles from '../signup/roles';
import AccountInfo from '../signup/accountInfo';
import Privacy from '../signup/privacy';

// App component - represents the whole registration app
class SignUp extends Component {
  state = {
    step: 1,
    city: '',
    state: '',
    email: '',
    account: '',
    roles: '',
    fullname: '',
    username: '',
    password: '',
    gender: '',
    dobmonth: 0,
    dobday: 0,
    dobyear: 0,
    relationship: '',
    relationshipselect: '',
    birthdayselect: '',
    userselect: '',
    roleError: ''
  }

  handleChange = (e) => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value })
  }

  handleAccountSelect = (acct) => {
    let { step, city, state, email, account, roles, fullname, username, password, gender, dobmonth, dobday, dobyear,
      relationship, relationshipselect, birthdayselect, userselect } = this.state;

    account = acct;

    const cdata = {
      step, city, state, email, account, roles, fullname, username, password, gender, dobmonth, dobday, dobyear,
      relationship, relationshipselect, birthdayselect, userselect
    };

    const self = this;

    Meteor.call('profileUpdate', cdata, (error) => {
      if (error) {
        alert(`profileUpdate call error - ${error}`);
      }
      else {
        self.setState({ step: step + 1, account });
      }
    });
  }

  handleRoleSelect = (role) => {
    let roles = [...this.state.roles];

    let checkRole = roles.filter(item => item === role);

    if (checkRole[0]) {
      roles = roles.filter(item => item !== role)
      this.setState({ roles, roleError: false });
    }
    else {
      if (roles.length < 3) {
        roles = [...roles, role];
        this.setState({ roles, roleError: false });
      }
      else {
        this.setState({ roleError: true })
      }
    }
  }

  // handleFileChange = (e) => {
  //   let selectedImage = e.target.files[0];
  //   this.setState({ selectedImage });
  // }

  // handleFileUpload = () => {
  //   console.log('Image uploaded');
  //call backen API here to upload the image
  // let fd = new FormData();
  // fd.append('image', this.state.selectedImage, this.state.selectedImage.name);
  // axios.post('backend-url', fd)
  //     .then(res => console.log(res));
  // }

  handleGoBackToAccount = () => {
    this.setState({
      step: 2,
      account: '',
      roles: '',
      fullname: '',
      username: '',
      password: '',
      gender: '',
      dobmonth: 0,
      dobday: 0,
      dobyear: 0,
      relationship: '',
      relationshipselect: '',
      birthdayselect: '',
      userselect: ''
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { step, city, state, email, account, roles, fullname, username, password, gender, dobmonth, dobday, dobyear,
      relationship, relationshipselect, birthdayselect, userselect } = this.state;
    let cdata = {
      step, city, state, email, account, roles, fullname, username, password, gender, dobmonth, dobday, dobyear,
      relationship, relationshipselect, birthdayselect, userselect
    };
    const tempPassword = 'TempP@ssw0rd';

    const self = this;

    if (step === 1 || step === 4) {
      if (step === 1) {
        cdata.password = tempPassword;
        Meteor.call('createUserNotValidated', cdata, function (error, res) {
          if (error) {
            alert(`createUserNotValidated error - ${error}`);
          }
          else {
            Meteor.loginWithPassword(email, tempPassword, function (error) {
              if (error) {
                alert(`loginWithPassword error - ${error.message}`);
              }
              else {
                self.setState({ password: tempPassword, step: step + 1 });
              }
            })
          }
        });
      }
      else {
        Accounts.changePassword(tempPassword, cdata.password, (error) => {
          if (error) {
            console.log('profilePasswordChange error - ', error)
          }
          else {
            Meteor.call('profileUpdate', cdata, (error) => {
              if (error) {
                alert(`profileUpdate call error - ${error}`);
              }
              else {
                self.setState({ step: step + 1 });
              }
            });
          }
        })
      };
    }
    else {
      Meteor.call('profileUpdate', cdata, (error) => {
        if (error) {
          alert(`profileUpdate call error - ${error}`);
        }
        else {
          if (step === 5) {
            self.setState({ step: step + 1 },
              () => self.props.history.push('/account'));
          }
          else {
            self.setState({ step: step + 1 });
          }
        }
      });
    };
  }

  validateParams = () => {
    let step = 1;
    const { city, state, email } = this.props.match.params;
    const tempPassword = 'TempP@ssw0rd';
    const password = tempPassword;
    let cdata = { step, city, state, email, password };
    const self = this;

    if (city || state || email) {
      Meteor.call('createUserNotValidated', cdata, function (error, res) {
        if (error) {
          alert(`validateParams createUserNotValidated error - ${error}`);
        }
        else {
          Meteor.loginWithPassword(email, password, function (error) {
            if (error) {
              alert(`loginWithPassword error - ${error.message}`);
            }
            else {
              self.setState({ step: step + 1, city, state, email, password }, () => {
                self.props.history.replace('/login/signup');
              })
            }
          })
        }
      });
    }
  }

  render() {
    if (!this.props.loaded) {
      return (
        <div>Loading...</div>
      );
    }

    if (this.state.step === 1) {
      this.validateParams();
    }

    const categories = this.props.data[0];

    switch (this.state.step) {
      case 1:
        return (<SignupDetails categories={categories} state={this.state} onChange={this.handleChange} onSubmit={this.handleSubmit} />);
      case 2:
        return (<ChooseAccount categories={categories} onSelect={this.handleAccountSelect} />);
      case 3:
        if (this.state.account === 'Personal')
          return (<PersonalRelationship categories={categories} state={this.state} onChange={this.handleChange} onSubmit={this.handleSubmit} onGoBackToAccount={this.handleGoBackToAccount} />);
        return (<Roles categories={categories} state={this.state} onSelect={this.handleRoleSelect} onSubmit={this.handleSubmit} />);
      case 4:
        return (<AccountInfo state={this.state} onChange={this.handleChange} onFileChange={this.handleFileChange} onFileUpload={this.handleFileUpload} onSubmit={this.handleSubmit} />);
      case 5:
        return (<Privacy categories={categories} state={this.state} onChange={this.handleChange} onSubmit={this.handleSubmit} />);
      default:
        return null;
    }
  }
}

export default withTracker(() => {
  let handleResponse = Meteor.subscribe('Categories.getAll');
  let result = handleResponse.ready() ? categoriesData.find().fetch() : "";
  return {
    data: result ? result : {},
    loaded: handleResponse.ready()
  };
})(SignUp);