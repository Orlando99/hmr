import React from 'react';
// import domtoimage from 'dom-to-image-chrome-fix';
// const filter = (node) => {
//   console.log('node is', node);
//   return (node.tagName !== 'i');
// };

export default class SocialPart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      roarFront: '#'
    };
  }

  componentDidMount() {
    // const node = document.getElementById('hmr-roar-preview-frontside');
    // domtoimage.toPng(node)
    //   .then((dataUrl) => {
    //     // const img = new Image();
    //     if(dataUrl) {
    //       this.setState({
    //         roarFront: dataUrl
    //       });
    //     }
    //   })
    //   .catch(function (error) {
    //     console.error('oops, something went wrong!', error);
    //   });
  }

  render() {
    const {
      cardFrontUrl
    } = this.props;
    return (
      <div className="socialPart">
        <div className="content">
          <div className="leftpart">
            <h1 className="title">IMPORTANT</h1>
          </div>
          <div className="rightpart">
            <p>Don't forget to download your card now, and then share.</p>
            <ul>
              <li>
                <a target='_blank' rel='noopener noreferrer' href={`https://www.facebook.com/sharer/sharer.php?u=https://hearmyroarnow.org`}>
                  <div className="yellowbutton"><i className="fab fa-facebook-f round"></i><span className="facebook">Facebook</span></div>
                </a>
              </li>
              <li>
                <a target='_blank' rel='noopener noreferrer' href={`https://twitter.com/intent/tweet?text=%27&via=hearmyroarnow&url=https://hearmyroarnow.org`}>
                  <div className="yellowbutton"><i className="fab fa-twitter round"></i><span>Twitter</span></div>
                </a>
              </li>
              <li>
                <a href='mailto:yourfriend@gmail.com'>
                  <div className="yellowbutton"><i className="fas fa-at"></i><span>Email</span></div>
                </a>
              </li>
              <li>
                <a href={cardFrontUrl || ''} download='roar-front.png'><div className="yellowbutton"><i className="fas fa-cloud-download-alt"></i><span className="download">Download</span></div></a>
              </li>
            </ul>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    );
  }
}
