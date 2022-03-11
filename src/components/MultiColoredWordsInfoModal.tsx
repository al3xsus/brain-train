import React from 'react'
import {Button, Form, Icon, Modal} from 'semantic-ui-react'
import {useTranslation} from "react-i18next"

const MultiColoredWordsInfoModal = () => {
    const [open, setOpen] = React.useState(false)
    const {t} = useTranslation()

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Form.Button primary basic color={"green"} size={"huge"} fluid={true}>
                <Icon name='info' color={"blue"}/>
                {t("info")}
            </Form.Button>}
        >
            <Modal.Content scrolling={true}>
                <Modal.Description>
                    <p style={{padding: "2vh 2vw 2vh 2vw", fontSize: "25px", margin: 0}}>
                        {t("m-c-w-text")}
                        <br/>
                        <i>
                            <b>{t("benefits")}: </b>{t("m-c-w-list")}
                        </i>
                    </p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' basic={true} onClick={() => setOpen(false)}>
                    {t("got-it")}
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default MultiColoredWordsInfoModal