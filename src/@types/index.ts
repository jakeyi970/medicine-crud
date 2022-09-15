export interface IMedicine {
  id: number,
  MedicineName: string,
  Code: string,
  DisplayName: string,
  Price: number,
  Category: string,
}

export type TAction = {
  type: string,
  payload: any
}

export interface IMedicineName {
  id: number,
  name: string,
  isEditing?: boolean
}

export interface IMedicineCategory {
  id: number,
  name: string,
  isEditing?: boolean
}

export type TState = {
  medicines: IMedicine[],
  medicineNames: IMedicineName[],
  medicineCategories: IMedicineCategory[],
  utils: TUtils
}

export type TUtils = {
  error: string,
  isLoadingMedicine: boolean,
  isLoadingName: boolean,
  isLoadingCategory: boolean
}

export type DispatchType = (args: TAction) => TAction