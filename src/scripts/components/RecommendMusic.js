
import NavMusic from './NavMusic'


class RecommendMusic extends React.Component {   
    constructor(props,context){
        super(props,context)

        this.state={
          
        }
    }
    componentWillMount(){
	
    }
    render(){ 
//      console.log(this)
        return (
            <div className="full-height">
            		< NavMusic/>
            		<hr/>
				<div>这是一个新的页面</div>
            </div>
        )
    }
}
//定义默认属性
RecommendMusic .defaultProps={

}



export default RecommendMusic