import React from 'react'


export class Logo extends React.Component {
    render() {
        return (
            <React.Fragment>
                <a href="/" style={LogoStyle}>
                    <div style={LogoElemStyle}>
                        <img
                            src="\logo.png"
                            alt="AlteredSoundLogo"
                            style={LogoImgStyle}
                        />
                    </div>
                    <div style={Object.assign({}, LogoElemStyle, { margin: '0 0 5px 10px' })}>
                        <div style={{ margin: '0' }}>
                            <p style={{
                                fontFamily: 'oswald',
                                fontSize: '40px',
                                color: '#F1578F'
                            }}>ALTERED</p>

                        </div>
                        <div style={{ margin: '0 5px 0 5px' }}>
                            <p style={{
                                fontFamily: 'arial',
                                fontSize: '50px',
                                color: 'white'
                            }}>|</p>

                        </div>
                        <div style={{ margin: '0' }}>
                            <p style={{
                                fontFamily: 'oswald',
                                fontSize: '40px',
                                color: '#57D6F1'
                            }}>SOUND</p>

                        </div>
                    </div>
                </a>
            </React.Fragment>
        )
    }
}

const LogoStyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: 'center',
    textDecoration: 'none'
}

const LogoElemStyle = {
    display: "flex",
    margin: "0 0 0 20px",
    justifyContent: "flex-start",
    alignItems: 'center'

}

const LogoImgStyle = {
    width: "70px",
    height: "64px"
}