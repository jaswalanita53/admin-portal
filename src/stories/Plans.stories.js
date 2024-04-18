import React from "react";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ManagePlans from "../pages/ManagePlans";

const meta = {
    title: 'ManagePlans',
    component: ManagePlans,
};
const mockData = {
    "status": true,
    "data": [
        {
            "_id": "646c61135d22f013afccf35e",
            "planName": "weekly2",
            "startdate": "2023-05-22",
            "enddate": "2023-05-28",
            "minLos": "7",
            "maxLos": "7",
            "lastMinuteBooking": "",
            "discountType": "$",
            "discountValue": 50,
            "selectedNumberOfWeeks": [
                "sun",
                "mon",
                "tue",
                "wed",
                "thu",
                "fri",
                "sat"
            ],
            "cutOFf": ""
        },
        {
            "_id": "646c8433d70f068c9e449583",
            "planName": "tue10%off",
            "startdate": "2023-05-23",
            "enddate": "2023-05-24",
            "minLos": "1",
            "maxLos": "1",
            "lastMinuteBooking": "",
            "discountType": "%",
            "discountValue": 10,
            "selectedNumberOfWeeks": [
                "tue"
            ],
            "cutOFf": ""
        },
        {
            "_id": "646c88ced70f068c9e449584",
            "planName": "test",
            "startdate": "2023-05-13",
            "enddate": "2023-05-10",
            "minLos": "2",
            "maxLos": "3",
            "lastMinuteBooking": "3",
            "discountType": "%",
            "discountValue": "12",
            "selectedNumberOfWeeks": [
                "sat"
            ],
            "cutOFf": ""
        }
    ]


};

const deleteButtonClickedMockData ={
    "status": true,
    "data": [
        {
            "_id": "646c61135d22f013afccf35e",
            "planName": "weekly2",
            "startdate": "2023-05-22",
            "enddate": "2023-05-28",
            "minLos": "7",
            "maxLos": "7",
            "lastMinuteBooking": "",
            "discountType": "$",
            "discountValue": 50,
            "selectedNumberOfWeeks": [
                "sun",
                "mon",
                "tue",
                "wed",
                "thu",
                "fri",
                "sat"
            ],
            "cutOFf": ""
        },
        {
            "_id": "646c8433d70f068c9e449583",
            "planName": "tue10%off",
            "startdate": "2023-05-23",
            "enddate": "2023-05-24",
            "minLos": "1",
            "maxLos": "1",
            "lastMinuteBooking": "",
            "discountType": "%",
            "discountValue": 10,
            "selectedNumberOfWeeks": [
                "tue"
            ],
            "cutOFf": ""
        }
    ]

}

const deleteButtonClickedMockDataWithChangedWeekly2 ={
    "status": true,
    "data": [
        {
            "discountType": "$",
            "discountValue": 10,
            "planName": "weekly2changed",
            "startdate": "2023-04-15",
            "enddate": "2023-04-16",
            "minLos": "5",
            "maxLos": "5",
            "cutOFf": "",
            "selectedNumberOfWeeks": [
                "sun",
                "mon",
                "tue",
                "wed"
            ]
        },
        {
            "_id": "646c8433d70f068c9e449583",
            "planName": "tue10%off",
            "startdate": "2023-05-23",
            "enddate": "2023-05-24",
            "minLos": "1",
            "maxLos": "1",
            "lastMinuteBooking": "",
            "discountType": "%",
            "discountValue": 10,
            "selectedNumberOfWeeks": [
                "tue"
            ],
            "cutOFf": ""
        }
    ]
}

const mockAdapter = new MockAdapter(axios);

const Template = (args) => <ManagePlans {...args} />;

export const Default = Template.bind({});
Default.args = {
    storyBookProps: {
        showmockData:true
    }
};

export const NewRatePlanClicked_CreatePlanModalOpened = Template.bind({});
NewRatePlanClicked_CreatePlanModalOpened.args = {
    storyBookProps: {
        shouldPlanModalOpen:true
    }
}

export const CreatePlanModalSaveClickedWhenFieldsEmpty = Template.bind({});
CreatePlanModalSaveClickedWhenFieldsEmpty.args = {
    storyBookProps: {
        shouldPlanModalOpen: true,
        isSaveButtonClicked:true
    }
}

export const CreatePlanModalInputsFilled = Template.bind({});
CreatePlanModalInputsFilled.args = {
    storyBookProps: {
        shouldPlanModalOpen: true,
        shoulddatashow:true,
        data: {
            discountType: "%",
            discountValue: 10,
            planName:"dummyPlan",
            startdate:"2023-05-21",
            enddate: "2023-06-21",
            minLos:1,
            maxLos:2,
            cutOFf:2,
            selectedNumberOfWeeks: ['mon', 'tue', 'wed', 'thu'],
        }
    }
}

export const DeleteIconClickedOfTestPlanAndDeleteModalOpened = Template.bind({});
DeleteIconClickedOfTestPlanAndDeleteModalOpened.args = {
    storyBookProps: {
        shouldDeleteModalShow:true
    }
}

export const DeleteModalDeleteButtonClickedAndTestPlanDeleted = Template.bind({});
DeleteModalDeleteButtonClickedAndTestPlanDeleted.args = {
    storyBookProps: {
        showDeletedmockData: true
    }
}

export const NameWeekly2Clicked = Template.bind({});
NameWeekly2Clicked.args = {
    storyBookProps: {
            shouldPlanModalOpen: true,
            shoulddatashow: true,
            data: {
                "discountType": "$",
                "discountValue": 50,
                "planName": "weekly2",
                "startdate": "2023-05-22",
                "enddate": "2023-05-28",
                "minLos": "7",
                "maxLos": "7",
                "cutOFf": "",
                "selectedNumberOfWeeks": [
                    "sun",
                    "mon",
                    "tue",
                    "wed",
                    "thu",
                    "fri",
                    "sat"
                ],
        }
    }
}

export const NameWeekly2DataChanged = Template.bind({});
NameWeekly2DataChanged.args = {
    storyBookProps: {
        shouldPlanModalOpen: true,
        shoulddatashow: true,
        data: {
            "discountType": "$",
            "discountValue": 10,
            "planName": "weekly2changed",
            "startdate": "2023-04-15",
            "enddate": "2023-04-16",
            "minLos": "5",
            "maxLos": "5",
            "cutOFf": "",
            "selectedNumberOfWeeks": [
                "sun",
                "mon",
                "tue",
                "wed"
            ]
        }
    }
}

export const ChangedDataReflectedInPage = Template.bind({});
ChangedDataReflectedInPage.args = {
    storyBookProps: {
       showmockData:true
    }
}

mockAdapter.onGet(`${process.env.REACT_APP_API_URL}/admin/getAllRatesAndPlans`).reply(config => {

    let responseData = {};
 
    if (window.location.href.split("id=")[1].includes("delete-modal-delete-button-clicked-and-test-plan-deleted")) {
        responseData = deleteButtonClickedMockData;
        
    } else if (window.location.href.split("id=")[1].includes("name-weekly-2-clicked")) {
        responseData = deleteButtonClickedMockData;
    } else if (window.location.href.split("id=")[1].includes("changed-data-reflected-in-page")){
        responseData = deleteButtonClickedMockDataWithChangedWeekly2;
    }
    else{
        responseData = mockData;
    }

    return [200, responseData];
}, { mode: 'no-cors' });

export default meta;
