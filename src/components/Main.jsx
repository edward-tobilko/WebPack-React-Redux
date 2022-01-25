import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRepository } from '../http/http';
import Repository from './repos/Repository';
import './main.less';
import { setCurrentPage } from '../reducers/reposReducer';


const Main = () => {

    // redux
    const dispatch = useDispatch();
    const receiveRepos = useSelector(state => state.repository.items);
    const receiveLoader = useSelector(state => state.repository.isFetching);
    const currentPage = useSelector(state => state.repository.currentPage);
    const perPage = useSelector(state => state.repository.perPage);
    const totalCount = useSelector(state => state.repository.totalCount);
    const isFetchingError = useSelector(state => state.repository.isFetchingError);

    const pages = []; // массив где будут хранится наши странички;
    const pagesCount = Math.ceil(totalCount / perPage); // считаем общее кол-во страниц;


    // hooks
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(getRepository(searchValue, currentPage, perPage)); // с файла http;
    }, [currentPage]);

    // functions
    function searchHandler() { // ф-я для обрабатывания нажатия на кнопку;
        dispatch(setCurrentPage(1)); // чтобы при обновлении нас редиректило на первую страницу;
        dispatch(getRepository(searchValue, currentPage, perPage)); // получаем репозитор.
    }

    // ф-я которая будет создавать странички в пагинации;
    function createPages(pages, pagesCount, currentPage) {
        if (pagesCount > 10) {
            if (currentPage > 5) {
                for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                    pages.push(i);
                    if (i == pagesCount) break
                }
            }
            else {
                for (let i = 1; i <= 10; i++) {
                    pages.push(i);
                    if (i == pagesCount) break
                }
            }
        } else {
            for (let i = 1; i <= pagesCount; i++) {
                pages.push(i);
            }
        }
    }
    createPages(pages, pagesCount, currentPage);

    return (<>

        {isFetchingError && // если произошла ошибка в запроссе get;
            <div class="alert alert-danger" role="alert">
                Произошла ошибка. Перезагрузите страничку!
            </div>
        }

        <div className='search__form'>
            <form className='search__form'>
                <input
                    onChange={(event) => setSearchValue(event.target.value)}
                    value={searchValue}
                    type='text'
                    placeholder='Search repository...'
                    className='search__input'

                />
                <button
                    className='search__btn'
                    onClick={(event) => searchHandler(event.preventDefault())}>Search</button>
            </form>
        </div>

        <div>

            {receiveLoader === false
                ? receiveRepos.map(repo => <Repository repo={repo} key={repo.id} />)
                : <div className='loader'></div>
            }


        </div>

        {/* pagination */}
        <div className='pagination'>
            {pages.map((page, index) =>
                <span
                    onClick={() => dispatch(setCurrentPage(page))}
                    key={index}
                    className={currentPage === page ? 'active__page' : 'pagination__item'} // если текущая страница ровняется елем. массива, то тогда присв. класс active__page, а иначе pagination__item;
                > {page} </span>)}
        </div>

    </>)

}


export default Main;
