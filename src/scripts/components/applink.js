
class AppLink extends React.Component {   
    constructor(props,context){
        super(props,context)
		
        this.state={
        }
    }

    componentWillMount(){
    }
    render(){ 
        return (
          <div className="app-main">
          	<div className="m-uvl">
          		<div className="wrap">
          			<div className="logo"></div>
          			<a>立即下载</a>
          		</div>
          	</div>
          </div>
        )
    }
}
//定义默认属性
AppLink .defaultProps={

}



export default AppLink