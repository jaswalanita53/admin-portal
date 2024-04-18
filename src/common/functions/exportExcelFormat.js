import * as React from 'react';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import { Text, Tooltip } from '@chakra-ui/react';


const ExportExcel = ({ excelData, fileName }) => {
    const fileType = 'application/vmd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToXlsx = async () => {
        const addJsonToSheet  = XLSX.utils.json_to_sheet(excelData)
        const addJsonData = {Sheets :{'data':addJsonToSheet},SheetNames:['data']}
        const excelBuffer = XLSX.write(addJsonData,{bookType:'xlsx',type:'array'})
        const data = new Blob([excelBuffer],{type:fileType})
        FileSaver.saveAs(data,fileName + fileExtension)
    }

    return(
        <>
            <Tooltip title="Excel Export">
                <Text onClick={(e)=> exportToXlsx(fileName)} >Download xlsx</Text>
            </Tooltip>
        </>
    )
}


export default ExportExcel;