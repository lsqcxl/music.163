import NavMusic from './NavMusic'
import Fetch from '../modules/fetch'

class SearchMusic extends React.Component {
	constructor(props, context) {
		super(props, context)

		this.state = {
			song: '',
			searchSongs: [],
			isShow: false,
			hotSearch:[]
		}
	}
	
	changeSong(e) {
		this.setState({
			song: e.target.value
		})
		if(!this.state.song){
			this.setState({
				isShow: false
			})
		}
	}
	
	enterSong(e) {
		this.searchSongs()
		
		if(e.keyCode == 13) {
			this.setState({
				isShow: true
			})
		}
	}

	selectSong(song){
		this.setState({
			song:song,
			isShow:true
		})
	}
	
	close(){
		this.setState({
			song:''
		})
	}
	
	searchSongs(){
		let that = this
		Fetch.Get("http://localhost:5000/songlist/soso/fcgi-bin/search_for_qq_cp", {
			g_tk: '677018037',
			uin: '635321598',
			format: "json",
			inCharset: "utf-8",
			outCharset: "utf-8",
			notice: '0',
			platform: "h5",
			needNewCode: '1',
			w: that.state.song,
			zhidaqu: '1',
			catZhida: '1',
			t: '0',
			flag: '1',
			ie: "utf-8",
			sem: '1',
			aggr: '0',
			perpage: '20',
			n: '20',
			p: '1',
			remoteplace: "txt.mqq.all",
			_: '1506133900990'
		}).then(res => res.json()).then(json => {
			that.setState({
				searchSongs: json.data.song.list
			})
		})
	}
	
	showSongsPart(){
		let arr = []
		if(this.state.searchSongs.length > 2) {
			let songsArr = this.state.searchSongs
			//只显示前六条数据
			let len = (songsArr.length>6)?6:songsArr.length;
			for(var i = 0;i<len;i++){
				arr.push(<li onClick={this.selectSong.bind(this,songsArr[i].songname)}><i></i><span>{songsArr[i].songname}-{songsArr[i].singer[0].name}</span></li>)   
				}
			}
		return arr
	}
		
	showSongsAll() {
		let arr = []
		if(this.state.searchSongs.length > 2) {
			this.state.searchSongs.forEach((item, i) => {
				arr.push(<a>
						<div className="songBox">
							<div className="songBox-left">
								<h5><span>{item.songname}</span></h5>
								<p><i className="icon icon-SQ"></i><span>{item.singer[0].name}</span>-<span>{item.songname}</span></p>
							</div>	
							<div className="songBox-right">
								<i className="icon icon-play"></i>
							</div>
						</div>
					</a>)
			})
		}
		return arr
	}
	
	getHotSearch(){
		let that = this;
		Fetch.Get('./json/hotSearch.json',{}).then((res)=>res.json()).then((json)=>{
			that.setState({
				hotSearch:json.result.hots
			})
		})
	}
	showHotSearch(){
		let arr = [];
		let {hotSearch} = this.state;
		if(hotSearch.length>2){
			hotSearch.forEach((item,i)=>{
				arr.push(<li onClick={this.selectSong.bind(this,item.first)}><a>{item.first}</a></li>)
			})
		}
		return arr
	}
	
	componentWillMount() {
		this.getHotSearch()
		console.log('componentWillMount')
		
	}
//	shouldComponentUpdate(){
//	}
	componentDidUpdate(){
//		this.searchSongs()
		console.log('componentDidUpdate')
	}
	
	render() {
		return(
			<div className="m-tabct">
				<form className="searForm">
					<div className="searBox">
						<i></i>
						<input value={this.state.song}  onChange={this.changeSong.bind(this)} onKeyUp={this.enterSong.bind(this)} type="text" placeholder="搜索歌曲、歌手、专辑"  />
						{this.state.song?<figure><e onClick={this.close.bind(this)}></e></figure>:''}
					</div>
				</form>
				{this.state.song?
						(this.state.isShow?<div className="songsList">{this.showSongsAll()}</div>
							:<div className="songsPart"><h3>搜索"{this.state.song}"</h3><ul>{this.showSongsPart()}</ul></div>)
				:<div className="hotSearch">
					<h5>热门搜索</h5>
					<ul>{this.showHotSearch()}</ul>
				</div>
			}
            </div>
		)
	}
}
//定义默认属性
SearchMusic.defaultProps = {
	
}

export default SearchMusic