import React from 'react';
import {useEffect, useState} from "react";

import TmdbApi from './api/TmdbApi'
import MovieRow from "./components/MovieRow";
import FeaturedMove from "./components/FeaturedMove";

import './App.css'

export default function App()  {
    const [moveList, setMoveList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);

    useEffect(() => {
        (async () => {
            const resultMoveList = await loadAll();
            setMoveList(resultMoveList);

            const resultFeaturedMove = await randomFeatured(resultMoveList);

            setFeaturedData(await getAdditionalMoveInfo(resultFeaturedMove));
        })();
    }, [])

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
        </div>
    );
}