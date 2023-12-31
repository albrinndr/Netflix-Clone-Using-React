import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import './RowPost.css'
import axios from '../../axios'
import { imageUrl, API_KEY } from '../../constants/constants';

const RowPost = (props) => {
    const [movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState('')
    useEffect(() => {
        axios.get(props.url).then((response) => {
            console.log(response.data);
            setMovies(response.data.results)
        })
    }, [props.url])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }

    const handleMovie = (id) => {
        console.log(id);
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
            console.log(response.data);
            if (response.data && response.data.results.length !== 0) {
                setUrlId(response.data.results[0])
            } else {
                console.log('No Trailer');
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div className="row" >
            <h1>{props.title}</h1>
            <div className="posters">
                {movies.map((obj) => (
                    <img key={obj.id} onClick={() => { handleMovie(obj.id) }} className={props.isSmall ? 'small_poster' : 'poster'} src={`${imageUrl + obj.backdrop_path}`} alt="poster" />
                ))}
            </div>
            {urlId && <YouTube opts={opts} videoId={urlId.key} />}
        </div >
    )
}

export default RowPost;
