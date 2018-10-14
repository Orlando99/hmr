import React from 'react';
// import _ from 'lodash';
import NavBar from '../../../../common/components/NavBar';
import Banner from '../../../../assets/images/slide2.png';
import BreadCrumb from '../../../../common/components/BreadCrumb';
import ArtworkViewCarousel from '../../../../common/components/carousel/ArtworkViewCarousel';
import ArtworkList from '../../../../common/components/ArtworkList';

export default class ArtworkView extends React.Component {
  componentDidMount() {
    this.props.fetchArtwork();
  }

  handleBackBtn = () => {
    window.location.href = '/select-roar-type';
  };

  render() {
    const {
      artwork,
      saveArtworkToRoar,
      history,
      resetRoarFlow
    } = this.props;
    return (
      <div className="createRoarPage artworkview">
        <NavBar/>
        <div className="banner">
          <div className="content">
            <h1>
              <p>SELECT ARTWORK FOR THE FRONT OF YOUR CARD CREATED BY ARTISTS THEMSELVES TOUCHED BY THE OPIOID EPIDEMIC</p>
            </h1>
          </div>
          <img src={Banner} alt="Banner"/>
        </div>
        <div className="content_container">
          <BreadCrumb
            step={0}
            navigateBack={this.handleBackBtn}
            resetRoarFlow={resetRoarFlow}
            stepOneCopy='Select Art'
          />
          <div className="content">
            <ArtworkViewCarousel
              artwork={artwork}
              saveArtworkToRoar={saveArtworkToRoar}
              history={history}
            />
            <ArtworkList
              artwork={artwork}
              saveArtworkToRoar={saveArtworkToRoar}
              history={history}
            />
          </div>
        </div>
      </div>
    );
  }
}
