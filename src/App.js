import React from 'react';
import {useEffect, useState} from "react";

import TmdbApi from './api/TmdbApi'
import MovieRow from "./components/MovieRow";
import FeaturedMove from "./components/FeaturedMove";

import './App.css'

export default function App()  {
    const [loading, setLoading] = useState(true);
    const [moveList, setMoveList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);

    useEffect(() => {
        (async () => {
            const resultMoveList = await loadAll();
            setMoveList(resultMoveList);

            if (resultMoveList) {
                const resultFeaturedMove = await randomFeatured(resultMoveList);
                setFeaturedData(resultFeaturedMove);
                setLoading(false);
            }
        })();
    }, [])

    const loadAll = async () => {
        return await TmdbApi.getHomeList();
    }

    const randomFeatured = async (list) => {
        const originals = list.filter(move => move.slug === 'originals');
        const randomItem = Math.floor(Math.random() * (originals[0].items.results.length - 1))
        setFeaturedData(originals[0].items.results[randomItem])
    }


    if (loading) return null;

    return (
        <div className='pages'>
          <section className='lists'>

              {featuredData &&
                <FeaturedMove item={featuredData} />
              }

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