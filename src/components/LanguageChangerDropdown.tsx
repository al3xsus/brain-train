import i18 from "../i18";
import {Dropdown} from "semantic-ui-react";
import React from "react";

const LanguageChangerDropdown = () => {
    return (
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
    )
}

export default LanguageChangerDropdown