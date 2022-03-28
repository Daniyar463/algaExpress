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
    fetchPackageAdminRequest,
    fetchPackageAdminSuccess,
    fetchPackageAdminFailure,
    changeStatusesRequest,
    changeStatusesSuccess,
    changeStatusesError,
    changeDeliveryStatusRequest,
    changeDeliveryStatusSuccess,
    changeDeliveryStatusError,
    clearAdminErrors,
    clearPackage,
    giveOutRequest,
    giveOutFailure,
    giveOutSuccess,
    editAdminPackageFailure,
} = packageSlice.actions;