import Fetch from '../modules/fetch'

class Song extends React.Component {
	constructor(props,context){
		super(props,context)
		
		this.state={
			songSources:[
				"./json/lrc1.json",
				"./json/lrc2.json",
				"./json/lrc3.json"
			],
			songIndex:0,
			singer:'',
			song:'',
			songUrl:'',
			imgSrc:'',
			lrc:[],
			allTime:0,
			curTime:0,
			isPlay:true,
			songType:0
		}
	}
	formatTime(time){
        time = Math.floor(time);
        let m = Math.floor(time/60)>10?Math.floor(time/60):'0'+Math.floor(time/60);
        let s = Math.floor(time%60)<10?"0"+Math.floor(time%60):Math.floor(time%60);
        return m+":"+s
   }
	//获取音频的总时长
	getAllTime(cb){
        var that = this;
        //canplay事件会在音频能播放的时候触发   这个时候可以通过duration属性来获取音频的总时长(s)
        document.getElementById("music-audio").addEventListener("canplay",function(){
	        	if(that.state.isPlay){
	        		this.play()
	        	}
            that.setState({
            		allTime:this.duration,
            });
        })
    }
	//获取播放过程中当前已播放的时长
	getPlayingTime(cb){
        let that = this;
        //timeupdate事件会在播放的过程中持续触发  这个时候可以通过currentTime属性来获取视频当前时长(s)
        document.getElementById("music-audio").addEventListener("timeupdate",function(){
	        	that.setState({
	            	curTime:this.currentTime
	        });
        })
    }
	//根据已播放的时长改变进度条的长度
	changeProgressTime(){  
		let {curTime,allTime} = this.state;
        let widthAll = parseInt(getComputedStyle(document.getElementsByClassName("progress")[0],null)["width"]);
        let width = Math.round((curTime/allTime)*widthAll);
        document.getElementsByClassName("progressPlayed")[0].style.width = width +'px';
        document.getElementsByClassName("progressCircle")[0].style.left = (width-7) +'px';
        //改变歌词的显示
        let height = parseInt(getComputedStyle(document.getElementsByClassName("songLrc")[0],null)["height"]);
        let top = (curTime/allTime*height).toFixed(2)
        document.getElementsByClassName("songLrc")[0].style.top = -top +'px';
    }
//	touchStart(e){
//		console.log(1,e.target.style.left)
//	}
	//拖动progress，改变已播放时长
	touchMove(e){
		//进度条progressWrap的偏移量
		let ol = document.getElementsByClassName("progressWrap")[0].offsetLeft;
		//进度条progressWrap的总长度
		let widthAll = parseInt(getComputedStyle(document.getElementsByClassName("progress")[0],null)["width"]);
		
		let left = e.changedTouches[0].clientX - ol ;
		if(left<0){
			left=0
		}
		if(left>widthAll){
			left=widthAll
		}
		//比值
		let value = (left/widthAll).toFixed(2);
		let time = parseFloat(value)*this.state.allTime
		this.setState({
			curTime:time
		})
		//改变audio的已播放时长
		document.getElementById("music-audio").currentTime = time
	}
	playAndPaused(e){
		let {isPlay} = this.state;
		if(isPlay){
			this.setState({
				isPlay:false
			})
			document.getElementById("music-audio").pause();
		}else{
			this.setState({
				isPlay:true
			})
			document.getElementById("music-audio").play();
		}
	}
	//获取歌曲的信息：歌手，歌名，歌词，歌曲资源
	getSongInfo(index){
		let that = this;
		let {songSources} = this.state;
		let songIndex = index || 0;
		Fetch.Get(songSources[songIndex],{}).then((res)=>res.json()).then((json)=>{
			that.setState({
				singer:json.singer,
				song:json.song,
				lrc:json.lrc,
				songUrl:json.songUrl,
				imgSrc:json.imgSrc
			})
		})
	}
	//显示歌词	
	showLrc(){
		let {lrc} = this.state
		let arr = [];
		let _arr = [];
		if(lrc) {
			lrc.forEach((item,i)=> {
				item.forEach((elem)=> {
					_arr.push(<span>{elem}</span>)
				})
				arr.push(<p>{_arr}</p>)
				_arr = []
			})
		}
		return arr
	}
	//改变播放类型 
	changeType(){ //0:列表循环  1:单曲循环  2:随机播放
		let _songType = this.state.songType;
		_songType = (_songType==2)?0:++_songType
		this.setState({
			songType:_songType
		})
	}
	//切换歌曲
	changeSong(type){  //true next   false  prev 
		let {songSources,songType,curTime} = this.state;
		let _songIndex = this.state.songIndex;
		
		if(songType==0){ //列表循环
			if(type){
	        		_songIndex = (_songIndex==songSources.length-1)?0:++_songIndex;
	        }else{
	        		_songIndex = (_songIndex==0)?(songSources.length-1):--_songIndex;
	        }
		}else if(songType==2){ //随机播放
			_songIndex = Math.floor(Math.random()*songSources.length)
		}else{  //单曲循环,播放时长改为0
			document.getElementById("music-audio").currentTime=0
		}
	
		this.setState({
    			songIndex : _songIndex
    		})
		this.getSongInfo(_songIndex);
    }

	componentWillMount(){
		this.getSongInfo();
	}
	componentDidMount(){
		this.getAllTime();
		this.getPlayingTime();
	}
	componentWillUpdate(){
		this.changeProgressTime();
	}
	render(){
		return(
			<div className="songBg">
				<div className="songTop">
					<div className="songdis">
						<div className="songImg">
							<img src={this.state.imgSrc}/>
						</div>
					</div>
				</div>
				<div className="songInfo">
					<h2><span>{this.state.song}</span><i>-</i><b>{this.state.singer}</b></h2>
					<div className="songLrcWrap">
						<div className="songLrc">
							{this.showLrc()}
						</div>
					</div>
				</div>
				<div className="songBottom">
					<div className="progressBox">
						<span className="timePlayed">{this.formatTime(this.state.curTime)}</span>
						<div className="progressWrap">
							<div className="progress">
								<span className="progressPlayed"></span>
								<span  onTouchMove={this.touchMove.bind(this)} className="progressCircle"></span>
							</div>
						</div>
						<span className="timeTotal">{this.formatTime(this.state.allTime)}</span>
					</div>
					<div className="musicIcon">
						<span className={this.state.songType==0?"iconfont icon-xunhuan":this.state.songType==1?"iconfont icon-danquxunhuan":"iconfont icon-suijibofang"} onClick={this.changeType.bind(this)}></span>
						<span className="iconfont icon-shangyishou" onClick={this.changeSong.bind(this,false)}></span>
						<span className={this.state.isPlay?"iconfont icon-zanting":"iconfont icon-bofang"} id="playSong" onClick={this.playAndPaused.bind(this)}></span>
						<span className="iconfont icon-xiayishou" onClick={this.changeSong.bind(this,true)}></span>
						<span className="iconfont icon-icon"></span>
					</div>
				</div>
				<audio id="music-audio" className="audio" loop autoplay="autoplay" src={this.state.songUrl}></audio>
			</div>
		)
	}
}
//定义默认属性
Song.defaultProps={  

}
export default Song