import React, {Fragment} from 'react';
import './App.css';
import MultiColoredWords from "./components/MultiColoredWords";
import {Image, Menu, Segment} from 'semantic-ui-react'
import AppLogo from "../src/assets/Brain.svg"
import {useTranslation, withTranslation} from "react-i18next";

import {BrowserRouter as Router, NavLink as Link, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import LanguageChangerDropdown from "./components/LanguageChangerDropdown";
import Error404 from "./components/Error404";

function App() {
    const {t} = useTranslation()

    return (
        <Fragment>
            <Router basename={process.env.PUBLIC_URL}>
                <Segment inverted size='mini'>
                    <Menu inverted pointing secondary size='tiny'>
                        <Menu.Item
                            as={Link}
                            name='home'
                            to={'/'}
                            exact={true}
                        >
                            <Image src={AppLogo} size='mini' style={{filter: "invert(1)"}}/>
                        </Menu.Item>
                        <Menu.Item
                            as={Link}
                            name='multi-colored-words'
                            to={'multi-colored-words'}
                        >
                            {t("m-c-w")}
                        </Menu.Item>
                        <Menu.Item position={'right'}>
                            <LanguageChangerDropdown/>
                        </Menu.Item>
                    </Menu>
                </Segment>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/multi-colored-words">
                        <MultiColoredWords/>
                    </Route>
                    <Route>
                        <Error404/>
                    </Route>
                </Switch>
            </Router>
        </Fragment>
    );
}

export default withTranslation()(App);
