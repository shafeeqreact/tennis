import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from '/imports/ui/components/login/signIn';
import SignUp from '/imports/ui/components/login/signUp';
import ResetPassword from '/imports/ui/components/users/resetPassword';
import VerifyEmail from '/imports/ui/components/users/verifyEmail';
import ForgotPassword from '/imports/ui/components/users/forgotPassword';

export const LoginRoutes = () => {
  return (
    <Switch>
      <Route path="/login" exact component={SignIn} />
      <Route path="/login/signin" component={SignIn} />
      <Route path="/login/signup" exact component={SignUp} />
      <Route path="/login/signup/:city/:state/:email" component={SignUp} />
      <Route path="/login/reset-password/:token" component={ResetPassword} />
      <Route path="/login/verify-email/:token" component={VerifyEmail} />
      <Route path="/login/emailValidate" component={VerifyEmail} />
      <Route path="/login/forgot" component={ForgotPassword} />
      <Route component={SignUp} />
    </Switch>
  );
}
