import React, { Component } from 'react';
import {connect} from "react-redux";
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {yellow500, grey300, brown300, transparent} from 'material-ui/styles/colors';
import IconLevel from './IconLevel';
import Diamond from './Diamond';
import RankLevel from './RankLevel';
import MobileAction from "../utils/MobileAction";

const style = {
    container: {
        padding: '0px 0px 60px 0px'
    },
    listItem: {
        root: {
            position: 'relative',
            userSelect: 'none',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            transform: 'translate(0px, 0px)',
        },
        left: {
            position: 'absolute',
            top: '50%',
            marginTop: '-11px'
        },
        center: {
            padding: '15px 0px 12px 0px',
            marginLeft: '50px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
        },
        avatar: {

        },
        info: {
            position: 'relative',
            margin: '0px 0px 0px 10px'
        },
        infoTop: {
            fontSize: '15px',
            lineHeight: '15px',
            display: 'flex',
            alignItems: 'center',
            margin: '0px 0px 5px 0px'
        },
        name: {
            color: '#333',
            margin: '0px 10px 0px 0px'
        },
        anchorExpLevel:{
            margin: '0px 5px 0px 0px',
            color: '#666',
            fontSize: '10px'
        },
        diamondText: {
            color: '#aaa',
        },
        infoButtom: {
            display: 'flex',
            fontSize: '12px',
            color: '#555',
            alignItems: 'center'
        },

        liveOn: {
            backgroundImage: 'url(images/rank-status-live.png)',
            backgroundSize: 'contain',
            width: 49,
            height: 20,
            position: 'absolute',
            right: 10,
            top: '50%',
            marginTop: '-10px'
        },
        liveOff: {
            backgroundImage: 'url(images/rank-status.png)',
            backgroundSize: 'contain',
            width: 49,
            height: 20,
            position: 'absolute',
            right: 10,
            top: '50%',
            marginTop: '-10px'
        }
    }
}


function mapStateToProps(state){
    return {
        avatarPath: state.instances.AVATAR_PATH
    }
}

class RankList extends Component {
    
    constructor() {
        super();
        this.touched = false;
    }

    handleVideoTap(e, data) {
        
        e.preventDefault();

        if(!this.touched){
            let id = data.id;
            let json = JSON.stringify({
                dir: 'room',
                roomId: id
            });
            MobileAction.switchPage(json);
            this.touched = true;
        }else{
            //过500毫秒 再变为false
            setTimeout(()=>{
                this.touched = false;
            }, 500);
            
        }

    }

    render() {

        let { anchorList, avatarPath } = this.props;

        return (
            <div style={ style.container }>
            {anchorList.map(( anchor, index ) => (
                <div 
                    style={ style.listItem.root }
                    key={index}
                    className='rank-list-item'
                    onTouchTap={ (e)=>{
                        if(anchor.roled == 3){
                            this.handleVideoTap(e, {id: anchor.uid });
                        }
                    }
                }>
                    <RankLevel style={style.listItem.left } level={index} />
                    <div style={style.listItem.center}>
                        <Avatar src={ avatarPath + anchor.headimg } style={ style.listItem.avatar }/>
                        <div style={ style.listItem.info }>
                            <div style={ style.listItem.infoTop}>
                                <div style={ style.listItem.name }>{ anchor.username }</div>
                                { anchor.roled == 3 ? <div style={ style.listItem.anchorExpLevel }>Lv.{ anchor.lv_exp }</div> : "" }
                                { anchor.vip == "0" ? "": <IconLevel level={ anchor.vip } type='vip'/> }
                                <IconLevel level={ anchor.lv_rich } type='rich'/>
                            </div>
                            <div style={ style.listItem.infoButtom }>
                                收礼数：<Diamond value={ anchor.score } textStyle={ style.listItem.diamondText } />
                            </div>
                        </div>
                    </div>
                    <div style={ anchor.live_status ? style.listItem.liveOn : style.listItem.liveOff }></div>
                </div>
            ))}
            </div>
        );
    }

}

export default connect(mapStateToProps, null)(RankList);