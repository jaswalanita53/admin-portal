import React, { useEffect } from "react";
import IDVC from "@idscan/idvc2";
import "@idscan/idvc2/dist/css/idvc.css";
import { useDispatch } from "react-redux";
import { addscanidresponse } from "../features/counter/counterSlice";



const CheckID = ({ isClose, isOpen }) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
 
      let idvc = new IDVC({
      el: "videoCapturingEl",
      licenseKey:
        "eyJwZGY0MTdrZXkiOiJ4MStkSmV1R2lNaGJBeWxIUkZUNnMrM1pnRVRDdEE4c0VUQkhoaGVWZUw1aFFkM0VpUjNHRkgzTWU3RXV4SDhvNUFDS2d1ZWUwT2RES2VhQTgwTXI0MGRtOE5VNjJweVdZMzBJcnpnaHE3Q3p3N0U3NVVKY2V1ajhIVW5seGQ0UHozVUI4U2lpQjFsd1lqS0Q2dW9ubFozd1hudTB4RlluQjF2NlI5KzNBaGs9IiwiaW1hZ2VQcm9jZXNzaW5nS2V5IjoiYWtGNWM2dCtDSXhPZUNNRy9jRFMrTzFDdGhnN1R4VzNDWnFUR2NaSGk4UG4wSGlnaE1oRjdpcmppWWhHWUY5bm9GSEs0bms0T0Z3Z1BkWExlY1RUNUhoSXVyc2tUcEtNWDBOVWZVYVpWRzFHaHhqbFJyTysrY0NacEdwVFhra0NxNEJLb0VGamd5UDViaXZYcSsvNWxHd3BrWDNrVWVlUWQybzFxODh4aFl3PSIsInRyYWNrU3RyaW5nUGFyc2VyS2V5IjoiVG52dUNJSG1qOTl0WjVMdE5KZEcwNTdibGJrdThwSlRzL1JsVUFHWUNqd3FrYXdsZEN5ZEc3NEFETmc5MUpFaWdoR0haSVFuNTNxTU5pelJXSFJ3YnNvTjZkbE5GYTd3MTRObzl4blpoUzhMSUdTV1cxUDhLUm5vR0krbUMrSVJySHRXUCt4Y25vRWdDekE2Y2E5REVFVTJSa3RtelFLaTB0cDN4YnZ0QlZVPSIsImNvbW1vbkxpY2Vuc2VLZXkiOiJwaFk2SklzSGE5Q3NXb2VyZEVKYnZQNjh3djZYc0FzcVkraUtUZWFLMzI2dlV4Q0lKMjV3NXdWR00ycGhDN3VXeFk4Wk9yZ3BFVzhQTnB1R0pPQ0Z5WGc0YkxBdTBjUUNUZC9iRzRFUzlPVDg4bU83OVNjTFI4c21FV09qMWhYVFpZM0UyQzJmUjU1U0Ryc2p3cForQUt5Ry9Gb1R0MFVxUWxOU3RxcjBhUkE9In0=",
      networkUrl: "networks",
      resizeUploadedImage: 1600,
      fixFrontOrientAfterUpload: true,
      autoContinue: true,
      isShowDocumentTypeSelect: true,
      realFaceMode: "auto",
      useCDN: true,
      language: "en",
      isShowGuidelinesButton: true,
      documentTypes: [
        {
          type: "ID",
          steps: [
            {
              type: "front",
              name: "Document Front",
              mode: { uploader: true, video: true },
            },
            {
              type: "pdf",
              name: "Document PDF417 Barcode",
              mode: { uploader: true, video: true },
            },
            {
              type: "face",
              name: "Face",
              mode: { uploader: true, video: true },
            },
          ],
        },
        {
          type: "Passport",
          steps: [
            {
              type: "mrz",
              name: "Passport Front",
              mode: { uploader: true, video: true },
            },
            {
              type: "face",
              name: "Face",
              mode: { uploader: true, video: true },
            },
          ],
        },
      ],
      onChange(data) {
         console.log("on change", data);
        // idvc.showSpinner(false);
      },
          
      onCameraError(data) {
        console.log("camera error", data);
      },
      onReset(data) {
        console.log("on reset", data);
      },
      onRetakeHook(data) {
        console.log("retake hook", data);
      },
      clickGuidlines() {
        console.log("click Guidelines");
      },
      submit(data) {
        // idvc.showSpinner(true);
        console.log("ASDSAKDG")
        let frontStep, pdfStep, faceStep, mrzStep, photoStep, barcodeStep;
        let frontImage, backImage, faceImage, photoImage, barcodeImage;
        let trackString;
        let captureMethod;
        let verifyFace = true;

        switch (data.documentType) {
          // Drivers License and Identification Card
          case 1:
            frontStep = data.steps.find((item) => item.type === "front");
            pdfStep = data.steps.find((item) => item.type === "pdf");
            faceStep = data.steps.find((item) => item.type === "face");

            frontImage = frontStep.img.split(/:image\/(jpeg|png);base64,/)[2];
            backImage = pdfStep.img.split(/:image\/(jpeg|png);base64,/)[2];
            faceImage = faceStep.img.split(/:image\/(jpeg|png);base64,/)[2];

            trackString =
              pdfStep && pdfStep.trackString ? pdfStep.trackString : "";

            captureMethod =
              JSON.stringify(+frontStep.isAuto) +
              JSON.stringify(+pdfStep.isAuto) +
              JSON.stringify(+faceStep.isAuto);

            break;
          // US and International Passports
          case 2:
            mrzStep = data.steps.find((item) => item.type === "mrz");
            faceStep = data.steps.find((item) => item.type === "face");

            frontImage = mrzStep.img.split(/:image\/(jpeg|png);base64,/)[2];
            faceImage = faceStep.img.split(/:image\/(jpeg|png);base64,/)[2];

            trackString = mrzStep && mrzStep.mrzText ? mrzStep.mrzText : "";

            captureMethod =
              JSON.stringify(+mrzStep.isAuto) +
              JSON.stringify(+faceStep.isAuto);

            break;
          // US Passport Cards
          case 3:
          // US Green Cards
          case 6:
          // International IDs with 3 line MRZs
          case 7:
            frontStep = data.steps.find((item) => item.type === "front");
            mrzStep = data.steps.find((item) => item.type === "mrz");
            faceStep = data.steps.find((item) => item.type === "face");

            frontImage = frontStep.img.split(/:image\/(jpeg|png);base64,/)[2];
            backImage = mrzStep.img.split(/:image\/(jpeg|png);base64,/)[2];
            faceImage = faceStep.img.split(/:image\/(jpeg|png);base64,/)[2];

            trackString = mrzStep && mrzStep.mrzText ? mrzStep.mrzText : "";

            captureMethod =
              JSON.stringify(+frontStep.isAuto) +
              JSON.stringify(+mrzStep.isAuto) +
              JSON.stringify(+faceStep.isAuto);

            break;
          case 8:
            photoStep = data.steps.find((item) => item.type === "photo");
            photoImage = photoStep.img.split(/:image\/(jpeg|png);base64,/)[2];
            captureMethod = JSON.stringify(+photoStep.isAuto);
            verifyFace = false;
            break;
          case 9:
            barcodeStep = data.steps.find((item) => item.type === "barcode");
            barcodeImage = barcodeStep.img.split(
              /:image\/(jpeg|png);base64,/
            )[2];
            captureMethod = JSON.stringify(+barcodeStep.isAuto);
            verifyFace = false;
            break;
          default:
        }

        let request = {
          frontImageBase64: frontImage,
          backOrSecondImageBase64: backImage,
          faceImageBase64: faceImage,
          documentType: data.documentType,
          trackString: trackString,
          ssn: null,
          overriddenSettings: null,
          userAgent: window.navigator.userAgent,
          captureMethod: captureMethod,
          verifyFace: verifyFace,
        };

        fetch("https://dvs2.idware.net/api/v3/Verify", {
          method: "POST",
          headers: {
            Authorization: "Bearer sk_64ea58c2-c41d-4c67-8e8c-fbe9929a5cbf",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(request),
        })
          .then((response) => response.json())
          .then((data) => {
            // idvc.showSpinner(false);
              console.log(data);
              dispatch(addscanidresponse(JSON.stringify(data)));
              alert(data?.documentVerificationResult?.statusString);
          })
          .catch((err) => {
            // idvc.showSpinner(false);
            console.log("asdsadsasdsa1111212")
            console.log(err);
          });
      },
    });
         
    
  }, [isClose, isOpen]);

  return (
    <div>
      <div id="videoCapturingEl"></div>
    </div>
  );
};

export default CheckID;
