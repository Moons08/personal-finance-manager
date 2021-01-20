import React from "react";
import { withRouter } from 'react-router-dom';

class Container extends React.Component {
    componentDidMount() {
        this.checkUser();
    }

    checkUser() {
        const { checkUser, setUserTemp, history } = this.props;

        if(localStorage.getItem("access_token")) {
            const userInfo = JSON.parse(localStorage.getItem("access_token"));
            setUserTemp ({
                username: userInfo.username,
                token: userInfo.token
            });
            return;
        }

        checkUser();

        if(!this.props.isLogged) {
            history.push("/");
        }
        
    } 
}

export default Container;