import { useState } from "react";
import styled from "styled-components";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { addDays, subDays } from "date-fns";
const SelectorContainer = styled.div`
    /* 📌 날짜 선택 컨테이너 */
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    background: ${(props) => props.theme.colors.uiBackground};
    border-radius: 5px;
    box-shadow: inset 0 0 0 2px ${(props) => props.theme.colors.border}; /* 연한 테두리 */

    ${(props) => props.theme.media.mobile} {
        height: 50px;
    }
`;

const SelectorBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1.2rem;
    height: 70px;
    user-select: none;

    ${(props) => props.theme.media.mobile} {
        font-size: 1rem;
        height: 50px;
        gap: 5px;
    }
`;

const ArrowButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    width: 50px;
    height: 50px;
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary};
    transition: all 0.1s ease-in-out;
    border-radius: 5px;

    &:hover {
        background-color: ${(props) => props.theme.colors.background};
    }

    ${(props) => props.theme.media.mobile} {
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
    }
`;

const DateDisplay = styled.div`
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.1s ease-in-out;

    ${(props) => props.theme.media.mobile} {
        padding: 5px 5px;
        font-size: 0.8rem;
    }
`;

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
