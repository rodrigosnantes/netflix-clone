import React from 'react';
import {useEffect, useState} from "react";

import TmdbApi from './api/TmdbApi'
import MovieRow from "./components/MovieRow";
import FeaturedMove from "./components/FeaturedMove";
import Header from "./components/Header";

import './App.css'

export default function App()  {
    const [moveList, setMoveList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBackHeader] = useState(false);

    useEffect(() => {
        (async () => {
            const resultMoveList = await loadAll();
            setMoveList(resultMoveList);

            const resultFeaturedMove = await randomFeatured(resultMoveList);

            setFeaturedData(await getAdditionalMoveInfo(resultFeaturedMove));
        })();
    }, [])

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBackHeader(true);
            } else {
                setBackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    },[])

    const loadAll = async () => {
        return await TmdbApi.getHomeList();
    }

    const randomFeatured = async (list) => {
        const originals = list.filter(move => move.slug === 'originals');
        const randomItem = Math.floor(Math.random() * (originals[0].items.results.length - 1))
        return originals[0].items.results[randomItem];
    }


    const getAdditionalMoveInfo = async (move) => { return TmdbApi.getMoveInfo(move.id, 'tv') }

    return (
        <div className='pages'>

            <Header blackHeader={blackHeader}/>

          {featuredData &&
            <FeaturedMove item={featuredData} />
          }

            <section className='lists'>
              {moveList.map((item) => (
                  <MovieRow
                      key={item.title}
                      title={item.title}
                      items={item.items}
                  />
              ))}
          </section>

            { moveList.length <= 0 && (
                <div className='loading'>
                    <img src='https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/Netflix_LoadTime-scaled.gif' alt='Carregando'/>
                </div>
            )}

        </div>
    );
}