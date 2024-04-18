import ReactCrop from 'react-image-crop'
import React from 'react';
// import src from "../assets/images/birds-8416209_1280.jpg"
function CropImage1({ src }) {
  const [crop, setCrop] = React.useState()
  return (
    <ReactCrop crop={crop} onChange={c => setCrop(c)}>
      {/* <img src={src} /> */}
    </ReactCrop>
  )
}

export default CropImage1;