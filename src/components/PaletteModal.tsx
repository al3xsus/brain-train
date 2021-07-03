import React from 'react'
import {Button, Form, Icon, Item, Modal} from 'semantic-ui-react'
import {useTranslation} from "react-i18next"
import palette from "./palette";

const PaletteModal = () => {
    const [open, setOpen] = React.useState(false)
    const {t} = useTranslation()

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Form.Button primary basic color={"green"} size={"huge"} fluid={true}>
                <Icon name='paint brush' color={"green"}/>
                {t("show-palette")}
            </Form.Button>}
        >
            <Modal.Header>{t("show-palette")}</Modal.Header>
            <Modal.Content scrolling={true}>
                <Modal.Description>
                    <Item.Group divided relaxed={true}>
                        {palette.map((entry, index) => {
                            return <Item key={`palette-${index}`}>
                                <Item.Content verticalAlign='middle'>
                                    <div style={{
                                        height: "3vh",
                                        width: "3vw",
                                        backgroundColor: Object.values(entry)[0]
                                    }}/>
                                </Item.Content>
                                <Item.Content
                                    verticalAlign='middle'>{t(`colors.${Object.keys(entry)[0]}`).toUpperCase()}</Item.Content>
                            </Item>
                        })}
                    </Item.Group>
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

export default PaletteModal