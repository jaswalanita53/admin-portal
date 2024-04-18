import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Flex } from "@chakra-ui/react";
import { FaQuestionCircle } from 'react-icons/fa';
import "./Ckedittor.module.css"

const Ckeditor = ({ info }) => {
    const [editorData, setEditorData] = useState('');
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    return (
        <div>
            <Flex alignItems="center" gap="1.5" fontSize="12px" > <FaQuestionCircle style={infoIconText} />{info}</Flex>

            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleEditorChange}
            />

        </div>
    );
}

export default Ckeditor
const infoIconText = {
    color: '#000000',
    fontSize: "10px"
}