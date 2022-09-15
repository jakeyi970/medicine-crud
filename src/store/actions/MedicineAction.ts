import { ADD_MEDICINE, UPDATE_MEDICINE, REMOVE_MEDICINE, FETCH_MEDICINE, SET_LOADING_MEDICINE, SET_ERROR } from '../actionTypes'
import { DispatchType } from '../../@types'
import axios from 'axios'
import { IMedicine } from '../../@types'
import { MEDICINE_URL } from '../../@constants'

export const addMedicine = (data: IMedicine) => (dispatch: DispatchType) => {
  dispatch({
    type: SET_LOADING_MEDICINE,
    payload: true
  })
  axios.post(MEDICINE_URL, data)
    .then(res => {
      dispatch({
        type: ADD_MEDICINE,
        payload: res.data
      });
      dispatch({
        type: SET_LOADING_MEDICINE,
        payload: false
      })
    }).catch(error => dispatch({
      type: SET_ERROR,
      payload: error.message
    }));
}

export const fetchMedicine = () => (dispatch: DispatchType) => {
  dispatch({
    type: SET_LOADING_MEDICINE,
    payload: true
  })
  axios.get(MEDICINE_URL)
    .then(res => {
      dispatch({
        type: FETCH_MEDICINE,
        payload: res.data
      });
      dispatch({
        type: SET_LOADING_MEDICINE,
        payload: false
      })
    }).catch(error => dispatch({
      type: SET_ERROR,
      payload: error.message
    }));
}

export const updateMedicine = (medicine: IMedicine) => (dispatch: DispatchType) => {
  dispatch({
    type: SET_LOADING_MEDICINE,
    payload: true
  })
  axios.put(`${MEDICINE_URL}/${medicine.id}`, medicine)
    .then(res => {
      dispatch({
        type: UPDATE_MEDICINE,
        payload: res.data
      });
      dispatch({
        type: SET_LOADING_MEDICINE,
        payload: false
      })
    }).catch(error => dispatch({
      type: SET_ERROR,
      payload: error.message
    }));  
}

export const removeMedicine = (id: number) => (dispatch: DispatchType) => {
  console.log(id);
  dispatch({
    type: SET_LOADING_MEDICINE,
    payload: true
  })
  axios.delete(`${MEDICINE_URL}/${id}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: REMOVE_MEDICINE,
        payload: res.data
      });
      dispatch({
        type: SET_LOADING_MEDICINE,
        payload: false
      })
    }).catch(error => dispatch({
      type: SET_ERROR,
      payload: error.message
    }));
}