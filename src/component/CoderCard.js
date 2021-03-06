/**
 * Created by vectorzeng on 17/8/18.
 */

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardHeader, CardContent, CardActions} from 'material-ui/Card';
import Avatar from "material-ui/Avatar";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import {CoderInfoItem} from "../bean/CoderBean";
import Link from "./Link";
import ThumbUpContainer from "../contianer/ThumbUpContainer";
import Button from "material-ui/Button";

const styles = theme => {
    return {
        root: {
        },
        ///////////
        avatar: {//头像
            width: "60px",
            height: "60px",
        }, title: {//姓名
            ...theme.typography.headline,
        }, birthday: {
            ...theme.typography.caption,
        }, thumbUp:{
            color: '#FF5252',
        },flexGrow: {
            flex: '1 1 auto',
            backgroundColor:"red"
        },writer:{
            ...theme.typography.subheading,
            marginRight:"4%",
        },end:{
            textIndent:"2em",
            marginTop:"1em",
        }
        ///////////
    }
};

class CoderCard extends Component {

    static propTypes = {
        classes: PropTypes.object,
        /**
         * @see CoderBean
         */
        bean:PropTypes.object.isRequired,
    };

    createKeyValueLine(key, value){
        if(!key || !value){
            return;
        }
        return(
            <li key={key} style={{display:"table-row", paddingBottom:"0"}}>
                <Typography type="subheading" noWrap align="right" style={{display:"table-cell",fontWeight:"bold"}}>{key}</Typography>
                <Typography type="subheading" color="secondary" style={{display:"table-cell",paddingLeft:"1em"}}>{value}</Typography>
            </li>)
    }

    render() {
        const {classes,bean, other} = this.props;

        let headClasses = {
            title: classes.title,
        };
        let avatar = <Avatar
            aria-label="Recipe"
            src={bean.avatar}
            className={classes.avatar}/>;

        let title = <div>{bean.name}<span className={classes.birthday}>{bean.birthday}</span></div>;
        return (
            <Card raised={true} {...other}>
                <CardHeader
                    avatar={avatar}
                    title={title}
                    subheader={bean.motto}
                    classes={headClasses}
                >
                </CardHeader>
                <Divider />
                <CardContent style={{backgroundColor:"",paddingBottom:"0"}}>
                    <ul style={{display:"table"}}>
                        {bean.infoArray.map((item)=>{
                            let v = CoderInfoItem.joinValues(item);
                            return this.createKeyValueLine(item.key, v);
                        })}
                    </ul>
                    {bean.end?<Typography type="body1" component="pre" className={classes.end}>
                        {bean.end}
                    </Typography>:null}
                </CardContent>
                <CardActions disableActionSpacing>
                    <ThumbUpContainer
                        bean={bean}
                        num={bean.numOfLike}
                        />

                    <div className={classes.flexGrow} />
                    <Link href={bean.writerUrl} className={classes.writer}>作者：{bean.writer}</Link>
                    <Button href={bean.url} dense color="primary">
                        更多
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(CoderCard);