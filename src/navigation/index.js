import { Route, Routes } from "react-router-dom";
import {
    Home, Dashboard, DataInsightsHome, DataInsightsHomeNewGuest,
    DataInsightsHomeSavedGuest, ManageMaintenance, NewReservation, ListReservation,
    ViewReservation, CreateMaintenance, ManagePlans, DailyFinancialReports, TaxReports,
    AdminShiftManager, NotFound, RatesAndInventory, Property, DNR, Payment,
    BaseRatePage, StudioDashboard,
    Test
} from '../pages';
import MainLayout from "../app/layouts/MainLayout";
import PrivateCheck from "../app/layouts/PrivateCheck";


const Navigation = () => {

    // function isLogin() {
    //     let isLogin = sessionStorage.getItem("isLogin") ? true : false;
    //     return isLogin
    // }

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route exact path="/" element={<Home />} />
            </Route>
            <Route element={<PrivateCheck />}>
                <Route exact path="/admin/dashboard" element={<Dashboard />} />
                <Route exact path="/studio/dashboard" element={<StudioDashboard />} />
                <Route exact path="/admin/insights/builder/reports" element={<DataInsightsHome />} />
                <Route exact path="/admin/insights/builder/reports/new/guests" element={<DataInsightsHomeNewGuest />} />
                <Route exact path="/admin/insights/builder/reports/:id" element={<DataInsightsHomeSavedGuest />} />
                <Route exact path="/admin/mangeMaintenance" element={<ManageMaintenance />} />
                <Route exact path="/admin/reservation/create" element={<NewReservation />} />
                <Route exact path="/admin/reservation/list" element={<ListReservation />} />
                <Route exact path="/admin/reservation/view/:id" element={<ViewReservation />} />
                <Route exact path="/admin/reservation/edit/:id" element={<NewReservation />} />
                <Route exact path="/admin/reservation/createMaintenance" element={<CreateMaintenance />} />
                <Route exact path="/admin/Manage/Plans" element={<ManagePlans />} />
                <Route exact path="/admin/insights/builder/dailyfinancailreports" element={<DailyFinancialReports />} />
                <Route exact path="/admin/Property" element={<Property />} />
                <Route exact path="/admin/insights/builder/taxreports" element={<TaxReports />} />
                <Route exact path="/admin/adminShiftManager" element={<AdminShiftManager />} />
                <Route exact path="/admin/automated-report" element={<DataInsightsHome />} />
                <Route exact path="/admin/ratesAndInventory" element={<RatesAndInventory />} />
                <Route exact path="/admin/DNR" element={<DNR />} />
                <Route exact path="/admin/payment" element={<Payment />} />
                <Route exact path="/admin/baserate" element={<BaseRatePage />} />
                <Route exact path="/test" element={<Test />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>



        // <Routes>
        //     <Route
        //         exact
        //         path="/"
        //         element={
        //             !isLogin() ? <Home /> : <Navigate to="/admin/dashboard" />
        //         }
        //     />
        //     <Route
        //         exact
        //         path="/admin/dashboard"
        //         element={isLogin() ? <Dashboard /> : <Navigate to="/" />}
        //     />
        //     <Route
        //         exact
        //         path="/admin/insights/builder/reports"
        //         element={isLogin() ? <DataInsightsHome /> : <Navigate to="/" />}
        //     />
        //     <Route
        //         exact
        //         path="/admin/insights/builder/reports/new/guests"
        //         element={
        //             isLogin() ? <DataInsightsHomeNewGuest /> : <Navigate to="/" />
        //         }
        //     />
        //     <Route
        //         exact
        //         path="/admin/insights/builder/reports/:id"
        //         element={
        //             isLogin() ? (
        //  <DataInsightsHomeSavedGuest />
        //             ) : (
        //                 <Navigate to="/" />
        //             )
        //         }
        //     />
        //     <Route
        //         exact
        //         path="/admin/mangeMaintenance"
        //         element={
        //             isLogin() ? <ManageMaintenance /> : <Navigate to="/" />
        //         }
        //     />
        //     <Route
        //         exact
        //         path="/admin/reservation/create"
        //         element={isLogin() ? <NewReservation /> : <Navigate to="/" />}
        //     />
        //     <Route
        //         exact
        //         path="/admin/reservation/list"
        //         element={isLogin() ? <ListReservation /> : <Navigate to="/" />}
        //     />
        //     <Route
        //         exact
        //         path="/admin/reservation/view/:id"
        //         element={isLogin() ? <ViewReservation /> : <Navigate to="/" />}
        //     />
        //     <Route
        //         exact
        //         path="/admin/reservation/edit/:id"
        //         element={isLogin() ? <NewReservation /> : <Navigate to="/" />}
        //     />
        //     <Route
        //         exact
        //         path="/admin/reservation/createMaintenance"
        //         element={
        //             isLogin() ? <CreateMaintenance /> : <Navigate to="/" />
        //         }
        //     />
        //     <Route
        //         exact
        //         path="/admin/Manage/Plans"
        //         element={isLogin() ? <ManagePlans /> : <Navigate to="/" />}
        //     />
        //     <Route
        //         exact
        //         path="/admin/insights/builder/dailyfinancailreports"
        //         element={
        //             isLogin() ? <DailyFinancialReports /> : <Navigate to="/" />
        //         }
        //     />
        //     <Route
        //         exact
        //         path="/admin/Property"
        //         element={
        //             isLogin() ? <Property /> : <Navigate to="/" />
        //         }
        //     />

        //     <Route
        //         exact
        //         path="/admin/insights/builder/taxreports"
        //         element={isLogin() ? <TaxReports /> : <Navigate to="/" />}
        //     />
        //     <Route
        //         exact
        //         path="/admin/adminShiftManager"
        //         element={
        //             isLogin() ? <AdminShiftManager /> : <Navigate to="/" />
        //         }
        //     />
        //     <Route
        //         exact
        //         path="/admin/automated-report"
        //         element={
        //             isLogin() ? <DataInsightsHome /> : <Navigate to="/" />
        //         }
        //     />
        //     <Route
        //         exact
        //         path="/admin/ratesAndInventory"
        //         element={
        //             isLogin() ? <RatesAndInventory /> : <Navigate to="/" />
        //         }
        //     />
        //     <Route
        //         exact
        //         path="/admin/DNR"
        //         element={
        //             isLogin() ? <DNR /> : <Navigate to="/" />
        //         }
        //     />
        //     <Route
        //         exact
        //         path="/admin/payment"
        //         element={
        //             isLogin() ? <Payment /> : <Navigate to="/" />
        //         }
        //     />
        //     <Route
        //         exact
        //         path="/admin/baserate"
        //         element={
        //             isLogin() ? <BaseRatePage /> : <Navigate to="/" />
        //         }
        //     />
        //     <Route path="*" element={<NotFound />} />
        // </Routes>
    )
}

export default Navigation