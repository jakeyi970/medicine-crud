import { 
  ADD_MEDICINE_NAME, 
  FETCH_MEDICINE_NAME, 
  EDIT_MEDICINE_NAME, 
  UPDATE_MEDICINE_NAME, 
  REMOVE_MEDICINE_NAME,
  SET_ERROR,
  SET_LOADING_NAME
} from '../actionTypes'
import { DispatchType, IMedicineName } from '../../@types'
import axios from 'axios'
import { MEDICINE_NAME_URL } from '../../@constants'


export const addMedicineName = (data: string) => (dispatch: DispatchType) => {
  dispatch({
    type: SET_LOADING_NAME,
    payload: true
  })
  axios.post(MEDICINE_NAME_URL, { name: data })
    .then(res => {
      dispatch({
        type: ADD_MEDICINE_NAME,
        payload: res.data
      })
      dispatch({
        type: SET_LOADING_NAME,
        payload: false
      })
    }).catch(error => dispatch({
      type: SET_ERROR,
      payload: error.message
    }));
}

export const fetchMedicineName = () => (dispatch: DispatchType) => {
  dispatch({
    type: SET_LOADING_NAME,
    payload: true
  })
  axios.get(MEDICINE_NAME_URL)
    .then(res => {
      dispatch({
        type: SET_LOADING_NAME,
        payload: false
      })
      dispatch({
        type: FETCH_MEDICINE_NAME,
        payload: res.data
      })}
    ).catch(error => dispatch({
      type: SET_ERROR,
      payload: error.message
    }));
}

export const editMedicineName = (data: {
  id: number,
  isEditing: boolean
}) => (dispatch: DispatchType) => {
  dispatch({
    type: EDIT_MEDICINE_NAME,
    payload: data
  })
}

export const updateMedicineName = (data: IMedicineName) => (dispatch: DispatchType) => {
  dispatch({
    type: SET_LOADING_NAME,
    payload: true
  })
  axios.put(`${MEDICINE_NAME_URL}/${data.id}`, data)
    .then(res => {
      dispatch({
        type: SET_LOADING_NAME,
        payload: false
      })
      dispatch({
        type: UPDATE_MEDICINE_NAME,
        payload: res.data
      })}
    ).catch(error => dispatch({
      type: SET_ERROR,
      payload: error.message
    }));
}

export const removeMedicineName = (id: number) => (dispatch: DispatchType) => {
  dispatch({
    type: SET_LOADING_NAME,
    payload: true
  })
  axios.delete(`${MEDICINE_NAME_URL}/${id}`)
    .then(res => {
      dispatch({
        type: SET_LOADING_NAME,
        payload: false
      })
      dispatch({
        type: REMOVE_MEDICINE_NAME,
        payload: res.data
      })
    }).catch(error => dispatch({
      type: SET_ERROR,
      payload: error.message
    }));
}