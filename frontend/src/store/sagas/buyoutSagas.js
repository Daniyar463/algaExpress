import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
    addBuyoutFailure,
    addBuyoutRequest,
    addBuyoutSuccess,
    deleteBuyoutFailure,
    deleteBuyoutRequest,
    deleteBuyoutSuccess,
    editBuyoutFailure,
    editBuyoutRequest,
    editBuyoutSuccess,
    fetchBuyoutsFailure,
    fetchBuyoutsRequest,
    fetchBuyoutsSuccess,
    fetchSingleBuyoutFailure,
    fetchSingleBuyoutRequest,
    fetchSingleBuyoutSuccess
} from "../actions/buyoutActions";


export function* getBuyoutSagas() {
    try {
        const response = yield axiosApi.get('/buyouts');
        yield put(fetchBuyoutsSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить');
        yield put(fetchBuyoutsFailure());
    }
}

export function* getOneBuyoutSagas({payload:id}) {
    try {
        const response = yield axiosApi.get('/buyouts/'+ id);
        yield put(fetchSingleBuyoutSuccess(response.data[0]));
    } catch (e) {
        toast.error('Не удалось загрузить');
        yield put(fetchSingleBuyoutFailure());
    }
}


export function* addBuyoutSaga({payload: data}) {
    try {
        yield axiosApi.post( '/buyouts', data);
        yield put(addBuyoutSuccess());
        // yield put(fetchBuyoutsRequest());
        // data.navigate('/');
        toast.success('Новый заказ выкупа добавлен!');

    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
        }
        toast.error('Произошла ошибка');
        yield put(addBuyoutFailure(error.response.data));
    }
}


export function* deleteBuyoutSaga({payload: id}) {
    try {
        yield axiosApi.delete('/buyouts/'+id);
        yield put(deleteBuyoutSuccess(id));
        toast.success('Успешно удален');
    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
        } else {
            toast.error(error.response?.data?.global);
        }
        yield put(deleteBuyoutFailure(error.response?.data));
    }
}

function* editBuyoutSagas({payload}) {
    console.log(JSON.stringify(payload.formData));
    try {
        yield axiosApi.put(`/buyouts/` + payload.id, payload.obj);
        yield put(editBuyoutSuccess());
        toast.success('Успешно обновлен!');
    } catch (e) {
        yield put(editBuyoutFailure(e.response.data));
    }
}


const buyoutSaga = [
    takeEvery(fetchBuyoutsRequest, getBuyoutSagas),
    takeEvery(addBuyoutRequest, addBuyoutSaga),
    takeEvery(deleteBuyoutRequest, deleteBuyoutSaga),
    takeEvery(fetchSingleBuyoutRequest, getOneBuyoutSagas),
    takeEvery(editBuyoutRequest, editBuyoutSagas),
];

export default buyoutSaga;
