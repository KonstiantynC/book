const mutations = {
  // root
  CLEAR_STATE: 'CLEAR_STATE',
  POP_STATE: 'POP_STATE',

  // auth
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  UPDATE_USER_AUTH: 'UPDATE_USER_AUTH',

  // books
  UPDATE_BOOKS: 'UPDATE_BOOKS',
  UPDATE_BOOK_CONTENT: 'UPDATE_BOOK_CONTENT',
  CLEAR_BOOKS: 'CLEAR_BOOKS',
}

const actions = {
  // root
  LOG_OUT: 'LOG_OUT',
  LOG_IN: 'LOG_IN',
  RESTORE_SESSION: 'RESTORE_SESSION',

  SIGN_UP: 'SIGN_UP',

  // books
  LOAD_BOOKS: 'LOAD_BOOKS',
  GET_BOOK_BY_ID: 'GET_BOOK_BY_ID',
  CREATE_BOOK: 'CREATE_BOOK',
  LOAD_BOOK_CONTENT: 'LOAD_BOOK_CONTENT',
  UPDATE_BOOK: 'UPDATE_BOOK'
}

const getters = {
  // root
  isLoggedIn: 'isLoggedIn',
  accessToken: 'accessToken',
  user: 'user',

  // books
  books: 'books',
  bookContent: ''
}

export const vuexTypes = {
  ...mutations,
  ...actions,
  ...getters,
}
