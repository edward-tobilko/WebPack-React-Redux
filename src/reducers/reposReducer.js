const SET_REPOS = 'SET_REPOS';
const SET_LOADER = 'SET_LOADER';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const IS_FETCHING_ERR = 'IS_FETCHING_ERR';


// дефолтное сост. редюсора;
const defaultState = {
    items: [], // здесь будут хранится полученные из api gitHub репозитории;
    isFetching: true, // loader
    currentPage: 1, // номер текущей стр.;
    perPage: 10, // сумма страниц;
    totalCount: 0, // все польз. с репозитория; 
    isFetchingError: false
}


export default function reposReducer(state = defaultState, action) { // редюсер каждый раз должен возр. новое сост.;
    switch (action.type) {
        case SET_REPOS:
            return {
                ...state,
                items: action.payload.items, // получаем с api github репозитории;
                totalCount: action.payload.total_count, // получаем с api github pagination;
                isFetching: false
            }
        case SET_LOADER:
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case IS_FETCHING_ERR:
            return {
                ...state,
                isFetchingError: action.payload
            }
        default:
            return state;
    }
}


// action creator(AC)
export const setRepos = (repository) => ({ // AC для вывода репозиториев(наших Items);
    type: SET_REPOS,
    payload: repository
})
export const setLoader = (bool) => ({ // этот AC будет менять поле isFetching на true - когда данные будут подгружаться и false когда данные уже загрузятся; 
    type: SET_LOADER,
    payload: bool
})
export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
})
export const setIsFetchingErr = (bool) => ({
    type: IS_FETCHING_ERR,
    payload: bool
})