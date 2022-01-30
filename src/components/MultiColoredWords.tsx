import React, {FormEvent, SyntheticEvent} from "react";
import './MultiColoredWords.css'
import {
    ButtonProps,
    Checkbox,
    CheckboxProps,
    Container,
    Divider,
    DropdownProps,
    Form,
    Grid,
    Icon,
    List
} from "semantic-ui-react";
import {useTranslation} from "react-i18next";
import palette from "./palette";
import PaletteModal from "./PaletteModal";

const MultiColoredWords = () => {
    const {t} = useTranslation()
    const [rowNum, setRowNum] = React.useState(4)
    const [colNum, setColNum] = React.useState(4)
    const [speed, setSpeed] = React.useState(0.5)
    const [colourfulTable, setColourfulTable] = React.useState<null | JSX.Element>(null)
    const [direction, setDirection] = React.useState("start-to-end")

    const playGame = async () => {
        if (direction === "start-to-end") {
            for (let stepRow = 0; stepRow < rowNum; stepRow++) {
                for (let stepCol = 0; stepCol < colNum; stepCol++) {
                    let elem: any = document.getElementById(`text-${stepRow}-${stepCol}`);
                    elem.style = "text-decoration: underline"
                    await timeout(speed * 1000)
                    elem.style = ""
                }
            }
        } else {
            let col = 0
            let row = 0
            let elem: any = null
            for (let step = (rowNum * colNum) - 1; step >= 0; step--) {
                row = Math.floor(step / colNum)
                col = step - (row * colNum)
                elem = document.getElementById(`text-${row}-${col}`);
                elem.style = "text-decoration: underline"
                await timeout(speed * 1000)
                elem.style = ""
            }
        }
    }

    const setTable = () => {
        setColourfulTable(generateTable(rowNum, colNum))
    }

    const timeout = (delay: number) => {
        return new Promise(res => setTimeout(res, delay));
    }

    React.useEffect(() => {
        setTable()
    }, [rowNum, colNum])

    const handleChange = (event: SyntheticEvent<HTMLElement>, data: DropdownProps | ButtonProps) => {
        switch (data.name) {
            case 'rows-picker': {
                setRowNum(data.value as number)
                break
            }
            case 'column-picker': {
                setColNum(data.value as number)
                break
            }
            case 'add': {
                setSpeed(speed + 0.5)
                break
            }
            case 'minus': {
                setSpeed(speed - 0.5)
                break
            }
        }
    }

    const changeDirection = (event: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        setDirection(data.value as string)
    }

    const generateTable = (rows: number, columns: number) => {
        let data: any = []
        let word = 0
        let color = 0
        for (let i = 0; i < rows; i++) {
            let row: any = []
            for (let k = 0; k < columns; k++) {
                word = Math.floor(Math.random() * palette.length)
                color = Math.floor(Math.random() * palette.length)
                if (k > 0) {
                    if (row[k - 1][1] === color) {
                        if (color < palette.length - 1) {
                            color += 1
                        } else {
                            color -= 1
                        }
                    }
                    if (row[k - 1][0] === word) {
                        if (word < palette.length - 1) {
                            word += 1
                        } else {
                            word -= 1
                        }
                    }
                }
                row.push([word, color])
            }
            data.push(row)
        }
        return (
            <table>
                <tbody>
                {
                    data.map((row: any, rowIndex: number) => <tr key={`tr-key-${rowIndex}`}>
                        {row.map((cell: any, index: number) => {
                            return <td key={`td-key-${rowIndex}-${index}`}>{
                                <svg viewBox="0 0 100 20" style={{
                                    width: "100%",
                                    padding: "1vh 1vw",
                                    fill: Object.values(palette[cell[1]])[0],
                                }}>
                                    <text
                                        x="0"
                                        y="15"
                                        id={`text-${rowIndex}-${index}`}
                                    >
                                        {t(`colors.${Object.keys(palette[cell[0]])[0]}`).toUpperCase()}
                                    </text>
                                </svg>
                            }</td>
                        })}
                    </tr>)
                }
                </tbody>
            </table>
        )
    }

    return (
        <Container>
            <h2 style={{textAlign: "center"}}>{t("m-c-w")}</h2>
            <p style={{padding: "2vh 2vw 2vh 2vw", fontSize: "25px", margin: 0}}>
                {t("m-c-w-text")}
            </p>
            <List bulleted style={{padding: "0 3vw 0 3vw", marginTop: 0, fontSize: "20px"}}>
                <List.Item><b>{t("benefits")}: </b>{t("m-c-w-list")}</List.Item>
            </List>
            <Grid celled={true} columns={2} doubling={true} stackable={true}>
                <Grid.Column width={13}>
                    {colourfulTable}
                </Grid.Column>
                <Grid.Column width={3}>
                    <Form size={"huge"}>
                        <Form.Field>
                            {t("table-size")}
                        </Form.Field>
                        <Form.Group>
                            <Form.Select
                                fluid
                                name={'column-picker'}
                                label={t("columns")}
                                options={
                                    [3, 4, 5, 6, 7].map((numb) => {
                                        return {
                                            text: numb,
                                            value: numb
                                        }
                                    })
                                }
                                value={colNum}
                                onChange={handleChange}
                            />
                            <Form.Select
                                fluid
                                name={'rows-picker'}
                                label={t("rows")}
                                options={
                                    [3, 4, 5, 6, 7].map((numb) => {
                                        return {
                                            text: numb,
                                            value: numb
                                        }
                                    })
                                }
                                value={rowNum}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Field>
                            {t("speed")}
                        </Form.Field>
                        <Form.Group>
                            <Form.Button
                                primary
                                basic
                                compact
                                circular
                                icon={'add'}
                                name={'add'}
                                onClick={handleChange}
                            />
                            <div style={{alignSelf: "center", textAlign: "center", width: "5rem"}}>
                                {speed} s
                            </div>
                            <Form.Button
                                primary
                                basic
                                compact
                                circular
                                icon={'minus'}
                                name={'minus'}
                                onClick={handleChange}
                                disabled={speed === 0}
                            />
                        </Form.Group>
                        <Form.Field>
                            {t("direction")}
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                radio
                                label={t("start-to-end")}
                                name='checkboxRadioGroup'
                                value='start-to-end'
                                checked={direction === "start-to-end"}
                                onChange={changeDirection}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                radio
                                label={t("end-to-start")}
                                name='checkboxRadioGroup'
                                value='end-to-start'
                                onChange={changeDirection}
                                checked={direction === "end-to-start"}
                            />
                        </Form.Field>
                        <Divider/>
                        <PaletteModal/>
                        <Form.Button primary basic color={"red"} size={"huge"} fluid={true} onClick={playGame}>
                            <Icon name='play' color={"red"}/>
                            {t("play")}
                        </Form.Button>
                        <Form.Button primary basic color={"blue"} size={"huge"} fluid={true} onClick={setTable}>
                            <Icon name='refresh' color={"blue"}/>
                            {t("refresh")}
                        </Form.Button>
                    </Form>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default MultiColoredWords