import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reposReducer from './reposReducer';


// созд. reducer
const rootReducer = combineReducers({
    repository: reposReducer
})


// созд. сам store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));



/*

combineReducers - для обьеденения всех редусеров который есть у нас в приложении;
createStore - позволяет создать store;
applyMiddleware - для подкл. санок thunk;
thunk(санка) - для работы с ассинхр. запроссами;

*/ 