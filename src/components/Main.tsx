import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    CardSection,
    Container,
    Header,
    Menu,
    MenuSection,
} from "./styled.Main";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import MealCard from "./MealCard";
import DaySelector from "./DaySelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import config from "../config.json";

type MealType = {
    breakfast: string;
    lunch: string;
    dinner: string;
    images: {
        breakfast: string;
        lunch: string;
        dinner: string;
    };
};

const errorComment = "급식을 불러올 수 없습니다";
const NoMenu = "메뉴 정보 없음";

const fetchMeal = async (date: string) => {
    try {
        const { data } = await axios.get<MealType>(
            `https://api.밥.net/${date}`
        );
        return data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.status === 404) {
            throw new Error("404");
        }
        throw error;
    }
};

function Main() {
    const [Day, setDay] = useState<Date>(new Date());

    const formattedDate = format(Day, "yyyy-MM-dd");

    const {
        data: Meal,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["meal", formattedDate],
        queryFn: () => fetchMeal(formattedDate),
        staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
        retry: (failureCount, err) => {
            if (err.message === "404") return false; // 404면 재시도 안함
            return failureCount < 3; // 그 외의 경우 3회까지 재시도
        },
    });
    return (
        <Container>
            <Header>
                <h1>
                    디미고 <span>밥</span>
                </h1>
                <MenuSection>
                    <Menu
                        onClick={() => (window.location.href = config.github)}
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </Menu>
                    <DaySelector onChange={setDay} />
                    <Menu onClick={() => (window.location.href = config.insta)}>
                        <FontAwesomeIcon icon={faInstagram} />
                    </Menu>
                </MenuSection>
            </Header>
            <CardSection>
                <MealCard
                    type="breakfast"
                    menu={
                        isLoading
                            ? ""
                            : isError
                            ? errorComment
                            : Meal?.breakfast || NoMenu
                    }
                    loading={isLoading}
                />
                <MealCard
                    type="lunch"
                    menu={
                        isLoading
                            ? ""
                            : isError
                            ? errorComment
                            : Meal?.lunch || NoMenu
                    }
                    loading={isLoading}
                />
                <MealCard
                    type="dinner"
                    menu={
                        isLoading
                            ? ""
                            : isError
                            ? errorComment
                            : Meal?.dinner || NoMenu
                    }
                    loading={isLoading}
                />
            </CardSection>
        </Container>
    );
}

export default Main;
