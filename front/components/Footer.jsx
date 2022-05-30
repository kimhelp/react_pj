import { Menu} from 'antd'
import {MehOutlined,LoadingOutlined} from '@ant-design/icons'

const Footer = () => {
    return(
        <footer>
            <div style={{position:'fixed',bottom:'0',width:'100%',zIndex:'10',backgroundColor:'lightgray'}}>
            <div style={{width:'100%'}}><img src="/static/logo.png" style={{float:'left'}}/></div>
                <div style={{marginLeft:'5%'}}>
                <h2>
                    React_pj
                </h2>
                <p style={{fontWeight:'bold'}}>2022-05-16 ~ 2022-05-31 Team : <MehOutlined />임태찬 <MehOutlined />김도움 <MehOutlined />이현진 <MehOutlined />지정환</p>
                </div>
                
                <div style={{width:'100%'}}>
                    <img src="/static/cyworld.jpg" style={{float:'right',marginTop:'-4.2%',width:'100px',height:'65px',marginRight:'10px',borderRadius:'10px 10px'}}/>
                    <img src="/static/instagram.webp" style={{float:'right',marginTop:'-4.2%',width:'100px',height:'65px',marginRight:'120px',borderRadius:'10px 10px'}}/>
                </div>
            </div>
            
        </footer>
        
    )
}

export default Footer