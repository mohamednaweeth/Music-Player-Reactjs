function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class CardProfile extends React.Component {
    constructor(...args) {
        super(...args);
        _defineProperty(this, "state", {
            index: 3,
            currentTime: '0:00',
            musicList: [{
                    name: 'Heroes Tonight',
                    author: 'NCS',
                    img: 'imgs/heroes.jpg',
                    audio: 'sngs/Janji - Heroes Tonight (feat. Johnning) [NCS Release].mp3',
                    duration: '2:02'
                },
                {
                    name: 'DEAF KEV-Invinciple',
                    author: 'NCS',
                    img: 'imgs/invinciple.jpg',
                    audio: 'sngs/DEAF KEV - Invincible NCS.mp3',
                    duration: '2:20'
                },
                {
                    name: 'Heaven',
                    author: 'NCS',
                    img: 'imgs/heaven.jpg',
                    audio: 'sngs/Different Heaven & EH DE - My Heart [NCS Release].mp3',
                    duration: '2:59'
                },
                {
                    name: 'Disfigure',
                    author: 'NCS',
                    img: 'imgs/heaven.jpg',
                    audio: 'sngs/Disfigure - Blank [NCS Release].mp3',
                    duration: '3:26'
                }],
            pause: false
        });
        _defineProperty(this, "changeCurrentTime",
            e => {
                const duration = this.playerRef.duration;

                const playheadWidth = this.timelineRef.offsetWidth;
                const offsetWidht = this.timelineRef.offsetLeft;
                const userClickWidht = e.clientX - offsetWidht;

                const userClickWidhtInPercent = userClickWidht * 100 / playheadWidth;

                this.playheadRef.style.width = userClickWidhtInPercent + "%";
                this.playerRef.currentTime = duration * userClickWidhtInPercent / 100;
            });

        _defineProperty(this, "hoverTimeLine",

            e => {
                const duration = this.playerRef.duration;

                const playheadWidth = this.timelineRef.offsetWidth;

                const offsetWidht = this.timelineRef.offsetLeft;
                const userClickWidht = e.clientX - offsetWidht;
                const userClickWidhtInPercent = userClickWidht * 100 / playheadWidth;

                if (userClickWidhtInPercent <= 100) {
                    this.hoverPlayheadRef.style.width = userClickWidhtInPercent + "%";
                }

                const time = duration * userClickWidhtInPercent / 100;

                if (time >= 0 && time <= duration) {
                    this.hoverPlayheadRef.dataset.content = this.formatTime(time);
                }
            });

        _defineProperty(this, "resetTimeLine",

            () => {
                this.hoverPlayheadRef.style.width = 0;
            });
        _defineProperty(this, "timeUpdate",

            () => {
                const duration = this.playerRef.duration;
                const timelineWidth = this.timelineRef.offsetWidth - this.playheadRef.offsetWidth;
                const playPercent = 100 * (this.playerRef.currentTime / duration);
                this.playheadRef.style.width = playPercent + "%";
                const currentTime = this.formatTime(parseInt(this.playerRef.currentTime));
                this.setState({
                    currentTime
                });

            });

        _defineProperty(this, "formatTime",

            currentTime => {
                const minutes = Math.floor(currentTime / 60);
                let seconds = Math.floor(currentTime % 60);

                seconds = seconds >= 10 ? seconds : "0" + seconds % 60;

                const formatTime = minutes + ":" + seconds;

                return formatTime;
            });

        _defineProperty(this, "updatePlayer",

            () => {
                const {
                    musicList,
                    index
                } = this.state;
                const currentSong = musicList[index];
                const audio = new Audio(currentSong.audio);
                this.playerRef.load();
            });

        _defineProperty(this, "nextSong",

            () => {
                const {
                    musicList,
                    index,
                    pause
                } = this.state;

                this.setState({
                    index: (index + 1) % musicList.length
                });

                this.updatePlayer();
                if (pause) {
                    this.playerRef.play();
                }
            });

        _defineProperty(this, "prevSong",

            () => {
                const {
                    musicList,
                    index,
                    pause
                } = this.state;

                this.setState({
                    index: (index + musicList.length - 1) % musicList.length
                });

                this.updatePlayer();
                if (pause) {
                    this.playerRef.play();
                }
            });

        _defineProperty(this, "playOrPause",


            () => {
                const {
                    musicList,
                    index,
                    pause
                } = this.state;
                const currentSong = musicList[index];
                const audio = new Audio(currentSong.audio);
                if (!this.state.pause) {
                    this.playerRef.play();
                } else {
                    this.playerRef.pause();
                }
                this.setState({
                    pause: !pause
                });

            });

        _defineProperty(this, "clickAudio",

            key => {
                const {
                    pause
                } = this.state;

                this.setState({
                    index: key
                });


                this.updatePlayer();
                if (pause) {
                    this.playerRef.play();
                }
            });
    }
    componentDidMount() {
        this.playerRef.addEventListener("timeupdate", this.timeUpdate, false);
        this.playerRef.addEventListener("ended", this.nextSong, false);
        this.timelineRef.addEventListener("click", this.changeCurrentTime, false);
        this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);
        this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);
    }
    componentWillUnmount() {
        this.playerRef.removeEventListener("timeupdate", this.timeUpdate);
        this.playerRef.removeEventListener("ended", this.nextSong);
        this.timelineRef.removeEventListener("click", this.changeCurrentTime);
        this.timelineRef.removeEventListener("mousemove", this.hoverTimeLine);
        this.timelineRef.removeEventListener("mouseout", this.resetTimeLine);
    }


    render() {
        const {
            musicList,
            index,
            currentTime,
            pause
        } = this.state;
        const currentSong = musicList[index];
        return (
            React.createElement("div", {
                    className: "card"
                },
                React.createElement("div", {
                        className: "current-song"
                    },
                    React.createElement("audio", {
                            ref: ref => this.playerRef = ref
                        },
                        React.createElement("source", {
                            src: currentSong.audio,
                            type: "audio/ogg"
                        }), "Your browser does not support the audio element."),


                    React.createElement("div", {
                            className: "img-wrap"
                        },
                        React.createElement("img", {
                            src: currentSong.img
                        })),

                    React.createElement("span", {
                        className: "song-name"
                    }, currentSong.name),
                    React.createElement("span", {
                        className: "song-autor"
                    }, currentSong.author),

                    React.createElement("div", {
                            className: "time"
                        },
                        React.createElement("div", {
                            className: "current-time"
                        }, currentTime),
                        React.createElement("div", {
                            className: "end-time"
                        }, currentSong.duration)),


                    React.createElement("div", {
                            ref: ref => this.timelineRef = ref,
                            id: "timeline"
                        },
                        React.createElement("div", {
                            ref: ref => this.playheadRef = ref,
                            id: "playhead"
                        }),
                        React.createElement("div", {
                            ref: ref => this.hoverPlayheadRef = ref,
                            class: "hover-playhead",
                            "data-content": "0:00"
                        })),


                    React.createElement("div", {
                            className: "controls"
                        },
                        React.createElement("button", {
                            onClick: this.prevSong,
                            className: "prev prev-next current-btn"
                        }, React.createElement("i", {
                            className: "fas fa-backward"
                        })),

                        React.createElement("button", {
                                onClick: this.playOrPause,
                                className: "play current-btn"
                            },

                            !pause ? React.createElement("i", {
                                className: "fas fa-play"
                            }) :
                            React.createElement("i", {
                                class: "fas fa-pause"
                            })),


                        React.createElement("button", {
                            onClick: this.nextSong,
                            className: "next prev-next current-btn"
                        }, React.createElement("i", {
                            className: "fas fa-forward"
                        })))),



                React.createElement("div", {
                        className: "play-list"
                    },
                    musicList.map((music, key = 0) =>
                        React.createElement("div", {
                                key: key,
                                onClick: () => this.clickAudio(key),
                                className: "track " + (
                                    index === key && !pause ? 'current-audio' : '') + (
                                    index === key && pause ? 'play-now' : '')
                            },

                            React.createElement("img", {
                                className: "track-img",
                                src: music.img
                            }),
                            React.createElement("div", {
                                    className: "track-discr"
                                },
                                React.createElement("span", {
                                    className: "track-name"
                                }, music.name),
                                React.createElement("span", {
                                    className: "track-author"
                                }, music.author)),

                            React.createElement("span", {
                                    className: "track-duration"
                                },
                                index === key ?
                                currentTime :
                                music.duration))))));


    }
}


ReactDOM.render(
    React.createElement(CardProfile, null),
    document.getElementById('root'));
