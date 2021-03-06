import React, {useState} from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import './MovieRow.css'

export default ({ title, items }) => {
    const [sizeList] = useState(items.results.length * 150);
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        if ((window.innerWidth - sizeList) - x) {
            x = window.innerWidth - sizeList -60;
        }
        setScrollX(x);
    }

    return (
        <div className='movieRow'>
            <h2>{title}</h2>

            <div className='movieRow--left' onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>

            <div className='movieRow--right' onClick={handleRightArrow} >
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>


            <div className='movieRow--listarea'>
                <div
                    className='movieRow--list'
                    style={{
                        width: sizeList,
                        marginLeft: scrollX
                    }}
                >
                    {items.results.length > 0 && items.results.map((item) => (
                        <div key={item.id}
                            className='movieRow---item'
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                alt={item.original_title}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}