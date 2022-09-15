import { 
  ADD_MEDICINE_CATEGORY, 
  FETCH_MEDICINE_CATEGORY, 
  EDIT_MEDICINE_CATEGORY, 
  UPDATE_MEDICINE_CATEGORY, 
  REMOVE_MEDICINE_CATEGORY,
  SET_ERROR,
  SET_LOADING_CATEGORY
} from '../actionTypes'
import { DispatchType, IMedicineCategory } from '../../@types'
import axios from 'axios'
import { MEDICINE_CATEGORY_URL } from '../../@constants'


export const addMedicineCategory = (data: string) => (dispatch: DispatchType) => {
  dispatch({
    type: SET_LOADING_CATEGORY,
    payload: true
  })
  axios.post(MEDICINE_CATEGORY_URL, { name: data })
    .then(res => {
      dispatch({
        type: ADD_MEDICINE_CATEGORY,
        payload: res.data
      })
      dispatch({
        type: SET_LOADING_CATEGORY,
        payload: false
      })
    }).catch(error => dispatch({
      type: SET_ERROR,
      payload: error.message
    }));
}

export const fetchMedicineCategory = () => (dispatch: DispatchType) => {
  dispatch({
    type: SET_LOADING_CATEGORY,
    payload: true
  })
  axios.get(MEDICINE_CATEGORY_URL)
    .then(res => {
      dispatch({
        type: SET_LOADING_CATEGORY,
        payload: false
      })
      dispatch({
        type: FETCH_MEDICINE_CATEGORY,
        payload: res.data
      })}
    ).catch(error => dispatch({
      type: SET_ERROR,
      payload: error.message
    }));
}

export const editMedicineCategory = (data: {
  id: number,
  isEditing: boolean
}) => (dispatch: DispatchType) => {
  dispatch({
    type: EDIT_MEDICINE_CATEGORY,
    payload: data
  })
}

export const updateMedicineCategory = (data: IMedicineCategory) => (dispatch: DispatchType) => {
  dispatch({
    type: SET_LOADING_CATEGORY,
    payload: true
  })
  axios.put(`${MEDICINE_CATEGORY_URL}/${data.id}`, data)
    .then(res => {
      dispatch({
        type: SET_LOADING_CATEGORY,
        payload: false
      })
      dispatch({
        type: UPDATE_MEDICINE_CATEGORY,
        payload: res.data
      })}
    ).catch(error => dispatch({
      type: SET_ERROR,
      payload: error.message
    }));
}

export const removeMedicineCategory = (id: number) => (dispatch: DispatchType) => {
  dispatch({
    type: SET_LOADING_CATEGORY,
    payload: true
  })
  axios.delete(`${MEDICINE_CATEGORY_URL}/${id}`)
    .then(res => {
      dispatch({
        type: SET_LOADING_CATEGORY,
        payload: false
      })
      dispatch({
        type: REMOVE_MEDICINE_CATEGORY,
        payload: res.data
      })
    }).catch(error => dispatch({
      type: SET_ERROR,
      payload: error.message
    }));
}