import {useEffect} from "react";
import TmdbApi from './api/TmdbApi'

export default function App()  {

    useEffect(() => {
        (async () => {
            await loadAll();;
        })();
    }, [])

    const loadAll = async () => {
        const list = await TmdbApi.getHomeList();
        console.log(list);
    }

    return (
        <div className="App">
            <span>teste</span>
        </div>
    );
}