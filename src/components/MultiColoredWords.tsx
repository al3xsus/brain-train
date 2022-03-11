import React, {FormEvent, SyntheticEvent} from "react";
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
    Table
} from "semantic-ui-react";
import {useTranslation} from "react-i18next";
import Palette from "./Palette";
import PaletteModal from "./PaletteModal";
import MultiColoredWordsInfoModal from "./MultiColoredWordsInfoModal";

const COLUMN_SIZE = [3, 4, 5, 6, 7]
const ROW_SIZE = [3, 4, 5, 6, 7]

const MultiColoredWords = () => {
    const {t} = useTranslation()
    const [rowNum, setRowNum] = React.useState(4)
    const [colNum, setColNum] = React.useState(4)
    const [speed, setSpeed] = React.useState(0.5)
    const [tableData, setTableData] = React.useState<any>(null)
    const [direction, setDirection] = React.useState("start-to-end")
    const [activeCell, setActiveCell] = React.useState<null | number>(null)
    const [gameStatus, setGameStatus] = React.useState(false)

    const underlineSVG = (address: number, highlight: boolean) => {
        let [row, col] = [0, 0]
        if (address !== 0) {
            row = Math.floor(address / colNum)
            col = address - (row * colNum)
        }
        let elem: null | HTMLElement = document.getElementById(`text-${row}-${col}`)
        if (elem) {
            if (highlight) {
                elem.setAttribute("style", "text-decoration: underline")
            } else {
                elem.setAttribute("style", "")
            }
        }
    }

    const changeGameStatus = () => {
        if (gameStatus) {
            setActiveCell(null)
            if (activeCell !== null) {
                underlineSVG(activeCell, false)
            }
        }
        setGameStatus(!gameStatus)
    }

    const setTable = () => {
        setTableData(prepareData())
    }

    React.useEffect(() => {
        setTable()
    }, [rowNum, colNum])

    React.useEffect(() => {
        let interval: (any) = null
        if (gameStatus) {
            if (activeCell === null) {
                interval = setInterval(() => {
                    if (direction === "start-to-end") {
                        setActiveCell(0)
                        underlineSVG(0, true)
                    } else {
                        setActiveCell((rowNum * colNum) - 1)
                        underlineSVG((rowNum * colNum) - 1, true)
                    }
                }, speed * 1000)
            } else {
                const cleanUp = () => {
                    setActiveCell(null)
                    setGameStatus(false)
                    underlineSVG(activeCell, false)
                }
                if (direction === "start-to-end") {
                    if (activeCell < (rowNum * colNum) - 1) {
                        interval = setInterval(() => {
                            setActiveCell(activeCell + 1)
                            underlineSVG(activeCell + 1, true)
                            underlineSVG(activeCell, false)
                        }, speed * 1000)
                    } else {
                        cleanUp()
                    }
                } else {
                    if (activeCell >= 0) {
                        interval = setInterval(() => {
                            setActiveCell(activeCell - 1)
                            underlineSVG(activeCell - 1, true)
                            underlineSVG(activeCell, false)
                        }, speed * 1000)
                    } else {
                        cleanUp()
                    }
                }
            }
        } else if (!gameStatus && activeCell !== null) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [gameStatus, activeCell]);

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

    const prepareData = () => {
        let data: [number, number][][] = []
        let word = 0
        let color = 0
        for (let i = 0; i < rowNum; i++) {
            let row: [number, number][] = []
            for (let k = 0; k < colNum; k++) {
                word = Math.floor(Math.random() * Palette.length)
                color = Math.floor(Math.random() * Palette.length)
                row.push([word, color])
            }
            data.push(row)
        }
        return data
    }

    const generateTable = () => {
        if (tableData) {
            return tableData.map((row: [number, number][], rowIndex: number) => <Table.Row key={`tr-key-${rowIndex}`}>
                {row.map((cell: [number, number], index: number) => {
                    return <Table.Cell key={`td-key-${rowIndex}-${index}`}>
                        <svg viewBox="0 0 100 20" style={{
                            width: "100%",
                            padding: "1vh 1vw",
                            fill: Palette[cell[1]].code
                        }}>
                            <text
                                x="0"
                                y="15"
                                id={`text-${rowIndex}-${index}`}
                            >
                                {t(`colors.${Palette[cell[0]].name}`).toUpperCase()}
                            </text>
                        </svg>
                    </Table.Cell>
                })}
            </Table.Row>)
        }
        return null
    }

    return (
        <Container style={{
            width: "90vw"
        }}>
            <h2 style={{textAlign: "center"}}>{t("m-c-w")}</h2>
            <Grid celled={true} columns={2} doubling={true} stackable={true}>
                <Grid.Column width={13}>
                    <Table basic={"very"} size={"large"} celled={true}>
                        <Table.Body>
                            {generateTable()}
                        </Table.Body>
                    </Table>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Form size={"huge"}>
                        <Form.Field>
                            <MultiColoredWordsInfoModal/>
                        </Form.Field>
                        <Divider/>
                        <Form.Field>
                            {t("table-size")}
                        </Form.Field>
                        <Form.Group>
                            <Form.Select
                                fluid
                                name={'column-picker'}
                                label={t("columns")}
                                options={
                                    COLUMN_SIZE.map((numb) => {
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
                                    ROW_SIZE.map((numb) => {
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
                        <Form.Button primary basic color={"red"} size={"huge"} fluid={true} onClick={changeGameStatus}>
                            <Icon name={gameStatus ? "square" : "play"} color={"red"}/>
                            {gameStatus ? t("stop") : t("play")}
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