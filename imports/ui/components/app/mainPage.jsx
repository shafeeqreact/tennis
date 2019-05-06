import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { categoriesData } from '../../../api/collections';
import SignInModal from './initialPage/signInModal';
import MainNavBar from './initialPage/mainNavBar';
import LanguageDropdown from './initialPage/languageDropdown';
import Carousal from './initialPage/carousal';
import MainSignUp from './initialPage/mainSignUp';
import YourCity from './initialPage/yourCity';
import About from './initialPage/about';
import FeaturesVideo from './initialPage/featuresVideo';
import FAQ from './initialPage/faq';
import Features from './initialPage/features';
import JoinToday from './initialPage/joinToday';
import Footer from './initialPage/footer';

class MainPage extends Component {
    state = {
        modalOpen: false,
        signupOpen: false,
        loginOpen: false,
        resetOpen: false,
        city: '',
        state: '',
        email: '',
        cityError: false,
        stateError: false,
        emailError: false
    }

    handleNavbarClick = (e) => {
        let modalOpen = true;

        let signupOpen = false;
        let loginOpen = false;
        if (e.currentTarget.id === 'signup') signupOpen = true;
        if (e.currentTarget.id === 'login') loginOpen = true;

        this.setState({ modalOpen, signupOpen, loginOpen });
    }

    handleModalClick = (e) => {
        let modalOpen = true;
        let signupOpen = false;
        let loginOpen = false;
        let resetOpen = false;

        switch (e.currentTarget.id) {
            case 'close': { modalOpen = false; break; }
            case 'signup': { signupOpen = true; break; }
            case 'login': { loginOpen = true; break; }
            case 'reset': { resetOpen = true; break; }
            default: null;
        }

        this.setState({ modalOpen, signupOpen, loginOpen, resetOpen });
    }

    handleChange = (e) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { city, state, email } = this.state;

        let { cityError, stateError, emailError } = false;
        if (city === '' || state === '' || email === '') {
            if (city === '') cityError = true;
            if (state === '') stateError = true;
            if (email === '') emailError = true;
            this.setState({ cityError, stateError, emailError });
        }
        else {
            this.props.history.push(`/login/signup/${city}/${state}/${email}`);
        }
    }

    render() {
        let statesList = (!this.props.loaded) ? [] : this.props.data[0].statesList;

        let { modalOpen, signupOpen, loginOpen, resetOpen, city, state, email, cityError, stateError, emailError } = this.state;
        let modalState = { modalOpen, signupOpen, loginOpen, resetOpen };
        let data = { city, state, email, cityError, stateError, emailError };

        return (
            <React.Fragment>
                <SignInModal modalState={modalState} onClick={this.handleModalClick} statesList={statesList} data={data} onChange={this.handleChange} onSubmit={this.handleSubmit} />
                <MainNavBar onClick={this.handleNavbarClick} />
                <LanguageDropdown />
                <div id="home" className="position-relative">
                    <Carousal />
                    <MainSignUp statesList={statesList} data={data} onChange={this.handleChange} onSubmit={this.handleSubmit} />
                    <YourCity />
                </div>
                <About />
                <FeaturesVideo />
                <FAQ />
                <Features />
                <JoinToday />
                <Footer />
            </React.Fragment>
        );
    }
}

export default withTracker(() => {
    let handleResponse = Meteor.subscribe('Categories.getAll');
    let result = handleResponse.ready() ? categoriesData.find().fetch() : "";
    return {
        data: result ? result : {},
        loaded: handleResponse.ready()
    };
})(MainPage);