import { useState } from "react";

import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { addDays, subDays } from "date-fns";
import {
    ArrowButton,
    DateDisplay,
    SelectorBox,
    SelectorContainer,
} from "./styled.Main";

type DaySelectorProps = {
    onChange?: (date: Date) => void;
};
function getDayOfWeek(day: string) {
    const week = ["일", "월", "화", "수", "목", "금", "토"];

    const dayOfWeek = week[new Date(day).getDay()];

    return dayOfWeek;
}

const DaySelector = ({ onChange }: DaySelectorProps) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    const changeDate = (days: number) => {
        const newDate =
            days > 0 ? addDays(selectedDate, 1) : subDays(selectedDate, 1);
        setSelectedDate(newDate);
        if (onChange) onChange(newDate);
    };

    return (
        <SelectorContainer>
            <SelectorBox>
                <ArrowButton onClick={() => changeDate(-1)}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </ArrowButton>

                <DateDisplay>
                    {formattedDate} {getDayOfWeek(formattedDate)}요일
                </DateDisplay>

                <ArrowButton onClick={() => changeDate(1)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </ArrowButton>
            </SelectorBox>
        </SelectorContainer>
    );
};

export default DaySelector;
