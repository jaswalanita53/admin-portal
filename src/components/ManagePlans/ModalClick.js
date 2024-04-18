import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Button, Box, Text, Card, CardBody } from '@chakra-ui/react'
import { BsImage } from "react-icons/bs";
import { FaUpload } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa"

export const ModalClick = ({ onOpen2, onClose2, isOpen2, setImageUrl, imageUrl, setIsSave, isSave }) => {

    const [fileSize, setFileSize] = useState(null);
    const [fileName, setFileName] = useState('')
    const [isDoneButtonClick, setIsDoneButtonClick] = useState(false)
    const finalRef = React.useRef(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
    const handleImage = (e) => {
        const selectedImage = e.target.files[0]
        console.log("@@@", selectedImage)
        setFileSize((selectedImage.size / (1024 * 1024)).toFixed(2));
        const imageUrl = URL.createObjectURL(selectedImage)
        setImageUrl(imageUrl)
        setFileName(selectedImage.name)
    }

    const handleImageLoad = (event) => {
        const img = event.target;
        setDimensions({ width: img.width, height: img.height });
    };

    console.log("isDoneButtonClicked", isDoneButtonClick)

    const shortenedName = (name) => {
        if (name === "") return '';
        return name.substring(0, 20) + '...';
    }

    const handleUploadImage = () => {
        onOpen2();
        setImageUrl(null);
        setFileName('')
        setFileSize(null)
        setIsDoneButtonClick(false)
    }

    return <>
        <Box mt={4} onClick={handleUploadImage} style={uploadImageDiv} cursor="pointer">
            <BsImage fontSize={20} />
            <Text style={uploadImage}>Upload Image</Text>
        </Box>
        <Modal finalFocusRef={finalRef} isOpen={isOpen2} onClose={onClose2}>
            <ModalOverlay />
            <ModalContent style={{ maxWidth: "960px" }}>
                <ModalHeader className="border-b" textTransform='uppercase'><h4>Upload Photos</h4></ModalHeader>
                <ModalCloseButton />
                {isDoneButtonClick ? <Text fontSize='sm' className="border-b px-6 py-1 " cursor='default' > You can edit the image size and image name by hovering over it and selecting edit image.</Text>
                    : <Text fontSize='sm' className="border-b px-6 py-1 " cursor='default' > Upload your files by either clicking or dragging files into the section below.</Text>}
                <ModalBody>
                    <label htmlFor="file">
                        <Card height={!isDoneButtonClick ? '360px' : "200px"} style={{ border: "1px solid rgba(0, 0, 0, 0.03)", borderRadius: "3px", background: "#F7F7F7", padding: "23px", boxShadow: "none" }} cursor="pointer" >
                            <CardBody className="" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px", background: "F7F7F7", }}  >
                                {!imageUrl &&
                                    <>
                                        <Text color={'black'} textAlign="center" lineHeight="1.2" fontSize='2xl' width="70%" >Drag and Drop files here to upload</Text>
                                        <Text color={'black'} textAlign="center" lineHeight="1.2" width="70%" > (or click to browse hard drive)</Text>
                                        <FaUpload fontSize="40" />
                                    </>
                                }

                                <input type="file" id="file" style={{ "display": "none" }} onChange={handleImage} />

                            </CardBody>
                        </Card>
                    </label>
                    {!isDoneButtonClick ? <Box position="relative" >
                        {imageUrl &&
                            <Box position="absolute" left="10" zIndex="10" bottom='0' style={customBox}>
                                <FaCheck style={customCheckIcon} />
                                <Box height="100px" maxWidth="200px" overflowY="hidden">
                                    <img src={imageUrl} alt="sample_image" style={{ width: "100%", height: "100%", objectFit: "cover" }} onLoad={handleImageLoad} />
                                </Box>
                                {fileSize && <Text fontWeight="700" fontSize="14px" color="black">{fileSize} MB</Text>}
                                {dimensions && <Text fontWeight="700" fontSize="14px" color="black">{dimensions.width + "*" + dimensions.height} px</Text>}
                                <Text onClick={() => setImageUrl(null)} textAlign="center" cursor="pointer" fontSize="14px">REMOVE FILE</Text>
                            </Box>
                        }
                    </Box> :
                        <Box position="relative" >
                            <Box position="absolute" left="10" zIndex="10" bottom='0'
                                style={customBox1} width="250px" border="0" height="100px">
                                {imageUrl &&
                                    <img src={imageUrl} alt="sample_image" style={{ width: "100%", height: "100%", objectFit: "cover" }} onLoad={handleImageLoad} />
                                }
                                <Text fontSize="xs">{shortenedName(fileName)}</Text>
                            </Box>
                        </Box>
                    }
                </ModalBody>
                {
                    isDoneButtonClick ?
                        <ModalFooter borderTop="1px solid rgba(0, 0, 0, 0.03)">
                            <Button color="#ffff" borderRadius={"50px"} mr={3} 
                            onClick={()=>{
                                onClose2();
                                setIsSave(true);
                            }} 
                            colorScheme='messenger' textTransform="uppercase"
                                fontWeight="400">
                                <FaCheck style={iconFav} />
                                Save and Continue
                            </Button>
                            <Button colorScheme='gray' color="black" borderRadius={"50px"} mr={3} onClick={onClose2} fontWeight="400">
                                <ImCross style={iconFav} />
                                CANCEL
                            </Button>
                        </ModalFooter>
                        :
                        <ModalFooter borderTop="1px solid rgba(0, 0, 0, 0.03)">
                            {imageUrl ?
                                <Button colorScheme='blue' color="#ffff" borderRadius={"50px"} mr={3} onClick={() => setIsDoneButtonClick(true)}>
                                    <FaCheck style={iconFav} />
                                    DONE
                                </Button>
                                :
                                <>
                                    <Button colorScheme='gray' color="black" borderRadius={"50px"} mr={3} onClick={onClose2} >
                                        <ImCross style={iconFav} />
                                        CANCEL
                                    </Button>
                                </>
                            }

                        </ModalFooter>
                }

            </ModalContent>
        </Modal >
    </>
}


const customBox = {
    position: "absolute",
    zIndex: 10,
    bottom: "80px",
    left: "25px",
    width: "110px",
    padding: "7px",
    boxShadow: "0 0 0 1.5px rgba(0, 0, 0, 0.2)",
    gap: "7px",
    display: "flex",
    flexDirection: "column"
}
const customBox1 = {
    ...customBox,
    width: "150px",
    bottom: "40px",
    boxShadow: "0 0 0 0 "
}

const uploadImageDiv = {
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    padding: "30px 15px",
    margin: "15px 0",
    gap: "2px",
    borderRadius: "2px"
}


const uploadImage = {
    width: "80px",
    textAlign: "center",
    fontSize: "15px",
    color: "rgb(74,119,254)",
    fontWeight: "600",
    lineHeight: "1"
}
const customCheckIcon = {
    position: "absolute",
    right: "5px",
    fontSize: "32px",
    borderRadius: "100%",
    backgroundColor: "#fff",
    margin: "-15px",
    padding: "3px",
    color: "yellowgreen"
}
const iconFav = {
    marginRight: "5px"
}

