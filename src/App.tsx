import React, {Fragment} from 'react';
import './App.css';
import MultiColoredWords from "./components/MultiColoredWords";
import {Dropdown, Image, Menu, Segment} from 'semantic-ui-react'
import AppLogo from "../src/assets/Brain.svg"
import {useTranslation, withTranslation} from "react-i18next";
import i18 from './i18';

import {BrowserRouter as Router, NavLink as Link, Route, Switch} from "react-router-dom";
import Home from "./components/Home";

function App() {
    const {t} = useTranslation()

    return (
        <Fragment>
            <Router>
                <Segment inverted>
                    <Menu inverted pointing secondary>
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
                            <Dropdown
                                options={
                                    [
                                        {key: 'ru', value: 'ru', flag: 'ru', text: "Русский"},
                                        {key: 'en', value: 'en', flag: 'us', text: 'English'},
                                    ]
                                }
                                onChange={(event, data) => {
                                    i18.changeLanguage(data.value as string);
                                }}
                                button
                                className='icon'
                                floating
                                labeled
                                icon='world'
                                value={i18.language}
                            />
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

function Error404() {
    return (
        <div>
            <h2>No such address :(</h2>
        </div>
    )
}

export default withTranslation()(App);
