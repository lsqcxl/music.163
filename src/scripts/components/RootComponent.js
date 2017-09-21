
import NavMusic from './NavMusic'


class RootComponent extends React.Component {   
    constructor(props,context){
        super(props,context)

        this.state={
          	pathname:'/'
        }
    }
    componentWillMount(){
        
    }
    componentWillReceiveProps(props){

    }
    render(){
        return (
            <div className="full-height"  >
            		<NavMusic  pathname={this.props.location.pathname}/>
               {this.props.children}
            </div>
        )
    }
}
//定义默认属性
RootComponent.defaultProps={

}



export default RootComponent