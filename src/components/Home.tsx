import React from 'react'
import {Container, Header, Image} from 'semantic-ui-react'
import AppLogo from "../assets/Brain.svg"
import {useTranslation} from "react-i18next";

const Home = () => {
    const {t} = useTranslation()
    return (<Container text>
        <Image src={AppLogo} size='medium' floated={"left"}/>
        <Header as='h2'>Brain Train</Header>
        <p>
            {t("main-text")}
        </p>
    </Container>)
}

export default Home