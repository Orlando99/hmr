import React from 'react';
import {Route, Switch} from 'react-router';
import Home from './Home/Home';
import NavBar from '../common/components/NavBar';
import SelectRoarType from './CreateRoar/StepOne/components/SelectRoarType';
import VisibleSentPostcards from './CreateRoar/StepOne/containers/VisibleSentPostcards';
import Footer from '../common/components/Footer';
import VisibleArtworkList from './CreateRoar/StepOne/containers/VisibleArtworkList';
import SentPostcardDetailContainer from './CreateRoar/StepOne/containers/SentPostcardDetailContainer';
import DetailArtwork from './CreateRoar/StepOne/containers/DetailArtwork';
import CreatePostCardMessage from './CreateRoar/StepTwo/components/CreatePostCardMessage/CreatePostCardMessage';
import CreateRoarContainer from './CreateRoar/CreateRoarContainer';
import CreatePostCardBackground from './CreateRoar/StepTwo/components/Archive/CreatePostCardBackground';
import WallOfRoarContainer from './WallOfRoar/WallOfRoarContainer';
import MyRoars from './Profile/components/MyRoars';
import MobileMenu from '../common/components/MobileMenu';
import FAQ from './static/FAQ';
import TCS from './static/TCS';
import PrivacyPolicy from './static/PrivacyPolicy';
import About from './static/About';
import Contact from './static/Contact';
const routes = (
  <div>
    <NavBar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/mobileNav" component={MobileMenu}/>
      <Route       path="/mobileNav/:url" component={MobileMenu}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/faq" component={FAQ}/>
      <Route exact path="/tcs" component={TCS}/>
      <Route exact path="/profile" component={MyRoars}/>
      <Route exact path="/contact" component={Contact}/>
      <Route exact path="/privacypolicy" component={PrivacyPolicy}/>
      <Route exact path="/select-roar-type" component={SelectRoarType}/>
      <Route exact path="/wall-of-cards" component={WallOfRoarContainer}/>
      <Route exact path="/create/sent" component={VisibleSentPostcards}/>
      <Route exact path="/create/artwork" component={VisibleArtworkList}/>
      <Route       path="/create/sent/:id" component={SentPostcardDetailContainer}/>
      <Route       path="/create/artwork/:id" component={DetailArtwork}/>
      <Route exact path="/create-roar" component={CreateRoarContainer}/>
      <Route exact path="/create/message" component={CreatePostCardMessage}/>
      <Route exact path="/create/background" component={CreatePostCardBackground} />
    </Switch>
    <Footer/>
  </div>
);

export default routes;
