import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContributors, getCurrentRepository } from '../../http/http';
import './card.less';


const Card = () => {

    // hooks
    const { username, reponame } = useParams(); // с пом. этого хука можно получать отдельные url запроссы;
    // console.log(username, reponame);
    const [repo, setRepo] = useState({ owner: {} });
    const [contributors, setContributors] = useState([]);

    useEffect(() => {
        getCurrentRepository(username, reponame, setRepo);
        getContributors(username, reponame, setContributors);
    }, []);

    return (<>

        <div>
            <button className="btn btn-success" onClick={() => history.back()}>Go back</button>
        </div>

        <div className='currentCard'>
            <img src={repo.owner.avatar_url} alt='' className='currentCard__img' />
            <h2 className='currentCard__name'>Репозиторий: <span style={{ color: 'teal' }}>{repo.name}</span></h2>
            <h2 className='currentCard__stars'>Количество звезд: <span style={{ color: 'orange' }}>{repo.stargazers_count}</span></h2>
        </div>

        <div className='contributors'>
            {contributors.map((contr, index) =>
                <div key={index} className='contributors__item'><span style={{ color: 'orange' }}>{index + 1}</span>. <span style={{ textDecoration: 'underline' }}>{contr.login}</span></div>
            )}
        </div>

    </>)

};


export default Card;