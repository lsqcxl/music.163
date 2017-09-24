
import Fetch from '../modules/fetch'

class HotMusic extends React.Component {   
    constructor(props,context){
        super(props,context)
		
        this.state={
        	  hotSongs:[],
          time:(((new Date().getMonth()+1)<10)?("0"+(new Date().getMonth()+1)):(new Date().getMonth()+1))+"月"+new Date().getDate()+"日"
        }
    }
    getHotSongs(){
    		let that = this
    		Fetch.Get("./json/hotSong.json",{}).then((res)=>{return res.json()}).then((json)=>{
//  			console.log(json.playlist.tracks)
    			that.setState({
    				hotSongs:json.playlist.tracks
    			})
    		})
    }
    showHotSongs(){
    		let {hotSongs} = this.state
    		let arr = []
    		if(hotSongs){
    			hotSongs.forEach((item,i)=>{
    				arr.push(<a>
						<div className={(i==0||i==1||i==2)?"songInd red":"songInd"}>{(i+1)>=10?i+1:"0"+(i+1)}</div>
						<div className="songBox">
							<div className="songBox-left">
								<h5><span>{item.name}</span><span className="more">{item.alia[0]?"("+item.alia[0]+")":""}</span></h5>
								<p><i className="icon icon-SQ"></i><span>{item.ar[0].name}</span>-<span>{item.name}</span></p>
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
    componentWillMount(){
		this.getHotSongs()
    }
    render(){ 
        return (
            <div className="m-tabct">
				<div className="hotTop">
					<div className="hotTop-icon">
					</div>
					<p>更新日期: {this.state.time}</p>
				</div>
				<div className="hotSongs">
					{this.showHotSongs()}
				</div>
				<div className="hotMore">
					<span>查看完整榜单</span>
				</div>
            </div>
        )
    }
}
//定义默认属性
HotMusic .defaultProps={

}



export default HotMusic