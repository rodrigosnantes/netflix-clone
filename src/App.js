import React from 'react';
import {useEffect, useState} from "react";

import TmdbApi from './api/TmdbApi'
import MovieRow from "./components/MovieRow";

import './App.css'

export default function App()  {
    const [moveList, setMoveList] = useState([]);

    useEffect(() => {
        (async () => {
            await loadAll();;
        })();
    }, [])

    const loadAll = async () => {
        const list = await TmdbApi.getHomeList();
        setMoveList(list);
    }

    return (
        <div className='pages'>
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