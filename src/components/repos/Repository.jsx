import React from 'react';
import { NavLink } from 'react-router-dom';
import './repository.less'


const Repository = (props) => {

    const repo = props.repo; // передаем в эту комп. отдельно взятый репозиторий;

    return (
        <div className='card'>

            <div className='left'>
                <h5 className='left__name'>Название репозитория: </h5><NavLink to={`/card/${repo.owner.login}/${repo.name}`} className='left__link'>{repo.name}</NavLink>
            </div>

            <div className='right'>
                <div className='right__starsBlock'>
                    <h5 className='right__stars'>Количество звезд:</h5>{repo.stargazers_count}
                </div>
                <div className='right__lastCommitBlock'>
                    <h5 className='right__lastCommit'>Последний коммит:</h5> {repo.updated_at}
                </div>
                <div className='right__blockLink'>
                    <h5 className='right__linkName'>Ссылка на репозиторий:</h5><NavLink to={repo.html_url} className='right__link'> {repo.html_url} </NavLink>
                </div>
            </div>

        </div>
    )

}


export default Repository;


/*

owner.login - мы берем с https://docs.github.com/en/rest/reference/search;

*/