import React from "react";
import AdminShiftManager from "../pages/AdminShiftManager";

const meta = {
    title: 'AdminShiftManager',
    component: AdminShiftManager,
}

// Define the Template component that will be used for each story
const Template = (args) => <AdminShiftManager {...args} />;

// Define your stories
export const Default = Template.bind({});
Default.args = {
    storyBookProps:{
        emptytable : true,
        dontRunApis: true
    }
};

export const AddEmployeeModalEmpty = Template.bind({});
AddEmployeeModalEmpty.args = {
    storyBookProps: {
        isAddEmployeeOpen:true
    }
}

export const AddEmployeeModalFilled = Template.bind({});
AddEmployeeModalFilled.args = {
    storyBookProps: {
    isAddEmployeeOpen: true,
    storydata : {
            name:"employee6",
            age:30,
            gender:"female",
            job:"Administrator",
            Dateofhiring:'2023-07-19'
        }
    }
}

export const AddEmployeeModalEmptySubmit = Template.bind({});
AddEmployeeModalEmptySubmit.args={
    storyBookProps: {
        isAddEmployeeOpen: true,
        addemployeeEmptySubmit:true
    }
}

export const AddedEmployeeSuccess = Template.bind({});
AddedEmployeeSuccess.args = {
    storyBookProps: {
        emptytable: true,
        showEmptydata2 :true
    }
}

export const SaveSchedule = Template.bind({});
SaveSchedule.args = {
    storyBookProps: {
        SaveSchedulebuttonClicked: true,
        emptytable: true,
        showEmptydata2: true
    }
}

export const NextWeekClicked = Template.bind({});
NextWeekClicked.args = {
    storyBookProps: {
        emptytable: true,
        shownextWeekcolumns: true
    }
}

export const PreviousWeekClicked = Template.bind({});
PreviousWeekClicked.args = {
    storyBookProps: {
        emptytable: true,
        showpreviousWeekcolumns: true,
    }
}

export const PlusClickedofLastRowLastColumnShiftManagerOpen = Template.bind({});
PlusClickedofLastRowLastColumnShiftManagerOpen.args = {
    storyBookProps: {
        showAddWork:true    
    }
}

export const ShiftManagerSaveClickedWithEmptyFields = Template.bind({});
ShiftManagerSaveClickedWithEmptyFields.args= {
    storyBookProps:{
        showAddWork: true,
        shiftManagerModalSaveClickedWithEmptyField : true
    }
}

export const ShiftManagerModalWithFieldsFilled = Template.bind({});
ShiftManagerModalWithFieldsFilled.args = {
    storyBookProps: {
        showAddWork: true,
        shouldShiftModalInputsBeFilled:true,
        shiftModalProps:{
            work:"NewworkAdded",
            startTime:"09:00",
            endTime:"18:00"
        }
    }
}

export const ShiftManagerSaveButtonClicked = Template.bind({});
ShiftManagerSaveButtonClicked.args= {
    storyBookProps :{
        showOnlyOneTableData : true,
        emptytable: true,
        dataProps: {
            startTime: "09:00",
            endTime: "18:00",
            work: "NewworkAdded",
        }
    }
}

export const EditIconClicked = Template.bind({});
EditIconClicked.args = {
    storyBookProps: {
        showAddWork: true,
        shouldShiftModalInputsBeFilled: true,
        shiftModalProps: {
            work: "NewworkAdded",
            startTime: "09:00",
            endTime: "18:00"
        }
    }
}

export const EditIconClickedAndInputsChanged = Template.bind({});
EditIconClickedAndInputsChanged.args = {
    storyBookProps: {
        showAddWork: true,
        shouldShiftModalInputsBeFilled: true,
        shiftModalProps: {
            work: "ChangedWork",
            startTime: "06:00",
            endTime: "15:00"
        }
    }
}

export const SaveButtonClicked = Template.bind({});
SaveButtonClicked.args = {
    storyBookProps: {
        // showAddWork: true,
        // shouldShiftModalInputsBeFilled: true,
        showOnlyOneTableData: true,
        emptytable: true,
        dataProps: {
            work: "ChangedWork",
            startTime: "06:00",
            endTime: "15:00"
        }
    }
}
export const DeleteIconClicked = Template.bind({});
DeleteIconClicked.args = {
    storyBookProps: {
        emptytable: true,
        showOnlyOneTableData: true,
        dataProps: "+"
    }
}

export const EmployeeNameClickedName_employee1 = Template.bind({});
EmployeeNameClickedName_employee1.args = {
    storyBookProps: {
        employeeFolioOpen:true,
        employeeData:[{
            name:"geremy winston",
            age:"66",
            job:"machinary",
            gender:"male",
            datehired:"23-March-2021"
        }],
        Previousreservations:
            [
                [
                    "7/2/2023",
                    {
                        startTime: "11:00",
                        endTime: "08:00",
                        work: "Shopping"
                    }
                ],
                [
                    "7/1/2023",
                    "+"
                ],
                [
                    "6/30/2023",
                    {
                        startTime: "08:00",
                        endTime: "06:00",
                        work: "Maintenance"
                    }
                ],
                [
                    "6/29/2023",
                    "+"
                ],
                [
                    "6/28/2023",
                    {
                        startTime: "09:00",
                        endTime: "06:00",
                        work: "Cooking"
                    }
                ],
                [
                    "6/27/2023",
                    {
                        "startTime": "21:23",
                        "endTime": "19:19",
                        "work": "Sunt dolorem vero ad"
                    }
                ],
                [
                    "6/26/2023",
                    {
                        startTime: "10:00",
                        endTime: "07:00",
                        work: "Security"
                    }
                ],
                [
                    "6/25/2023",
                    "+"
                ],
                [
                    "6/24/2023",
                    {
                        startTime: "09:00",
                        endTime: "06:00",
                        work: "Management"
                    }
                ],
                [
                    "6/23/2023",
                    "+"
                ],
                [
                    "6/22/2023",
                    {
                        startTime: "09:00",
                        endTime: "06:00",
                        work: "Management"
                    }
                ],
                [
                    "6/21/2023",
                    "+"
                ],
                [
                    "6/20/2023",
                    {
                        startTime: "10:00",
                        endTime: "07:00",
                        work: "Security"
                    }
                ],
                [
                    "6/19/2023",
                    "+"
                ]
            ]
    }
}
export default meta;