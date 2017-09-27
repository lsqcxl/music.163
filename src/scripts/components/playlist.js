import Fetch from '../modules/fetch'
import {Link} from 'react-router'

class PlayList extends React.Component {   
    constructor(props,context){
        super(props,context)
        this.state={
          list:"",
          commit:""
        }
    }
    componentWillMount(){
    		let path = (this.props.location.pathname).split("/").pop()
    		path = Number(path)+1
    	
    	
    		var that = this
    		Fetch.Get("./json/detail"+path+".json",{}).then((res)=>{
    			return res.json()
    		}).then((json)=>{
    			that.setState({
				list: json.playlist
			})
    		})
    		Fetch.Get("./json/commit1.json",{}).then((res)=>{
    			return res.json()
    		}).then((json)=>{
    			that.setState({
				commit: json
			})
    		})
    		
    		
    }
    playlist(){
    		let{list,commit}=this.state
    		
    		let arr = []
    		if(list){
    			let aa = list.coverImgUrl
    			let bb = list.creator.avatarUrl
 			let back1={backgroundImage:"url("+aa+")"}
   			let num = (list.playCount / 10000).toFixed(1)
   			//遍历类型标签
   			let song_type_1=[]
   			let song_type = list.tags
   			song_type.forEach(function(val,i){
   				song_type_1.push(<em className="eem">{val}</em>)
   			})
   			//遍历表单列表
   			let usong=[]
   						
   			let usongs=list.tracks  
   			usongs.forEach(function(val,i){
   				usong.push(
   					<Link to={"/song/"+val.id} className="usong">

	   						<div className="usong-num">{i}</div>
	   						<div className="usong-r">
	   							<div className="usong-r-l">
	   								<div className="usong-r-l-1">{val.name}</div>
	   								<div className="usong-r-l-2">{val.ar[0].name}-{val.al.name}</div>
	   							</div>
	   							<div className="usong-r-r">
	   								<span></span>
	   							</div>
	   						</div>
   					</Link>
   				)
   			})
   			//精彩评论
   			let hotcommit=[]
   			let hotcommits = commit.hotComments
   			if(hotcommits!=""){
				hotcommits.forEach(function(val,i){
					let commitimg = commit.hotComments[i].user.avatarUrl
					let xx = val.time
					let year = new Date(xx).getFullYear()
					let mouth = new Date(xx).getMonth()+1
					if(mouth<10){
						mouth = "0"+mouth
					}
					let day = new Date(xx).getDate()
					if(day<10){
						day = "0"+day
					}
					hotcommit.push(
						<li className="li-comment">
							<div className="li-comment-l">
								<div className="li-commit-l-1">
									<img className="li-commit-l-1-img" src={commitimg}/>
								</div>
							</div>
							<div className="li-comment-r">
								<div className="comt_ft">
									<div className="comt_ffl">
										<div className="commt_nick">
											<span>{val.user.nickname}</span>
										</div>
										<div className="commt-time">{year}年{mouth}月{day}日</div>
									</div>
									<div className="comt-ffr">
										<span>{val.likedCount}</span>
									</div>
								</div>
								<div className="f-brk">
									<span>{val.content}</span>
								</div>
							</div>
						</li>
					)
				})
   				
   			}
   			//最新评论
   			let newcommit=[]
   			let newcommits = commit.comments
   			if(newcommits !=""){
   				
	   			newcommits.forEach(function(val,i){
					let commitimg = commit.comments[i].user.avatarUrl
	   				let xx = val.time
					let year = new Date(xx).getFullYear()
					let mouth = new Date(xx).getMonth()+1
					if(mouth<10){
						mouth = "0"+mouth
					}
					let day = new Date(xx).getDate()
					if(day<10){
						day = "0"+day
					}
	   				
	
					newcommit.push(
						<li className="li-comment">
							<div className="li-comment-l">
								<div className="li-commit-l-1">
									<img className="li-commit-l-1-img" src={commitimg}/>
								</div>
							</div>
							<div className="li-comment-r">
								<div className="comt_ft">
									<div className="comt_ffl">
										<div className="commt_nick">
											<span>{val.user.nickname}</span>
										</div>
										<div className="commt-time">{year}年{mouth}月{day}日</div>
									</div>
									<div className="comt-ffr">
										<span></span>
									</div>
								</div>
								<div className="f-brk">
									<span>{val.content}</span>
								</div>
							</div>
						</li>
					)
				})
   			}
   			
    			arr.push(
    			<div>
    				<section className="list-header">
	    				<div  style={back1} className="list-h-1"></div>
	    				<div className="list-wrap">
	    					<div className="list-l">
	    						<img className="list-img" src={aa}/>
	    						<span className="list-icon">歌单</span>
	    						<i className="list-num">{num}万</i>
	    					</div>
	    					<div className="list-r">
	    						<h2 className="list-h2">{list.name}</h2>
	    						<a className="list-auth">
	    							<div className="list-ave">
	    								<img className="list-ave-img" src={bb}/>
	    								<span className="list-ave-xiao"></span>
	    							</div>
	    							{list.creator.nickname}
	    						</a>
	    					</div>
	    				</div>
    				</section>
    				<section className="list-intro">
    					<div className="intro-1">
    						标签:&nbsp;{song_type_1}
    					</div>
    					<div className="intro-2">
    						<div id="jieshao"  className="intro-3 xiaxia">
    							简介:&nbsp;
    							<span>{list.description}</span>
    							<i id="xiala" onClick={this.xiala.bind(this)}></i>
    						</div>
    					</div>
    				</section>
    				<div className="play-list">
    					<h3>歌曲列表</h3>
    					<ol className="usongs">
    						{usong}
    					</ol>
    				</div>
    				
    				<div>
    					<div>
    						<h3 className="u-smtitle">精彩评论</h3>
    						<ul className="u-comments">
    							{hotcommit}
    						</ul>
    					</div>
    					<div>
    						<h3 className="u-smtitle">最新评论</h3>
    						<ul>
    						{newcommit}
    						</ul>
    					</div>
    					<div className="u-comtmore">
    						< a href="#/applink"><span className="comt_more">更多精彩评论</span></a>
    					</div>
    				</div>
    				<div className="u-footer">
    					< a href="#/applink"><div className="footer-wrap">
    						<span >收藏歌单</span>
    					</div></a>
    				</div>
    			</div>
    				
    			)
    		}
    		
    		return arr
    	
    }
    xiala(){
    		let aa = document.getElementById("jieshao")
    		let xiala = document.getElementById("xiala")
    		if(aa.className=="intro-3 xiaxia"){
    			aa.className="intro-3"
    			xiala.className="shang"
    		}else{
    			aa.className="intro-3 xiaxia"
    			xiala.className=""
    		}
    		
    }
    
    render(){ 
        return (
            <div className="play-list">
            	{this.playlist()}
            
            </div>
        )
    }
}
//定义默认属性
PlayList .defaultProps={

}



export default PlayList