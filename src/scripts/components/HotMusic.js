
import NavMusic from './NavMusic'


class HotMusic extends React.Component {   
    constructor(props,context){
        super(props,context)

        this.state={
          
        }
    }
    componentWillMount(){
//		console.log("hot")
    }
    render(){ 
//      console.log(this)
        return (
            <div className="m-tabct">
				<div className="tt">HOTmusic</div>
            </div>
        )
    }
}
//定义默认属性
HotMusic .defaultProps={

}



export default HotMusic