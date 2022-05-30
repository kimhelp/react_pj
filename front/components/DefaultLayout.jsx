import Link from 'next/link'
import { Menu, Row, Col } from 'antd'
import { InfoCircleOutlined, UsergroupAddOutlined, ShopOutlined ,InstagramOutlined,DollarCircleOutlined,GithubOutlined,PlusOutlined,LoadingOutlined} from '@ant-design/icons'
import Footer from './Footer'
import {useState,useEffect} from 'react'
import Router,{ useRouter } from 'next/router';



const DefaultLayout = ({ children }) => {
    const [isCookie,setisCookie] = useState()
    
    const homepage = () => {
        if(document.cookie){

            const token = document.cookie
            const [,payload,] = token.split('.')
            const decodingPayload = Buffer.from(payload,'base64').toString()
            const nickname = JSON.parse(decodingPayload).nickname
            Router.push(`/minihomepage/${nickname}`)
        }else{
            alert('로그인 후 이용해주세요')
            Router.push('/user/login')
        }

    }

    const router = useRouter();
    const feedURL = router.pathname.split('/')[1]
    
    const Auth = () => {
        if(feedURL == 'feed' || feedURL == 'market'){
            if(!document.cookie){
                alert('로그인 후 이용하세요')
                Router.push('/user/login')
            }
        }
    }
    // Auth()
    

    
    

    const cookiecheck = () => {
        if(document.cookie){
            setisCookie(true)
        }
    }
    useEffect(()=>{
        cookiecheck()
        
    },[isCookie]) 

    return (
        <>      
            <Col>
                <Menu theme='#FFFFFF' mode="horizontal" style={{ display : 'flex', justifyContent:"center", border:'1px solid lightgray',position:'fixed',zIndex:'10',width:'100%'}}>
                        <Menu.Item icon ={<InstagramOutlined />}><Link href="/">Home</Link></Menu.Item>
                        {isCookie ? <Menu.Item icon ={<InfoCircleOutlined />}><Link href="/user/login">로그아웃/프로필수정</Link></Menu.Item>
                                  : <Menu.Item icon ={<InfoCircleOutlined/>}><Link href="/user/login">로그인</Link></Menu.Item>
                        }
                        {isCookie ? <></>
                                  : <Menu.Item icon ={<UsergroupAddOutlined />}><Link href="/user/register">회원가입</Link></Menu.Item>
                        }
                        <Menu.Item onClick={homepage} icon ={<ShopOutlined />}>미니홈피</Menu.Item>
                        <Menu.Item icon={<PlusOutlined />}><Link href="/feed/write">피드작성</Link></Menu.Item>
                        <Menu.Item icon={<DollarCircleOutlined />}><Link href="/market/marketApp">NFT MARKET</Link></Menu.Item>
                        <Menu.Item icon={<GithubOutlined />}><Link href="https://github.com/taechanlim/React_project">Github</Link></Menu.Item>
                        <Menu.Item icon={<LoadingOutlined />}>페이지 동작중!</Menu.Item> 
                </Menu>
            </Col>
            <div>
                {children}
            </div>
            <br /><br /><br /><br />
            <div style={{backgroundColor:'skyblue'}}>
                <h3><Footer /></h3>
            </div>

        </>
    )
}



export default DefaultLayout