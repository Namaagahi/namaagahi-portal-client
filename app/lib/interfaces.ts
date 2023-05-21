export interface UserObject {
    id? : string,
    _id: string,
    name:string,
    avatar: string,
    username: string,
    roles : string[]
    password: string,
    active: boolean,
    __v: number,
    refreshToken?: string
  }

export interface Note {
  user: string,
  title: string,
  text: string,
  completed?: boolean
}

export interface GlobalState {
    user: UserObject | null,
    token: string | null
  }

export interface menuItemsObj {
  name: string
  path: string
  icon: JSX.Element
}