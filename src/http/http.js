import axios from 'axios';
import { setRepos, setLoader, setIsFetchingErr } from '../reducers/reposReducer';


export const getRepository = (searchQuery = 'stars:%3E1', currentPage, perPage) => {

    if (searchQuery === '') { // если у нас пустой инпут, то присваеваем по дефолту 'stars:%3E1';
        searchQuery = 'stars:%3E1';
    }

    return async (dispatch) => {
        try {
            dispatch(setLoader(true)); // загрузка будет работать до выполнения запросса;
            const response = await axios.get(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`); // получаем отсортированный список репозитор.;
            dispatch(setRepos(response.data));
        } catch (error) {
            dispatch(setIsFetchingErr(true));
            dispatch(setLoader(false));
            setTimeout(() => {
                dispatch(setIsFetchingErr(false));
            }, 3000);
        }

    }

}

// получаем локальный запросс по каждой карточке
export const getCurrentRepository = async (username, repoName, setRepo) => {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
    setRepo(response.data);
}

// получаем локальный запросс по 10 самых активных контрибюторах проекта
export const getContributors = async (username, repoName, setContributor) => {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contributors?page=1&per_page=10`);
    setContributor(response.data);
}


/*

'stars:%3E1' - синтаксис ES6;

*/