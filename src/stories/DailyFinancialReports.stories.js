import React from "react";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import DailyFinancialReports from "../pages/DailyFinancialReports";
const meta = {
    title: 'DailyFinancialReports',
    component: DailyFinancialReports
};

const mockData = {
    "status": true,
    "data": {
        "roomRevenue": {
            "today": {
                "adrforgivendate": 0,
                "roomrevenue": 0,
                "revpargivendate": 0
            },
            "monthToDate": {
                "AdrMonthToDate": 124.29,
                "totalRoomRevenueMonthtoDate": 124.29,
                "revparForMonthToDate": 0.09
            }
        },
        "statistics": {
            "today": {
                "totalGuests": 0,
                "totalCheckIns": 0,
                "totalCheckOuts": 0,
                "walkInforGivenDate": 0,
                "avglostotalnightsgivendate": 0,
                "avgLosForgivendate": 0,
                "adrforgivendateperguest": 78.64,
                "totalrevenueforgivendate": 0,
                "paymentForGivenDate": 0
            },
            "monthTodate": {
                "totalGuestsmonthtodate": 2,
                "totalcheckInsMonthtodate": 2,
                "totalcheckOutsmonthtoDate": 2,
                "walkInforGivenDatemonthtodate": 2,
                "AvgLosmonthtodate": 1,
                "avglostotalnightsmonthtodate": 1,
                "adrforemonthtodateperguest": 124.29,
                "totalrevenueformonthtodate": 248.57,
                "paymentForMonthToDate": 248.57
            }
        },
        "booksForecast": {
            "totalRoomsOccupiedformonth": 2,
            "occupancyForWholeMonth": 0.03,
            "AdrForWholeMonth": 124.29,
            "totalRoomRevenueWholeMonth": 248.57,
            "revparForWholeMonth": 0.04
        },
        "occupancy": {
            "todaydata": {
                "availableRooms": 100,
                "percentageofroomsinmaintenance": 0,
                "percentageofRoomsBooked": 0
            },
            "wholemonthdata": {
                "availableRooms": 99.95,
                "percentageofroomsinmaintenance": 0.02,
                "percentageofRoomsBooked": 0.03
            }
        }
    },
    "message": "data has been recieved"
}


const mockAdapter = new MockAdapter(axios);

const Template = (args) => <DailyFinancialReports {...args} />;

export const DailyFinancialReportsPageForADate = Template.bind({});
    DailyFinancialReportsPageForADate.args = {
    storyBookProps: {
        showmockData: true
    }
};


export const EmailButtonClickedAndEmailModalOpened = Template.bind({});
EmailButtonClickedAndEmailModalOpened.args = {
    storyBookProps: {
        ShouldEmailModalOpen: true
    }
};

export const EmailModalSendButtonClickedWithoutInputsFilled = Template.bind({});
EmailModalSendButtonClickedWithoutInputsFilled.args = {
    storyBookProps: {
        ShouldEmailModalOpen: true,
        sendButtonClicked:true
    }
};

export const EmailModalInputsFilled = Template.bind({});
EmailModalInputsFilled.args = {
    storyBookProps: {
        ShouldEmailModalOpen: true,
        // sendButtonClicked: true,
        shouldDataBeFilled:true,
        data:{
            email:"xyz@gmail.com",
            reporttype:"room_revenue"
        }
    }
};

// EmailModalInputsFilledAndSendButtonClicked
export const EmailModalInputsFilledAndSendButtonClicked = Template.bind({});
EmailModalInputsFilledAndSendButtonClicked.args = {
    storyBookProps: {
        showmockData: true,
        showEmailSuccessToast:true
    }
};

// DownloadCsvClicked

export const DownloadCSVClickedAndDailyStatisticsSelected = Template.bind({});
DownloadCSVClickedAndDailyStatisticsSelected.args = {
    storyBookProps: {
        showmockData: true,
        isDailyStatisticsSelected: true,
        statistics: {
            "today": {
                "totalGuests": 0,
                "totalCheckIns": 0,
                "totalCheckOuts": 0,
                "walkInforGivenDate": 0,
                "avglostotalnightsgivendate": 0,
                "avgLosForgivendate": 0,
                "adrforgivendateperguest": 78.64,
                "totalrevenueforgivendate": 0,
                "paymentForGivenDate": 0
            },
            "monthTodate": {
                "totalGuestsmonthtodate": 2,
                "totalcheckInsMonthtodate": 2,
                "totalcheckOutsmonthtoDate": 2,
                "walkInforGivenDatemonthtodate": 2,
                "AvgLosmonthtodate": 1,
                "avglostotalnightsmonthtodate": 1,
                "adrforemonthtodateperguest": 124.29,
                "totalrevenueformonthtodate": 248.57,
                "paymentForMonthToDate": 248.57
            }
        }
    }
};
// Email Button Clicked and Email Modal opened

// export const NewRatePlanClicked_CreatePlanModalOpened = Template.bind({});
// NewRatePlanClicked_CreatePlanModalOpened.args = {
//     storyBookProps: {
//         shouldPlanModalOpen: true
//     }
// }

// export const CreatePlanModalSaveClickedWhenFieldsEmpty = Template.bind({});
// CreatePlanModalSaveClickedWhenFieldsEmpty.args = {
//     storyBookProps: {
//         shouldPlanModalOpen: true,
//         isSaveButtonClicked: true
//     }
// }

// export const CreatePlanModalInputsFilled = Template.bind({});
// CreatePlanModalInputsFilled.args = {
//     storyBookProps: {
//         shouldPlanModalOpen: true,
//         shoulddatashow: true,
//         data: {
//             discountType: "%",
//             discountValue: 10,
//             planName: "dummyPlan",
//             startdate: "2023-05-21",
//             enddate: "2023-06-21",
//             minLos: 1,
//             maxLos: 2,
//             cutOFf: 2,
//             selectedNumberOfWeeks: ['mon', 'tue', 'wed', 'thu'],
//         }
//     }
// }

// export const DeleteIconClickedOfTestPlanAndDeleteModalOpened = Template.bind({});
// DeleteIconClickedOfTestPlanAndDeleteModalOpened.args = {
//     storyBookProps: {
//         shouldDeleteModalShow: true
//     }
// }

// export const DeleteModalDeleteButtonClickedAndTestPlanDeleted = Template.bind({});
// DeleteModalDeleteButtonClickedAndTestPlanDeleted.args = {
//     storyBookProps: {
//         // shouldDeleteModalShow: true
//         showDeletedmockData: true
//     }
// }

// export const NameWeekly2Clicked = Template.bind({});
// NameWeekly2Clicked.args = {
//     storyBookProps: {
//         // shouldDeleteModalShow: true

//         shouldPlanModalOpen: true,
//         shoulddatashow: true,
//         data: {
//             "discountType": "$",
//             "discountValue": 50,
//             "planName": "weekly2",
//             "startdate": "2023-05-22",
//             "enddate": "2023-05-28",
//             "minLos": "7",
//             "maxLos": "7",
//             "cutOFf": "",
//             "selectedNumberOfWeeks": [
//                 "sun",
//                 "mon",
//                 "tue",
//                 "wed",
//                 "thu",
//                 "fri",
//                 "sat"
//             ],
//         }
//         // showDeletedmockData: true
//     }
// }

// export const NameWeekly2DataChanged = Template.bind({});
// NameWeekly2DataChanged.args = {
//     storyBookProps: {
//         // shouldDeleteModalShow: true

//         shouldPlanModalOpen: true,
//         shoulddatashow: true,
//         data: {
//             "discountType": "$",
//             "discountValue": 10,
//             "planName": "weekly2changed",
//             "startdate": "2023-04-15",
//             "enddate": "2023-04-16",
//             "minLos": "5",
//             "maxLos": "5",
//             "cutOFf": "",
//             "selectedNumberOfWeeks": [
//                 "sun",
//                 "mon",
//                 "tue",
//                 "wed"
//             ]
//         }
//         // showDeletedmockData: true
//     }
// }

// export const ChangedDataReflectedInPage = Template.bind({});
// ChangedDataReflectedInPage.args = {
//     storyBookProps: {
//         showmockData: true
//         // showDeletedmockData: true
//     }
// }
let date = new Date().toISOString().split("T")[0]
// mockAdapter.onGet(`/\/${process.env.REACT_APP_API_URL}/admin/dailyfinancialreports\/.+/`).reply(config => {
mockAdapter.onGet(`${process.env.REACT_APP_API_URL}/admin/dailyfinancialreports/${date}`).reply(config =>{
    let responseData = {};
    responseData = mockData;
    

    return [200, responseData];
}, { mode: 'no-cors' });

export default meta;
