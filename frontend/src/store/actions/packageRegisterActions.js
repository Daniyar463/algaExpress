import packageSlice from "../slices/packageRegisterSlice";

export const {
    fetchNewPackages,
    fetchNewPackagesSuccess,
    fetchNewPackagesFailure,
    createPackageRequest,
    createPackageSuccess,
    createPackageFailure,
    getOrdersHistoryRequest,
    getOrdersHistorySuccess,
    getOrdersHistoryError,
    getOrderByIdRequest,
    getOrderByIdSuccess,
    getOrderByIdError,
    getPackageByIdRequest,
    getPackageByIdSuccess,
    getPackageByIdFailure,
    changePackageRequest,
    changePackageSuccess,
    changePackageFailure,
    clearTextFieldsErrors,
    editAdminPackageRequest,
    editAdminPackageSuccess,
    editAdminPackageFailure,
    fetchPackageAdminRequest,
    fetchPackageAdminSuccess,
    fetchPackageAdminFailure,
    changeStatusesRequest,
    changeStatusesSuccess,
    changeStatusesError,
    changeStatusRequest,
    changeStatusSuccess,
    changeStatusError,
    clearAdminErrors,
} = packageSlice.actions;