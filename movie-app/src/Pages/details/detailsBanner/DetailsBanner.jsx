import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs"

import "./style.scss";

import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper"
import useFetch from "../../../hooks/useFetch";
import CircleRating from "../../../Components/circleRating/CircleRating"
import Img from "../../../Components/lazyLoadImages/Img"
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopUp from "../../../Components/videoPopup/VideoPopUp";


const DetailsBanner = ({ video, crew }) => {

    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const { url } = useSelector((state) => state.home)
    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer")

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {
                        !!data && (
                            <React.Fragment>
                                <div className="backdrop-img">
                                    <img src={url.backdrop + data.backdrop_path} />
                                </div>
                                <div className="opacity-layer"></div>
                                <ContentWrapper>
                                    <div className="content">
                                        <div className="left">
                                            {data.poster_path ? (
                                                <Img className="posterImg"
                                                    src={url.backdrop + data.poster_path} />
                                            ) : (
                                                <Img className="posterImg"
                                                    src={PosterFallback}
                                                />
                                            )}
                                        </div>
                                        <div className="right">
                                            <div className="title">
                                                {`${data.name || data.title}(${dayjs(data.release_date).format("YYYY")})`}
                                            </div>
                                            <div className="subtitle">
                                                {data.tagline}
                                            </div>
                                            <div className="row">
                                                <CircleRating rating={data.vote_average.toFixed(1)} />
                                            </div>
                                            <div className="playbtn" onClick={() => {
                                                setShow(true)
                                                setVideoId(video.key)
                                            }}>
                                                <PlayIcon />
                                                <span className="text">Watch Trailer</span>
                                            </div>
                                            <div className="overview">
                                                <div className="heading">Overview</div>
                                                <div className="description">
                                                    {data.overview}
                                                </div>
                                            </div>
                                            <div className="info">
                                                {
                                                    data.status && (
                                                        <div className="infoItem">
                                                            <span className="text bold">
                                                                Status:{""}
                                                            </span>
                                                            <span className="text">{data.status}</span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    data.release_date && (
                                                        <div className="infoItem">
                                                            <span className="text bold">
                                                                Relese Date:{""}
                                                            </span>
                                                            <span className="text">{dayjs(data.release_date).format("MMM   D,YYYY")}</span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    data.runtime && (
                                                        <div className="infoItem">
                                                            <span className="text bold">
                                                                Runtime:{""}
                                                            </span>
                                                            <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Video-Popup */}
                                    <VideoPopUp
                                        show={show}
                                        setShow={setShow}
                                        videoId={videoId}
                                        setVideoId={setVideoId}
                                    />
                                </ContentWrapper>
                            </React.Fragment>
                        )
                    }
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner; 